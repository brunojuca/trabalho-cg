import * as THREE from  '../build/three.module.js';
import Stats from       '../build/jsm/libs/stats.module.js';
import KeyboardState from '../libs/util/KeyboardState.js';
import {pista1 as pista1} from './pistas/pista1.js';
import {pista2 as pista2} from './pistas/pista2.js';
import {pista3 as pista3} from './pistas/pista3.js';
import {pista4 as pista4} from './pistas/pista4.js';
import {pista5 as pista5} from './pistas/pista5.js';
import Pista from './Pista.js';
import { CyberTruckSoft } from './CyberTruckSoft.js';
import { Buttons } from "../libs/other/buttons.js";
import {onWindowResize,
        degreesToRadians,} from "../libs/util/util.js";

//-------------------------------------------------------------------------------
//-------------------------------------------------------------------------------
// Scene e Renderer Creation
//-------------------------------------------------------------------------------
//-------------------------------------------------------------------------------

//-------------------------------------------------------------------------------
// Scene
//-------------------------------------------------------------------------------
var stats = new Stats();          // To show FPS information
var scene = new THREE.Scene();    // Create main scene
var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor( 0x000000 );
document.body.appendChild(renderer.domElement);

//-------------------------------------------------------------------------------
// Camera
//-------------------------------------------------------------------------------
var camera = new THREE.PerspectiveCamera(120, window.innerWidth / window.innerHeight, 0.1, 15000);
  camera.lookAt(0, 0, 0);
  camera.position.set(0, 0, 0);
  camera.up.set( 0, 10, 0 );
  camera.fov = 20;
  camera.updateProjectionMatrix();
  camera.layers.enable(1);

//-------------------------------------------------------------------------------
// Light
//-------------------------------------------------------------------------------

var ambientColor = "rgb(100,100,100)";
var ambientLight = new THREE.AmbientLight(ambientColor, 0.5);
ambientLight.castShadow = false;
ambientLight.intensity = 2;
scene.add( ambientLight );

// Listen window size changes
window.addEventListener('resize', function(){onWindowResize(camera, renderer)}, false );


//-------------------------------------------------------------------------------
//-------------------------------------------------------------------------------
// Loaders
//-------------------------------------------------------------------------------
//-------------------------------------------------------------------------------


//-------------------------------------------------------------------------------
// Texture Loader
//-------------------------------------------------------------------------------
const loader = new THREE.TextureLoader();

//track1
const groundtexture1 = loader.load( 'texture/track1/sand.jpg' );
let materialArray1 = [];
let texture_1ft = loader.load( 'texture/track1/penguins/arid_ft.jpg');
let texture_1bk = loader.load( 'texture/track1/penguins/arid_bk.jpg');
let texture_1up = loader.load( 'texture/track1/penguins/arid_up.jpg');
let texture_1dn = loader.load( 'texture/track1/penguins/arid_dn.jpg');
let texture_1rt = loader.load( 'texture/track1/penguins/arid_rt.jpg');
let texture_1lf = loader.load( 'texture/track1/penguins/arid_lf.jpg');
materialArray1.push(new THREE.MeshBasicMaterial( { map: texture_1ft }));
materialArray1.push(new THREE.MeshBasicMaterial( { map: texture_1bk }));
materialArray1.push(new THREE.MeshBasicMaterial( { map: texture_1up }));
materialArray1.push(new THREE.MeshBasicMaterial( { map: texture_1dn }));
materialArray1.push(new THREE.MeshBasicMaterial( { map: texture_1rt }));
materialArray1.push(new THREE.MeshBasicMaterial( { map: texture_1lf }));
for (let i = 0; i < 6; i++){
    materialArray1[i].side = THREE.BackSide;
}

//track2
const retroTexture = loader.load( 'texture/track2/retrowave3.png');
const groundtexture2A = loader.load( 'texture/track2/neonPads.jpg');
const groundtexture2B = loader.load( 'texture/track2/neonWave.jpg');
let materialArray2 = [];
let texture_2ft = loader.load( 'texture/track2/retrowave2/px.png');
let texture_2bk = loader.load( 'texture/track2/retrowave2/nx.png');
let texture_2up = loader.load( 'texture/track2/retrowave2/py.png');
let texture_2dn = loader.load( 'texture/track2/retrowave2/ny.png');
let texture_2rt = loader.load( 'texture/track2/retrowave2/pz.png');
let texture_2lf = loader.load( 'texture/track2/retrowave2/nz.png');
materialArray2.push(new THREE.MeshBasicMaterial( { map: texture_2ft }));
materialArray2.push(new THREE.MeshBasicMaterial( { map: texture_2bk }));
materialArray2.push(new THREE.MeshBasicMaterial( { map: texture_2up }));
materialArray2.push(new THREE.MeshBasicMaterial( { map: texture_2dn }));
materialArray2.push(new THREE.MeshBasicMaterial( { map: texture_2rt }));
materialArray2.push(new THREE.MeshBasicMaterial( { map: texture_2lf }));
for (let i = 0; i < 6; i++){
    materialArray2[i].side = THREE.BackSide;
}

//track3
const groundtexture3 = loader.load( 'texture/track3/magma3.jpg' );
let materialArray3 = [];
let texture_3ft = loader.load( 'texture/track3/penguins/barren_ft.jpg');
let texture_3bk = loader.load( 'texture/track3/penguins/barren_bk.jpg');
let texture_3up = loader.load( 'texture/track3/penguins/barren_up.jpg');
let texture_3dn = loader.load( 'texture/track3/penguins/barren_dn.jpg');
let texture_3rt = loader.load( 'texture/track3/penguins/barren_rt.jpg');
let texture_3lf = loader.load( 'texture/track3/penguins/barren_lf.jpg');
materialArray3.push(new THREE.MeshBasicMaterial( { map: texture_3ft }));
materialArray3.push(new THREE.MeshBasicMaterial( { map: texture_3bk }));
materialArray3.push(new THREE.MeshBasicMaterial( { map: texture_3up }));
materialArray3.push(new THREE.MeshBasicMaterial( { map: texture_3dn }));
materialArray3.push(new THREE.MeshBasicMaterial( { map: texture_3rt }));
materialArray3.push(new THREE.MeshBasicMaterial( { map: texture_3lf }));
for (let i = 0; i < 6; i++){
    materialArray3[i].side = THREE.BackSide;
}

//track4
const groundtexture4 = loader.load( 'texture/track4/iceField.jpg' );
let materialArray4 = [];
let texture_4ft = loader.load( 'texture/track4/eso0932/px_eso0932a.jpg');
let texture_4bk = loader.load( 'texture/track4/eso0932/nx_eso0932a.jpg');
let texture_4up = loader.load( 'texture/track4/eso0932/py_eso0932a.jpg');
let texture_4dn = loader.load( 'texture/track4/eso0932/ny_eso0932a.jpg');
let texture_4rt = loader.load( 'texture/track4/eso0932/pz_eso0932a.jpg');
let texture_4lf = loader.load( 'texture/track4/eso0932/nz_eso0932a.jpg');
materialArray4.push(new THREE.MeshBasicMaterial( { map: texture_4ft }));
materialArray4.push(new THREE.MeshBasicMaterial( { map: texture_4bk }));
materialArray4.push(new THREE.MeshBasicMaterial( { map: texture_4up }));
materialArray4.push(new THREE.MeshBasicMaterial( { map: texture_4dn }));
materialArray4.push(new THREE.MeshBasicMaterial( { map: texture_4rt }));
materialArray4.push(new THREE.MeshBasicMaterial( { map: texture_4lf }));
for (let i = 0; i < 6; i++){
    materialArray4[i].side = THREE.BackSide;
}
//track5
const groundtexture5 = loader.load( 'texture/track5/sand.jpg' );
let materialArray5 = [];
let texture_5ft = loader.load( 'texture/track5/penguins/trouble_ft.jpg');
let texture_5bk = loader.load( 'texture/track5/penguins/trouble_bk.jpg');
let texture_5up = loader.load( 'texture/track5/penguins/trouble_up.jpg');
let texture_5dn = loader.load( 'texture/track5/penguins/trouble_dn.jpg');
let texture_5rt = loader.load( 'texture/track5/penguins/trouble_rt.jpg');
let texture_5lf = loader.load( 'texture/track5/penguins/trouble_lf.jpg');
materialArray5.push(new THREE.MeshBasicMaterial( { map: texture_5ft }));
materialArray5.push(new THREE.MeshBasicMaterial( { map: texture_5bk }));
materialArray5.push(new THREE.MeshBasicMaterial( { map: texture_5up }));
materialArray5.push(new THREE.MeshBasicMaterial( { map: texture_5dn }));
materialArray5.push(new THREE.MeshBasicMaterial( { map: texture_5rt }));
materialArray5.push(new THREE.MeshBasicMaterial( { map: texture_5lf }));

