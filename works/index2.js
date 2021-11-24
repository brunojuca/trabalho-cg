import * as THREE from  '../build/three.module.js';
import Stats from       '../build/jsm/libs/stats.module.js';
import {GUI} from       '../build/jsm/libs/dat.gui.module.js';
import KeyboardState from '../libs/util/KeyboardState.js';
import {pista1 as pista1} from './pistas/pista1.js';
import {pista2 as pista2} from './pistas/pista2.js';
import Pista from './Pista.js';
import { Car } from './car.js';

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
// Pista Real
//-------------------------------------------------------------------------------

//pista
var pista = new Pista();
var platforms = [];
var blocoSize = 0;

function selecaoPista(pistaescolhida){
    pista.carregaPista(pistaescolhida);
    platforms = [];
    platforms = pista.montaPista();
    for (let i = 0; i < platforms.length; i++) {
        scene.add(platforms[i].bloco);
    }
    blocoSize = platforms[0].LARGURA;
}
selecaoPista(pista1);

function limpaPista(pistaAserRemovida){
    for (let i = 0; i < platforms.length; i++) {
        scene.remove(platforms[i].bloco);
    }
}
//-------------------------------------------------------------------------------
// Setagem dos Checkpoints
//-------------------------------------------------------------------------------

const checkpointRadius = blocoSize;

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

var flags = [];
var flagNumber = 4;
for (var i = 0; i <= flagNumber-1; i++){
    var flag = createPole(1);
    flags.push(flag);
    flags[i].position.set(-20 + 10.0*i, 10.0, 20 + 10.0*i);
    scene.add(flags[i]);
}

var todosCheckpoints = [];
function posicionaCheckpoints(posicionamentoCheckpoints,posicionamentoChegada){
    for(var k = 0; k <= flagNumber-1; k++){
        var checkpoint = createCheckpoint(checkpointRadius);
        todosCheckpoints.push(checkpoint);
        if (k == flagNumber-1){
            todosCheckpoints[k].position.set(posicionamentoChegada[0].getComponent(0), 0.0, posicionamentoChegada[0].getComponent(2));
            scene.add(todosCheckpoints[k]);
            return;
        }
        todosCheckpoints[k].position.set(posicionamentoCheckpoints[flagNumber-2-k].getComponent(0), 0.0, posicionamentoCheckpoints[flagNumber-2-k].getComponent(2));
        scene.add(todosCheckpoints[k]);
    }
}

function encontraPosicaoCheckpoints(){
    var posicaoCheckpoints = [];
    for (var k = 0; k < platforms.length; k ++){
        if(platforms[k].getBlockType() == "CHECKPOINT"){
            var posicaoNova = new THREE.Vector3;
            posicaoNova.copy(platforms[k].bloco.position);
            posicaoCheckpoints.push(posicaoNova);
        }
    }
    return posicaoCheckpoints;
}
//garantir q a posicao da largada vai ser sempre o ultimo checkpoint
function encontraPosicaoChegada(){
    var posicaoChegada = [];
    for (var k = 0; k < platforms.length; k ++){
        if(platforms[k].getBlockType() == "LARGADA"){
            var posicaoNova = new THREE.Vector3;
            posicaoNova.copy(platforms[k].bloco.position);
            posicaoChegada.push(posicaoNova);
        }
    }
    return posicaoChegada;
}
var posicionamentoCheckpoints = encontraPosicaoCheckpoints();
var posicionamentoChegada = encontraPosicaoChegada();
posicionaCheckpoints(posicionamentoCheckpoints,posicionamentoChegada);



//-------------------------------------------------------------------------------
// Carro
//-------------------------------------------------------------------------------

//guia
const radius = 0.5
var guideSphere = createSphere(radius);
guideSphere.position.set(0.0, 0.0, 2*radius);
var posAtual = new THREE.Vector3(guideSphere.position.getComponent(0), radius, guideSphere.position.getComponent(2));
posAtual.copy(guideSphere.position);

//player
const size = 1;
var player = new Car;
player.position.set(posicionamentoChegada[0].getComponent(0), size, posicionamentoChegada[0].getComponent(2));
player.add(guideSphere);

//cria esfera guia
function createSphere(radius)
{
    var guideSphereGeometry = new THREE.SphereGeometry(radius, 32, 32);
    var guideSphereMaterial = new THREE.MeshPhongMaterial( {color:'rgb(255,0,0)'} );
    var guideSphere = new THREE.Mesh( guideSphereGeometry, guideSphereMaterial );
    guideSphere.visible = false;
    return guideSphere;
}



//-------------------------------------------------------------------------------
// Verificação das voltas
//-------------------------------------------------------------------------------

var colidiu1 = false;
var colidiu2 = false;
var colidiu3 = false;
var colidiu4 = false;
var reset = false;
var voltas = 0;

function verificaCheckpoint1(checkpoint, player){
    if (Math.abs(checkpoint.position.getComponent(0) - player.position.getComponent(0)) < checkpointRadius &&
        Math.abs(checkpoint.position.getComponent(2) - player.position.getComponent(2)) < checkpointRadius){
        colidiu1 = true;
        flags[0].material.color.setHex(0x00ff00)
        console.log(colidiu1);
    }
}
function verificaCheckpoint2(checkpoint, player){
    if (Math.abs(checkpoint.position.getComponent(0) - player.position.getComponent(0)) < checkpointRadius &&
        Math.abs(checkpoint.position.getComponent(2) - player.position.getComponent(2)) < checkpointRadius){
        colidiu2 = true;
        flags[1].material.color.setHex(0x00ff00)
        console.log(colidiu2);
    }
}
function verificaCheckpoint3(checkpoint, player){
    if (Math.abs(checkpoint.position.getComponent(0) - player.position.getComponent(0)) < checkpointRadius &&
        Math.abs(checkpoint.position.getComponent(2) - player.position.getComponent(2)) < checkpointRadius){
        colidiu3 = true;
        flags[2].material.color.setHex(0x00ff00)
        console.log(colidiu3);
    }
}

