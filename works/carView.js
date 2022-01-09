import * as THREE from "../build/three.module.js";
import Stats from "../build/jsm/libs/stats.module.js";
import { TrackballControls } from "../build/jsm/controls/TrackballControls.js";
import {
  initRenderer,
  initCamera,
  InfoBox,
  onWindowResize,
  initDefaultSpotlight,
  initDefaultBasicLight,
  degreesToRadians,
  createGroundPlane,
  createLightSphere,
  SecondaryBox,
} from "../libs/util/util.js";
import { CyberTruck } from "./CyberTruck.js";
import KeyboardState from "../libs/util/KeyboardState.js";
import {assetsManager} from './assetsManager.js';

const loader = new THREE.TextureLoader();
const goldTexture = loader.load( 'texture/secret/gold.jpg' );
const metallicTexture = loader.load( 'texture/secret/platform.png' );
var metallicMaterial = new THREE.MeshStandardMaterial( { map: metallicTexture } );
var plataformaGeo = new THREE.CylinderGeometry(10, 10, 3, 40);

var assetsMng = new assetsManager();
assetsMng.loadAudio("ROTS", "./soundAssets/00-ridersOnTheStorm.mp3");
var carroGirando = false;

var stats = new Stats(); // To show FPS information
var scene = new THREE.Scene(); // Create main scene
var renderer = initRenderer(); // View function in util/utils
var camera = initCamera(new THREE.Vector3(0, -30, 15)); // Init camera in this position
// Enable mouse rotation, pan, zoom etc.
var trackballControls = new TrackballControls(camera, renderer.domElement);

//light
var spotlight = initDefaultSpotlight(camera, new THREE.Vector3(0, 5, 5)); // Use default light
spotlight.intensity = 7;

// set the spotlight to follow camera
scene.add( camera );
camera.add( spotlight.target );
spotlight.target.position.set( 0, 0, -1 );
spotlight.position.copy( camera.position );


var player = new CyberTruck();
// position the player
player.position.set(0.0, 0, 1.3);
player.rotateX(degreesToRadians(90));
// add the player to the scene
scene.add(player);

var keyboard = new KeyboardState();
function keyboardUpdate() {
  keyboard.update();

  if (keyboard.pressed("X")) {
    player.accelerate(0);
    lightHolder.translateX(10);
  }

  if (keyboard.pressed("down")) {
    player.accelerate(-0.00001);
    lightHolder.translateX(-10);
  }

  if (keyboard.pressed("left")) {
    player.turnLeft(0);
    lightHolder.translateZ(-10);
  } else if (keyboard.pressed("right")) {
    player.turnRight(0);
    lightHolder.translateZ(10);
  }

  if (keyboard.pressed("space")){
    window.location.href = "index.html";
  }

  if (keyboard.down("0")){
    carroGirando = true;
    assetsMng.play("ROTS");
    scene.background = goldTexture;
    controls.add("0 to Ride on the Storm");
    var metalPlatform = new THREE.Mesh(plataformaGeo, metallicMaterial);
    metalPlatform.position.set(0, 0, -1.8);
    metalPlatform.rotateX(degreesToRadians(90));
    scene.add(metalPlatform);
  }
}

// Listen window size changes
window.addEventListener(
  "resize",
  function () {
    onWindowResize(camera, renderer);
  },
  false
);

var controls = new InfoBox();
  controls.add("Controls: ");
  controls.addParagraph();
  controls.add("Use mouse left button to interact");
  controls.add("Mouse wheel to zoom");
  controls.show();

render();
function render() {
  keyboardUpdate();
  player.defaultUpdate();
  stats.update(); // Update FPS
  if(carroGirando){
    player.rotateY(degreesToRadians(0.1));
  }
  trackballControls.update(); // Enable mouse movements
  requestAnimationFrame(render);
  renderer.render(scene, camera); // Render scene
}
