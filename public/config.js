require.config({
  shim: {
    three:{exports:'THREE'}
  },
  paths: {
    three: "components/three.js/three.min",
    "socket.io-client": "components/socket.io-client/dist/socket.io",
    "socket.io": "components/socket.io/index",
    requirejs: "components/requirejs/require",
    jquery: "components/jquery/dist/jquery"
  }
});
