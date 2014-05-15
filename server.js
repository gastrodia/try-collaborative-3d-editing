/**
 * Created by ELatA on 2014/4/10.
 */
var http = require('http');
var path = require('path');
var express = require('express');
var socketio = require('socket.io');

var app = express();
app.use(express.static(path.join(__dirname, 'public')));

var server = http.createServer(app).listen(8788);
// var WebSocketServer = require('ws').Server;
// var wss = new WebSocketServer( { server : server } );
//
// wss.on('connection', function( ws ) {
//   console.log('connection successful!');
//   ws.on('message', function( data, flags ) {
//     console.log(data);
//     //do something here
//   });
//   ws.on('close', function() {
//     console.log('stopping client');
//   });
//   ws.send("123");
// });



var io = socketio.listen(server);
io.sockets.on('connection', function (socket) {

    socket.on('add-cube',function(data){
        console.log(data);
        socket.broadcast.emit("add-cube",data);
    });

    socket.on("delete-cube",function(data){
        console.log(data);
        socket.broadcast.emit("delete-cube",data);
    });

    socket.on("edit-cube",function(data){

    });

    socket.on("color-cube",function(data){
        console.log(data);
        socket.broadcast.emit("color-cube",data);
    });

    socket.on("move-cube",function(data){

    });

    socket.on("active-cube-rotate",function(data){

    });

    socket.on("disable-cube-rotate",function(data){

    });


});