function verificaCheckpoint4(checkpoint, player){
    if (Math.abs(checkpoint.position.getComponent(0) - player.position.getComponent(0)) < checkpointRadius &&
        Math.abs(checkpoint.position.getComponent(2) - player.position.getComponent(2)) < checkpointRadius){
        colidiu4 = true;
        flags[3].material.color.setHex(0x00ff00)
        console.log(colidiu4);
    }
}

function resetaVoltaAtual(){
    colidiu1 = reset;
    flags[0].material.color.setHex(0xff0000)
    colidiu2 = reset;
    flags[1].material.color.setHex(0xff0000)
    colidiu3 = reset;
    flags[2].material.color.setHex(0xff0000)
    colidiu4 = reset;
    flags[3].material.color.setHex(0xff0000)
}

function verificaVoltas(player)
{
    if (colidiu1){
        if (colidiu2){
            if (colidiu3){
                if (colidiu4){
                    voltas += 1;
                    resetaVoltaAtual();
                    console.log(voltas);
                    armazenaTempoVolta(voltas);
                }
                else {
                    verificaCheckpoint4(todosCheckpoints[3], player);
                }
            }
            else {
                verificaCheckpoint3(todosCheckpoints[2], player);
            }
        }
        else {
            verificaCheckpoint2(todosCheckpoints[1], player);
        }
    }
    else {
        verificaCheckpoint1(todosCheckpoints[0], player);
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
// Movimentação e Verificação de Saiu Pista
//-------------------------------------------------------------------------------

//animation control
var carroAcelerando = false; // control if animation is on or of
var carroFreiando = false; // control if animation is on or of

//acelera e freia o carro
function aceleraCarro(aceleracaoAnterior)
{
    if(carroAcelerando){
        if(aceleracao < 70){
            aceleracao += aceleracaoAnterior*dt;
        }
    }
    else if(!carroAcelerando){
        if (aceleracao > 20){
            aceleracao -= 2*aceleracaoAnterior*dt;
            player.accelerate(aceleracao/100);
        }
    }
    //console.log(aceleracao);
    aceleracaoAnterior = aceleracao
}

function freiaCarro(freiaAnterior)
{
    if(carroFreiando){
        if(freia > -70){
            freia += freiaAnterior*dt;
        }
    }
    else if(!carroFreiando){
        if (freia < -20 ){
            freia -= 2*freiaAnterior*dt;
            player.accelerate(freia/100);
        }
    }
    //console.log(freia);
    freiaAnterior = freia
}
var diffX = 0;
var diffZ = 0;
function verificaDesaceleraFora(){
    testaRedutor();
    for (var k = 0; k < platforms.length; k ++){
        diffX = Math.abs(player.position.getComponent(0) - platforms[k].bloco.position.getComponent(0));
        diffZ = Math.abs(player.position.getComponent(2) - platforms[k].bloco.position.getComponent(2));
        if( diffX <= blocoSize/2 && diffZ <= blocoSize/2 ){
            redutor = 1;
            return;
        }
    }
    redutor = 0.5;
}

var flagRedutor = createPole(size);
var flagRedutor2 = createPole(size);
flagRedutor.position.set(-0.7, 2*size, -0.5);
flagRedutor2.position.set(0.7, 2*size, -0.5);

player.add(flagRedutor);
player.add(flagRedutor2);

function testaRedutor(){
    if (redutor == 1){
        flagRedutor.material.color.setHex(0xfada5e);
        flagRedutor2.material.color.setHex(0xfada5e);
    }
    else{
        flagRedutor.material.color.setHex(0x0000ff);
        flagRedutor2.material.color.setHex(0x0000ff);
    }
}

var keyboard = new KeyboardState();
var Speed = 10;
var aceleracao = 20;
var freia = -20;
var redutor = 1;
var speedForward = 0;
var speedBackward = 0;

function keyboardUpdate() {
    keyboard.update();

    if (keyboard.pressed("X")){
        carroAcelerando = true;
        speedForward = (Speed*dt + aceleracao/100)*redutor;
        //console.log(speedForward);
        player.accelerate(speedForward);
    }
    else if (keyboard.up("X")) {
        carroAcelerando = false;
    }

    if(keyboard.pressed("down")) {
        carroFreiando = true
        speedBackward = (-Speed*dt + freia/100)*redutor;
        //console.log(speedBackward);
        player.accelerate(speedBackward);
    }
    else if (keyboard.up("down")) {
        carroFreiando = false
    }

    if (keyboard.pressed("left")) {
        player.turnLeft(5);
    }
    else if (keyboard.pressed("right")) {
        player.turnRight(5);
    }

    if (keyboard.pressed("1")){
        limpaPista(pista2);
        selecaoPista(pista1);
        resetaVoltaAtual();
        voltas = 0;
        player.position.set(posicionamentoChegada[0].getComponent(0), size, posicionamentoChegada[0].getComponent(2));
        player.lookAt(0,0,100000)
    }
    if (keyboard.pressed("2")){
        limpaPista(pista1);
        selecaoPista(pista2);
        resetaVoltaAtual();
        voltas = 0;
        player.position.set(posicionamentoChegada[0].getComponent(0), size, posicionamentoChegada[0].getComponent(2));
        player.lookAt(0,0,100000)
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