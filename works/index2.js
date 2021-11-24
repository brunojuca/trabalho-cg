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


//-------------------------------------------------------------------------------
// Carro de teste
//-------------------------------------------------------------------------------
//sphere
const radius = 0.5
var sphere = createSphere(radius);
sphere.position.set(0.0, 0.0, 2*radius);
var posAtual = new THREE.Vector3(sphere.position.getComponent(0), radius, sphere.position.getComponent(2));
posAtual.copy(sphere.position);
//player
const size = 1;
var player = createplayer(size);
player.position.set(0.0, size/2, 0.0);
player.add(sphere);

//cria esfera
function createSphere(radius)
{
    var sphereGeometry = new THREE.SphereGeometry(radius, 32, 32);
    var sphereMaterial = new THREE.MeshPhongMaterial( {color:'rgb(255,0,0)'} );
    var sphere = new THREE.Mesh( sphereGeometry, sphereMaterial );
    return sphere;
}
//cria cubo
function createplayer(size)
{
    var playerGeometry = new THREE.BoxGeometry(size, size, size);
    var playerMaterial = new THREE.MeshPhongMaterial( {color:'rgb(0,255,255)'} );
    var player = new THREE.Mesh( playerGeometry, playerMaterial );
    return player;
}

//-------------------------------------------------------------------------------
// Pista de teste
//-------------------------------------------------------------------------------

//plataforma
const platformSize = 10;
var platforms = [];
var numPlatforms = 100;
for (var i = 0; i <= numPlatforms; i++){
    var platform = createPlatform(platformSize);
    platforms.push(platform);
    platforms[i].position.set(40.0*Math.sin(i), -platformSize/2, 40+40.0*Math.cos(i));
    scene.add(platforms[i]);
}

//cria plataforma
function createPlatform(size)
{
    var platformGeometry = new THREE.BoxGeometry(platformSize, platformSize, platformSize);
    var platformMaterial = new THREE.MeshPhongMaterial( {color:'rgb(255,255,255)'} );
    var platform = new THREE.Mesh( platformGeometry, platformMaterial );
    return platform;
}

//-------------------------------------------------------------------------------
// Checkpoints
//-------------------------------------------------------------------------------

var checkpointRadius = platformSize;

//cria checkpoint
function createCheckpoint(checkpointRadius)
{
    var checkpointGeometry = new THREE.SphereGeometry(checkpointRadius, 32, 32);
    var checkpointMaterial = new THREE.MeshPhongMaterial( {color:'rgb(255,255,255)'} );
    var checkpoint = new THREE.Mesh( checkpointGeometry, checkpointMaterial );
    checkpoint.visible = false;
    return checkpoint;
}

//cria pole
function createPole(size)
{
    var flagGeometry = new THREE.BoxGeometry(size, 2*size, size);
    var flagMaterial = new THREE.MeshPhongMaterial( {color:'rgb(255,0,0)'} );
    var flag = new THREE.Mesh( flagGeometry, flagMaterial );
    return flag;
}

//checkpoint
var checkpoint1 = createCheckpoint(checkpointRadius);
checkpoint1.position.set(0.0, 0.0, 0.0);
scene.add(checkpoint1);

//checkpoint
var checkpoint2 = createCheckpoint(checkpointRadius);
checkpoint2.position.set(40.0, 0.0, 40.0);
scene.add(checkpoint2);

//checkpoint
var checkpoint3 = createCheckpoint(checkpointRadius);
checkpoint3.position.set(0.0, 0.0, 80.0);
scene.add(checkpoint3);

//checkpoint
var checkpoint4 = createCheckpoint(checkpointRadius);
checkpoint4.position.set(-40.0, 0.0, 40.0);
scene.add(checkpoint4);

var flags = [];
var flagNumber = 4;
for (var i = 0; i <= flagNumber-1; i++){
    var flag = createPole(size);
    flags.push(flag);
    flags[i].position.set(-20 + 10.0*i, 10.0, 20 + 10.0*i);
    scene.add(flags[i]);
}

var colidiu1 = false;
var colidiu2 = false;
var colidiu3 = false;
var colidiu4 = false;
var reset = false;
var voltas = 0;

