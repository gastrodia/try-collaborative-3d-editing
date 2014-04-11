require.config({
  shim: {
    three: {
      exports: "THREE"
    },
    controls: {
      deps: [
        "three"
      ]
    }
  },
  paths: {
    three: "components/three.js/three.min",
    "socket.io-client": "components/socket.io-client/dist/socket.io",
    "socket.io": "components/socket.io/index",
    requirejs: "components/requirejs/require",
    jquery: "components/jquery/dist/jquery",
    "threejs-stats": "components/threejs-stats/Stats",
    controls: "components/threejs-controls/controls/OrbitControls",
    "dat.gui": "components/dat.gui/dat.gui",
    "threex.domevents": "components/threex.domevents/threex.domevents"
  }
});
