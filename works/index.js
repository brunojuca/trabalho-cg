import * as THREE from  '../build/three.module.js';
import Stats from       '../build/jsm/libs/stats.module.js';
import {GUI} from       '../build/jsm/libs/dat.gui.module.js';
import KeyboardState from '../libs/util/KeyboardState.js';
import {pista1 as pista1} from './pistas/pista1.js';
import {pista2 as pista2} from './pistas/pista2.js';
import Pista from './Pista.js';
import { Car } from './Car.js';
import { LambertTestCar } from './LambertTestCar.js';
import { Turbina } from './turbina.js';
import { assetsManager } from './assetsManager.js';
import { EffectComposer } from '../build/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from '../build/jsm/postprocessing/RenderPass.js';
import { PixelShader } from '../build/jsm/shaders/PixelShader.js';
import { ShaderPass } from '../build/jsm/postprocessing/ShaderPass.js';
import { UnrealBloomPass } from '../build/jsm/postprocessing/UnrealBloomPass.js';
//import {TrackballControls} from '../build/jsm/controls/TrackballControls.js';

import {InfoBox,
        onWindowResize,
        degreesToRadians,} from "../libs/util/util.js";
import Roadblock from './Roadblock.js';

//-------------------------------------------------------------------------------
//-------------------------------------------------------------------------------
// Loaders
//-------------------------------------------------------------------------------
//-------------------------------------------------------------------------------

//-------------------------------------------------------------------------------
// Texture Loader
//-------------------------------------------------------------------------------
const loader = new THREE.TextureLoader();
const moonTexture = loader.load( 'texture/moon.jpg' );
const pokeyTexture = loader.load( 'texture/pokey.jpg' );
const groundTexture = loader.load( 'texture/grass.jpg' );
const groundTexture2 = loader.load( 'texture/sand.jpg' );
const skyTexture = loader.load( 'texture/sky.jpg' );
const skyTexture2 = loader.load( 'texture/sunsky.png' );
const skyTextureSecret = loader.load( 'texture/coconutMall.jpg' );
const flagTexture = loader.load( 'texture/coconutFlagPole.png' );

//-------------------------------------------------------------------------------
// Audio Manager
//-------------------------------------------------------------------------------
var assetsMng = new assetsManager();
assetsMng.loadAudio("coconutMall", "./soundAssets/coconutMall.mp3");
assetsMng.loadAudio("bigBlue", "./soundAssets/bigBlue.mp3");
assetsMng.loadAudio("moonviewHighway", "./soundAssets/moonviewHighway.mp3");
assetsMng.loadAudio("startRace", "./soundAssets/startRace.mp3");
assetsMng.loadAudio("winRace", "./soundAssets/winRace.mp3");



//-------------------------------------------------------------------------------
//-------------------------------------------------------------------------------
// Scene e Renderer Creation
//-------------------------------------------------------------------------------
//-------------------------------------------------------------------------------

var stats = new Stats();          // To show FPS information
var scene = new THREE.Scene();    // Create main scene
var renderer = new THREE.WebGLRenderer({antialias: true});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor( 0x000000 );
document.body.appendChild(renderer.domElement);
scene.background = skyTexture;

//camera
var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.lookAt(0, 0, 0);
  camera.position.set(0, 0, 0);
  camera.up.set( 0, 10, 0 );
  camera.fov = 20;
  camera.layers.enable(1);

//light
var ambientColor = "rgb(100,100,100)";
var ambientLight = new THREE.AmbientLight(ambientColor);
scene.add( ambientLight );

// Listen window size changes
window.addEventListener('resize', function(){onWindowResize(camera, renderer)}, false );



//-------------------------------------------------------------------------------
//-------------------------------------------------------------------------------
// Ambiente - Eixos e Plano
//-------------------------------------------------------------------------------
//-------------------------------------------------------------------------------

groundTexture.wrapS = groundTexture.wrapT = THREE.RepeatWrapping;
groundTexture.repeat.set( 1000, 1000 );
groundTexture.anisotropy = 16;
var groundMaterial = new THREE.MeshStandardMaterial( { map: groundTexture } );