function verificaCheckpoint1(checkpoint, player){
    if (Math.abs(checkpoint.position.getComponent(0) - player.position.getComponent(0)) < 5*radius &&
        Math.abs(checkpoint.position.getComponent(2) - player.position.getComponent(2)) < 5*radius){
        colidiu1 = true;
        flags[0].material.color.setHex(0x00ff00)
        console.log(colidiu1);
    }
}
function verificaCheckpoint2(checkpoint, player){
    if (Math.abs(checkpoint.position.getComponent(0) - player.position.getComponent(0)) < 5*radius &&
        Math.abs(checkpoint.position.getComponent(2) - player.position.getComponent(2)) < 5*radius){
        colidiu2 = true;
        flags[1].material.color.setHex(0x00ff00)
        console.log(colidiu2);
    }
}
function verificaCheckpoint3(checkpoint, player){
    if (Math.abs(checkpoint.position.getComponent(0) - player.position.getComponent(0)) < 5*radius &&
        Math.abs(checkpoint.position.getComponent(2) - player.position.getComponent(2)) < 5*radius){
        colidiu3 = true;
        flags[2].material.color.setHex(0x00ff00)
        console.log(colidiu3);
    }
}

function verificaCheckpoint4(checkpoint, player){
    if (Math.abs(checkpoint.position.getComponent(0) - player.position.getComponent(0)) < 5*radius &&
        Math.abs(checkpoint.position.getComponent(2) - player.position.getComponent(2)) < 5*radius){
        colidiu4 = true;
        flags[3].material.color.setHex(0x00ff00)
        console.log(colidiu4);
    }
}

function verificaVoltas(player)
{
    if (colidiu1){
        if (colidiu2){
            if (colidiu3){
                if (colidiu4){
                    voltas += 1;
                    colidiu1 = reset;
                    flags[0].material.color.setHex(0xff0000)
                    colidiu2 = reset;
                    flags[1].material.color.setHex(0xff0000)
                    colidiu3 = reset;
                    flags[2].material.color.setHex(0xff0000)
                    colidiu4 = reset;
                    flags[3].material.color.setHex(0xff0000)
                    console.log(voltas);
                    armazenaTempoVolta(voltas);
                }
                else {
                    verificaCheckpoint4(checkpoint4, player);
                }
            }
            else {
                verificaCheckpoint3(checkpoint3, player);
            }
        }
        else {
            verificaCheckpoint2(checkpoint2, player);
        }
    }
    else {
        verificaCheckpoint1(checkpoint1, player);
    }
}

var tempoTodasVoltas = [];

function armazenaTempoVolta(){
    if (voltas == 1){
        var tempoVolta1 = anterior/1000;
        tempoTodasVoltas.push(tempoVolta1);
    }
    if (voltas == 2){
        var tempoVolta2 = anterior/1000 - tempoTodasVoltas[0];
        tempoTodasVoltas.push(tempoVolta2);
    }
    if (voltas == 3){
        var tempoVolta3 = anterior/1000 - tempoTodasVoltas[1];
        tempoTodasVoltas.push(tempoVolta3);
    }
    if (voltas == 4){
        var tempoVolta4 = anterior/1000 - tempoTodasVoltas[2];
        tempoTodasVoltas.push(tempoVolta4);
    }
}

//-------------------------------------------------------------------------------
// Camera
//-------------------------------------------------------------------------------
var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
var cameraHolder = new THREE.Object3D();
cameraHolder.add(camera);
cameraHolder.position.set(-50, 20, 0);
cameraHolder.lookAt(posAtual)
cameraHolder.rotateY(degreesToRadians(180))
player.add(cameraHolder);

scene.add(player);
scene.add(cameraHolder);



//-------------------------------------------------------------------------------
// Virtual camera - minimapa (se alguem conseguir descobrir pq a virtualCamera ta mostrando a normal)
//-------------------------------------------------------------------------------
var lookAtVec   = new THREE.Vector3( 0.0, 0.0, 0.0 );
var camPosition = new THREE.Vector3( 0.0, 2.2, 0.0 );
var vcWidth = 200;
var vcHeidth = 200;
var virtualCamera = new THREE.PerspectiveCamera(45, vcWidth/vcHeidth, 1.0, 20.0);
  virtualCamera.position.copy(camPosition);
  virtualCamera.lookAt(lookAtVec);

