import * as THREE from  '../build/three.module.js';
import Stats from       '../build/jsm/libs/stats.module.js';
import {GUI} from       '../build/jsm/libs/dat.gui.module.js';
import KeyboardState from '../libs/util/KeyboardState.js';
import {pista1 as pista1} from './pistas/pista1.js';
import {pista2 as pista2} from './pistas/pista2.js';
import Pista from './Pista.js';
import { Car } from './Car.js';
import {assetsManager} from './assetsManager.js';

//import {TrackballControls} from '../build/jsm/controls/TrackballControls.js';
import {initRenderer,
        initCamera,
        InfoBox,
        onWindowResize,
        degreesToRadians,
        createGroundPlaneWired,
        initDefaultBasicLight} from "../libs/util/util.js";

const loader = new THREE.TextureLoader();
const groundTexture = loader.load( 'texture/grass.jpg' );
const skyTexture = loader.load( 'texture/sky.jpg' );
const skyTextureSecret = loader.load( 'texture/coconutMall.jpg' );
const flagTexture = loader.load( 'texture/coconutFlagPole.png' );

var assetsMng = new assetsManager();
assetsMng.loadAudio("coconutMall", "./assets/coconutMall.mp3");
assetsMng.loadAudio("startRace", "./assets/startRace.mp3");
assetsMng.loadAudio("winRace", "./assets/winRace.mp3");

var stats = new Stats();          // To show FPS information
var scene = new THREE.Scene();    // Create main scene
var renderer = initRenderer();    // View function in util/utils
scene.background = skyTexture;

//camera
var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.lookAt(0, 0, 0);
  camera.position.set(0, 0, 0);
  camera.up.set( 0, 10, 0 );
  camera.fov = 20;

//light
initDefaultBasicLight(scene, true);

// Listen window size changes
window.addEventListener('resize', function(){onWindowResize(camera, renderer)}, false );



//-------------------------------------------------------------------------------
// Ambiente - Eixos e Plano
//-------------------------------------------------------------------------------

groundTexture.wrapS = groundTexture.wrapT = THREE.RepeatWrapping;
groundTexture.repeat.set( 1000, 1000 );
groundTexture.anisotropy = 16;
var groundMaterial = new THREE.MeshStandardMaterial( { map: groundTexture } );
//var plane = createGroundPlaneWired(1500, 1500, 80, 80);
var plane = new THREE.Mesh( new THREE.PlaneBufferGeometry( 10000, 10000 ), groundMaterial );
plane.position.y = 0.0;
plane.rotation.x = - Math.PI / 2;
plane.position.y = 0.0;
scene.add(plane);



//-------------------------------------------------------------------------------
// Pista Real
//-------------------------------------------------------------------------------

//pista
var pista = new Pista();
var platforms = [];
var blocoSize = 0;
var pistaAtual = 1;

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
    var poleGeometry = new THREE.BoxGeometry(size, 2*size, size);
    var poleMaterial = new THREE.MeshStandardMaterial( { map: flagTexture } );
    var pole = new THREE.Mesh( poleGeometry, poleMaterial );
    return pole;
}

function createPoleTop(size)
{
    var flagtopGeometry = new THREE.BoxGeometry(blocoSize+2*size, size, size);
    var flagtopMaterial = new THREE.MeshStandardMaterial( { map: flagTexture } );
    var flagtop = new THREE.Mesh( flagtopGeometry, flagtopMaterial );
    return flagtop;
}

const size = 1;
var flags = [];
var flagNumber = 4;
for (var i = 0; i <= flagNumber-1; i++){
    var flag = createPole(size/2);
    flags.push(flag);
    scene.add(flags[i]);
}
var flags2 = [];
for(var j = 0; j <= flagNumber-1; j++){
    var newFlag2 = flags[j].clone();
    flags2.push(newFlag2);
    scene.add(flags2[j]);
}
var flagTop = createPoleTop(size);
scene.add(flagTop);

