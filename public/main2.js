/**
 * Created by ELatA on 2014/4/10.
 */
require(['jquery','three','socket.io-client','controls',"threejs-stats","dat.gui","threex.domevents"],function($,THREE,io){

    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
    camera.position.z = 5;
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    var domEvents   = new THREEx.DomEvents(camera, renderer.domElement);
    //var socket = io.connect('ws://localhost:8788');


    var stats = initStats();
    function initStats(){
        var stats = new Stats();
        stats.setMode(0);
        stats.domElement.style.position = 'absolute';
        stats.domElement.style.left = "0px";
        stats.domElement.style.top = "0px";
        $("#Stats-output").append(stats.domElement);
        return stats;
    }

    var gui = new dat.GUI();
    var controls = new function() {
        this.rotationSpeed = 3;
    };
    gui.add(controls,'rotationSpeed',0,10);


    var orbitControls = new THREE.OrbitControls(camera);
    orbitControls.autoRotate = false;
    var clock = new THREE.Clock();

    /*game object*/
    var RotateCube = function(){
        var geometry = new THREE.CubeGeometry(1,1,1);
        var material = new THREE.MeshBasicMaterial({color: Math.random()*0xffffff});
        THREE.Mesh.apply(this, [geometry,material]);
        var cube = this;
        domEvents.addEventListener(cube, 'click', function(event){
            cube.reColor();
        }, false);
        domEvents.addEventListener(cube,'dblclick',function(event){
            cube.delete();
        })
    }
    RotateCube.prototype = Object.create(THREE.Mesh.prototype);
    RotateCube.prototype.constructor = RotateCube;
    RotateCube.prototype.update = function(){
        this.rotation.x += controls.rotationSpeed / 100;
        this.rotation.y += controls.rotationSpeed / 100;
    }
    RotateCube.prototype.rock = function(){
        var cube = this;
        scene.add(cube);
        //socket.emit("add-cube",{uuid:cube.uuid,position:cube.position,color:cube.material.color.getHex()})
    }
    RotateCube.prototype.delete = function(){
        var cube = this;
        scene.remove(cube);
        //socket.emit("delete-cube",{uuid:cube.uuid});
    }
    RotateCube.prototype.reColor = function(){
        var cube = this;
        cube.material.color.setHex(Math.random()*0xffffff);
        //socket.emit("color-cube",{uuid:cube.uuid,color:cube.material.color.getHex()});
    }
    RotateCube.prototype.localRock = function(){
        var cube = this;
        scene.add(cube);
    }
    RotateCube.prototype.localDelete = function(){
        var cube = this;
        scene.remove(cube);
    }
    RotateCube.prototype.localReColor = function(color){
        var cube = this;
        cube.material.color.setHex(color);
    }

    /*game logic*/
    var cube = new RotateCube();
    cube.rock();

    var projector = new THREE.Projector();
    $(document).mousedown(function(event){
        //console.log(event);
        if( event.button == 2 ) {

            var mouse = {};
            mouse.x = (event.clientX / window.innerWidth)*2 -1;
            mouse.y = -(event.clientY / window.innerHeight)*2 + 1;
            var vector = new THREE.Vector3(mouse.x,mouse.y,0.5);
            projector.unprojectVector(vector,camera);

            var cp = camera.position;
            var mp = vector;
            var v = cp.clone().sub(mp);
            var nv = v.normalize();
            var d = nv.multiplyScalar(10);
            mp = cp.clone().sub(d);

            var cube = new RotateCube();
            cube.position.set(mp.x,mp.y,mp.z);
            cube.rock();
        }
    });
    var render = function () {
        requestAnimationFrame(render);
        var delta = new clock.getDelta();
        orbitControls.update(delta);
        stats.update();
        //cube.update();
        var allChildren = scene.children;
        for(var i in allChildren){
            var ob = allChildren[i];
            if(ob instanceof RotateCube){
                ob.update();
            }
        }
        renderer.render(scene, camera);
    };

    render();

    /*server event*/
    // socket.on("add-cube",function(data){
    //     console.log("add-cube",data);
    //     var allChildren = scene.children;
    //     for(var i in allChildren){
    //         var ob = allChildren[i];
    //         if(ob instanceof RotateCube && ob.uuid == data.uuid){
    //             return;
    //         }
    //     }
    //     var cube = new RotateCube();
    //     cube.uuid = data.uuid;
    //     cube.position = data.position;
    //     cube.localReColor(data.color);
    //     cube.localRock();
    // });
    // socket.on("delete-cube",function(data){
    //     console.log("delete-cube",data);
    //     var allChildren = scene.children;
    //     for(var i in allChildren){
    //         var ob = allChildren[i];
    //         if(ob instanceof RotateCube && ob.uuid == data.uuid){
    //             ob.localDelete();
    //         }
    //     }
    // });
    // socket.on("color-cube",function(data){
    //     console.log("color-cube",data);
    //     var allChildren = scene.children;
    //     for(var i in allChildren){
    //         var ob = allChildren[i];
    //         if(ob instanceof RotateCube && ob.uuid == data.uuid){
    //             ob.localReColor(data.color);
    //         }
    //     }
    // });

    // Create a socket instance
var socket = new WebSocket('ws://localhost:8788/');

// Open the socket
socket.onopen = function(event) {

	// Send an initial message
	socket.send('I am the client and I\'m listening!');

	// Listen for messages
	socket.onmessage = function(event) {
		console.log('Client received a message',event);
	};

	// Listen for socket closes
	socket.onclose = function(event) {
		console.log('Client notified socket has closed',event);
	};

	// To close the socket....
	//socket.close()

};
});
