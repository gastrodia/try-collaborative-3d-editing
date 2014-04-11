/**
 * Created by ELatA on 2014/4/10.
 */
var http = require('http');
var path = require('path');
var express = require('express');
var socketio = require('socket.io');

var app = express();
app.use(express.static(path.join(__dirname, 'public')));

var server = http.createServer(app);
var io = socketio.listen(server);

server.listen(80);



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