var todosCheckpoints = [];
function posicionaCheckpoints(posicionamentoCheckpoints,posicionamentoChegada){
    for(var k = 0; k <= flagNumber-1; k++){
        var checkpoint = createCheckpoint(checkpointRadius);
        todosCheckpoints.push(checkpoint);
        if (k == flagNumber-1){
            todosCheckpoints[k].position.set(posicionamentoChegada[0].getComponent(0), 0.0, posicionamentoChegada[0].getComponent(2));
            flagTop.position.set(posicionamentoChegada[0].getComponent(0), 5*size, posicionamentoChegada[0].getComponent(2));
            for (var i = 0; i <= flagNumber-1; i++){
                flags[i].position.set(posicionamentoChegada[0].getComponent(0)-blocoSize/2, size+size*i, posicionamentoChegada[0].getComponent(2));
                flags2[i].position.set(posicionamentoChegada[0].getComponent(0)+blocoSize/2, size+size*i, posicionamentoChegada[0].getComponent(2));
            }
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
const radius = 1

//ghost guia
const desvio = 10;
var ghostguide = createSphere(radius);
ghostguide.position.set(0.0, 0.0, 2*radius + desvio);

//player
var player = new Car;
player.scale.set(0.1,0.1,0.1);
player.position.set(posicionamentoChegada[0].getComponent(0), size, posicionamentoChegada[0].getComponent(2));
player.add(ghostguide);
//player.add(target);

var posAtual = new THREE.Vector3(0, 0, 0);
posAtual.set(player.position.getComponent(0), player.position.getComponent(1), player.position.getComponent(2));

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
        flags[0].material.color.setHex(0x00ff00);
    }
}
function verificaCheckpoint2(checkpoint, player){
    if (Math.abs(checkpoint.position.getComponent(0) - player.position.getComponent(0)) < checkpointRadius &&
        Math.abs(checkpoint.position.getComponent(2) - player.position.getComponent(2)) < checkpointRadius){
        colidiu2 = true;
        flags[1].material.color.setHex(0x00ff00);
    }
}
function verificaCheckpoint3(checkpoint, player){
    if (Math.abs(checkpoint.position.getComponent(0) - player.position.getComponent(0)) < checkpointRadius &&
        Math.abs(checkpoint.position.getComponent(2) - player.position.getComponent(2)) < checkpointRadius){
        colidiu3 = true;
        flags[2].material.color.setHex(0x00ff00);
    }
}

function verificaCheckpoint4(checkpoint, player){
    if (Math.abs(checkpoint.position.getComponent(0) - player.position.getComponent(0)) < checkpointRadius &&
        Math.abs(checkpoint.position.getComponent(2) - player.position.getComponent(2)) < checkpointRadius){
        colidiu4 = true;
        flags[3].material.color.setHex(0x00ff00)
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
        var tempoVolta1 = anterior/1000 - tempoJogoAnterior;
        tempoTodasVoltas.push(tempoVolta1);
    }
    if (voltas == 2){
        var tempoVolta2 = anterior/1000 - tempoTodasVoltas[0] - tempoJogoAnterior;
        tempoTodasVoltas.push(tempoVolta2);
    }
    if (voltas == 3){
        var tempoVolta3 = anterior/1000 - tempoTodasVoltas[0] - tempoTodasVoltas[1] - tempoJogoAnterior;
        tempoTodasVoltas.push(tempoVolta3);
    }
    if (voltas == 4){
        var tempoVolta4 = anterior/1000 - tempoTodasVoltas[0] - tempoTodasVoltas[1] - tempoTodasVoltas[2] - tempoJogoAnterior;
        tempoTodasVoltas.push(tempoVolta4);
    }
}



//-------------------------------------------------------------------------------
// Camera
//-------------------------------------------------------------------------------
//camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
var cameraHolder = new THREE.Object3D();
cameraHolder.add(camera);
cameraHolder.position.set(60, 20, 0);
cameraHolder.lookAt(posAtual)
cameraHolder.rotateY(degreesToRadians(180))
//player.add(cameraHolder);

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
        if(aceleracao < 30){
            aceleracao += redutor*aceleracaoAnterior/100;
        }
    }
    else if(!carroAcelerando){
        if (aceleracao > 1 && speedForward > 0){
            aceleracao -= redutor*aceleracaoAnterior*dt;
            player.accelerate(aceleracao/100);
        }
    }
    aceleracaoAnterior = aceleracao
}

