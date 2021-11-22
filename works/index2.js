import * as THREE from  '../build/three.module.js';
import Stats from       '../build/jsm/libs/stats.module.js';
import {GUI} from       '../build/jsm/libs/dat.gui.module.js';
import KeyboardState from '../libs/util/KeyboardState.js';
//import {TrackballControls} from '../build/jsm/controls/TrackballControls.js';
import {initRenderer,
        initCamera,
        InfoBox,
        onWindowResize,
        degreesToRadians,
        createGroundPlaneWired,
        initDefaultBasicLight} from "../libs/util/util.js";

var stats = new Stats();          // To show FPS information
var scene = new THREE.Scene();    // Create main scene
var renderer = initRenderer();    // View function in util/utils

//camera
var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.lookAt(0, 0, 0);
  camera.position.set(0, 0, 0);
  camera.up.set( 0, 5, 0 );

var cameraHolder = new THREE.Object3D();
cameraHolder.add(camera);
cameraHolder.position.set(0, 10, 30);
scene.add(cameraHolder);

//light
initDefaultBasicLight(scene, true);

// Listen window size changes
window.addEventListener('resize', function(){onWindowResize(camera, renderer)}, false );

//variaveis
//var trackballControls = new TrackballControls(camera, renderer.domElement );

var keyboard = new KeyboardState();
var pos = new THREE.Vector3(0,0,0);

//sphere
const radius = 1
var sphere = createSphere(radius);
sphere.position.set(0.0, 0.0, 2*radius);
var posAtual = new THREE.Vector3(sphere.position.getComponent(0), radius, sphere.position.getComponent(2));
posAtual.copy(sphere.position);

//cube
const size = 2;
var cube = createCube(size);
cube.position.set(0.0, size/2, 0.0);
cube.add(sphere);

//animation control
var carroAcelerando = false; // control if animation is on or of

//cria esfera
function createSphere(radius)
{
  var sphereGeometry = new THREE.SphereGeometry(radius, 32, 32);
  var sphereMaterial = new THREE.MeshPhongMaterial( {color:'rgb(255,0,0)'} );
  var sphere = new THREE.Mesh( sphereGeometry, sphereMaterial );
  return sphere;
}

//cria cubo
function createCube(size)
{
  var cubeGeometry = new THREE.BoxGeometry(size, size, size);
  var cubeMaterial = new THREE.MeshPhongMaterial( {color:'rgb(0,255,255)'} );
  var cube = new THREE.Mesh( cubeGeometry, cubeMaterial );
  return cube;
}

var camera = initCamera(new THREE.Vector3(0, 0, 0)); // Init camera in this position
var cameraHolder = new THREE.Object3D();
cameraHolder.add(camera);
cameraHolder.position.set(-50, 20, 0);
cameraHolder.lookAt(posAtual)
cameraHolder.rotateY(degreesToRadians(180))
cube.add(cameraHolder);

scene.add(cube);
scene.add(cameraHolder);

//acelera e freia o carro
function aceleraCarro(aceleracaoAnterior)
{
    if(carroAcelerando){
        aceleracao += aceleracaoAnterior*dt;
    }
    else if(!carroAcelerando){
        if (aceleracao > 100){
            aceleracao -= 2*aceleracaoAnterior*dt;
            cube.translateZ(aceleracao/100);

        }
    }
    console.log(aceleracao);
    aceleracaoAnterior = aceleracao
}

var Speed = 50;
var aceleracao = 100;
function keyboardUpdate() {
    keyboard.update();

    if (keyboard.pressed("X")){
        carroAcelerando = true
        console.log(carroAcelerando);
        cube.translateZ(Speed*dt + aceleracao/100);
    }

    else if (keyboard.up("X")) {
        carroAcelerando = false
        console.log(carroAcelerando);
    }

    else if(keyboard.pressed("down")) {
        carroAcelerando = false;
    }

    if (keyboard.pressed("left")) {
        cube.rotateY(degreesToRadians(2));
    }
    else if (keyboard.pressed("right")) {
        cube.rotateY(degreesToRadians(-2));
    }
}

// Show axes (parameter is size of each axis)
var axesHelper = new THREE.AxesHelper( 12 );
scene.add( axesHelper );

// create the ground plane
const planeSize = 800
var plane = createGroundPlaneWired(planeSize, planeSize, 80, 80);
// add the plane to the scene
scene.add(plane);

var dt, anterior = 0;
render();

function render(t)
{
  stats.update(); // Update FPS
  requestAnimationFrame(render);
  //trackballControls.update();
  keyboardUpdate();
  aceleraCarro(aceleracao);
  posAtual.copy(cube.position);
  cameraHolder.lookAt(posAtual)

  dt = (t - anterior) / 1000;
  anterior = t;

  cameraHolder.rotateY(degreesToRadians(180))
  renderer.render(scene, camera) // Render scene
}