groundTexture2.wrapS = groundTexture2.wrapT = THREE.RepeatWrapping;
groundTexture2.repeat.set( 1000, 1000 );
groundTexture2.anisotropy = 16;
var ground2Material = new THREE.MeshStandardMaterial( { map: groundTexture2 } );
//var plane = createGroundPlaneWired(1500, 1500, 80, 80);
var plane1 = new THREE.Mesh( new THREE.PlaneBufferGeometry( 10000, 10000 ), groundMaterial );
var plane2 = new THREE.Mesh( new THREE.PlaneBufferGeometry( 10000, 10000 ), ground2Material );
plane1.position.y = 0.0;
plane1.rotation.x = - Math.PI / 2;
plane1.position.y = -0.3;
plane2.position.y = 0.0;
plane2.rotation.x = - Math.PI / 2;
plane2.position.y = -0.3;
plane2.visible = false;
scene.add(plane1);
scene.add(plane2);



//-------------------------------------------------------------------------------
//-------------------------------------------------------------------------------
// Pista Real
//-------------------------------------------------------------------------------
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

function limpaPista(){
    for (let i = 0; i < platforms.length; i++) {
        scene.remove(platforms[i].bloco);
    }
}



//-------------------------------------------------------------------------------
//-------------------------------------------------------------------------------
// Setagem dos Checkpoints e do Modelo da Chegada na Pista
//-------------------------------------------------------------------------------
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
    var poleMaterial = new THREE.MeshBasicMaterial( { map: flagTexture } );
    var pole = new THREE.Mesh( poleGeometry, poleMaterial );
    return pole;
}
//cria topo pole
function createPoleTop(size)
{
    var flagtopGeometry = new THREE.BoxGeometry(blocoSize+2*size, size, size);
    var flagtopMaterial = new THREE.MeshBasicMaterial( { map: flagTexture } );
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
            flagTop.position.set(posicionamentoChegada[0].getComponent(0), 5*size - size/2, posicionamentoChegada[0].getComponent(2) + size);
            for (var i = 0; i <= flagNumber-1; i++){
                flags[i].position.set(posicionamentoChegada[0].getComponent(0)-blocoSize/2 - size/2, size+size*i - size/2, posicionamentoChegada[0].getComponent(2) + size);
                flags2[i].position.set(posicionamentoChegada[0].getComponent(0)+blocoSize/2 + size/2, size+size*i - size/2, posicionamentoChegada[0].getComponent(2) + size);
            }
            scene.add(todosCheckpoints[k]);
            return;
        }
        todosCheckpoints[k].position.set(posicionamentoCheckpoints[flagNumber-2-k].getComponent(0), 0.0, posicionamentoCheckpoints[flagNumber-2-k].getComponent(2));
        if(pistaAtual == 2){
            todosCheckpoints.reverse();
        }
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

//garantir q a posicao do ultimo checkpoint vai ser sempre a largada
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

function resetaPosicaoCheckpointMudancaPista(){
    posicionamentoCheckpoints = encontraPosicaoCheckpoints();
    posicionamentoChegada = encontraPosicaoChegada();
    posicionaCheckpoints(posicionamentoCheckpoints,posicionamentoChegada);
}



//-------------------------------------------------------------------------------
//-------------------------------------------------------------------------------
// Carro
//-------------------------------------------------------------------------------
//-------------------------------------------------------------------------------

//guia
const radius = 1

//ghost guia
const desvio = 10;
var ghostguide = createSphere(radius);
ghostguide.position.set(0.0, 0.0, 2*radius + desvio);

//player
var player = new LambertTestCar;
player.scale.set(0.8,0.8,0.8);
player.position.set(posicionamentoChegada[0].getComponent(0) + size, 1.2*size, posicionamentoChegada[0].getComponent(2) - size);
player.add(ghostguide);

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
//-------------------------------------------------------------------------------
// Camera
//-------------------------------------------------------------------------------
//-------------------------------------------------------------------------------

var cameraHolder = new THREE.Object3D();
cameraHolder.add(camera);
cameraHolder.position.set(60, 20, 0);
cameraHolder.lookAt(posAtual)
cameraHolder.rotateY(degreesToRadians(180))

scene.add(player);
scene.add(cameraHolder);



//-------------------------------------------------------------------------------
// Virtual camera - minimapa
//-------------------------------------------------------------------------------
var lookAtVec   = new THREE.Vector3(blocoSize*pista.LINHAS/2 - blocoSize/2, 0.0, blocoSize*pista.COLUNAS/2 - blocoSize/2 );
var virtualCamPosition = new THREE.Vector3( blocoSize*pista.LINHAS/2 - blocoSize/2, 600.0, blocoSize*pista.COLUNAS/2 - blocoSize/2 );