for (let i = 0; i < 6; i++){
    materialArray5[i].side = THREE.BackSide;
}

var rampaTexture = loader.load( 'texture/neondots.png' );

//-------------------------------------------------------------------------------
//-------------------------------------------------------------------------------
// Ambiente - Eixos e Plano
//-------------------------------------------------------------------------------
//-------------------------------------------------------------------------------
var retrowaveMaterial = new THREE.MeshPhongMaterial( { map: retroTexture } );
retrowaveMaterial.side = THREE.BackSide;

groundtexture1.wrapS = groundtexture1.wrapT = THREE.RepeatWrapping;
groundtexture1.repeat.set( 50, 50 );
groundtexture1.anisotropy = 4;
var ground1Material = new THREE.MeshStandardMaterial( { map: groundtexture1} );

groundtexture2A.wrapS = groundtexture2A.wrapT = THREE.RepeatWrapping;
groundtexture2A.repeat.set( 50, 50 );
groundtexture2A.anisotropy = 4;
var ground2MaterialA = new THREE.MeshStandardMaterial( { map: groundtexture2A} );
//ground2MaterialA.glass = true;
//ground2MaterialA.reflectivity = 1.0;
//ground2MaterialA.refractionRatio = 1.5;

ground2MaterialA.transparent = true;
ground2MaterialA.opacity = 0.7;

groundtexture2B.wrapS = groundtexture2B.wrapT = THREE.RepeatWrapping;
groundtexture2B.repeat.set( 100, 100 );
groundtexture2B.anisotropy =  4;

var ground2MaterialB = new THREE.MeshStandardMaterial( { map: groundtexture2B} );
ground2MaterialB.transparent = true;
ground2MaterialB.opacity = 0.5;

groundtexture3.wrapS = groundtexture3.wrapT = THREE.RepeatWrapping;
groundtexture3.repeat.set( 50, 50 );
groundtexture3.anisotropy =  4;

var ground3Material = new THREE.MeshStandardMaterial( { map: groundtexture3} );

groundtexture4.wrapS = groundtexture4.wrapT = THREE.RepeatWrapping;
groundtexture4.repeat.set( 100, 100 );
groundtexture4.anisotropy =  4;

var ground4Material = new THREE.MeshStandardMaterial( { map: groundtexture4} );

groundtexture5.wrapS = groundtexture5.wrapT = THREE.RepeatWrapping;
groundtexture5.repeat.set( 1000, 1000 );
groundtexture5.anisotropy =  4;

var ground5Material = new THREE.MeshStandardMaterial( { map: groundtexture5 } );

//var plane = createGroundPlaneWired(1500, 1500, 80, 80);
var plane1 = new THREE.Mesh( new THREE.PlaneBufferGeometry( 5000, 5000 ), ground1Material );
var plane2A = new THREE.Mesh( new THREE.PlaneBufferGeometry( 2500, 2500 ), ground2MaterialA );
var plane2B = new THREE.Mesh( new THREE.PlaneBufferGeometry( 5000, 5000 ), ground2MaterialB );
var plane3 = new THREE.Mesh( new THREE.PlaneBufferGeometry( 4000, 4000 ), ground3Material );
var plane5 = new THREE.Mesh( new THREE.PlaneBufferGeometry( 10000, 10000 ), ground5Material );
var plane4 = new THREE.Mesh( new THREE.PlaneBufferGeometry( 10000, 10000 ), ground4Material );

plane1.position.y = 0.0;
plane1.rotation.x = - Math.PI / 2;
plane1.position.x = 224;
plane1.position.y = -6.3;
plane1.position.z = 224;

plane2A.position.y = 0.0;
plane2A.rotation.x = - Math.PI / 2;
plane2A.position.y = -0.3;
plane2A.position.x = 224;
plane2A.position.y = -0.3;
plane2A.position.z = 224;
plane2A.visible = false;

plane2B.position.y = 0.0;
plane2B.rotation.x = - Math.PI / 2;
plane2B.position.x = 224;
plane2B.position.y = -300.3;
plane2B.position.z = 224;
plane2B.visible = false;


plane3.position.y = 0.0;
plane3.rotation.x = - Math.PI / 2;
plane3.position.y = -0.3;
plane3.visible = false;

plane4.position.y = 0.0;
plane4.rotation.x = - Math.PI / 2;
plane4.position.y = -0.3;
plane4.visible = false;

plane5.position.y = 0.0;
plane5.rotation.x = - Math.PI / 2;
plane5.position.y = -0.3;
plane5.visible = false;

scene.add(plane1);
scene.add(plane2A);
scene.add(plane2B);
scene.add(plane3);
scene.add(plane4);
scene.add(plane5);

const skyboxSize = 10000
var skyGeo = new THREE.SphereGeometry(skyboxSize/2, 720, 360);
var skyboxGeo = new THREE.BoxGeometry(skyboxSize, skyboxSize, skyboxSize);
skyGeo.scale(-1,1,1);

var sky1 = new THREE.Mesh(skyboxGeo, materialArray1);
sky1.position.set(0.0, skyboxSize/10  ,0.0)
sky1.scale.set(-1, 1, 1);
sky1.renderDepth = 1000.0;
sky1.visible = true;

var sky2 = new THREE.Mesh(skyboxGeo, materialArray2);
sky2.position.set(0.0, skyboxSize/10  ,0.0)
sky2.scale.set(-1, 1, 1);
sky2.renderDepth = 1000.0;
sky2.visible = false;

var sky3 = new THREE.Mesh(skyboxGeo, materialArray3);
sky3.position.set(0.0, skyboxSize/10  ,0.0)
sky3.scale.set(-1, 1, 1);
sky3.renderDepth = 1000.0;
sky3.visible = false;

var sky4 = new THREE.Mesh(skyboxGeo, materialArray4);
sky4.position.set(0.0, skyboxSize/10 ,0.0)
sky4.scale.set(-1, 1, 1);
sky4.renderDepth = 1000.0;
sky4.visible = false;

var sky5 = new THREE.Mesh(skyboxGeo, materialArray5);
sky5.position.set(0.0, skyboxSize/10  ,0.0)
sky5.scale.set(-1, 1, 1);
sky5.renderDepth = 1000.0;
sky5.visible = false;

scene.add(sky1);
scene.add(sky2);
scene.add(sky3);
scene.add(sky4);
scene.add(sky5);

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
// Setagem dos Checkpoints
//-------------------------------------------------------------------------------
//-------------------------------------------------------------------------------

//-------------------------------------------------------------------------------
// Cria????o e Setagem dos Checkpoints
//-------------------------------------------------------------------------------
const checkpointRadius = 1.5*blocoSize;
var flagNumber = 9;
var newflagNumber = 9;

