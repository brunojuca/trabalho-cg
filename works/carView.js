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
} from "../libs/util/util.js";
import { Car } from "./Car.js";
import KeyboardState from "../libs/util/KeyboardState.js";
import {assetsManager} from './assetsManager.js';

const loader = new THREE.TextureLoader();
const goldTexture = loader.load( 'texture/gold.jpg' );
const metallicTexture = loader.load( 'texture/platform.png' );
var metallicMaterial = new THREE.MeshStandardMaterial( { map: metallicTexture } );

var assetsMng = new assetsManager();
assetsMng.loadAudio("ROTS", "./assets/ridersOnTheStorm.mp3");
var carroGirando = false;

var stats = new Stats(); // To show FPS information
var scene = new THREE.Scene(); // Create main scene
var renderer = initRenderer(); // View function in util/utils
var camera = initCamera(new THREE.Vector3(0, -30, 15)); // Init camera in this position

var plataformaGeo = new THREE.CylinderGeometry(10, 10, 3, 40);
var plataformaMat = new THREE.MeshPhongMaterial();
var plataforma = new THREE.Mesh(plataformaGeo, plataformaMat);
plataforma.position.set(0, 0, -1.5);
plataforma.rotateX(degreesToRadians(90));
scene.add(plataforma);

// Enable mouse rotation, pan, zoom etc.
var trackballControls = new TrackballControls(camera, renderer.domElement);

//light
initDefaultSpotlight(scene, new THREE.Vector3(35, 20, 30)); // Use default light

// create the ground plane
var planeGeometry = new THREE.PlaneGeometry(20, 20);
planeGeometry.translate(0.0, 0.0, -0.02); // To avoid conflict with the axeshelper
var planeMaterial = new THREE.MeshBasicMaterial({
  color: "rgba(150, 150, 150)",
  side: THREE.DoubleSide,
});
var plane = new THREE.Mesh(planeGeometry, planeMaterial);

// add the plane to the scene
//scene.add(plane);

var player = new Car();
// position the player
player.position.set(0.0, 0.0, 1.0);
player.rotateX(degreesToRadians(90));
// add the player to the scene
scene.add(player);

var keyboard = new KeyboardState();
function keyboardUpdate() {
  keyboard.update();

  if (keyboard.pressed("X")) {
    player.accelerate(0);
  }

  if (keyboard.pressed("down")) {
    player.accelerate(-0.00001);
  }

  if (keyboard.pressed("left")) {
    player.turnLeft(0);
  } else if (keyboard.pressed("right")) {
    player.turnRight(0);
  }

  if (keyboard.down("0")){
    carroGirando = true;
    assetsMng.play("ROTS");
    scene.background = goldTexture;
    controls.add("0 to Ride on the Storm");
    var metallicMaterial = new THREE.MeshStandardMaterial( { map: metallicTexture } );
    var metalPlatform = new THREE.Mesh(plataformaGeo, metallicMaterial);
    metalPlatform.position.set(0, 0, -1.5);
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