var vcWidth = 200;
var vcHeight = 200;
var virtualCamera = new THREE.PerspectiveCamera(45, vcWidth/vcHeight, 1.0, 20.0);
  virtualCamera.position.copy(virtualCamPosition);
  virtualCamera.lookAt(lookAtVec);
  virtualCamera.far = 8000;
  virtualCamera.fov = 30;
  virtualCamera.updateProjectionMatrix();

scene.add(virtualCamera);

function atualizaMinimapa(){
    if(pistaAtual == 1){
        lookAtVec   = new THREE.Vector3(blocoSize*pista.LINHAS/2 - blocoSize/2, 0.0, blocoSize*pista.COLUNAS/2 - blocoSize/2 );
        virtualCamPosition = new THREE.Vector3( blocoSize*pista.LINHAS/2 - blocoSize/2, 600, blocoSize*pista.COLUNAS/2 - blocoSize/2 );
    }
    else if(pistaAtual == 2){
        lookAtVec   = new THREE.Vector3(blocoSize*pista.LINHAS/2 - blocoSize/2, 0.0, blocoSize*pista.COLUNAS/2 - blocoSize/2 );
        virtualCamPosition = new THREE.Vector3( blocoSize*pista.LINHAS/2 - blocoSize/2, 2000, blocoSize*pista.COLUNAS/2 - blocoSize/2 );
    }
    virtualCamera.position.copy(virtualCamPosition);
    virtualCamera.lookAt(lookAtVec);
}

var playerIcon = createPlayerIcon(10*radius);
playerIcon.position.set(0.0, 80.0, 0.0);

//cria icone player minimapa
function createPlayerIcon(radius)
{
    var playerIconGeometry = new THREE.SphereGeometry(radius, 32, 32);
    var playerIconMaterial = new THREE.MeshPhongMaterial( {color:'rgb(255,0,0)'} );
    var playerIcon = new THREE.Mesh( playerIconGeometry, playerIconMaterial );
    return playerIcon;
}
player.add(playerIcon);



//-------------------------------------------------------------------------------
//-------------------------------------------------------------------------------
// Scenary
//-------------------------------------------------------------------------------
//-------------------------------------------------------------------------------

let centroPistaAtual = new THREE.Vector3(blocoSize*pista.LINHAS/2 - blocoSize/2, 0.0, blocoSize*pista.COLUNAS/2 - blocoSize/2 );

//-------------------------------------------------------------------------------
// SpotLight - em desenvolvimento
//-------------------------------------------------------------------------------
/*
setSpotLight(ambientspotLight, "ambientLight", new THREE.Vector3(0,0,0));
function setSpotLight(spotLight, lightName, position)
{
  spotLight.position.copy(position);
  spotLight.shadow.mapSize.width = 1024;
  spotLight.shadow.mapSize.height = 1024;
  spotLight.angle = degreesToRadians(40);
  spotLight.castShadow = true;
  spotLight.decay = 2;
  spotLight.penumbra = 0.5;
  spotLight.name = lightName;

  scene.add(spotLight);
}
*/

//-------------------------------------------------------------------------------
// Moon - em desenvolvimento
//-------------------------------------------------------------------------------
moonTexture.wrapS = moonTexture.wrapT = THREE.RepeatWrapping;
moonTexture.anisotropy = 16;
var moonMaterial = new THREE.MeshStandardMaterial( { map: moonTexture } );
var sphereGeometry = new THREE.SphereGeometry(10*radius, 32, 32);
var fallenMoon = new THREE.Mesh( sphereGeometry, moonMaterial );
fallenMoon.position.set(centroPistaAtual.getComponent(0), centroPistaAtual.getComponent(1), centroPistaAtual.getComponent(2));
scene.add(fallenMoon);

//-------------------------------------------------------------------------------
// Pokey - em desenvolvimento
//-------------------------------------------------------------------------------
var pokeyMaterial = new THREE.MeshStandardMaterial( { map: pokeyTexture } );
var pokeyGeometry = new THREE.SphereGeometry(15, 32, 32);
var dancingpokeyBall1 = new THREE.Mesh( pokeyGeometry, pokeyMaterial );
scene.add(dancingpokeyBall1);
dancingpokeyBall1.position.set(50, 10, 50);
var dancingpokeyBall2 = new THREE.Mesh( pokeyGeometry, pokeyMaterial );
scene.add(dancingpokeyBall2);
dancingpokeyBall2.position.set(50, 25, 50);
var dancingpokeyBall3 = new THREE.Mesh( pokeyGeometry, pokeyMaterial );
scene.add(dancingpokeyBall3);
dancingpokeyBall3.position.set(50, 40, 50);

