import * as THREE from  '../build/three.module.js';
import Stats from       '../build/jsm/libs/stats.module.js';
import {GUI} from       '../build/jsm/libs/dat.gui.module.js';
import KeyboardState from '../libs/util/KeyboardState.js';
import {pista1 as pista1} from './pistas/pista1.js';
import {pista2 as pista2} from './pistas/pista2.js';
import {pista3 as pista3} from './pistas/pista3.js';
import {pista4 as pista4} from './pistas/pista4.js';
import {pista5 as pista5} from './pistas/pista5.js';
import Pista from './Pista.js';
import { LambertTestCar } from './LambertTestCar.js';
import { CyberTruck } from './CyberTruck.js';
import { Turbina } from './Turbina.js';
import { Pokey } from './Pokey.js';
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
// Scene e Renderer Creation
//-------------------------------------------------------------------------------
//-------------------------------------------------------------------------------

//-------------------------------------------------------------------------------
// Scene
//-------------------------------------------------------------------------------
var stats = new Stats();          // To show FPS information
var scene = new THREE.Scene();    // Create main scene
var renderer = new THREE.WebGLRenderer({antialias: true, preserveDrawingBuffer: true });
renderer.shadowMap.enabled = true;
renderer.shadowMapSoft = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
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
  camera.layers.enable(1);

//-------------------------------------------------------------------------------
// Light
//-------------------------------------------------------------------------------

var ambientColor = "rgb(100,100,100)";
var ambientLight = new THREE.AmbientLight(ambientColor, 0.5);
ambientLight.castShadow = false;
scene.add( ambientLight );

var lightPosition = new THREE.Vector3(300, 200, 50);

var dirLight = new THREE.DirectionalLight(0xffffff, 3);
dirLight.shadow.mapSize.width = 2048;
dirLight.shadow.mapSize.height = 2048;
dirLight.castShadow = true;
camera.add(dirLight);

dirLight.shadow.camera.left = -50;
dirLight.shadow.camera.right = 200;
dirLight.shadow.camera.top = 100;
dirLight.shadow.camera.bottom = -100;

dirLight.shadow.mapSize.width = 2048; // default
dirLight.shadow.mapSize.height = 2048; // default
dirLight.shadow.camera.near = 100; // default
dirLight.shadow.camera.far = 500; // default

scene.add(dirLight.target);

scene.add(dirLight.target);
dirLight.target = camera;
// set the dirlight to follow camera
dirLight.position.set(lightPosition);
scene.add( camera );
dirLight.position.copy(lightPosition);
dirLight.intensity = 1.5;

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
const cubeLoader = new THREE.CubeTextureLoader();

//track1
const moonTexture = loader.load( 'texture/track1/moon.jpg' );
const blackholeTexture = loader.load( 'texture/track1/blackhole.jpg' );

const groundtexture1 = loader.load( 'texture/track1/sand.jpg' );
const skyTexture = loader.load( 'texture/track1/sky.jpg' );

let materialArray1 = [];
let texture_1ft = loader.load( 'texture/track1/penguins/arid_ft.jpg');
let texture_1bk = loader.load( 'texture/track1/penguins/arid_bk.jpg');
let texture_1up = loader.load( 'texture/track1/penguins/arid_up.jpg');
let texture_1dn = loader.load( 'texture/track1/penguins/arid_dn.jpg');
let texture_1rt = loader.load( 'texture/track1/penguins/arid_rt.jpg');
let texture_1lf = loader.load( 'texture/track1/penguins/arid_lf.jpg');
texture_1ft.anisotropy = renderer.capabilities.getMaxAnisotropy();
texture_1bk.anisotropy = renderer.capabilities.getMaxAnisotropy();
texture_1up.anisotropy = renderer.capabilities.getMaxAnisotropy();
texture_1dn.anisotropy = renderer.capabilities.getMaxAnisotropy();
texture_1rt.anisotropy = renderer.capabilities.getMaxAnisotropy();
texture_1lf.anisotropy = renderer.capabilities.getMaxAnisotropy();
materialArray1.push(new THREE.MeshBasicMaterial( { map: texture_1ft }));
materialArray1.push(new THREE.MeshBasicMaterial( { map: texture_1bk }));
materialArray1.push(new THREE.MeshBasicMaterial( { map: texture_1up }));
materialArray1.push(new THREE.MeshBasicMaterial( { map: texture_1dn }));
materialArray1.push(new THREE.MeshBasicMaterial( { map: texture_1rt }));
materialArray1.push(new THREE.MeshBasicMaterial( { map: texture_1lf }));
for (let i = 0; i < 6; i++){
    materialArray1[i].side = THREE.BackSide;
    materialArray1[i].map.generateMipmaps = true;
    materialArray1[i].map.minFilter =  THREE.LinearMipmapLinearFilter;
    materialArray1[i].map.magFilter = THREE.LinearFilter;
}

//track2
const retroTexture = loader.load( 'texture/track2/retrowave3.png');
const groundtexture2A = loader.load( 'texture/track2/neonPads.jpg');
const groundtexture2B = loader.load( 'texture/track2/neonWave.jpg');
const skyTexture2 = loader.load( 'texture/track2/retrowave.png');

let materialArray2 = [];
let texture_2ft = loader.load( 'texture/track2/retrowave2/px.png');
let texture_2bk = loader.load( 'texture/track2/retrowave2/nx.png');
let texture_2up = loader.load( 'texture/track2/retrowave2/py.png');
let texture_2dn = loader.load( 'texture/track2/retrowave2/ny.png');
let texture_2rt = loader.load( 'texture/track2/retrowave2/pz.png');
let texture_2lf = loader.load( 'texture/track2/retrowave2/nz.png');
texture_2ft.anisotropy = renderer.capabilities.getMaxAnisotropy();
texture_2bk.anisotropy = renderer.capabilities.getMaxAnisotropy();
texture_2up.anisotropy = renderer.capabilities.getMaxAnisotropy();
texture_2dn.anisotropy = renderer.capabilities.getMaxAnisotropy();
texture_2rt.anisotropy = renderer.capabilities.getMaxAnisotropy();
texture_2lf.anisotropy = renderer.capabilities.getMaxAnisotropy();
materialArray2.push(new THREE.MeshBasicMaterial( { map: texture_2ft }));
materialArray2.push(new THREE.MeshBasicMaterial( { map: texture_2bk }));
materialArray2.push(new THREE.MeshBasicMaterial( { map: texture_2up }));
materialArray2.push(new THREE.MeshBasicMaterial( { map: texture_2dn }));
materialArray2.push(new THREE.MeshBasicMaterial( { map: texture_2rt }));
materialArray2.push(new THREE.MeshBasicMaterial( { map: texture_2lf }));
for (let i = 0; i < 6; i++){
    materialArray2[i].side = THREE.BackSide;
    materialArray2[i].map.generateMipmaps = true;
    materialArray2[i].map.minFilter =  THREE.LinearMipmapLinearFilter;
    materialArray2[i].map.magFilter = THREE.LinearFilter;
}