scene.add(virtualCamera);



//-------------------------------------------------------------------------------
// Movimentação
//-------------------------------------------------------------------------------

//animation control
var carroAcelerando = false; // control if animation is on or of
var carroFreiando = false; // control if animation is on or of

//acelera e freia o carro
function aceleraCarro(aceleracaoAnterior)
{
    if(carroAcelerando){
        if(aceleracao < 200){
            aceleracao += aceleracaoAnterior*dt;
        }
    }
    else if(!carroAcelerando){
        if (aceleracao > 50){
            aceleracao -= 2*aceleracaoAnterior*dt;
            player.translateZ(aceleracao/100);

        }
    }
    //console.log(aceleracao);
    aceleracaoAnterior = aceleracao
}

function freiaCarro(freiaAnterior)
{
    if(carroFreiando){
        if(freia > -200){
            freia += freiaAnterior*dt;
        }
    }
    else if(!carroFreiando){
        if (freia < -50 ){
            freia -= 2*freiaAnterior*dt;
            player.translateZ(freia/100);
        }
    }
    //console.log(freia);
    freiaAnterior = freia
}
var diffX = 0;
var diffZ = 0;
function verificaDesaceleraFora(){
    testaRedutor();
    for (var k = 0; k <= numPlatforms; k ++){
        diffX = Math.abs(player.position.getComponent(0) - platforms[k].position.getComponent(0));
        diffZ = Math.abs(player.position.getComponent(2) - platforms[k].position.getComponent(2));
        if( diffX <= platformSize/2 && diffZ <= platformSize/2 ){
            redutor = 1;
            return;
        }
    }
    redutor = 0.5;
}

var flagRedutor = createPole(size);
flagRedutor.position.set(0.0,4*size,0.0);
player.add(flagRedutor);

function testaRedutor(){
    if (redutor == 1){
        flagRedutor.material.color.setHex(0xff0000);
    }
    else{
        flagRedutor.material.color.setHex(0x0000ff);
    }
}

var keyboard = new KeyboardState();
var Speed = 10;
var aceleracao = 50;
var freia = -50;
var redutor = 1;
var speedForward = 0;
var speedBackward = 0;

function keyboardUpdate() {
    keyboard.update();

    if (keyboard.pressed("X")){
        carroAcelerando = true;
        speedForward = (Speed*dt + aceleracao/100)*redutor;
        console.log(speedForward);
        player.translateZ(speedForward);
    }
    else if (keyboard.up("X")) {
        carroAcelerando = false;
    }

    if(keyboard.pressed("down")) {
        carroFreiando = true
        speedBackward = (-Speed*dt + freia/100)*redutor;
        console.log(speedBackward);
        player.translateZ(speedBackward);
    }
    else if (keyboard.up("down")) {
        carroFreiando = false
    }

    if (keyboard.pressed("left")) {
        player.rotateY(degreesToRadians(5));
    }
    else if (keyboard.pressed("right")) {
        player.rotateY(degreesToRadians(-5));
    }
}



//-------------------------------------------------------------------------------
// Ambiente - Eixos e Plano
//-------------------------------------------------------------------------------

// Show axes (parameter is size of each axis)
var axesHelper = new THREE.AxesHelper( 12 );
scene.add( axesHelper );

// create the ground plane
const planeSize = 800
var plane = createGroundPlaneWired(planeSize, planeSize, 80, 80);
// add the plane to the scene
scene.add(plane);



