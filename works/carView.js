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
import { Car } from "./car.js";
import KeyboardState from "../libs/util/KeyboardState.js";

var stats = new Stats(); // To show FPS information
var scene = new THREE.Scene(); // Create main scene
var renderer = initRenderer(); // View function in util/utils
var camera = initCamera(new THREE.Vector3(0, -30, 15)); // Init camera in this position

// Enable mouse rotation, pan, zoom etc.
var trackballControls = new TrackballControls(camera, renderer.domElement);

// Show axes (parameter is size of each axis)
var axesHelper = new THREE.AxesHelper(12);
scene.add(axesHelper);

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
scene.add(plane);

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
}

// Listen window size changes
window.addEventListener(
  "resize",
  function () {
    onWindowResize(camera, renderer);
  },
  false
);

render();
function render() {
  keyboardUpdate();
  player.defaultUpdate();
  stats.update(); // Update FPS
  trackballControls.update(); // Enable mouse movements
  requestAnimationFrame(render);
  renderer.render(scene, camera); // Render scene
}
