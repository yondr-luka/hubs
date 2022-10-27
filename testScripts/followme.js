AFRAME.registerComponent("foo", {
  init: function () {
    this.loader = this.loadAssetsFromURLs([
      "https://sketchfab.com/3d-models/tyrannosaurus-rex-20-512712b314404760a860389ebd0ce78a"
    ]);
    console.log(this.loader);
    this.model = this.getFirstElementFromHash(5127);

    this.startTime;
    this.loader.forEach(el => {
      this.model = el;
      el.setAttribute("scale", "2 2 2");
      el.addEventListener("this.loader", function () {
        el.setAttribute("scale", "2 2 2");
      });
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
      el.setAttribute("networked", { template: "#interactable-media" });
      elements.push(el);
    }
    return elements;
  },

  tick: function (time) {
    if (!this.startTime) this.startTime = time;
    const progress = time - this.startTime;
    const duration = 6000; //ms
    // console.log(time);
    if (this.model.position) {
      this.model.position.lerp(THREE.Vector3(4, 0.5, 4), progress / duration);
      this.model.lookAt(THREE.Vector3(4, 0.5, 4));
    }
  }
});

document.getElementsByTagName("a-scene")[0].setAttribute("foo", "");