//track3
const groundtexture3 = loader.load( 'texture/track3/magma3.jpg' );
const skyTexture3 = loader.load( 'texture/track3/bowserCastle.jpg');
let materialArray3 = [];
let texture_3ft = loader.load( 'texture/track3/penguins/barren_ft.jpg');
let texture_3bk = loader.load( 'texture/track3/penguins/barren_bk.jpg');
let texture_3up = loader.load( 'texture/track3/penguins/barren_up.jpg');
let texture_3dn = loader.load( 'texture/track3/penguins/barren_dn.jpg');
let texture_3rt = loader.load( 'texture/track3/penguins/barren_rt.jpg');
let texture_3lf = loader.load( 'texture/track3/penguins/barren_lf.jpg');
texture_3ft.anisotropy = renderer.capabilities.getMaxAnisotropy();
texture_3bk.anisotropy = renderer.capabilities.getMaxAnisotropy();
texture_3up.anisotropy = renderer.capabilities.getMaxAnisotropy();
texture_3dn.anisotropy = renderer.capabilities.getMaxAnisotropy();
texture_3rt.anisotropy = renderer.capabilities.getMaxAnisotropy();
texture_3lf.anisotropy = renderer.capabilities.getMaxAnisotropy();
materialArray3.push(new THREE.MeshBasicMaterial( { map: texture_3ft }));
materialArray3.push(new THREE.MeshBasicMaterial( { map: texture_3bk }));
materialArray3.push(new THREE.MeshBasicMaterial( { map: texture_3up }));
materialArray3.push(new THREE.MeshBasicMaterial( { map: texture_3dn }));
materialArray3.push(new THREE.MeshBasicMaterial( { map: texture_3rt }));
materialArray3.push(new THREE.MeshBasicMaterial( { map: texture_3lf }));
for (let i = 0; i < 6; i++){
    materialArray3[i].side = THREE.BackSide;
    materialArray3[i].map.generateMipmaps = true;
    materialArray3[i].map.minFilter =  THREE.LinearMipmapLinearFilter;
    materialArray3[i].map.magFilter = THREE.LinearFilter;
}


//track4
const groundtexture4 = loader.load( 'texture/track4/iceField.jpg' );
const skyTexture4 = loader.load( 'texture/track4/sunSky.jpg' );


let materialArray4 = [];
let texture_4ft = loader.load( 'texture/track4/eso0932/px_eso0932a.jpg');
let texture_4bk = loader.load( 'texture/track4/eso0932/nx_eso0932a.jpg');
let texture_4up = loader.load( 'texture/track4/eso0932/py_eso0932a.jpg');
let texture_4dn = loader.load( 'texture/track4/eso0932/ny_eso0932a.jpg');
let texture_4rt = loader.load( 'texture/track4/eso0932/pz_eso0932a.jpg');
let texture_4lf = loader.load( 'texture/track4/eso0932/nz_eso0932a.jpg');
texture_4ft.anisotropy = renderer.capabilities.getMaxAnisotropy();
texture_4bk.anisotropy = renderer.capabilities.getMaxAnisotropy();
texture_4up.anisotropy = renderer.capabilities.getMaxAnisotropy();
texture_4dn.anisotropy = renderer.capabilities.getMaxAnisotropy();
texture_4rt.anisotropy = renderer.capabilities.getMaxAnisotropy();
texture_4lf.anisotropy = renderer.capabilities.getMaxAnisotropy();
materialArray4.push(new THREE.MeshBasicMaterial( { map: texture_4ft }));
materialArray4.push(new THREE.MeshBasicMaterial( { map: texture_4bk }));
materialArray4.push(new THREE.MeshBasicMaterial( { map: texture_4up }));
materialArray4.push(new THREE.MeshBasicMaterial( { map: texture_4dn }));
materialArray4.push(new THREE.MeshBasicMaterial( { map: texture_4rt }));
materialArray4.push(new THREE.MeshBasicMaterial( { map: texture_4lf }));
for (let i = 0; i < 6; i++){
    materialArray4[i].side = THREE.BackSide;
    materialArray4[i].map.generateMipmaps = true;
    materialArray4[i].map.minFilter =  THREE.LinearMipmapLinearFilter;
    materialArray4[i].map.magFilter = THREE.LinearFilter;
}
//track5
const groundtexture5 = loader.load( 'texture/track5/sand.jpg' );
const skyTexture5 = loader.load( 'texture/track5/sunsky.png' );
let materialArray5 = [];
let texture_5ft = loader.load( 'texture/track5/penguins/trouble_ft.jpg');
let texture_5bk = loader.load( 'texture/track5/penguins/trouble_bk.jpg');
let texture_5up = loader.load( 'texture/track5/penguins/trouble_up.jpg');
let texture_5dn = loader.load( 'texture/track5/penguins/trouble_dn.jpg');
let texture_5rt = loader.load( 'texture/track5/penguins/trouble_rt.jpg');
let texture_5lf = loader.load( 'texture/track5/penguins/trouble_lf.jpg');
texture_5ft.anisotropy = renderer.capabilities.getMaxAnisotropy();
texture_5bk.anisotropy = renderer.capabilities.getMaxAnisotropy();
texture_5up.anisotropy = renderer.capabilities.getMaxAnisotropy();
texture_5dn.anisotropy = renderer.capabilities.getMaxAnisotropy();
texture_5rt.anisotropy = renderer.capabilities.getMaxAnisotropy();
texture_5lf.anisotropy = renderer.capabilities.getMaxAnisotropy();
materialArray5.push(new THREE.MeshBasicMaterial( { map: texture_5ft }));
materialArray5.push(new THREE.MeshBasicMaterial( { map: texture_5bk }));
materialArray5.push(new THREE.MeshBasicMaterial( { map: texture_5up }));
materialArray5.push(new THREE.MeshBasicMaterial( { map: texture_5dn }));
materialArray5.push(new THREE.MeshBasicMaterial( { map: texture_5rt }));
materialArray5.push(new THREE.MeshBasicMaterial( { map: texture_5lf }));
for (let i = 0; i < 6; i++){
    materialArray5[i].side = THREE.BackSide;
    materialArray5[i].map.generateMipmaps = true;
    materialArray5[i].map.minFilter =  THREE.LinearMipmapLinearFilter;
    materialArray5[i].map.magFilter = THREE.LinearFilter;
}


//track0 - secret
const skyTextureSecret = loader.load( 'texture/secret/coconutMall.jpg' );
const flagTexture = loader.load( 'texture/secret/coconutFlagPole.png' );

var rampaTexture = loader.load( 'texture/neondots.png' );

var options = {
    generateMipmaps: true,
    minFilter: THREE.LinearMipmapLinearFilter,
    magFilter: THREE.LinearFilter
};
scene.background = new THREE.WebGLCubeRenderTarget( 1024, options ).fromEquirectangularTexture( renderer, skyTexture )

//-------------------------------------------------------------------------------
// Audio Manager
//-------------------------------------------------------------------------------
var assetsMng = new assetsManager();
assetsMng.loadAudio("startRace", "./soundAssets/startRace.mp3");