//-------------------------------------------------------------------------------
// Status da Partida
//-------------------------------------------------------------------------------
var gerou = false;
function geraStatusFinal(){
    var textoVoltas = document.createElement('div');
    textoVoltas.style.position = 'absolute';
    textoVoltas.style.backgroundColor = "white";
    textoVoltas.innerHTML = "Voltas: ";
    textoVoltas.style.top = 0 + 'px';
    textoVoltas.style.left = window.innerWidth - 54 + 'px';
    document.body.appendChild(textoVoltas);

    var nDeVoltas = document.createElement('div');
    nDeVoltas.style.position = 'absolute';
    nDeVoltas.style.backgroundColor = "white";
    nDeVoltas.innerHTML = voltas;
    nDeVoltas.style.top = 0 + 'px';
    nDeVoltas.style.left = window.innerWidth - 10 + 'px';
    document.body.appendChild(nDeVoltas)

    var tempoTotal = document.createElement('div');
    tempoTotal.style.position = 'absolute';
    tempoTotal.style.backgroundColor = "white";
    tempoTotal.innerHTML = anterior/1000;
    tempoTotal.style.top = 19 + 'px';
    tempoTotal.style.left = window.innerWidth - 100 + 'px';
    document.body.appendChild(tempoTotal);

    var textotempoVolta1 = document.createElement('div');
    textotempoVolta1.style.position = 'absolute';
    textotempoVolta1.style.backgroundColor = "white";
    textotempoVolta1.innerHTML = tempoTodasVoltas[0];
    textotempoVolta1.style.top = 39 + 'px';
    textotempoVolta1.style.left = window.innerWidth - 100 + 'px';
    document.body.appendChild(textotempoVolta1);

    var textotempoVolta2 = document.createElement('div');
    textotempoVolta2.style.position = 'absolute';
    textotempoVolta2.style.backgroundColor = "white";
    textotempoVolta2.innerHTML = tempoTodasVoltas[1];
    textotempoVolta2.style.top = 59 + 'px';
    textotempoVolta2.style.left = window.innerWidth - 100 + 'px';
    document.body.appendChild(textotempoVolta2);

    var textotempoVolta3 = document.createElement('div');
    textotempoVolta3.style.position = 'absolute';
    textotempoVolta3.style.backgroundColor = "white";
    textotempoVolta3.innerHTML = tempoTodasVoltas[2];
    textotempoVolta3.style.top = 79 + 'px';
    textotempoVolta3.style.left = window.innerWidth - 100 + 'px';
    document.body.appendChild(textotempoVolta3);

    var textotempoVolta4 = document.createElement('div');
    textotempoVolta4.style.position = 'absolute';
    textotempoVolta4.style.backgroundColor = "white";
    textotempoVolta4.innerHTML = tempoTodasVoltas[3];
    textotempoVolta4.style.top = 99 + 'px';
    textotempoVolta4.style.left = window.innerWidth - 100 + 'px';
    document.body.appendChild(textotempoVolta4);

    gerou = true
}


//-------------------------------------------------------------------------------
// Render
//-------------------------------------------------------------------------------

var dt, anterior = 0;

render();

function controlledRender()
{
  var width = window.innerWidth;
  var height = window.innerHeight;

  // Set main viewport
  renderer.setViewport(0, 0, width, height); // Reset viewport
  renderer.setScissorTest(false); // Disable scissor to paint the entire window
  renderer.setClearColor("rgb(80, 70, 170)");
  renderer.clear();   // Clean the window
  renderer.render(scene, camera);

  // Set virtual camera viewport
  var offset = 30;
  renderer.setViewport(offset, height-vcHeidth-offset, vcWidth, vcHeidth);  // Set virtual camera viewport
  renderer.setScissor(offset, height-vcHeidth-offset, vcWidth, vcHeidth); // Set scissor with the same size as the viewport
  renderer.setScissorTest(true); // Enable scissor to paint only the scissor are (i.e., the small viewport)
  renderer.setClearColor("rgb(60, 50, 150)");  // Use a darker clear color in the small viewport
  renderer.render(scene, virtualCamera);  // Render scene of the virtual camera
}

function render(t)
{
  stats.update(); // Update FPS
  requestAnimationFrame(render);
  //trackballControls.update();
  keyboardUpdate();

  verificaDesaceleraFora();
  aceleraCarro(aceleracao);
  freiaCarro(freia);
  verificaVoltas(player);
  posAtual.copy(player.position);
  cameraHolder.lookAt(posAtual)
  cameraHolder.rotateY(degreesToRadians(180))

  dt = (t - anterior) / 1000;
  anterior = t;
  if(voltas >= flagNumber && gerou == false){
      geraStatusFinal();
  }
  controlledRender(t);
  renderer.render(scene, camera) // Render scene
}