var pokey = [];
function carregaPokey(){
    pokey = [];
    for (let i = 0; i < 20; i++) {
        var novoPokey = new Pokey();
        pokey[i].position.set(-600+100*i, 0.0, 40*Math.sin(pi*5*j));
        scene.add(pokey[i]);
    }
}
function limpaPokey(){
    for (let i = 0; i < pokey.length; i++) {
        scene.remove(pokey[i]);
    }
}
var pokeySpeed = 5.0;
function pokeyDance()
{
    for (let i = 0; i < pokey.length; i++) {
        pokey[i].defaultUpdate(pokeySpeed);
    }
}


//-------------------------------------------------------------------------------
// Eolics
//-------------------------------------------------------------------------------
var eolics = [];
var scenicEolics = [];
var scenicTemp = [];

function carregaEolics(){
    eolics = [];
    for (let i = 0; i < 21; i++) {
        var eolicTurbine = new Turbina();
        eolicTurbine.rotateY(degreesToRadians(180));
        eolics.push(eolicTurbine);
        eolics[i].position.set(-600+100*i, 0.0, 500.0);
        scene.add(eolics[i]);
    }
}
function carregaScenaryEolics(){
    for(let j = 0; j < 5; j++){
        scenicTemp = [];
        for (let i = 0; i < 21; i++) {
            var eolicTurbine = new Turbina();
            eolicTurbine.rotateY(degreesToRadians(180));
            scenicTemp.push(eolicTurbine);
        }
        scenicEolics.push(scenicTemp)
        for (let i = 0; i < 21; i++) {
            scenicEolics[j][i].position.set(-600+100*i, 0.0, 500.0 + 200*j);
            scene.add(scenicEolics[j][i]);
        }
    }
}
function limpaEolics(){
    for (let i = 0; i < eolics.length; i++) {
        scene.remove(eolics[i]);
    }
    for(let j = 0; j < 5; j++){
        for (let i = 0; i < 21; i++) {
            scene.remove(scenicEolics[j][i]);
        }
    }
}
var eolicsSpeed = 5.0;
function spinBlades()
{
    for (let i = 0; i < eolics.length; i++) {
        eolics[i].defaultUpdate(eolicsSpeed + eolics[i].turbo);
    }
    for(let j = 0; j < 5; j++){
        for (let i = 0; i < 21; i++) {
           scenicEolics[j][i].defaultUpdate(eolicsSpeed + eolics[i].turbo*1/(j*10));
        }
    }
}

//-------------------------------------------------------------------------------
// Props
//-------------------------------------------------------------------------------
function carregaProps(){
    //carregaPokey();
    carregaEolics();
    carregaScenaryEolics();
}
function limpaProps(){
    limpaPokey();
    limpaEolics();
}



//-------------------------------------------------------------------------------
//-------------------------------------------------------------------------------
// Movimentação
//-------------------------------------------------------------------------------
//-------------------------------------------------------------------------------

//animation control
var carroAcelerando = false; // control if animation is on or of
var carroFreiando = false; // control if animation is on or of
var speedMax = 200;
//acelera e freia o carro
function aceleraCarro(aceleracaoAnterior)
{
    if(carroAcelerando){
        if(aceleracao < speedMax){
            aceleracao += redutor*aceleracaoAnterior/100;
        }
    }
    else if(!carroAcelerando){
        if (aceleracao > 1 && speedForward > 0){
            aceleracao -= redutor*aceleracaoAnterior/10;
            player.accelerate(aceleracao/100);
        }
    }
    aceleracaoAnterior = aceleracao
}
function freiaCarro(freiaAnterior)
{
    if(carroFreiando){
        if(freia > -speedMax){
            freia += redutor*freiaAnterior/100;
        }
    }
    else if(!carroFreiando){
        if (freia < -1){
            freia -= redutor*freiaAnterior/10;
            player.accelerate(freia/100);
        }
    }
    freiaAnterior = freia
}