assetsMng.loadAudio("01-Milkyway", "./soundAssets/01-milkyWay.mp3");
assetsMng.loadAudio("02-VeridisQuo", "./soundAssets/02-veridisQuo.mp3");
assetsMng.loadAudio("03-BowserCastle", "./soundAssets/03-bowserCastle.mp3");
assetsMng.loadAudio("04-KoopaBeach", "./soundAssets/04-koopaBeach.mp3");
assetsMng.loadAudio("05-BigBlue", "./soundAssets/05-bigBlue.mp3");

assetsMng.loadAudio("00-CoconutMall", "./soundAssets/00-coconutMall.mp3");
assetsMng.loadAudio("winRace", "./soundAssets/winRace.mp3");



//-------------------------------------------------------------------------------
//-------------------------------------------------------------------------------
// Ambiente - Eixos e Plano
//-------------------------------------------------------------------------------
//-------------------------------------------------------------------------------
var blackholeMaterial = new THREE.MeshStandardMaterial( { map: blackholeTexture } );

var retrowaveMaterial = new THREE.MeshPhongMaterial( { map: retroTexture } );
retrowaveMaterial.side = THREE.BackSide;

groundtexture1.wrapS = groundtexture1.wrapT = THREE.RepeatWrapping;
groundtexture1.repeat.set( 50, 50 );
groundtexture1.anisotropy = 16;
var ground1Material = new THREE.MeshStandardMaterial( { map: groundtexture1} );

groundtexture2A.wrapS = groundtexture2A.wrapT = THREE.RepeatWrapping;
groundtexture2A.repeat.set( 50, 50 );
groundtexture2A.anisotropy = 16;
var ground2MaterialA = new THREE.MeshStandardMaterial( { map: groundtexture2A} );
//ground2MaterialA.glass = true;
//ground2MaterialA.reflectivity = 1.0;
//ground2MaterialA.refractionRatio = 1.5;

ground2MaterialA.transparent = true;
ground2MaterialA.opacity = 0.7;

groundtexture2B.wrapS = groundtexture2B.wrapT = THREE.RepeatWrapping;
groundtexture2B.repeat.set( 100, 100 );
groundtexture2B.anisotropy =  renderer.capabilities.getMaxAnisotropy();

var ground2MaterialB = new THREE.MeshStandardMaterial( { map: groundtexture2B} );
ground2MaterialB.transparent = true;
ground2MaterialB.opacity = 0.5;

groundtexture3.wrapS = groundtexture3.wrapT = THREE.RepeatWrapping;
groundtexture3.repeat.set( 50, 50 );
groundtexture3.anisotropy =  renderer.capabilities.getMaxAnisotropy();

var ground3Material = new THREE.MeshStandardMaterial( { map: groundtexture3} );

groundtexture4.wrapS = groundtexture4.wrapT = THREE.RepeatWrapping;
groundtexture4.repeat.set( 100, 100 );
groundtexture4.anisotropy =  renderer.capabilities.getMaxAnisotropy();

var ground4Material = new THREE.MeshStandardMaterial( { map: groundtexture4} );

groundtexture5.wrapS = groundtexture5.wrapT = THREE.RepeatWrapping;
groundtexture5.repeat.set( 1000, 1000 );
groundtexture5.anisotropy =  renderer.capabilities.getMaxAnisotropy();

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
plane1.position.x = 350;
plane1.position.y = -6.3;
plane1.position.z = 350;

plane2A.position.y = 0.0;
plane2A.rotation.x = - Math.PI / 2;
plane2A.position.y = -0.3;
plane2A.position.x = 350;
plane2A.position.y = -0.3;
plane2A.position.z = 350;
plane2A.visible = false;

plane2B.position.y = 0.0;
plane2B.rotation.x = - Math.PI / 2;
plane2B.position.x = 350;
plane2B.position.y = -300.3;
plane2B.position.z = 350;
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

skyTexture.wrapS = skyTexture.wrapT = THREE.RepeatWrapping;
skyTexture.anisotropy = renderer.capabilities.getMaxAnisotropy();

skyTexture2.wrapS = skyTexture2.wrapT = THREE.RepeatWrapping;
skyTexture2.anisotropy = renderer.capabilities.getMaxAnisotropy();

skyTexture3.wrapS = skyTexture3.wrapT = THREE.RepeatWrapping;
skyTexture3.anisotropy = renderer.capabilities.getMaxAnisotropy();

skyTexture4.wrapS = skyTexture4.wrapT = THREE.RepeatWrapping;
skyTexture4.anisotropy = renderer.capabilities.getMaxAnisotropy();

skyTexture5.wrapS = skyTexture5.wrapT = THREE.RepeatWrapping;
skyTexture5.anisotropy = renderer.capabilities.getMaxAnisotropy();

var sky1 = new THREE.Mesh(skyboxGeo, materialArray1);
sky1.position.set(0.0, skyboxSize/10  ,0.0)
sky1.scale.set(-1, 1, 1);
sky1.eulerOrder = 'XZY';
sky1.renderDepth = 1000.0;
sky1.visible = true;

var sky2 = new THREE.Mesh(skyboxGeo, materialArray2);
sky2.position.set(0.0, skyboxSize/10  ,0.0)
sky2.scale.set(-1, 1, 1);
sky2.eulerOrder = 'XZY';
sky2.renderDepth = 1000.0;
sky2.visible = false;

var sky3 = new THREE.Mesh(skyboxGeo, materialArray3);
sky3.position.set(0.0, skyboxSize/10  ,0.0)
sky3.scale.set(-1, 1, 1);
sky3.eulerOrder = 'XZY';
sky3.renderDepth = 1000.0;
sky3.visible = false;

var sky4 = new THREE.Mesh(skyboxGeo, materialArray4);
sky4.position.set(0.0, skyboxSize/10 ,0.0)
sky4.scale.set(-1, 1, 1);
sky4.eulerOrder = 'XZY';
sky4.renderDepth = 1000.0;
sky4.visible = false;