function freiaCarro(freiaAnterior)
{
    if(carroFreiando){
        if(freia > -30){
            freia += redutor*freiaAnterior/100;
        }
    }
    else if(!carroFreiando){
        if (freia < -1){
            freia -= redutor*freiaAnterior/100;
            player.accelerate(freia/100);
        }
    }
    freiaAnterior = freia
}
var diffX = 0;
var diffZ = 0;
function verificaDesaceleraFora(){
    console.log(redutor);
    testaRedutor();
    for (var k = 0; k < platforms.length; k ++){
        diffX = Math.abs(player.position.getComponent(0) - platforms[k].bloco.position.getComponent(0));
        diffZ = Math.abs(player.position.getComponent(2) - platforms[k].bloco.position.getComponent(2));
        if( diffX <= blocoSize/2 && diffZ <= blocoSize/2){
            if (redutor < 1){
                redutor += 0.005;
            }
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
        flagRedutor.material.color.setHex(0x000000);
        flagRedutor2.material.color.setHex(0x000000);
    }
}

var keyboard = new KeyboardState();
var Speed = 5;
var aceleracao = 1;
var freia = -1;
var redutor = 1;
var speedForward = 0;
var speedBackward = 0;
var tempoJogoAnterior = 0;

function keyboardUpdate() {
    keyboard.update();

    if (keyboard.pressed("X")){
        carroAcelerando = true;
        speedForward = (Speed/100 + aceleracao/100)*redutor;
        //evita bug ao sair da pag pelos cálculos que continuam sendo feitos em segundo plano no browser
        if(speedForward < -0.01){
            speedForward = 1;
            aceleracao = 1;
        }
        player.accelerate(speedForward);
        player.defaultUpdate();
    }
    else if (keyboard.up("X")) {
        carroAcelerando = false;
        player.defaultUpdate();
    }

    if(keyboard.pressed("down")) {
        carroFreiando = true
        speedBackward = (-Speed/100 + freia/100)*redutor;
        //evita bug ao sair da pag pelos cálculos que continuam sendo feitos em segundo plano no browser
        if(speedBackward > 0.01){
            speedBackward = -1;
            aceleracao = 1;
        }
        player.accelerate(speedBackward);
        player.defaultUpdate();
    }
    else if (keyboard.up("down")) {
        carroFreiando = false
        player.defaultUpdate();
    }

    if (keyboard.pressed("left")) {
        if(aceleracao > 1 || freia < -1){
            player.turnLeft(5);
        }
    }
    else if (keyboard.pressed("right")) {
        if(aceleracao > 1 || freia < -1){
            player.turnRight(5);
        }
    }

    if (keyboard.pressed("1") && pistaAtual != 1){
        pistaAtual = 1;
        limpaPista(pista2);
        selecaoPista(pista1);
        resetaVoltaAtual();
        voltas = 0;

        aceleracao = 1;
        freia = -1;
        speedBackward = 0;
        speedForward = 0;
        tempoTodasVoltas = [];
        tempoJogoAnterior = anterior/1000;

        gerou = false;

        player.position.set(posicionamentoChegada[0].getComponent(0), size, posicionamentoChegada[0].getComponent(2));
        player.lookAt(0,0,100000)
    }
    if (keyboard.pressed("2") && pistaAtual != 2){
        pistaAtual = 2;
        limpaPista(pista1);
        selecaoPista(pista2);
        resetaVoltaAtual();
        voltas = 0;

        aceleracao = 1;
        freia = -1;
        speedBackward = 0;
        speedForward = 0;
        tempoTodasVoltas = [];
        tempoJogoAnterior = anterior/1000;

        gerou = false;

        player.position.set(posicionamentoChegada[0].getComponent(0), size, posicionamentoChegada[0].getComponent(2));
        player.lookAt(0,0,100000)
    }

    if (keyboard.pressed("space")){
        window.location.href = "carView.html";
    }

    if (keyboard.down("0")){
        scene.background = skyTextureSecret;
        assetsMng.play("coconutMall");
        controls.add("* 0 to play Coconut Mall");
        scene.remove(plane);
    }

}



//-------------------------------------------------------------------------------
// Status da Partida
//-------------------------------------------------------------------------------
var gerou = false;
function geraStatusFinal(){
    assetsMng.play("winRace");
    var textoVoltas = document.createElement('div');
    textoVoltas.style.position = 'absolute';
    textoVoltas.style.backgroundColor = "white";
    textoVoltas.innerHTML = "Voltas: ";
    textoVoltas.style.top = 0 + 'px';
    textoVoltas.style.left = window.innerWidth - 66 + 'px';
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
    tempoTotal.innerHTML = anterior/1000 - tempoJogoAnterior;
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

var controls = new InfoBox();
  controls.add("Controles: ");
  controls.addParagraph();
  controls.add("Use keyboard to interact:");
  controls.add("* Left/Right arrows to turn left/right");
  controls.add("* Down arrow to go backwards");
  controls.add("* X to accelerate");
  controls.add("* Space to change camera view");
  controls.add("* 1/2 buttons to change maps");
  controls.show();

var dt, anterior = 0;
assetsMng.play("startRace");

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
  player.defaultUpdate();
  verificaVoltas(player);
  posAtual.set(player.position.getComponent(0), player.position.getComponent(1), player.position.getComponent(2));
  cameraHolder.lookAt(ghostguide.getWorldPosition());
  cameraHolder.position.set(player.position.getComponent(0)+8, player.position.getComponent(1)+6, player.position.getComponent(2)-10);
  cameraHolder.rotateY(degreesToRadians(180));

  dt = (t - anterior) / 1000;
  anterior = t;
  if(voltas >= flagNumber && gerou == false){
      geraStatusFinal();
  }
  controlledRender(t);
  renderer.render(scene, camera) // Render scene
}