function createCheckpoint(checkpointRadius)
{
    var checkpointGeometry = new THREE.SphereGeometry(checkpointRadius, 32, 32);
    var checkpointMaterial = new THREE.MeshPhongMaterial( {color:'rgb(255,255,255)'} );
    var checkpoint = new THREE.Mesh( checkpointGeometry, checkpointMaterial );
    checkpoint.visible = false;
    return checkpoint;
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
        todosCheckpoints[k].position.set(posicionamentoCheckpoints[k].getComponent(0), 0.0, posicionamentoCheckpoints[k].getComponent(2));
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
    return posicaoCheckpoints.reverse();
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

const radius = 1
const size = 1;

//ghost guia pra camera
const desvio = 10;
var ghostguide = createSphere(radius);
ghostguide.position.set(0.0, 0.0, 2*radius + desvio);

//ghost guia pra dire????o mundial
const desvio2 = 10000;
var dirguide = createSphere(radius);
dirguide.position.set(0.0, 0.0, 2*radius + desvio2);

//player
var player = new CyberTruckSoft;
//var playerNewType = new LambertTestCar;

player.scale.set(1.4,1.4,1.4);
player.position.set(posicionamentoChegada[0].getComponent(0) + size, 1.8*size, posicionamentoChegada[0].getComponent(2) - size);

var playerBoxHelper = new THREE.BoxHelper(player, 0x00ff00);
playerBoxHelper.setFromObject(player)
playerBoxHelper.visible = false;
scene.add(playerBoxHelper);

var playerBox3 = new THREE.Box3();
playerBox3.setFromObject(playerBoxHelper);

var playerboxSetada = false;

player.add(ghostguide);
player.add(dirguide);

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

var cameraHolder2 = new THREE.Object3D();
cameraHolder2.lookAt(ghostguide.getWorldPosition(new THREE.Vector3()));
cameraHolder2.position.set(0, 4, -8);
cameraHolder2.rotateY(degreesToRadians(180))
ghostguide.add(cameraHolder2)

scene.add(player);
scene.add(cameraHolder);
player.add(cameraHolder2);


//-------------------------------------------------------------------------------
// Virtual camera - minimapa
//-------------------------------------------------------------------------------
var lookAtVec   = new THREE.Vector3(blocoSize*pista.LINHAS/2 - blocoSize/2, 0.0, blocoSize*pista.COLUNAS/2 - blocoSize/2 );
var virtualCamPosition = new THREE.Vector3( blocoSize*pista.LINHAS/2 - blocoSize/2, 1600.0, blocoSize*pista.COLUNAS/2 - blocoSize/2 );

var vcWidth = 200;
var vcHeight = 200;
var virtualCamera = new THREE.PerspectiveCamera(45, vcWidth/vcHeight, 1.0, 20.0);
  virtualCamera.position.copy(virtualCamPosition);
  virtualCamera.lookAt(lookAtVec);
  virtualCamera.far = 8000;
  virtualCamera.fov = 30;
  virtualCamera.updateProjectionMatrix();
  virtualCamera.rotateZ(degreesToRadians(90));

/*
var virtualcameraHolder = new THREE.Object3D();
virtualcameraHolder.add(virtualCamera);
virtualcameraHolder.position.set(virtualCamPosition);
virtualcameraHolder.lookAt(lookAtVec)
virtualcameraHolder.rotateY(degreesToRadians(180))
*/

scene.add(virtualCamera);

function atualizaMinimapa(){
    //Aprox 200 de y pra cada novo aumento na pista
    switch(pistaAtual){
        case 1:
            lookAtVec   = new THREE.Vector3(blocoSize*pista.LINHAS/2 - blocoSize/2, 0.0, blocoSize*pista.COLUNAS/2 - blocoSize/2 );
            virtualCamPosition = new THREE.Vector3( blocoSize*pista.LINHAS/2 - blocoSize/2, 1600, blocoSize*pista.COLUNAS/2 - blocoSize/2 );
            break;
        case 2:
            lookAtVec   = new THREE.Vector3(blocoSize*pista.LINHAS/2 - blocoSize/2, 0.0, blocoSize*pista.COLUNAS/2 - blocoSize/2 );
            virtualCamPosition = new THREE.Vector3( blocoSize*pista.LINHAS/2 - blocoSize/2, 1600, blocoSize*pista.COLUNAS/2 - blocoSize/2 );
            break;
        case 3:
            lookAtVec   = new THREE.Vector3(blocoSize*pista.LINHAS/2 - blocoSize/2, 0.0, blocoSize*pista.COLUNAS/2 - blocoSize/2 );
            virtualCamPosition = new THREE.Vector3( blocoSize*pista.LINHAS/2 - blocoSize/2, 2200, blocoSize*pista.COLUNAS/2 - blocoSize/2 );
            break;
        case 4:
            lookAtVec   = new THREE.Vector3(blocoSize*pista.LINHAS/2 - blocoSize/2, 0.0, blocoSize*pista.COLUNAS/2 - blocoSize/2 );
            virtualCamPosition = new THREE.Vector3( blocoSize*pista.LINHAS/2 - blocoSize/2, 2200, blocoSize*pista.COLUNAS/2 - blocoSize/2 );
            break;
        case 5:
            lookAtVec   = new THREE.Vector3(blocoSize*pista.LINHAS/2 - blocoSize/2, 0.0, blocoSize*pista.COLUNAS/2 - blocoSize/2 );
            virtualCamPosition = new THREE.Vector3( blocoSize*pista.LINHAS/2 - blocoSize/2, 2000, blocoSize*pista.COLUNAS/2 - blocoSize/2 );
            break;
        default:
            break;
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

//-------------------------------------------------------------------------------
// GlassSphere
//-------------------------------------------------------------------------------

var glassSpheres = [];
function carregaGlassSpheres(){
    glassSpheres = [];
    for (let i = 0; i < 20; i++) {
        var novoglassSphere = new THREE.Mesh( new THREE.SphereGeometry( 100*Math.random(), 32,32 ), retrowaveMaterial );
        glassSpheres.push(novoglassSphere);
        var direcaoGlass = Math.random();
        if(direcaoGlass < 0.25){
            glassSpheres[i].position.set(224 + 96*Math.random(), -500 + 1050*Math.random(), 224 + 96*Math.random());
        }
        else if(direcaoGlass > 0.25 && direcaoGlass < 0.50){
            glassSpheres[i].position.set(224 + 96*Math.random(), -500 + 1050*Math.random(), 224 - 96*Math.random());
        }
        else if(direcaoGlass > 0.50 && direcaoGlass < 0.75){
            glassSpheres[i].position.set(224 - 96*Math.random(), -500 + 1050*Math.random(), 224 - 96*Math.random());
        }
        else if(direcaoGlass > 0.25){
            glassSpheres[i].position.set(224 - 96*Math.random(), -500 + 1050*Math.random(), 224 + 96*Math.random());
        }
        scene.add(glassSpheres[i]);
    }
}

function limpaGlassSphere(){
    for (let i = 0; i < glassSpheres.length; i++) {
        scene.remove(glassSpheres[i]);
    }
}

//-------------------------------------------------------------------------------
// Props
//-------------------------------------------------------------------------------
function carregaProps(){
    switch(pistaAtual){
        case 2:
            carregaGlassSpheres();
            break;
        default:
            break;
    }
}

//tinha algum bug q precisou do switch, n lembro qual
function limpaProps(){
    switch(pistaAtual){
        case 1:
            limpaGlassSphere();
            break;
        case 2:
            limpaGlassSphere();
            break;
        case 3:
            limpaGlassSphere();
            break;
        case 4:
            limpaGlassSphere();
            break;
        case 5:
            limpaGlassSphere();
            break;
        default:
            break;
    }
}



//-------------------------------------------------------------------------------
//-------------------------------------------------------------------------------
// Movimenta????o
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
            aceleracao += redutor*aceleracaoAnterior/80;
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
            freia += redutor*freiaAnterior/80;
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
// Rampas
//-------------------------------------------------------------------------------
//-------------------------------------------------------------------------------

//-------------------------------------------------------------------------------
// Formato e Textura Rampas
//-------------------------------------------------------------------------------

function RampaShape(size)
{
    var RampaShape = new THREE.Shape();
        RampaShape.moveTo( size/2 + 1, 0);
        RampaShape.lineTo( 0, size/6 );
        RampaShape.lineTo( -size/2 - 1, 0);
        RampaShape.lineTo( size/2 + 1, 0);
    return RampaShape;
}

var rampaType = 1;
function selecionaRampaMaterial(rampaType){
    switch(rampaType){
        case 1:
            rampaTexture = loader.load( 'texture/track1/road1.jpg' );
            rampaTexture.wrapS = rampaTexture.wrapT = THREE.RepeatWrapping;
            rampaTexture.repeat.set( 0.2, 0.05 );
            rampaTexture.anisotropy = 4;
            return new THREE.MeshStandardMaterial( { map: rampaTexture} );
        case 2:
            rampaTexture = loader.load( 'texture/track2/road2.jpg' );
            rampaTexture.wrapS = rampaTexture.wrapT = THREE.RepeatWrapping;
            rampaTexture.repeat.set( 0.02, 0.1 );
            rampaTexture.anisotropy = 4;
            return new THREE.MeshStandardMaterial( { map: rampaTexture} );
        case 3:
            rampaTexture = loader.load( 'texture/track3/stone.jpg' );
            rampaTexture.wrapS = rampaTexture.wrapT = THREE.RepeatWrapping;
            rampaTexture.repeat.set( 0.02, 0.1 );
            rampaTexture.anisotropy = 4;
            return new THREE.MeshStandardMaterial( { map: rampaTexture} );
        case 4:
            rampaTexture = loader.load( 'texture/track4/road4.jpg' );
            rampaTexture.wrapS = rampaTexture.wrapT = THREE.RepeatWrapping;
            rampaTexture.repeat.set( 0.02, 0.01 );
            rampaTexture.anisotropy = 4;
            return new THREE.MeshStandardMaterial( { map: rampaTexture} );
        case 5:
            var cor = '#808080'; // cinza
            return new THREE.MeshPhongMaterial( {color: cor});
        default:
            var cor = '#808080'; // cinza
            return new THREE.MeshPhongMaterial( {color: cor});
    }
}

function createRampa(size, rampaType) {
    var extrudeSettings =
    {
        depth: size,
        steps: 3,
        bevelEnabled: false
    };
    /*
    switch(rampaType){
        case 1:
            var extrudeGeometry = new THREE.ExtrudeGeometry(RampaShapeV(size), extrudeSettings);
        case 2:
            var extrudeGeometry = new THREE.ExtrudeGeometry(RampaShapeH(size), extrudeSettings);
        case 3:
    }*/
    var extrudeGeometry = new THREE.ExtrudeGeometry(RampaShape(size), extrudeSettings);
    var cor = '#808080'; // cinza
    var rampaMaterial = new THREE.MeshPhongMaterial( {color: cor});
    var rampa = new THREE.Mesh(extrudeGeometry, rampaMaterial);
    return rampa;
}

var offsetRampa = blocoSize/2;
var RVNumber = 12;
var RHNumber = 10;
var newRVNumber = 12;
var newRHNumber = 10;
var todasRampasV = [];
var todasRampasH = [];

//-------------------------------------------------------------------------------
// Rampas modelo V
//-------------------------------------------------------------------------------

function posicionaRampasV(posicionamentoRampas){
    for(var k = 0; k <= RVNumber-1; k++){
        todasRampasV[k].position.set(posicionamentoRampas[k].getComponent(0), 0.0, posicionamentoRampas[k].getComponent(2)-offsetRampa);
        todasRampasV[k].material = selecionaRampaMaterial(rampaType);
        scene.add(todasRampasV[k]);
    }
}
function encontraPosicaoRampasV(){
    var posicaoRampasV = [];
    for (var k = 0; k < platforms.length; k ++){
        if(platforms[k].getBlockType() == "RAMPAV"){
            var rampa = createRampa(blocoSize, rampaType);
            rampa.receiveShadow = true;
            todasRampasV.push(rampa);

            var posicaoNova = new THREE.Vector3;
            posicaoNova.copy(platforms[k].bloco.position);
            posicaoRampasV.push(posicaoNova);
        }
    }
    return posicaoRampasV;
}
var posicionamentoRampasV = encontraPosicaoRampasV();
posicionaRampasV(posicionamentoRampasV);

//-------------------------------------------------------------------------------
// Rampas modelo H
//-------------------------------------------------------------------------------

function posicionaRampasH(posicionamentoRampas){
    for(var k = 0; k <= RHNumber-1; k++){
        todasRampasH[k].position.set(posicionamentoRampas[k].getComponent(0)-offsetRampa, 0.0, posicionamentoRampas[k].getComponent(2));
        todasRampasH[k].material = selecionaRampaMaterial(rampaType);
        scene.add(todasRampasH[k]);
    }
}
function encontraPosicaoRampasH(){
    var posicaoRampasH = [];
    for (var k = 0; k < platforms.length; k ++){
        if(platforms[k].getBlockType() == "RAMPAH"){
            var rampa = createRampa(blocoSize, rampaType);
            rampa.material.color.setHex(0xff0000);
            rampa.rotateY(degreesToRadians(90));
            rampa.receiveShadow = true;
            todasRampasH.push(rampa);

            var posicaoNova = new THREE.Vector3;
            posicaoNova.copy(platforms[k].bloco.position);
            posicaoRampasH.push(posicaoNova);
        }
    }
    return posicaoRampasH;
}
var posicionamentoRampasH = encontraPosicaoRampasH();
posicionaRampasH(posicionamentoRampasH);

//-------------------------------------------------------------------------------
// Limpa Rampas
//-------------------------------------------------------------------------------

function limpaRampas(){
    for (let i = 0; i < todasRampasV.length; i++) {
        scene.remove(todasRampasV[i]);
    }
    for (let i = 0; i < todasRampasV.length; i++) {
        todasRampasV.pop();
    }
    for (let i = 0; i < todasRampasH.length; i++) {
        scene.remove(todasRampasH[i]);
    }
    for (let i = 0; i < todasRampasV.length; i++) {
        todasRampasH.pop();
    }
}
function resetaPosicaoRampasMudancaPista(){
    posicionamentoRampasV = encontraPosicaoRampasV();
    posicionaRampasV(posicionamentoRampasV);

    posicionamentoRampasH = encontraPosicaoRampasH();
    posicionaRampasH(posicionamentoRampasH);
}

//-------------------------------------------------------------------------------
//-------------------------------------------------------------------------------
// Fisica e Colisores
//-------------------------------------------------------------------------------
//-------------------------------------------------------------------------------

//-------------------------------------------------------------------------------
// Colisor e Fisica - Rampas
//-------------------------------------------------------------------------------

var absDiffX = 0;
var absDiffZ = 0;
var diffX = 0;
var diffZ = 0;
var diffDirX = 0;
var diffDirZ = 0;

//lock virar durante o pulo
var keyLock = false;

//evitar pulos voando por cima da rampa
var playerOnGround = true;

//evitar colisao com parede de rampas gemeas
var playerOnRampa = false;

var speedModulo = 0;
var rampaAngle = (blocoSize/6) / (blocoSize/2);

var offsetColisor = 0.5;
function verificaColisorRampa(){
    for (var k = 0; k < platforms.length; k ++){
        absDiffX = Math.abs(player.position.getComponent(0) - size - platforms[k].bloco.position.getComponent(0));
        absDiffZ = Math.abs(player.position.getComponent(2) + size - platforms[k].bloco.position.getComponent(2));
        diffX = player.position.getComponent(0) - size - platforms[k].bloco.position.getComponent(0);
        diffZ = player.position.getComponent(2) + size - platforms[k].bloco.position.getComponent(2);
        var dirGuidePosition = dirguide.getWorldPosition(new THREE.Vector3());
        diffDirX = dirGuidePosition.getComponent(0) - size - platforms[k].bloco.position.getComponent(0);
        diffDirZ = dirGuidePosition.getComponent(2) + size - platforms[k].bloco.position.getComponent(2);

        if(platforms[k].getBlockType() == "RAMPAV"  && absDiffX <= blocoSize/2 && absDiffZ <= blocoSize/2){
            atualizaAlturaMaxV();
            /*keyLock = true;*/

            //posi??oes com referencia ?? terceiraView
            //bloqueios laterais

            //a frente da rampa
            // +offset | limiteLateralFrontalRampa | -offset
            // absDiffX garante que nao vai bater na parede na entradinha pq o OnRampa vai ta desligado ainda
            if(!playerOnRampa && diffZ < (blocoSize/2 + 5*size) + offsetColisor && diffZ > (blocoSize/2-+ 5*size) - offsetColisor && absDiffX <= blocoSize/2 - 7*offsetColisor){
                player.translateZ( -speedModulo -2*offsetColisor);
                return;
            }
            //atr??s da rampa
            // +offset | limiteLateralTraseiroRampa | -offset
            // absDiffX garante que nao vai bater na parede na entradinha pq o OnRampa vai ta desligado ainda
            if(!playerOnRampa && diffZ < -(blocoSize/2 - 5*size) + offsetColisor && diffZ > -(blocoSize/2 + 5*size) - offsetColisor && absDiffX <= blocoSize/2 - 7*offsetColisor){
                player.translateZ( -speedModulo -2*offsetColisor);
                return;
            }

            //posi??oes com referencia ?? terceiraView
            //pulos da rampa

            //esquerda para direita
            if(diffDirX <= 0){
                //a esquerda da rampa
                if(diffX > 0){
                    player.turnUp(rampaAngle, speedModulo);
                    inverseGravityV(player);
                    return;
                }
                //a direita da rampa
                else if(diffX < 0){
                    player.turnDown(rampaAngle, speedModulo, carroFreiando);
                    inverseGravityDescidaSuaveV(player);
                    return;
                }
            }
            //direita para esquerda
            if(diffDirX >= 0){
                //a direita da rampa
                if(diffX < 0){
                    player.turnUp(rampaAngle, speedModulo);
                    inverseGravityV(player);
                    return;
                }
                //a esquerda da rampa
                else if(diffX > 0){
                    player.turnDown(rampaAngle, speedModulo, carroFreiando);
                    inverseGravityDescidaSuaveV(player);
                    return;
                }
            }
        }
        else if(platforms[k].getBlockType() == "RAMPAH" && absDiffZ <= blocoSize/2 && absDiffX <= blocoSize/2){
            atualizaAlturaMaxH();

            //posi??oes com referencia ?? terceiraView
            //bloqueios laterais

            //a esquerda da rampa
            // +offset | limiteLateralEsquerdaRampa | -offsetS
            // absDiffZ garante que nao vai bater na parede na entradinha pq o OnRampa vai ta desligado ainda
            if(!playerOnRampa && diffX < (blocoSize/2 + 5*size) + offsetColisor && diffX > (blocoSize/2 - 5*size) - offsetColisor && absDiffZ <= blocoSize/2 - 7*offsetColisor){
                player.translateZ( -speedModulo - 2*offsetColisor);
                return;
            }
            //a direita da rampa
            // +offset | limiteLateralDireitaRampa | -offset
            // absDiffZ garante que nao vai bater na parede na entradinha pq o OnRampa vai ta desligado ainda
            if(!playerOnRampa && diffX < -(blocoSize/2 - 5*size) + offsetColisor && diffX > -(blocoSize/2 + 5*size) - offsetColisor && absDiffZ <= blocoSize/2 - 7*offsetColisor){
                player.translateZ( - speedModulo - 2*offsetColisor);
                return;
            }

            //posi??oes com referencia ?? terceiraView
            //pulos da rampa

            //tras para frente
            if(diffDirZ >= 0){
                //atr??s da rampa
                if(diffZ < 0){
                    player.turnUp(rampaAngle, speedModulo);
                    inverseGravityH(player);
                    return;
                }
                //a frente da rampa
                else if(diffZ > 0){
                    player.turnDown(rampaAngle, speedModulo, carroFreiando);
                    inverseGravityDescidaSuaveH(player);
                    return;
                }
            }
            //frente para tr??s
            if(diffDirZ <= 0){
                //a frente da rampa
                if(diffZ > 0){
                    player.turnUp(rampaAngle, speedModulo);
                    inverseGravityH(player);
                    return;
                }
                //atr??s da rampa
                else if(diffZ < 0){
                    player.turnDown(rampaAngle, speedModulo, carroFreiando);
                    inverseGravityDescidaSuaveH(player);
                    return;
                }
            }
        }
    }
    player.turnDefault(rampaAngle, speedModulo)
    gravity(player);
}


//-------------------------------------------------------------------------------
// Fisica - Gravidade Geral
//-------------------------------------------------------------------------------

function gravity(obj){
    if(obj.position.getComponent(1) >= 2.6){
        obj.translateY(-0.9);
        playerOnGround = false;
    }
    else
        keyLock = false;
        playerOnGround = true;
        playerOnRampa = false;
}

//-------------------------------------------------------------------------------
// Fisica - Rampa - Modelo V
//-------------------------------------------------------------------------------

var alturaMaxV = 30;
function inverseGravityV(obj){
    if(playerOnGround){
        if(!carroFreiando){
            if(obj.position.getComponent(1) <= alturaMaxV){
                playerOnRampa = true;
                obj.translateY(0.5*speedModulo);
                if(speedModulo >= 1.05){
                    obj.translateY(0.5*speedModulo);
                    obj.translateZ(1.0*speedModulo);
                }
            }
        }
        else{
            if(obj.position.getComponent(1) >= alturaMaxV){
                playerOnRampa = true;
                obj.translateY(-0.5*speedModulo);
            }
        }
    }
}
function inverseGravityDescidaSuaveV(obj){
    if(playerOnGround){
        if(!carroFreiando){
            if(obj.position.getComponent(1) >= alturaMaxV){
                playerOnRampa = true;
                obj.translateY(-0.5*speedModulo);
            }
        }
        else{
            if(obj.position.getComponent(1) <= alturaMaxV){
                playerOnRampa = true;
                obj.translateY(0.5*speedModulo);
            }
        }
    }
}

function atualizaAlturaMaxV(){
    if(speedModulo >= 1.05){
        alturaMaxV = 30;
    }
    else{
        alturaMaxV = (blocoSize/2 - absDiffX)* rampaAngle + 5*offsetColisor;
    }
}


//-------------------------------------------------------------------------------
// Fisica - Rampa - Modelo H
//-------------------------------------------------------------------------------

var alturaMaxH = 30;
function inverseGravityH(obj){
    if(playerOnGround){
        if(!carroFreiando){
            if(obj.position.getComponent(1) <= alturaMaxH){
                playerOnRampa = true;
                obj.translateY(0.5*speedModulo);
                if(speedModulo >= 1.05){
                    obj.translateY(0.5*speedModulo);
                    obj.translateZ(1.0*speedModulo);
                }
            }
        }
        else{
            if(obj.position.getComponent(1) >= alturaMaxH){
                playerOnRampa = true;
                obj.translateY(-0.5*speedModulo);
            }
        }
    }
}
function inverseGravityDescidaSuaveH(obj){
    if(playerOnGround){
        if(!carroFreiando){
            if(obj.position.getComponent(1) >= alturaMaxH){
                playerOnRampa = true;
                obj.translateY(-0.5*speedModulo);
            }
        }
        else{
            if(obj.position.getComponent(1) <= alturaMaxV){
                playerOnRampa = true;
                obj.translateY(0.5*speedModulo);
            }
        }
    }
}
function atualizaAlturaMaxH(){
    if(speedModulo >= 1.05){
        alturaMaxH = 30;
    }
    else{
        alturaMaxH = (blocoSize/2 - absDiffZ)* rampaAngle + 5*offsetColisor;
    }
}

//-------------------------------------------------------------------------------
// Colisor - Dentro - Pista (Desacelera????o)
//-------------------------------------------------------------------------------
var diffRedutorX = 0;
var diffRedutorZ = 0;
function verificaDesaceleraFora(){
    for (var k = 0; k < platforms.length; k ++){
        diffRedutorX = Math.abs(player.position.getComponent(0) - size - platforms[k].bloco.position.getComponent(0));
        diffRedutorZ = Math.abs(player.position.getComponent(2) + size - platforms[k].bloco.position.getComponent(2));
        if( diffRedutorX <= blocoSize/2 && diffRedutorZ <= blocoSize/2){
            if (redutor < 1){
                redutor += 0.005;
            }
            return;
        }
    }
    redutor = 0.5;
}


//-------------------------------------------------------------------------------
// Colisor - Dentro - Checkpoints
//-------------------------------------------------------------------------------

var colidiuCheckpoints = [];
var reset = false;
var voltas = 0;


function criaCheckpointColisores(){
    for (var i = 0; i <= flagNumber-1; i++){
        var colidiu = false;
        colidiuCheckpoints.push(colidiu);
    }
}
criaCheckpointColisores();


function resetaVoltaAtual(){
    for (var i = 0; i <= flagNumber-1; i++){
        colidiuCheckpoints[i] = reset;
    }
}


function verificaCheckpoint(checkpoint, player, i){
    if (Math.abs(checkpoint.position.getComponent(0) - player.position.getComponent(0)) < checkpointRadius &&
        Math.abs(checkpoint.position.getComponent(2) - player.position.getComponent(2)) < checkpointRadius){
        colidiuCheckpoints[i] = true;
        checkpointsRestantes--;
    }
}

let checkpointsRestantes = flagNumber;
function verificaVoltas(player)
{
    armazenaTempoVoltaAlternativa(voltas);
    armazenaTempoMenorVolta(voltas);
    for (var i = 0; i <= flagNumber-2; i++){
        if(!colidiuCheckpoints[i]){
            verificaCheckpoint(todosCheckpoints[i], player, i);
        }
    }
    if (checkpointsRestantes <= 1){
        verificaCheckpoint(todosCheckpoints[i], player, i);
        if(checkpointsRestantes <= 0){
            voltas += 1;
            checkpointsRestantes = flagNumber;
            resetaVoltaAtual();
        }
    }
}


var tempoTodasVoltas = [0,0,0,0];
var tempoMenorVolta = 999.99;

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

function armazenaTempoMenorVolta(){
    if (voltas >= 1){
        if (tempoTodasVoltas[0] < tempoMenorVolta){
            tempoMenorVolta = tempoTodasVoltas[0];
        }
        if (voltas >= 2){
            if (tempoTodasVoltas[1] < tempoMenorVolta){
                tempoMenorVolta = tempoTodasVoltas[1];
            }
            if (voltas >= 3){
                if (tempoTodasVoltas[2] < tempoMenorVolta){
                    tempoMenorVolta = tempoTodasVoltas[2];
                }
                if (voltas >= 4){
                    tempoTodasVoltas[3];
                    if (tempoTodasVoltas[3] < tempoMenorVolta){
                        tempoMenorVolta = tempoTodasVoltas[3];
                    }
                    mapa++;
                    if(mapa >= 6){
                        mapa = 1;
                    }
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
    verificaColisorRampa();
    verificaDesaceleraFora();
    verificaVoltas(player);
}

function configuraPistas(newflagNumber, newRVNumber, newRHNumber){
    limpaPista();
    limpaRampas();
    flagNumber = newflagNumber;
    RVNumber = newRVNumber;
    RHNumber = newRHNumber;
    checkpointsRestantes = flagNumber;
    switch(pistaAtual){
        case 1:
            selecaoPista(pista1);
            break;
        case 2:
            selecaoPista(pista2);
            break;
        case 3:
            selecaoPista(pista3);
            break
        case 4:
            selecaoPista(pista4);
            break;
        case 5:
            selecaoPista(pista5);
            break;
        default:
            break;
    }
    rampaType = pistaAtual;
    resetaVoltaAtual();
    resetaPosicaoCheckpointMudancaPista();
    resetaPosicaoRampasMudancaPista();
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
}

function reposicionaPlayer(dir){
    //player.alternaSpotLight(pistaAtual);
    player.position.set(posicionamentoChegada[0].getComponent(0) + size, 1.8*size, posicionamentoChegada[0].getComponent(2) - size);
    switch(dir){
        case 'left':
            player.lookAt(0,0,100000);
            break;
        case 'right':
            player.lookAt(0,0,-100000);
            break;
        case 'up':
            player.lookAt(-100000,0,0);
            break;
        case 'down':
            player.lookAt(100000,0,0);
            break;
        default:
            player.lookAt(0,0,100000);
    }
}

function alternaPlano(){
    switch(pistaAtual){
        case 1:
            plane1.visible = true;
            plane2A.visible = false;
            plane2B.visible = false;
            plane3.visible = false;
            plane4.visible = false;
            plane5.visible = false;
            sky1.visible = true;
            sky2.visible = false;
            sky3.visible = false;
            sky4.visible = false;
            sky5.visible = false;
            break;
        case 2:
            plane1.visible = false;
            plane2A.visible = true;
            plane2B.visible = true;
            plane3.visible = false;
            plane4.visible = false;
            plane5.visible = false;
            sky1.visible = false;
            sky2.visible = true;
            sky3.visible = false;
            sky4.visible = false;
            sky5.visible = false;
            break;
        case 3:
            plane1.visible = false;
            plane2A.visible = false;
            plane2B.visible = false;
            plane3.visible = true;
            plane4.visible = false;
            plane5.visible = false;
            sky1.visible = false;
            sky2.visible = false;
            sky3.visible = true;
            sky4.visible = false;
            sky5.visible = false;
            break;
        case 4:
            plane1.visible = false;
            plane2A.visible = false;
            plane2B.visible = false;
            plane3.visible = false;
            plane4.visible = true;
            plane5.visible = false;
            sky1.visible = false;
            sky2.visible = false;
            sky3.visible = false;
            sky4.visible = true;
            sky5.visible = false;
            break;
        case 5:
            plane1.visible = false;
            plane2A.visible = false;
            plane2B.visible = false;
            plane3.visible = false;
            plane4.visible = false;
            plane5.visible = true;
            sky1.visible = false;
            sky2.visible = false;
            sky3.visible = false;
            sky4.visible = false;
            sky5.visible = true;
            break;
        default:
    }
}

//-------------------------------------------------------------------------------
//-------------------------------------------------------------------------------
// Bounding Boxes
//-------------------------------------------------------------------------------
//-------------------------------------------------------------------------------
const helper3 = new THREE.Box3Helper( playerBox3, 0xffff00 );
helper3.visible = false;
scene.add( helper3 );

function atualizaBoundingPlayer(){
    player.remove(ghostguide);
    player.remove(dirguide);
    player.remove(playerIcon)
    playerboxSetada = true;
    playerBox3.setFromObject(player);
    player.add(ghostguide);
    player.add(dirguide);
    player.add(playerIcon)
}

function boundingBoxesUpdate(){
    atualizaBoundingPlayer();
}



//-------------------------------------------------------------------------------
//-------------------------------------------------------------------------------
// Controles
//-------------------------------------------------------------------------------
//-------------------------------------------------------------------------------
var buttons = new Buttons(onButtonDown, onButtonUp);

function sync(dt) {
    if(actions.pulaFase){
        mapa++;
        if(mapa >=6){
            mapa = 1;
        }
    }
    if(actions.mudaCamera){
        if (!panoramicotraseiro) {
            cameraHolder.remove(camera);
            cameraHolder2.add(camera);
            panoramicotraseiro = !panoramicotraseiro;
        } else {
            cameraHolder2.remove(camera);
            cameraHolder.add(camera);
            panoramicotraseiro = !panoramicotraseiro;
        }
    }
    if (actions.acceleration) {
        carroAcelerando = true;
        speedForward = (Speed/100 + aceleracao/100)*redutor;
        //evita bug ao sair da pag, devido aos c??lculos que continuam sendo feitos em segundo plano pelo browser
        if(speedForward < -0.01){
            speedForward = 1;
            aceleracao = 1;
        }
        player.accelerate(speedForward);
        speedModulo = speedForward;
        player.defaultUpdate();
    }
    if (actions.braking) {
        carroFreiando = true
        speedBackward = (-Speed/100 + freia/100)*redutor;
        //evita bug ao sair da pag, devido aos c??lculos que continuam sendo feitos em segundo plano pelo browser
        if(speedBackward > 0.01){
            speedBackward = -1;
            aceleracao = 1;
        }
        player.accelerate(speedBackward);
        speedModulo = -speedBackward;
        player.defaultUpdate();
    }
    if (actions.left) {
        if(aceleracao > 1 || freia < -1){
            player.turnLeft(5);
        }
        if(panoramicotraseiro == true){
            ghostguide.rotateY(degreesToRadians(5));
        }
    }
    else {
        if (actions.right) {
            if(aceleracao > 1 || freia < -1){
                player.turnRight(5);
            }
            if(panoramicotraseiro == true){
                ghostguide.rotateY(degreesToRadians(-5));
            }
        }
        else {
            carroAcelerando = false;
            carroFreiando = false
            player.defaultUpdate();
        }
    }
}

function addJoysticks(){
	// Details in the link bellow:
	// https://yoannmoi.net/nipplejs/

	let joystickL = nipplejs.create({
		zone: document.getElementById('joystickWrapper1'),
		mode: 'static',
		lockX: true, // only move on the Y axis
		position: { top: '-80px', left: '80px' }
	});

	joystickL.on('move', function (evt, data) {
		const steer = data.vector.x;
		actions.left = actions.right = false;
		if(steer > 0) actions.right = true;
		if(steer < 0) actions.left = true;
	})

	joystickL.on('end', function (evt) {
		actions.left = actions.right = false;
	})
}

function onButtonDown(event) {
	switch(event.target.id)
	{
		case "A":
			actions.braking = false;
			actions.acceleration = true;
		break;
		case "B":
			actions.braking = true;
			actions.acceleration = false;
		break;
        case "Start":
			actions.mudaCamera = true;
		break;
        case "Select":
			actions.pulaFase = true;
		break;
		case "full":
			buttons.setFullScreen();
		break;
	}
}

function onButtonUp(event) {
	actions.acceleration = false;
	actions.braking = false;
    actions.mudaCamera = false;
    actions.pulaFase = false;
}

var keyboard = new KeyboardState();
var Speed = 40;
var aceleracao = 1;
var freia = -1;
var redutor = 1;
var speedForward = 0;
var speedBackward = 0;
var tempoJogoAnterior = 0;
var panoramico = false;
var panoramicotraseiro = true;
var mapa = 1;
function selecaoMapa(){
    if (mapa == 1 && pistaAtual != 1){
        pistaAtual = 1;
        newflagNumber = 9;
        newRVNumber = 12;
        newRHNumber = 10;
        configuraPistas(newflagNumber, newRVNumber, newRHNumber);
        limpaProps();
        resetaVariaveis();
        reposicionaPlayer('left');
        alternaPlano();
        carregaProps();
    }
    else if (mapa == 2 && pistaAtual != 2){
        pistaAtual = 2;
        newflagNumber = 8;
        newRVNumber = 12;
        newRHNumber = 10;
        configuraPistas(newflagNumber, newRVNumber, newRHNumber);
        limpaProps();
        resetaVariaveis();
        reposicionaPlayer('left');
        alternaPlano();
        carregaProps();
    }
    else if (mapa == 3 && pistaAtual != 3){
        pistaAtual = 3;
        newflagNumber = 8;
        newRVNumber = 22;
        newRHNumber = 22;
        configuraPistas(newflagNumber,  newRVNumber, newRHNumber);
        limpaProps();
        resetaVariaveis();
        reposicionaPlayer('down');
        alternaPlano();
        carregaProps();
    }
    else if (mapa == 4 && pistaAtual != 4){
        pistaAtual = 4;
        newflagNumber = 11;
        newRVNumber = 14;
        newRHNumber = 14;
        configuraPistas(newflagNumber,  newRVNumber, newRHNumber);
        limpaProps();
        resetaVariaveis();
        reposicionaPlayer('left');
        alternaPlano();
        carregaProps();
    }
    else if (mapa == 5 && pistaAtual != 5){
        pistaAtual = 5;
        newflagNumber = 12;
        newRVNumber = 0;
        newRHNumber = 0;
        configuraPistas(newflagNumber, newRVNumber, newRHNumber);
        limpaProps();
        resetaVariaveis();
        reposicionaPlayer('right');
        alternaPlano();
        carregaProps();
    }
}



//-------------------------------------------------------------------------------
//-------------------------------------------------------------------------------
// Status da Partida
//-------------------------------------------------------------------------------
//-------------------------------------------------------------------------------

function atualizaStatusFinal(){

    var voltasDiv = document.getElementById("voltas");
    voltasDiv.style.position = 'absolute';
    voltasDiv.style.backgroundColor = "rgb(200,200,200)";
    voltasDiv.style.padding = "2px";
    voltasDiv.style.borderRadius = "5px";
    voltasDiv.innerHTML = "Voltas: " + voltas;
    voltasDiv.style.top = 0 + 'px';
    voltasDiv.style.left = window.innerWidth - 70 + 'px';


    var lapTotalDiv = document.getElementById("lapTotal");
    lapTotalDiv.style.position = 'absolute';
    lapTotalDiv.style.backgroundColor = "rgb(200, 200, 200)";
    lapTotalDiv.style.padding = "2px";
    lapTotalDiv.style.borderRadius = "5px";
    lapTotalDiv.style.width = "150px";
    var minutesTotal = ((anterior/1000 - tempoJogoAnterior)/60 - (anterior/1000 - tempoJogoAnterior)/60%1);
    var secondsTotal = ((anterior/1000 - tempoJogoAnterior)%60 - (anterior/1000 - tempoJogoAnterior)%60%1);
    if( minutesTotal < 10){
        lapTotalDiv.innerHTML = "Total Lap Time: " + "0" + (minutesTotal + ":" + secondsTotal );
        if(secondsTotal < 10){
            lapTotalDiv.innerHTML = "Total Lap Time: " + "0" + (minutesTotal + ":" + "0" + secondsTotal );
        }
        else{
            lapTotalDiv.innerHTML = "Total Lap Time: " + "0" + (minutesTotal + ":" + secondsTotal );
        }
    }
    else {
        lapTotalDiv.innerHTML = "Total Lap Time: " + (minutesTotal + ":" + secondsTotal );
    }
    lapTotalDiv.style.top =  window.innerHeight - 20 + 'px';
    lapTotalDiv.style.left = 0 + 'px';


    var lap1Div = document.getElementById("lap1");
    lap1Div.style.position = 'absolute';
    lap1Div.style.backgroundColor = "rgb(200, 200, 200)";
    lap1Div.style.padding = "2px";
    lap1Div.style.borderRadius = "5px";
    lap1Div.style.width = "150px";
    var minutesLap1 = (tempoTodasVoltas[0]/60 - tempoTodasVoltas[0]/60%1);
    var secondsLap1 = (tempoTodasVoltas[0]%60 - tempoTodasVoltas[0]%60%1);
    if( minutesLap1 < 10){
        lap1Div.innerHTML = "1st Lap: " + "0" + (minutesLap1 + ":" + secondsLap1 );
        if(secondsLap1 < 10){
            lap1Div.innerHTML = "1st Lap: " + "0" + (minutesLap1 + ":" + "0" + secondsLap1 );
        }
        else{
            lap1Div.innerHTML = "1st Lap: " + "0" + (minutesLap1 + ":" + secondsLap1 );
        }
    }
    else {
        lap1Div.innerHTML = "1st Lap: " + (minutesLap1 + ":" + secondsLap1 );
    }
    lap1Div.style.top = window.innerHeight - 120 + 'px';
    lap1Div.style.left = 0 + 'px';


    var lap2Div = document.getElementById("lap2");
    lap2Div.style.position = 'absolute';
    lap2Div.style.backgroundColor = "rgb(200, 200, 200)";
    lap2Div.style.padding = "2px";
    lap2Div.style.borderRadius = "5px";
    lap2Div.style.width = "150px";
    var minutesLap2 = (tempoTodasVoltas[1]/60 - tempoTodasVoltas[1]/60%1);
    var secondsLap2 = (tempoTodasVoltas[1]%60 - tempoTodasVoltas[1]%60%1);
    if( minutesLap2 < 10){
        lap2Div.innerHTML = "2nd Lap: " + "0" + (minutesLap2 + ":" + secondsLap2 );
        if(secondsLap2 < 10){
            lap2Div.innerHTML = "2nd Lap: " + "0" + (minutesLap2 + ":" + "0" + secondsLap2 );
        }
        else{
            lap2Div.innerHTML = "2nd Lap: " + "0" + (minutesLap2 + ":" + secondsLap2 );
        }
    }
    else {
        lap2Div.innerHTML = "2nd Lap: " + (minutesLap2 + ":" + secondsLap2 );
    }
    lap2Div.style.top = window.innerHeight - 100 + 'px';
    lap2Div.style.left = 0 + 'px';


    var lap3Div = document.getElementById("lap3");
    lap3Div.style.position = 'absolute';
    lap3Div.style.backgroundColor = "rgb(200, 200, 200)";
    lap3Div.style.padding = "2px";
    lap3Div.style.borderRadius = "5px";
    lap3Div.style.width = "150px";
    var minutesLap3 = (tempoTodasVoltas[2]/60 - tempoTodasVoltas[2]/60%1);
    var secondsLap3 = (tempoTodasVoltas[2]%60 - tempoTodasVoltas[2]%60%1);
    if( minutesLap3 < 10){
        lap3Div.innerHTML = "3rd Lap: " + "0" + (minutesLap3 + ":" + secondsLap3 );
        if(secondsLap3 < 10){
            lap3Div.innerHTML = "3rd Lap: " + "0" + (minutesLap3 + ":" + "0" + secondsLap3 );
        }
        else{
            lap3Div.innerHTML = "3rd Lap: " + "0" + (minutesLap3 + ":" + secondsLap3 );
        }
    }
    else {
        lap3Div.innerHTML = "3rd Lap: " + (minutesLap3 + ":" + secondsLap3 );
    }
    lap3Div.style.top = window.innerHeight - 80 + 'px';
    lap3Div.style.left = 0 + 'px';


    var lap4Div = document.getElementById("lap4");
    lap4Div.style.position = 'absolute';
    lap4Div.style.backgroundColor = "rgb(200, 200, 200)";
    lap4Div.style.padding = "2px";
    lap4Div.style.borderRadius = "5px";
    lap4Div.style.width = "150px";
    var minutesLap4 = (tempoTodasVoltas[3]/60 - tempoTodasVoltas[3]/60%1);
    var secondsLap4 = (tempoTodasVoltas[3]%60 - tempoTodasVoltas[3]%60%1);
    if( minutesLap4 < 10){
        lap4Div.innerHTML = "4th Lap: " + "0" + (minutesLap4 + ":" + secondsLap4 );
        if(secondsLap4 < 10){
            lap4Div.innerHTML = "4th Lap: " + "0" + (minutesLap4 + ":" + "0" + secondsLap4 );
        }
        else{
            lap4Div.innerHTML = "4th Lap: " + "0" + (minutesLap4 + ":" + secondsLap4 );
        }
    }
    else {
        lap4Div.innerHTML = "4th Lap: " + (minutesLap4 + ":" + secondsLap4 );
    }
    lap4Div.style.top = window.innerHeight - 60 + 'px';
    lap4Div.style.left = 0 + 'px';


    var melhorVoltaDiv = document.getElementById("melhorVolta");
    melhorVoltaDiv.style.position = 'absolute';
    melhorVoltaDiv.style.backgroundColor = "rgb(200, 200, 200)";
    melhorVoltaDiv.style.padding = "2px";
    melhorVoltaDiv.style.borderRadius = "5px";
    melhorVoltaDiv.style.width = "150px";
    var minutesMenor = (tempoMenorVolta/60 - tempoMenorVolta/60%1);
    var secondsMenor = (tempoMenorVolta%60 - tempoMenorVolta%60%1);
    if( minutesMenor < 10){
        melhorVoltaDiv.innerHTML = "Best Lap: " + "0" + (minutesMenor + ":" + secondsMenor );
        if(secondsMenor < 10){
            melhorVoltaDiv.innerHTML = "Best Lap: " + "0" + (minutesMenor + ":" + "0" + secondsMenor );
        }
        else{
            melhorVoltaDiv.innerHTML = "Best Lap: " + "0" + (minutesMenor + ":" + secondsMenor );
        }
    }
    else {
        melhorVoltaDiv.innerHTML = "Best Lap: " + (minutesMenor + ":" + secondsMenor );
    }
    melhorVoltaDiv.style.top = window.innerHeight - 40 + 'px';
    melhorVoltaDiv.style.left = 0 + 'px';

    var velocimetroDiv = document.getElementById("velocimetro");
    velocimetroDiv.style.position = 'absolute';
    velocimetroDiv.style.backgroundColor = "rgb(200, 200, 200)";
    velocimetroDiv.style.padding = "2px";
    velocimetroDiv.style.borderRadius = "5px";


    if(carroAcelerando || carroFreiando){
        velocimetroDiv.innerHTML = "Kph: " + (((speedModulo*100) - 20) - ((speedModulo*100) - 20)%1) + "." ;
    }
    else {
        velocimetroDiv.innerHTML = "Kph: " + 0 + "." + 0;
    }

    velocimetroDiv.style.top = 20 + 'px';
    velocimetroDiv.style.left = window.innerWidth - 70 + 'px';
}

function geraStatusFinal(){

    //numero de voltas
    var nDeVoltas = document.createElement('div');
    nDeVoltas.setAttribute("id", "voltas");
    document.body.appendChild(nDeVoltas)

    //tempo total
    var tempoTotal = document.createElement('div');
    tempoTotal.setAttribute("id", "lapTotal");
    document.body.appendChild(tempoTotal);

    //tempo lap 1
    var textotempoVolta1 = document.createElement('div');
    textotempoVolta1.setAttribute("id", "lap1");
    document.body.appendChild(textotempoVolta1);

    //tempo lap 2
    var textotempoVolta2 = document.createElement('div');
    textotempoVolta2.setAttribute("id", "lap2");
    document.body.appendChild(textotempoVolta2);

    //tempo lap 3
    var textotempoVolta3 = document.createElement('div');
    textotempoVolta3.setAttribute("id", "lap3");
    document.body.appendChild(textotempoVolta3);

    //tempo lap 4
    var textotempoVolta4 = document.createElement('div');
    textotempoVolta4.setAttribute("id", "lap4");
    document.body.appendChild(textotempoVolta4);

    //tempo menor volta
    var textotempoMenorVolta = document.createElement('div');
    textotempoMenorVolta.setAttribute("id", "melhorVolta")
    document.body.appendChild(textotempoMenorVolta);

    //velocimetro
    var textoVelocimetro = document.createElement('div');
    textoVelocimetro.setAttribute("id", "velocimetro");
    document.body.appendChild(textoVelocimetro);

}

//-------------------------------------------------------------------------------
//-------------------------------------------------------------------------------
// PostProcessing
//-------------------------------------------------------------------------------
//-------------------------------------------------------------------------------

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
    renderer.render(scene, camera);
    renderer.clearDepth();

    // Set virtual camera viewport
    var offset = 20;
    renderer.setViewport(offset, height-vcHeight-offset, vcWidth, vcHeight);  // Set virtual camera viewport
    renderer.setScissor(offset, height-vcHeight-offset, vcWidth, vcHeight); // Set scissor with the same size as the viewport
    renderer.setScissorTest(true); // Enable scissor to paint only the scissor are (i.e., the small viewport)
    renderer.setClearColor("rgb(60, 50, 150)");  // Use a darker clear color in the small viewport
    renderer.render(scene, virtualCamera);  // Render scene of the virtual camera
}
cameraHolder.remove(camera);
cameraHolder2.add(camera);

var syncList = [];
var actions = {};
syncList.push(sync);

geraStatusFinal();
addJoysticks();


function render(t)
{
    stats.update();
    requestAnimationFrame(render);
    selecaoMapa();
    dt = (t - anterior) / 100;
    anterior = t;
	for (var i = 0; i < syncList.length; i++)
		syncList[i](dt);
    boundingBoxesUpdate();
    verificaColisores();
    aceleraCarro(aceleracao);
    freiaCarro(freia);
    player.defaultUpdate();

    //setagem de camera
    posAtual.set(player.position.getComponent(0), player.position.getComponent(1), player.position.getComponent(2));

    cameraHolder.lookAt(ghostguide.getWorldPosition(new THREE.Vector3()));
    camera.fov = 20;
    camera.updateProjectionMatrix();
    cameraHolder2.lookAt(ghostguide.getWorldPosition(new THREE.Vector3()));
    if(panoramicotraseiro){
        camera.fov = 120;
        camera.updateProjectionMatrix();
    }
    cameraHolder.position.set(player.position.getComponent(0)+60, player.position.getComponent(1)+80, player.position.getComponent(2)-50);
    cameraHolder.rotateY(degreesToRadians(180));
    cameraHolder2.rotateY(degreesToRadians(180));

    //controle de voltas
    atualizaStatusFinal();
    controlledRender(t);
}

var dt, anterior = 0;
render();