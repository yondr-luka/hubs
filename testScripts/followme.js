let version = 1;

AFRAME.registerComponent(`foo${version}`, {
  init: function () {
    this.loader = this.loadAssetsFromURLs([
      "https://sketchfab.com/3d-models/tyrannosaurus-rex-20-512712b314404760a860389ebd0ce78a"
    ]);
    console.log(this.loader);
    // this.model = this.getFirstElementFromHash(5127);
    this.player = document.querySelector("#avatar-rig");
    console.log(this.player);
    this.startTime;
    this.loader.forEach(el => {
      this.model = el;
      console.log(this.model);
      el.setAttribute("scale", "0.01 0.01 0.01");
      el.setAttribute("position", "0 0.5 2");
      // el.addEventListener("this.loader", function () {
      //   el.setAttribute("scale", "2 2 2");
      // });
    });
  },

  getFirstElementFromHash: function (hash) {
    const g = AFRAME.scenes[0].querySelectorAll("[media-loader]");
    const matches = [];
    for (const e of g) {
      const m = e.components["media-loader"].attrValue.src.match(hash);
      if (m && m.length) matches.push(e);
    }
    return matches[0];
  },

  loadAssetsFromURLs: function (URLs) {
    const elements = [];
    for (const url of URLs) {
      const el = document.createElement("a-entity");
      AFRAME.scenes[0].appendChild(el);
      el.setAttribute("media-loader", { src: url, resolve: true });
      // el.setAttribute("networked", { template: "#interactable-media;attachTemplateToLocal:false;" });
      el.setAttribute("networked", { template: "#static-controlled-media" });
      elements.push(el);
    }
    return elements;
  },

  tick: function (time) {
    if (!this.startTime) this.startTime = time;
    if (!this.playerPosition) this.playerPosition = new THREE.Vector3().copy(this.player.object3D.position);
    if (this.playerPosition.distanceTo(this.player.object3D.position) > 0.5) {
      this.playerPosition = new THREE.Vector3().copy(this.player.object3D.position);
      this.startTime = time;
    }

    const duration = 6000; //ms
    const progress = (time - this.startTime) / duration;

    if (this.model && this.playerPosition && progress <= 1) {
      const newPos = new THREE.Vector3().copy(this.model.object3D.position).lerp(this.playerPosition, progress);
      this.model.setAttribute("position", `${newPos.x} ${newPos.y} ${newPos.z}`);
    }

    this.model.object3D.lookAt(this.player.object3D.position);
  }
});

document.getElementsByTagName("a-scene")[0].setAttribute(`foo${version}`, "");