var sky5 = new THREE.Mesh(skyboxGeo, materialArray5);
sky5.position.set(0.0, skyboxSize/10  ,0.0)
sky5.scale.set(-1, 1, 1);
sky5.eulerOrder = 'XZY';
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
// Criação e Setagem dos Checkpoints
//-------------------------------------------------------------------------------
const checkpointRadius = 1.5*blocoSize;
var flagNumber = 9;

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
        if (k <= 5){
            console.log(k, "vermelho");
            todosCheckpoints[k].material.color.setHex(0xff0000);
        }
        else if (k > 5 && k <= 10){
            console.log(k, "verde");
            todosCheckpoints[k].material.color.setHex(0x00ff00);
        }
        else if (k > 10 && k < 15){
            console.log(k, "azul");
            todosCheckpoints[k].material.color.setHex(0x0000ff);
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
    /*if(pistaAtual == 2){
        posicaoCheckpoints.reverse();
    }*/
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
    console.log(posicionamentoCheckpoints);
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

//ghost guia pra direção mundial
const desvio2 = 10000;
var dirguide = createSphere(radius);
dirguide.position.set(0.0, 0.0, 2*radius + desvio2);

//ghost guia para a luz
var lightguide = createSphere(5*radius);
//lightguide.castShadow = true; //default is false
//lightguide.receiveShadow = false; //default
lightguide.position.set(0.0, 0.0, 2*radius + desvio);

//player
var player = new CyberTruck;
var playerNewType = new LambertTestCar;

player.scale.set(1.4,1.4,1.4);
player.position.set(posicionamentoChegada[0].getComponent(0) + size, 1.8*size, posicionamentoChegada[0].getComponent(2) - size);

player.add(ghostguide);
player.add(dirguide);
player.add(lightguide);

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
// Modelo de Chegada (Flags)
//-------------------------------------------------------------------------------


function createPole(size)
{
    var poleGeometry = new THREE.BoxGeometry(size, 2*size, size);
    var poleMaterial = new THREE.MeshBasicMaterial( { map: flagTexture } );
    var pole = new THREE.Mesh( poleGeometry, poleMaterial );
    pole.visible = false;
    return pole;
}

var flags = [];
var newflagNumber = 9;

function criaFlags(){
    for (var i = 0; i <= flagNumber-1; i++){
        var flag = createPole(20*size/2);
        flags.push(flag);
        flags[i].position.set(0, 20*size+20*size*i, 0);
        player.add(flags[i]);
    }
}
criaFlags();

function removeFlags(){
    for (var i = 0; i <= flagNumber-1; i++){
        scene.remove(flags[i]);
    }
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
// Moon
//-------------------------------------------------------------------------------
moonTexture.wrapS = moonTexture.wrapT = THREE.RepeatWrapping;
moonTexture.anisotropy =  renderer.capabilities.getMaxAnisotropy();

var moon = [];

function carregaMoon(){
    var moonMaterial = new THREE.MeshStandardMaterial( { map: moonTexture } );
    var sphereGeometry = new THREE.SphereGeometry(10*radius, 32, 32);
    var moonObj = new THREE.Mesh( sphereGeometry, moonMaterial );
    moonObj.position.set(centroPistaAtual.getComponent(0), 10*radius, centroPistaAtual.getComponent(2));
    moon.push(moonObj);
    scene.add(moon[0]);
}
carregaMoon();

function limpaMoon(){
    scene.remove(moon[0]);
}

function moonOrbit(){
    moon[0].rotateY(degreesToRadians(-1));
}

//-------------------------------------------------------------------------------
// GlassSphere
//-------------------------------------------------------------------------------

var glassSpheres = [];
function carregaGlassSpheres(){
    glassSpheres = [];
    for (let i = 0; i < 40; i++) {
        var novoglassSphere = new THREE.Mesh( new THREE.SphereGeometry( 100*Math.random(), 32,32 ), retrowaveMaterial );
        glassSpheres.push(novoglassSphere);
        var direcaoGlass = Math.random();
        if(direcaoGlass < 0.25){
            glassSpheres[i].position.set(350 + 150*Math.random(), -500 + 1000*Math.random(), 350 + 150*Math.random());
        }
        else if(direcaoGlass > 0.25 && direcaoGlass < 0.50){
            glassSpheres[i].position.set(350 + 150*Math.random(), -500 + 1000*Math.random(), 350 - 150*Math.random());
        }
        else if(direcaoGlass > 0.50 && direcaoGlass < 0.75){
            glassSpheres[i].position.set(350 - 150*Math.random(), -500 + 1000*Math.random(), 350 - 150*Math.random());
        }
        else if(direcaoGlass > 0.25){
            glassSpheres[i].position.set(350 - 150*Math.random(), -500 + 1000*Math.random(), 350 + 150*Math.random());
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
// Ring
//-------------------------------------------------------------------------------

var ringTexture = loader.load( 'texture/track1/sand.jpg' );
ringTexture.wrapS = ringTexture.wrapT = THREE.RepeatWrapping;
ringTexture.repeat.set( 0.02, 0.1 );
ringTexture.anisotropy = 16;

var ring = new THREE.Mesh( new THREE.TorusGeometry( 2000, 100, 16, 32 ), new THREE.MeshStandardMaterial( { map: ringTexture} ) );
ring.rotateX(degreesToRadians(90));
ring.position.set(350,-50,350)
scene.add( ring );

var ring2 = new THREE.Mesh( new THREE.TorusGeometry( 100, 10, 16, 32 ), new THREE.MeshStandardMaterial( { map: ringTexture} ) );
ring2.rotateX(degreesToRadians(90));
ring2.position.set(350,-5,350)
scene.add( ring2 );

//-------------------------------------------------------------------------------
// Pokey
//-------------------------------------------------------------------------------

var pokey = [];
function carregaPokey(){
    pokey = [];
    for (let i = 0; i < 41; i++) {
        var novoPokey = new Pokey();
        pokey.push(novoPokey);
        pokey[i].position.set(350 + 60*Math.cos(i*Math.PI/4), -5.0, 350 + 60*Math.sin(i*Math.PI/4));
        if(i > 8){
            pokey[i].position.set(350 + 2000*Math.cos(i*Math.PI/16), 50.0, 350 + 2000*Math.sin(i*Math.PI/16));
            pokey[i].head.rotateY(degreesToRadians(180));
        }
        pokey[i].lookAt(moon[0].position);
        scene.add(pokey[i]);
    }
}
carregaPokey();
function limpaPokey(){
    for (let i = 0; i < pokey.length; i++) {
        scene.remove(pokey[i]);
    }
}

var pokeyCooldown = 0;
function pokeyDance()
{
    if(dt >=0){
        pokeyCooldown -= dt;
    }
    if(pokeyCooldown <= 0){
        for (let i = 0; i < pokey.length; i++) {
            if(pokey[i].update1){
                pokey[i].defaultUpdate1();
            }
            else if(pokey[i].update2){
                pokey[i].defaultUpdate2();
            }
        }
        pokeyCooldown = 3;
    }
}


//-------------------------------------------------------------------------------
// Eolics
//-------------------------------------------------------------------------------
var eolics = [];

function carregaEolics(){
    eolics = [];
    for (let i = 0; i < 100; i++) {
        var eolicTurbine = new Turbina();
        eolicTurbine.rotateY(degreesToRadians(180));
        eolics.push(eolicTurbine);
        eolics[i].position.set(-50+15*i, 0.0, -100 + 150*(i%15));
        scene.add(eolics[i]);
    }
}

function limpaEolics(){
    for (let i = 0; i < eolics.length; i++) {
        scene.remove(eolics[i]);
    }
}
var eolicsSpeed = 5.0;

function spinBlades()
{
    for (let i = 0; i < eolics.length; i++) {
        eolics[i].defaultUpdate(eolicsSpeed + eolics[i].turbo);
    }
}

//-------------------------------------------------------------------------------
// Props
//-------------------------------------------------------------------------------
function carregaProps(){
    switch(pistaAtual){
        case 1:
            carregaPokey();
            carregaMoon();
            break;
        case 2:
            carregaGlassSpheres();
            break;
        case 5:
            carregaEolics();
            break;
        default:
            break;
    }
}

//tinha algum bug q precisou do switch, n lembro qual
function limpaProps(){
    switch(pistaAtual){
        case 1:
            limpaPokey();
            limpaMoon();
            limpaGlassSphere();
            limpaEolics();
            break;
        case 2:
            limpaPokey();
            limpaMoon();
            limpaEolics();
            limpaGlassSphere();
            break;
        case 3:
            limpaPokey();
            limpaMoon();
            limpaGlassSphere();
            limpaEolics();
            break;
        case 4:
            limpaPokey();
            limpaMoon();
            limpaGlassSphere();
            limpaEolics();
            break;
        case 5:
            limpaPokey();
            limpaMoon();
            limpaGlassSphere();
            limpaEolics();
            break;
        default:
            break;
    }
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
            rampaTexture.anisotropy = 16;
            return new THREE.MeshStandardMaterial( { map: rampaTexture} );
        case 2:
            rampaTexture = loader.load( 'texture/track2/road2.jpg' );
            rampaTexture.wrapS = rampaTexture.wrapT = THREE.RepeatWrapping;
            rampaTexture.repeat.set( 0.02, 0.1 );
            rampaTexture.anisotropy = 16;
            return new THREE.MeshStandardMaterial( { map: rampaTexture} );
        case 3:
            rampaTexture = loader.load( 'texture/track3/stone.jpg' );
            rampaTexture.wrapS = rampaTexture.wrapT = THREE.RepeatWrapping;
            rampaTexture.repeat.set( 0.02, 0.1 );
            rampaTexture.anisotropy = 16;
            return new THREE.MeshStandardMaterial( { map: rampaTexture} );
        case 4:
            rampaTexture = loader.load( 'texture/track4/road4.jpg' );
            rampaTexture.wrapS = rampaTexture.wrapT = THREE.RepeatWrapping;
            rampaTexture.repeat.set( 0.02, 0.01 );
            rampaTexture.anisotropy = 16;
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
    console.log(todasRampasV);
    posicionaRampasV(posicionamentoRampasV);

    posicionamentoRampasH = encontraPosicaoRampasH();
    console.log(todasRampasH);
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

            //posiçoes com referencia à terceiraView
            //bloqueios laterais

            //a frente da rampa
            // +offset | limiteLateralFrontalRampa | -offset
            // absDiffX garante que nao vai bater na parede na entradinha pq o OnRampa vai ta desligado ainda
            if(!playerOnRampa && diffZ < (blocoSize/2 + 5*size) + offsetColisor && diffZ > (blocoSize/2-+ 5*size) - offsetColisor && absDiffX <= blocoSize/2 - 7*offsetColisor){
                player.translateZ( -speedModulo -2*offsetColisor);
                return;
            }
            //atrás da rampa
            // +offset | limiteLateralTraseiroRampa | -offset
            // absDiffX garante que nao vai bater na parede na entradinha pq o OnRampa vai ta desligado ainda
            if(!playerOnRampa && diffZ < -(blocoSize/2 - 5*size) + offsetColisor && diffZ > -(blocoSize/2 + 5*size) - offsetColisor && absDiffX <= blocoSize/2 - 7*offsetColisor){
                player.translateZ( -speedModulo -2*offsetColisor);
                return;
            }

            //posiçoes com referencia à terceiraView
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
                    player.turnDown(rampaAngle, speedModulo);
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
                    player.turnDown(rampaAngle, speedModulo);
                    inverseGravityDescidaSuaveV(player);
                    return;
                }
            }
        }
        else if(platforms[k].getBlockType() == "RAMPAH" && absDiffZ <= blocoSize/2 && absDiffX <= blocoSize/2){
            atualizaAlturaMaxH();
            /*console.log(alturaMaxH);
              keyLock = true;*/

            //posiçoes com referencia à terceiraView
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

            //posiçoes com referencia à terceiraView
            //pulos da rampa

            //tras para frente
            if(diffDirZ >= 0){
                //atrás da rampa
                if(diffZ < 0){
                    player.turnUp(rampaAngle, speedModulo);
                    inverseGravityH(player);
                    return;
                }
                //a frente da rampa
                else if(diffZ > 0){
                    player.turnDown(rampaAngle, speedModulo);
                    inverseGravityDescidaSuaveH(player);
                    return;
                }
            }
            //frente para trás
            if(diffDirZ <= 0){
                //a frente da rampa
                if(diffZ > 0){
                    player.turnUp(rampaAngle, speedModulo);
                    inverseGravityH(player);
                    return;
                }
                //atrás da rampa
                else if(diffZ < 0){
                    player.turnDown(rampaAngle, speedModulo);
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
    //metade da vel max pra conseguir saltar
    if(speedModulo >= 1.05){
        alturaMaxV = 30;
    }
    else{
        /*console.log("tipo V - Azul:", "Z: ", absDiffZ, "X: ", absDiffX);
        console.log("tipo V - Azul:", "Z: ", diffZ, "X: ", diffX);*/
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
    //metade da vel max pra conseguir saltar
    if(speedModulo >= 1.05){
        alturaMaxH = 30;
    }
    else{
        /*console.log("tipo H - Vermelho:", "Z: ", absDiffZ, "X: ", absDiffX);
        console.log("tipo H - Vermelho:", "Z: ", diffZ, "X: ", diffX);*/
        alturaMaxH = (blocoSize/2 - absDiffZ)* rampaAngle + 5*offsetColisor;
    }
}

//-------------------------------------------------------------------------------
// Colisor - Dentro - Pista (Desaceleração)
//-------------------------------------------------------------------------------
var diffRedutorX = 0;
var diffRedutorZ = 0;
function verificaDesaceleraFora(){
    testaRedutor();
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
// Colisor - Proximidade - Eolics
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
        flags[i].material.color.setHex(0xff0000)
    }
}


function verificaCheckpoint(checkpoint, player, i){
    if (Math.abs(checkpoint.position.getComponent(0) - player.position.getComponent(0)) < checkpointRadius &&
        Math.abs(checkpoint.position.getComponent(2) - player.position.getComponent(2)) < checkpointRadius){
        colidiuCheckpoints[i] = true;
        checkpointsRestantes--;
        flags[i].material.color.setHex(0x00ff00);
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
    verificaProximidadeEolic();
    verificaVoltas(player);
}

function configuraPistas(newflagNumber, newRVNumber, newRHNumber){
    limpaPista();
    limpaRampas();
    removeFlags();
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
    criaFlags();
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
    gerou = false;
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
            scene.background = skyTexture;
            plane1.visible = true;
            ring.visible = true;
            ring2.visible = true;
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
            scene.background = skyTexture2;
            plane1.visible = false;
            ring.visible = false;
            ring2.visible = false;
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
            scene.background = skyTexture3;
            plane1.visible = false;
            ring.visible = false;
            ring2.visible = false;
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
            scene.background = skyTexture4;
            plane1.visible = false;
            ring.visible = false;
            ring2.visible = false;
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
            scene.background = skyTexture5;
            plane1.visible = false;
            ring.visible = false;
            ring2.visible = false;
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

//delay pra evitar stop() e play() ao mesmo tempo
//se tiver baixo so aumentar o %30
var delayMusica = 1;
var tocar = false;
function selectSoundtrack(track){
    assetsMng.stop();
    //fazer liga e desliga musica mais a frente
    if(!tocar){
        //console.log("começou", delayMusica%30);
        while (delayMusica%120 != 0 ){
            //console.log("loopInfinito", delayMusica%30);
            delayMusica += 1;
            if (delayMusica%30 == 0){
                switch(track){
                    case 1:
                        assetsMng.play("01-Milkyway");
                        delayMusica = 0 ;
                        tocar = true;
                        break;
                    case 2:
                        assetsMng.play("02-VeridisQuo");
                        delayMusica = 0;
                        tocar = true;
                        break;
                    case 3:
                        assetsMng.play("03-BowserCastle");
                        delayMusica = 0;
                        tocar = true;
                        break;
                    case 4:
                        assetsMng.play("04-KoopaBeach");
                        delayMusica = 0;
                        tocar = true;
                        break;
                    case 5:
                        assetsMng.play("05-BigBlue");
                        delayMusica = 0;
                        tocar = true;
                        break;
                    default:
                        delayMusica = 0;
                        assetsMng.stop();
                        tocar = true;
                }
            }
        }
    }
    tocar = false;
    delayMusica = 1;
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
var Speed = 40;
var aceleracao = 1;
var freia = -1;
var redutor = 1;
var speedForward = 0;
var speedBackward = 0;
var tempoJogoAnterior = 0;
var panoramico = false;
var panoramicotraseiro = false;

function keyboardUpdate() {
    keyboard.update();

    if (keyboard.pressed("W")){
        camera.translateZ(10);
    }
    if (keyboard.pressed("S")){
        camera.translateZ(-10);
    }
    if (keyboard.pressed("A")){
        camera.rotateY(degreesToRadians(-10));
    }
    if (keyboard.pressed("D")){
        camera.rotateY(degreesToRadians(10));
    }
    //controles do player
    if (keyboard.pressed("X")){
        carroAcelerando = true;
        speedForward = (Speed/100 + aceleracao/100)*redutor;
        //evita bug ao sair da pag, devido aos cálculos que continuam sendo feitos em segundo plano pelo browser
        if(speedForward < -0.01){
            speedForward = 1;
            aceleracao = 1;
        }
        player.accelerate(speedForward);
        speedModulo = speedForward;
        player.defaultUpdate();
    }
    else if (keyboard.up("X")) {
        carroAcelerando = false;
        speedModulo = speedForward;
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
        speedModulo = -speedBackward;
        player.defaultUpdate();
    }
    else if (keyboard.up("down")) {
        carroFreiando = false
        speedModulo = -speedBackward;
        player.defaultUpdate();
    }

    if (keyboard.pressed("left")) {
        if(keyLock == false){
            if(aceleracao > 1 || freia < -1){
                player.turnLeft(5);
            }
            if(panoramicotraseiro == true){
                ghostguide.rotateY(degreesToRadians(5));
            }
        }
    }
    else if (keyboard.pressed("right")) {
        if(keyLock == false){
            if(aceleracao > 1 || freia < -1){
                player.turnRight(5);
            }
            if(panoramicotraseiro == true){
                ghostguide.rotateY(degreesToRadians(-5));
            }
        }
    }

    //mapas
    if (keyboard.pressed("1") && pistaAtual != 1){
        pistaAtual = 1;
        newflagNumber = 9;
        newRVNumber = 12;
        newRHNumber = 10;
        setaBloom();
        configuraPistas(newflagNumber, newRVNumber, newRHNumber);
        limpaProps();
        resetaVariaveis();
        reposicionaPlayer('left');
        alternaPlano();
        carregaProps();
        selectSoundtrack(1);
    }
    else if (keyboard.pressed("2") && pistaAtual != 2){
        pistaAtual = 2;
        newflagNumber = 8;
        newRVNumber = 12;
        newRHNumber = 10;
        setaBloom();
        configuraPistas(newflagNumber, newRVNumber, newRHNumber);
        limpaProps();
        resetaVariaveis();
        reposicionaPlayer('left');
        alternaPlano();
        carregaProps();
        selectSoundtrack(2);
    }
    else if (keyboard.pressed("3") && pistaAtual != 3){
        pistaAtual = 3;
        newflagNumber = 8;
        newRVNumber = 22;
        newRHNumber = 22;
        setaBloom();
        configuraPistas(newflagNumber,  newRVNumber, newRHNumber);
        limpaProps();
        resetaVariaveis();
        reposicionaPlayer('down');
        alternaPlano();
        carregaProps();
        selectSoundtrack(3);
    }
    else if (keyboard.pressed("4") && pistaAtual != 4){
        pistaAtual = 4;
        newflagNumber = 11;
        newRVNumber = 14;
        newRHNumber = 14;
        setaBloom();
        configuraPistas(newflagNumber,  newRVNumber, newRHNumber);
        limpaProps();
        resetaVariaveis();
        reposicionaPlayer('left');
        alternaPlano();
        carregaProps();
        selectSoundtrack(4);
    }
    else if (keyboard.pressed("5") && pistaAtual != 5){
        pistaAtual = 5;
        newflagNumber = 12;
        newRVNumber = 0;
        newRHNumber = 0;
        setaBloom();
        configuraPistas(newflagNumber, newRVNumber, newRHNumber);
        limpaProps();
        resetaVariaveis();
        reposicionaPlayer('right');
        alternaPlano();
        carregaProps();
        selectSoundtrack(5);
    }

    if (keyboard.up("space")) {
      if (!panoramicotraseiro) {
        cameraHolder.remove(camera);
        cameraHolder2.add(camera);
        panoramico = false;
        panoramicotraseiro = true;
        playerIcon.visible = false;
      } else {
        window.location.href = "carView.html";
      }
    }


    //cameras
    if (keyboard.pressed(",")){
        cameraHolder2.remove(camera);
        cameraHolder.add(camera);
        panoramicotraseiro = false;
        panoramico = true;
        playerIcon.visible = false;
    }
    else if (keyboard.pressed(".")){
        cameraHolder2.remove(camera);
        cameraHolder.add(camera);
        panoramico = false;
        panoramicotraseiro = false;
        playerIcon.visible = true;
    }
    else if (keyboard.pressed("/")){ //; em alguns teclados
        cameraHolder.remove(camera);
        cameraHolder2.add(camera);
        panoramico = false;
        panoramicotraseiro = true;
        playerIcon.visible = false;
    }

    //liga e desliga Bloom
    if (keyboard.down("B")){
        chaveBloom();
    }

    if (keyboard.down("M")){
        sobePersonSelecionado();
    }
    else if (keyboard.down("N")){
        descePersonSelecionado();
    }

    //mapa secreto
    if (keyboard.down("0")){
        scene.background = skyTextureSecret;
        assetsMng.play("00-CoconutMall");
        controls.add("* 0 to play Coconut Mall");
        plane1.visible = false;
        plane2A.visible = false;
        plane2B.visible = false;
        plane3.visible = false;
        plane4.visible = false;
        plane5.visible = false;
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

    //numero de voltas
    var nDeVoltas = document.createElement('div');
    nDeVoltas.setAttribute("id", "voltas");
    nDeVoltas.style.position = 'absolute';
    nDeVoltas.style.backgroundColor = "rgb(200,200,200)";
    nDeVoltas.style.padding = "2px";
    nDeVoltas.style.borderRadius = "5px";
    nDeVoltas.innerHTML = "Voltas: " + voltas;
    nDeVoltas.style.top = 0 + 'px';
    nDeVoltas.style.left = window.innerWidth - 70 + 'px';
    document.body.appendChild(nDeVoltas)

    //tempo total
    var tempoTotal = document.createElement('div');
    tempoTotal.setAttribute("id", "lapTotal");
    tempoTotal.style.position = 'absolute';
    tempoTotal.style.backgroundColor = "rgb(200, 200, 200)";
    tempoTotal.style.padding = "2px";
    tempoTotal.style.borderRadius = "5px";
    tempoTotal.style.width = "150px";

    var minutesTotal = ((anterior/1000 - tempoJogoAnterior)/60 - (anterior/1000 - tempoJogoAnterior)/60%1);
    var secondsTotal = ((anterior/1000 - tempoJogoAnterior)%60 - (anterior/1000 - tempoJogoAnterior)%60%1);

    if( minutesTotal < 10){
        tempoTotal.innerHTML = "Total Lap Time: " + "0" + (minutesTotal + ":" + secondsTotal );
        if(secondsTotal < 10){
            tempoTotal.innerHTML = "Total Lap Time: " + "0" + (minutesTotal + ":" + "0" + secondsTotal );
        }
        else{
            tempoTotal.innerHTML = "Total Lap Time: " + "0" + (minutesTotal + ":" + secondsTotal );
        }
    }
    else {
        tempoTotal.innerHTML = "Total Lap Time: " + (minutesTotal + ":" + secondsTotal );
    }

    tempoTotal.style.top =  window.innerHeight - 20 + 'px';
    tempoTotal.style.left = 0 + 'px';
    document.body.appendChild(tempoTotal);

    //tempo lap 1
    var textotempoVolta1 = document.createElement('div');
    textotempoVolta1.setAttribute("id", "lap1");
    textotempoVolta1.style.position = 'absolute';
    textotempoVolta1.style.backgroundColor = "rgb(200, 200, 200)";
    textotempoVolta1.style.padding = "2px";
    textotempoVolta1.style.borderRadius = "5px";
    textotempoVolta1.style.width = "150px";

    var minutesLap1 = (tempoTodasVoltas[0]/60 - tempoTodasVoltas[0]/60%1);
    var secondsLap1 = (tempoTodasVoltas[0]%60 - tempoTodasVoltas[0]%60%1);

    if( minutesLap1 < 10){
        textotempoVolta1.innerHTML = "1st Lap: " + "0" + (minutesLap1 + ":" + secondsLap1 );
        if(secondsLap1 < 10){
            textotempoVolta1.innerHTML = "1st Lap: " + "0" + (minutesLap1 + ":" + "0" + secondsLap1 );
        }
        else{
            textotempoVolta1.innerHTML = "1st Lap: " + "0" + (minutesLap1 + ":" + secondsLap1 );
        }
    }
    else {
        textotempoVolta1.innerHTML = "1st Lap: " + (minutesLap1 + ":" + secondsLap1 );
    }

    textotempoVolta1.style.top = window.innerHeight - 120 + 'px';
    textotempoVolta1.style.left = 0 + 'px';
    document.body.appendChild(textotempoVolta1);

    //tempo lap 2
    var textotempoVolta2 = document.createElement('div');
    textotempoVolta2.setAttribute("id", "lap2");
    textotempoVolta2.style.position = 'absolute';
    textotempoVolta2.style.backgroundColor = "rgb(200, 200, 200)";
    textotempoVolta2.style.padding = "2px";
    textotempoVolta2.style.borderRadius = "5px";
    textotempoVolta2.style.width = "150px";

    var minutesLap2 = (tempoTodasVoltas[1]/60 - tempoTodasVoltas[1]/60%1);
    var secondsLap2 = (tempoTodasVoltas[1]%60 - tempoTodasVoltas[1]%60%1);

    if( minutesLap2 < 10){
        textotempoVolta2.innerHTML = "2nd Lap: " + "0" + (minutesLap2 + ":" + secondsLap2 );
        if(secondsLap2 < 10){
            textotempoVolta2.innerHTML = "2nd Lap: " + "0" + (minutesLap2 + ":" + "0" + secondsLap2 );
        }
        else{
            textotempoVolta2.innerHTML = "2nd Lap: " + "0" + (minutesLap2 + ":" + secondsLap2 );
        }
    }
    else {
        textotempoVolta2.innerHTML = "2nd Lap: " + (minutesLap2 + ":" + secondsLap2 );
    }

    textotempoVolta2.style.top = window.innerHeight - 100 + 'px';
    textotempoVolta2.style.left = 0 + 'px';
    document.body.appendChild(textotempoVolta2);

    //tempo lap 3
    var textotempoVolta3 = document.createElement('div');
    textotempoVolta3.setAttribute("id", "lap3");
    textotempoVolta3.style.position = 'absolute';
    textotempoVolta3.style.backgroundColor = "rgb(200, 200, 200)";
    textotempoVolta3.style.padding = "2px";
    textotempoVolta3.style.borderRadius = "5px";
    textotempoVolta3.style.width = "150px";

    var minutesLap3 = (tempoTodasVoltas[2]/60 - tempoTodasVoltas[2]/60%1);
    var secondsLap3 = (tempoTodasVoltas[2]%60 - tempoTodasVoltas[2]%60%1);

    if( minutesLap3 < 10){
        textotempoVolta3.innerHTML = "3rd Lap: " + "0" + (minutesLap3 + ":" + secondsLap3 );
        if(secondsLap3 < 10){
            textotempoVolta3.innerHTML = "3rd Lap: " + "0" + (minutesLap3 + ":" + "0" + secondsLap3 );
        }
        else{
            textotempoVolta3.innerHTML = "3rd Lap: " + "0" + (minutesLap3 + ":" + secondsLap3 );
        }
    }
    else {
        textotempoVolta3.innerHTML = "3rd Lap: " + (minutesLap3 + ":" + secondsLap3 );
    }

    textotempoVolta3.style.top = window.innerHeight - 80 + 'px';
    textotempoVolta3.style.left = 0 + 'px';
    document.body.appendChild(textotempoVolta3);

    //tempo lap 4
    var textotempoVolta4 = document.createElement('div');
    textotempoVolta4.setAttribute("id", "lap4");
    textotempoVolta4.style.position = 'absolute';
    textotempoVolta4.style.backgroundColor = "rgb(200, 200, 200)";
    textotempoVolta4.style.padding = "2px";
    textotempoVolta4.style.borderRadius = "5px";
    textotempoVolta4.style.width = "150px";

    var minutesLap4 = (tempoTodasVoltas[3]/60 - tempoTodasVoltas[3]/60%1);
    var secondsLap4 = (tempoTodasVoltas[3]%60 - tempoTodasVoltas[3]%60%1);

    if( minutesLap4 < 10){
        textotempoVolta4.innerHTML = "4th Lap: " + "0" + (minutesLap4 + ":" + secondsLap4 );
        if(secondsLap4 < 10){
            textotempoVolta4.innerHTML = "4th Lap: " + "0" + (minutesLap4 + ":" + "0" + secondsLap4 );
        }
        else{
            textotempoVolta4.innerHTML = "4th Lap: " + "0" + (minutesLap4 + ":" + secondsLap4 );
        }
    }
    else {
        textotempoVolta4.innerHTML = "4th Lap: " + (minutesLap4 + ":" + secondsLap4 );
    }

    textotempoVolta4.style.top = window.innerHeight - 60 + 'px';
    textotempoVolta4.style.left = 0 + 'px';
    document.body.appendChild(textotempoVolta4);

    //tempo menor volta
    var textotempoMenorVolta = document.createElement('div');
    textotempoMenorVolta.setAttribute("id", "melhorVolta");
    textotempoMenorVolta.style.position = 'absolute';
    textotempoMenorVolta.style.backgroundColor = "rgb(200, 200, 200)";
    textotempoMenorVolta.style.padding = "2px";
    textotempoMenorVolta.style.borderRadius = "5px";
    textotempoMenorVolta.style.width = "150px";

    var minutesMenor = (tempoMenorVolta/60 - tempoMenorVolta/60%1);
    var secondsMenor = (tempoMenorVolta%60 - tempoMenorVolta%60%1);

    if( minutesMenor < 10){
        textotempoMenorVolta.innerHTML = "Best Lap: " + "0" + (minutesMenor + ":" + secondsMenor );
        if(secondsMenor < 10){
            textotempoMenorVolta.innerHTML = "Best Lap: " + "0" + (minutesMenor + ":" + "0" + secondsMenor );
        }
        else{
            textotempoMenorVolta.innerHTML = "Best Lap: " + "0" + (minutesMenor + ":" + secondsMenor );
        }
    }
    else {
        textotempoMenorVolta.innerHTML = "Best Lap: " + (minutesMenor + ":" + secondsMenor );
    }

    textotempoMenorVolta.style.top = window.innerHeight - 40 + 'px';
    textotempoMenorVolta.style.left = 0 + 'px';

    document.body.appendChild(textotempoMenorVolta);

    //velocimetro
    var textoVelocimetro = document.createElement('div');
    textoVelocimetro.setAttribute("id", "velocimetro");
    textoVelocimetro.style.position = 'absolute';
    textoVelocimetro.style.backgroundColor = "rgb(200, 200, 200)";
    textoVelocimetro.style.padding = "2px";
    textoVelocimetro.style.borderRadius = "5px";


    if(carroAcelerando || carroFreiando){
        textoVelocimetro.innerHTML = "Kph: " + (((speedModulo*100) - 20) - ((speedModulo*100) - 20)%1) + "." ;
    }
    else {
        textoVelocimetro.innerHTML = "Kph: " + 0 + "." + 0;
    }

    textoVelocimetro.style.top = 20 + 'px';
    textoVelocimetro.style.left = window.innerWidth - 70 + 'px';
    document.body.appendChild(textoVelocimetro);

}

function limpaStatusFinal(){
    var voltasDiv = document.getElementById("voltas");
    voltasDiv.remove();
    var lapTotalDiv = document.getElementById("lapTotal");
    lapTotalDiv.remove();
    var lap1Div = document.getElementById("lap1");
    lap1Div.remove();
    var lap2Div = document.getElementById("lap2");
    lap2Div.remove();
    var lap3Div = document.getElementById("lap3");
    lap3Div.remove();
    var lap4Div = document.getElementById("lap4");
    lap4Div.remove();
    var melhorVoltaDiv = document.getElementById("melhorVolta");
    melhorVoltaDiv.remove();
    var velocimetroDiv = document.getElementById("velocimetro");
    velocimetroDiv.remove();
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
    //bloom
    bloomThreshold: 0.32,
    bloomStrength: 0.32,
    bloomRadius: 1.0,
    bloomTrue: false,
    //player select
    characterSelect: 1,
    characters: 2
};

function chaveBloom(){
    params.bloomTrue = !params.bloomTrue;
}

function sobePersonSelecionado(){
    if(params.characterSelect < params.characters)
        params.characterSelect++;
    console.log("teste",params.characterSelect);
}

function descePersonSelecionado(){
    if(params.characterSelect > 1)
        params.characterSelect--;
    console.log("teste",params.characterSelect);
}

//Controle pra ver qual setagem e melhor para cada shader
/*
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
gui.add(params, 'characterSelect').min(1).max(2).step(1).onChange(function (value){
    personSelecionado = Number(value);
});
*/

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

/*function renderBloom(){
    renderer.autoClear = false;
    renderer.clear();
    bloomComposer.render();
    renderer.clearDepth();
    camera.layers.set(0);
    console.clear();
    renderer.render(scene.camera);
}*/

function setaBloom(){
    switch(pistaAtual){
        case 1:
            bloomPass.threshold = Number(0.32);
            bloomPass.strength = Number(0.32);
            bloomPass.radius = Number(1.0);
            break;
        case 2:
            bloomPass.threshold = Number(0.01);
            bloomPass.strength = Number(0.29);
            bloomPass.radius = Number(1.0);
            break
        case 3:
            bloomPass.threshold = Number(0.25);
            bloomPass.strength = Number(0.29);
            bloomPass.radius = Number(0.01);
            break;
        case 4:
            bloomPass.threshold = Number(0.05);
            bloomPass.strength = Number(0.25);
            bloomPass.radius = Number(0.92);
            break;
        case 5:
            bloomPass.threshold = Number(0.82);
            bloomPass.strength = Number(0.51);
            bloomPass.radius = Number(0.34);
            break;
        default:
            break;
    }
}

//-------------------------------------------------------------------------------
// Selecionador de Person - Não Implementado ainda
//-------------------------------------------------------------------------------

function selecionaPlayer(){
    console.log("selecionou")
    switch(params.characterSelect){
        case 1:
            player.visible = true;
            player2.visible = false;
            break;
        case 2:
            player.visible = true;
            player2.visible = true;
            break;
        default:
            player.visible = true;
            player2.visible = false;
            break;
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
    updateGUI();
    if(params.pixelizar){
        pixelComposer.render();
    }
    else if (params.bloomTrue){
        bloomComposer.render();
    }
    else {
        renderer.render(scene, camera);
    }
    renderer.clearDepth();

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
    dt = (t - anterior) / 100;
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
    cameraHolder2.lookAt(ghostguide.getWorldPosition(new THREE.Vector3()));
    cameraHolder.position.set(player.position.getComponent(0)+60, player.position.getComponent(1)+80, player.position.getComponent(2)-50);
    if (panoramico){
        cameraHolder.position.set(player.position.getComponent(0)+140, player.position.getComponent(1)+45, player.position.getComponent(2)-150);
    }
    cameraHolder.rotateY(degreesToRadians(180));
    cameraHolder2.rotateY(degreesToRadians(180));

    //controle de voltas
    delay+=1;
    if(delay%15 == 0 && gerou == false){
        geraStatusFinal();
    }
    if(delay%30 == 0 && gerou == false){
        limpaStatusFinal();
    }

    if(pistaAtual == 1){
        pokeyDance();
        moonOrbit();
    }
    if(pistaAtual == 5){
        spinBlades();
    }

    controlledRender(t);
}

var dt, anterior = 0;
//assetsMng.play("startRace");
selectSoundtrack(1);
render();