//-------------------------------------------------------------------------------
//-------------------------------------------------------------------------------
// Colisores
//-------------------------------------------------------------------------------
//-------------------------------------------------------------------------------

//-------------------------------------------------------------------------------
// Colisor Pista Desaceleração
//-------------------------------------------------------------------------------
var diffX = 0;
var diffZ = 0;
function verificaDesaceleraFora(){
    testaRedutor();
    for (var k = 0; k < platforms.length; k ++){
        diffX = Math.abs(player.position.getComponent(0) - size - platforms[k].bloco.position.getComponent(0));
        diffZ = Math.abs(player.position.getComponent(2) + size - platforms[k].bloco.position.getComponent(2));
        if( diffX <= blocoSize/2 && diffZ <= blocoSize/2){
            if (redutor < 1){
                redutor += 0.005;
            }
            return;
        }
    }
    redutor = 0.5;
}

//estético, indicador do redutor acoplado ao carro
var flagRedutor = createPole(size);
var flagRedutor2 = createPole(size);
flagRedutor.position.set(-0.7, 2*size, -0.5);
flagRedutor2.position.set(0.7, 2*size, -0.5);

player.add(flagRedutor);
player.add(flagRedutor2);

function testaRedutor(){
    if (redutor >= 1){
        flagRedutor.material.color.setHex(0xff0000);
        flagRedutor2.material.color.setHex(0xff0000);
    }
    else{
        flagRedutor.material.color.setHex(0x000000);
        flagRedutor2.material.color.setHex(0x000000);
    }
}

//-------------------------------------------------------------------------------
// Colisor Eolics
//-------------------------------------------------------------------------------
function verificaEolicTurbo(eolicsEmK){
    if(aceleracao > speedMax){
        if(eolicsEmK.turbo <= 10){
        eolicsEmK.turbo += speedForward;
        }
    }
    else if(freia < -speedMax){
        if(eolicsEmK.turbo <= 10){
        eolicsEmK.turbo -= speedBackward;
        }
    }
}
function resetaEolicsTurbo(eolicsEmKReset){
    if(eolicsEmKReset.turbo > 0.1){
        eolicsEmKReset.turbo -= 0.01;
    }
}
var diffEolicsX = 0;
var diffEolicsZ = 0;
function verificaProximidadeEolic(){
  for (var k = 0; k < eolics.length; k ++){
      diffEolicsX = Math.abs(player.position.getComponent(0) - 1 - eolics[k].position.getComponent(0));
      diffEolicsZ = Math.abs(player.position.getComponent(2) + 1 - eolics[k].position.getComponent(2));
      if( diffEolicsX <= 50 && diffEolicsZ <= 50){
        verificaEolicTurbo(eolics[k]);
      }
      else{
        resetaEolicsTurbo(eolics[k]);
      }
  }
}

//-------------------------------------------------------------------------------
// Colisor Checkpoints
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
    armazenaTempoVoltaAlternativa(voltas);
    if (colidiu1){
        if (colidiu2){
            if (colidiu3){
                if (colidiu4){
                    voltas += 1;
                    resetaVoltaAtual();
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

var tempoTodasVoltas = [0,0,0,0];
function armazenaTempoVoltaAlternativa(){
    if (voltas < 4){
        tempoTodasVoltas[3] = anterior/1000 - tempoTodasVoltas[0] - tempoTodasVoltas[1] - tempoTodasVoltas[2] - tempoJogoAnterior;
        if (voltas < 3){
            tempoTodasVoltas[2] = anterior/1000 - tempoTodasVoltas[0] - tempoTodasVoltas[1] - tempoJogoAnterior;
            if (voltas < 2){
                tempoTodasVoltas[1] = anterior/1000 - tempoTodasVoltas[0] - tempoJogoAnterior;
                if (voltas < 1){
                    tempoTodasVoltas[0] = anterior/1000 - tempoJogoAnterior;
                }
            }
        }
    }
}




//-------------------------------------------------------------------------------
//-------------------------------------------------------------------------------
// Macros
//-------------------------------------------------------------------------------
//-------------------------------------------------------------------------------

function verificaColisores(){
    verificaDesaceleraFora();
    verificaProximidadeEolic();
    verificaVoltas(player);
}

function configuraPistas(){
    limpaPista();
    if(pistaAtual == 1){
        selecaoPista(pista1);
    }
    else if(pistaAtual == 2){
        selecaoPista(pista2);
    }
    resetaVoltaAtual();
    resetaPosicaoCheckpointMudancaPista();
    atualizaMinimapa();
}

function resetaVariaveis(){
    voltas = 0;
    aceleracao = 1;
    freia = -1;
    speedBackward = 0;
    speedForward = 0;
    tempoTodasVoltas = [];
    tempoJogoAnterior = anterior/1000;
    gerou = false;
}

function reposicionaPlayer(dir){
    player.alternaSpotLight(pistaAtual);
    player.position.set(posicionamentoChegada[0].getComponent(0) + size, 1.2*size, posicionamentoChegada[0].getComponent(2) - size);
    if(dir){
        player.lookAt(0,0,-100000);
    }
    else{
        player.lookAt(0,0,100000);
    }
}

function alternaPlano(){
    if (pistaAtual == 1){
        scene.background = skyTexture;
        plane1.visible = true;
        //adiciona os outros planos pra false
        plane2.visible = false;
    }
    if (pistaAtual == 2){
        scene.background = skyTexture2;
        plane1.visible = false;
        //adiciona os outros planos pra false
        plane2.visible = true;
    }
}

function selectSoundtrack(track){
    assetsMng.stop();
    if(track == 1){
        assetsMng.play("moonviewHighway");
    }
    else if(track == 2){
        assetsMng.play("bigBlue");
    }
}

//-------------------------------------------------------------------------------
//-------------------------------------------------------------------------------
// Controles
//-------------------------------------------------------------------------------
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

var keyboard = new KeyboardState();
var Speed = 20;
var aceleracao = 1;
var freia = -1;
var redutor = 1;
var speedForward = 0;
var speedBackward = 0;
var tempoJogoAnterior = 0;
var panoramico = false;

function keyboardUpdate() {
    keyboard.update();

    if (keyboard.pressed("X")){
        carroAcelerando = true;
        speedForward = (Speed/100 + aceleracao/100)*redutor;
        //evita bug ao sair da pag, devido aos cálculos que continuam sendo feitos em segundo plano pelo browser
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
        //evita bug ao sair da pag, devido aos cálculos que continuam sendo feitos em segundo plano pelo browser
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
        setaBloom();
        configuraPistas();
        limpaProps();
        resetaVariaveis();
        reposicionaPlayer(false);
        alternaPlano();
        selectSoundtrack(1);
    }
    else if (keyboard.pressed("2") && pistaAtual != 2){
        pistaAtual = 2;
        setaBloom();
        configuraPistas();
        carregaProps();
        resetaVariaveis();
        reposicionaPlayer(true);
        alternaPlano();
        selectSoundtrack(2);
    }

    if (keyboard.pressed("space")){
        window.location.href = "carView.html";
    }


    //extras
    if (keyboard.pressed(",")){
        panoramico = true;
        playerIcon.visible = false;
    }
    else if (keyboard.pressed(".")){
        panoramico = false;
        playerIcon.visible = true;
    }
    if (keyboard.down("0")){
        scene.background = skyTextureSecret;
        assetsMng.play("coconutMall");
        controls.add("* 0 to play Coconut Mall");
        plane1.visible = false;
        plane2.visible = false;
    }
}



//-------------------------------------------------------------------------------
//-------------------------------------------------------------------------------
// Status da Partida
//-------------------------------------------------------------------------------
//-------------------------------------------------------------------------------

var gerou = false;

function geraStatusFinal(){
    if(voltas >= flagNumber && gerou == false){
        assetsMng.play("winRace");
        gerou = true
    }
    var textoVoltas = document.createElement('div');
    textoVoltas.setAttribute("id", "txt0");
    textoVoltas.style.position = 'absolute';
    textoVoltas.style.backgroundColor = "white";
    textoVoltas.innerHTML = "Voltas: ";
    textoVoltas.style.top = 0 + 'px';
    textoVoltas.style.left = window.innerWidth - 366 + 'px';
    document.body.appendChild(textoVoltas);

    var nDeVoltas = document.createElement('div');
    nDeVoltas.setAttribute("id", "txt1");
    nDeVoltas.style.position = 'absolute';
    nDeVoltas.style.backgroundColor = "white";
    nDeVoltas.innerHTML = voltas;
    nDeVoltas.style.top = 0 + 'px';
    nDeVoltas.style.left = window.innerWidth - 310 + 'px';
    document.body.appendChild(nDeVoltas)

    var tempoTotal = document.createElement('div');
    tempoTotal.setAttribute("id", "txt2");
    tempoTotal.style.position = 'absolute';
    tempoTotal.style.backgroundColor = "white";
    tempoTotal.innerHTML = anterior/1000 - tempoJogoAnterior;
    tempoTotal.style.top = 19 + 'px';
    tempoTotal.style.left = window.innerWidth - 400 + 'px';
    document.body.appendChild(tempoTotal);

    var textotempoVolta1 = document.createElement('div');
    textotempoVolta1.setAttribute("id", "txt3");
    textotempoVolta1.style.position = 'absolute';
    textotempoVolta1.style.backgroundColor = "white";
    textotempoVolta1.innerHTML = tempoTodasVoltas[0];
    textotempoVolta1.style.top = 39 + 'px';
    textotempoVolta1.style.left = window.innerWidth - 400 + 'px';
    document.body.appendChild(textotempoVolta1);

    var textotempoVolta2 = document.createElement('div');
    textotempoVolta2.setAttribute("id", "txt4");
    textotempoVolta2.style.position = 'absolute';
    textotempoVolta2.style.backgroundColor = "white";
    textotempoVolta2.innerHTML = tempoTodasVoltas[1];
    textotempoVolta2.style.top = 59 + 'px';
    textotempoVolta2.style.left = window.innerWidth - 400 + 'px';
    document.body.appendChild(textotempoVolta2);

    var textotempoVolta3 = document.createElement('div');
    textotempoVolta3.setAttribute("id", "txt5");
    textotempoVolta3.style.position = 'absolute';
    textotempoVolta3.style.backgroundColor = "white";
    textotempoVolta3.innerHTML = tempoTodasVoltas[2];
    textotempoVolta3.style.top = 79 + 'px';
    textotempoVolta3.style.left = window.innerWidth - 400 + 'px';
    document.body.appendChild(textotempoVolta3);

    var textotempoVolta4 = document.createElement('div');
    textotempoVolta4.setAttribute("id", "txt6");
    textotempoVolta4.style.position = 'absolute';
    textotempoVolta4.style.backgroundColor = "white";
    textotempoVolta4.innerHTML = tempoTodasVoltas[3];
    textotempoVolta4.style.top = 99 + 'px';
    textotempoVolta4.style.left = window.innerWidth - 400 + 'px';
    document.body.appendChild(textotempoVolta4);

}

function limpaStatusFinal(){
    var txt0 = document.getElementById("txt0");
    txt0.remove();
    var txt1 = document.getElementById("txt1");
    txt1.remove();
    var txt2 = document.getElementById("txt2");
    txt2.remove();
    var txt3 = document.getElementById("txt3");
    txt3.remove();
    var txt4 = document.getElementById("txt4");
    txt4.remove();
    var txt5 = document.getElementById("txt5");
    txt5.remove();
    var txt6 = document.getElementById("txt6");
    txt6.remove();
}


//-------------------------------------------------------------------------------
//-------------------------------------------------------------------------------
// GUI
//-------------------------------------------------------------------------------
//-------------------------------------------------------------------------------

let params = {
    //pixel
    pixelSize: 2,
    pixelizar: false,
    bloomStrength: 3.0,
    bloomThreshold: 0.2,
    bloomRadius: 0.5,
    bloomTrue: false
};

var gui = new GUI();
gui.add(params, 'pixelSize').min(2).max(32).step(2);
gui.add(params, 'pixelizar');
gui.add(params, 'bloomThreshold', 0.0, 1.0).onChange(function (value){
    bloomPass.threshold = Number(value);
});
gui.add(params, 'bloomStrength', 0.0, 3.0).onChange(function (value){
    bloomPass.strength = Number(value);
});
gui.add(params, 'bloomRadius', 0.0, 1.0).onChange(function (value){
    bloomPass.radius = Number(value);
});
gui.add(params, 'bloomTrue');



//-------------------------------------------------------------------------------
//-------------------------------------------------------------------------------
// PostProcessing
//-------------------------------------------------------------------------------
//-------------------------------------------------------------------------------

//-------------------------------------------------------------------------------
// PostProcessing - PixelPass
//-------------------------------------------------------------------------------
const renderScene = new RenderPass( scene, camera );

let pixelComposer;
pixelComposer = new EffectComposer(renderer);
pixelComposer.addPass( renderScene );

let pixelPass = new ShaderPass(PixelShader);
pixelPass.uniforms[ "resolution" ].value = new THREE.Vector2(window.innerWidth, window.innerHeight);
pixelPass.uniforms[ "resolution" ].value.multiplyScalar(window.devicePixelRatio);
pixelComposer.addPass( pixelPass );

function updateGUI(){
    pixelPass.uniforms[ "pixelSize" ].value = params.pixelSize;
}

//-------------------------------------------------------------------------------
// PostProcessing - BloomPass
//-------------------------------------------------------------------------------
let bloomPass = new UnrealBloomPass( new THREE.Vector2( window.innerWidth, window.innerHeight ), 1.5, 0.4, 0.85 )
bloomPass.threshold = params.bloomThreshold;
bloomPass.strength = params.bloomStrength;
bloomPass.radius = params.bloomRadius;
bloomPass.renderToScreen = true;

let bloomComposer = new EffectComposer(renderer);
bloomComposer.setSize( window.innerWidth, window.innerHeight);

bloomComposer.addPass( renderScene );
bloomComposer.addPass( bloomPass );

function renderBloom(){
    renderer.autoClear = false;
    renderer.clear();
    bloomComposer.render();
    renderer.clearDepth();
    camera.layers.set(0);
    renderer.render(scene.camera);
}

function setaBloom(){
    if(pistaAtual == 1){
        bloomPass.threshold = Number(0.2);
        bloomPass.strength = Number(3.0);
        bloomPass.radius = Number(0.5);
    }
    else if(pistaAtual == 2){
        bloomPass.threshold = Number(0.0);
        bloomPass.strength = Number(0.4);
        bloomPass.radius = Number(1.0);
    }
}



//-------------------------------------------------------------------------------
//-------------------------------------------------------------------------------
// Render
//-------------------------------------------------------------------------------
//-------------------------------------------------------------------------------

function controlledRender(t)
{
    var width = window.innerWidth;
    var height = window.innerHeight;

    // Set main viewport
    renderer.setViewport(0, 0, width, height); // Reset viewport
  renderer.setScissorTest(false); // Disable scissor to paint the entire window
  renderer.autoClear = false;
  renderer.clear();   // Clean the window
  if(params.bloomTrue){
      renderBloom();
    }
    else if(params.pixelizar){
    updateGUI();
    pixelComposer.render();
    }
    else {
        renderer.render(scene, camera);
    }

    // Set virtual camera viewport
    var offset = 20;
    renderer.setViewport(offset, height-vcHeight-offset, vcWidth, vcHeight);  // Set virtual camera viewport
    renderer.setScissor(offset, height-vcHeight-offset, vcWidth, vcHeight); // Set scissor with the same size as the viewport
    renderer.setScissorTest(true); // Enable scissor to paint only the scissor are (i.e., the small viewport)
    renderer.setClearColor("rgb(60, 50, 150)");  // Use a darker clear color in the small viewport
    renderer.render(scene, virtualCamera);  // Render scene of the virtual camera
}

var delay = 0;
function render(t)
{
    stats.update();
    requestAnimationFrame(render);
    anterior = t;

    //movimentação do player
    keyboardUpdate();
    verificaColisores();
    aceleraCarro(aceleracao);
    freiaCarro(freia);
    player.defaultUpdate();

    //setagem de camera
    posAtual.set(player.position.getComponent(0), player.position.getComponent(1), player.position.getComponent(2));
    cameraHolder.lookAt(ghostguide.getWorldPosition(new THREE.Vector3()));
    cameraHolder.position.set(player.position.getComponent(0)+40, player.position.getComponent(1)+40, player.position.getComponent(2)-50);
    if (panoramico){
        cameraHolder.position.set(player.position.getComponent(0)+140, player.position.getComponent(1)+80, player.position.getComponent(2)-150);
    }
    cameraHolder.rotateY(degreesToRadians(180));

    //controle de voltas
    delay+=1;
    if(delay%15 == 0 && gerou == false){
        geraStatusFinal();
    }
    if(delay%16 == 0 && gerou == false){
        limpaStatusFinal();
    }

    if(pistaAtual == 2){
        spinBlades();
        //pokeyDance();
    }

    controlledRender(t);
}

var dt, anterior = 0;
//assetsMng.play("startRace");
selectSoundtrack(1);
render();