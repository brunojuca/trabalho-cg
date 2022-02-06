import * as THREE from  '../build/three.module.js';
import {GUI} from       '../build/jsm/libs/dat.gui.module.js';
import {ARjs}    from  '../libs/AR/ar.js';
import {GLTFLoader} from '../build/jsm/loaders/GLTFLoader.js';
import {InfoBox,
        SecondaryBox,
        initDefaultSpotlight,
        createGroundPlane,
        getMaxSize,
        onWindowResize,
        degreesToRadians,
        lightFollowingCamera} from "../libs/util/util.js";
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

var renderer	= new THREE.WebGLRenderer({antialias: true, alpha: true});
	renderer.setSize( 640, 480 );
	renderer.shadowMap.type = THREE.PCFSoftShadowMap;
	renderer.shadowMap.enabled = true;

var keyboard = new KeyboardState();
document.body.appendChild( renderer.domElement );
// init scene and camera
var scene	= new THREE.Scene();
var camera = new THREE.Camera();

//light
var spotlight = initDefaultSpotlight(camera, new THREE.Vector3(0, 5, 5)); // Use default light
spotlight.intensity = 7;

// set the spotlight to follow camera
scene.add( camera );
camera.add( spotlight.target );
spotlight.target.position.set( 0, 0, -1 );
spotlight.position.copy( camera.position );


// array of functions for the rendering loop
var onRenderFcts= [];

//----------------------------------------------------------------------------
// Handle arToolkitSource
// More info: https://ar-js-org.github.io/AR.js-Docs/marker-based/
//var arToolkitSource = new THREEx.ArToolkitSource({
var arToolkitSource = new ARjs.Source({
	// to read from the webcam
	sourceType : 'webcam',

	// to read from an image
	//sourceType : 'image',
	//sourceUrl : '../assets/AR/kanjiScene.jpg',

	// to read from a video
	//sourceType : 'video',
	//sourceUrl : '../assets/AR/kanjiScene.mp4'
})

arToolkitSource.init(function onReady(){

})

// handle resize
window.addEventListener('resize', function(){
	onResize()
})

function onResize(){
	arToolkitSource.onResizeElement()
	arToolkitSource.copyElementSizeTo(renderer.domElement)
	if( arToolkitContext.arController !== null ){
		arToolkitSource.copyElementSizeTo(arToolkitContext.arController.canvas)
	}
}

//----------------------------------------------------------------------------
// initialize arToolkitContext
//
// create atToolkitContext
//var arToolkitContext = new THREEx.ArToolkitContext({
var arToolkitContext = new ARjs.Context({
	cameraParametersUrl: '../libs/AR/data/camera_para.dat',
	detectionMode: 'mono',
})

// initialize it
arToolkitContext.init(function onCompleted(){
	// copy projection matrix to camera
	camera.projectionMatrix.copy( arToolkitContext.getProjectionMatrix() );
})

// update artoolkit on every frame
onRenderFcts.push(function(){
	if( arToolkitSource.ready === false )	return
	arToolkitContext.update( arToolkitSource.domElement )
	// update scene.visible if the marker is seen
	scene.visible = camera.visible
})

//----------------------------------------------------------------------------
// Create a ArMarkerControls
//
// init controls for camera
//var markerControls = new THREEx.ArMarkerControls(arToolkitContext, camera, {
var markerControls = new ARjs.MarkerControls(arToolkitContext, camera, {
	type : 'pattern',
	patternUrl : '../libs/AR/data/patt.kanji',
	changeMatrixMode: 'cameraTransformMatrix' // as we controls the camera, set changeMatrixMode: 'cameraTransformMatrix'
})
// as we do changeMatrixMode: 'cameraTransformMatrix', start with invisible scene
scene.visible = false

//----------------------------------------------------------------------------
// Adding object to the scene



var gltfArray = new Array();
var playAction = true;
var mixer = new Array();

loadGLTFFile('../assets/objects/', 'dog', 2.0, 0, true);
function loadGLTFFile(modelPath, modelFolder, desiredScale, angle, visibility)
{
  var loader = new GLTFLoader( );
  loader.load( modelPath + modelFolder + '/scene.gltf', function ( gltf ) {
    var obj = gltf.scene;
    obj.visible = visibility;
    obj.name = modelFolder;
    obj.traverse( function ( child ) {
      if ( child ) {
          child.castShadow = true;
      }
    });
    obj.traverse( function( node )
    {
      if( node.material ) node.material.side = THREE.DoubleSide;
    });

    var obj = normalizeAndRescale(obj, desiredScale);
    var obj = fixPosition(obj);
    obj.rotateY(degreesToRadians(angle));

    scene.add ( obj );
    gltfArray.push( obj );

    var mixerLocal = new THREE.AnimationMixer(obj);
    mixerLocal.clipAction( gltf.animations[0] ).play();
    mixer.push(mixerLocal);

    });
}

var player = new CyberTruck();
// position the player
player.position.set(0.0, 0.0, 0.0);
player.scale.set(0.2,0.2,0.2);
// add the player to the scene
scene.add(player);

// Normalize scale and multiple by the newScale
function normalizeAndRescale(obj, newScale)
{
  var scale = getMaxSize(obj); // Available in 'utils.js'
  obj.scale.set(newScale * (1.0/scale),
                newScale * (1.0/scale),
                newScale * (1.0/scale));
  return obj;
}

function fixPosition(obj)
{
  // Fix position of the object over the ground plane
  var box = new THREE.Box3().setFromObject( obj );
  if(box.min.y > 0)
    obj.translateY(-box.min.y);
  else
    obj.translateY(-1*box.min.y);
  return obj;
}

function createSphere(radius, widthSegments, heightSegments)
{
  var geometry = new THREE.SphereGeometry(radius, widthSegments, heightSegments, 0, Math.PI * 2, 0, Math.PI);
  var material = new THREE.MeshBasicMaterial({color:"rgb(255,255,50)"});
  var object = new THREE.Mesh(geometry, material);
    object.castShadow = true;
	object.visible = false;
  return object;
}

// controls which object should be rendered
var firstObject = true;

//----------------------------------------------------------------------------
// Render the whole thing on the page

// render the scene
onRenderFcts.push(function(){
	renderer.render( scene, camera );
})
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

  if (keyboard.pressed("space")){
    window.location.href = "index.html";
  }

  if (keyboard.down("0")){
    carroGirando = true;
    assetsMng.play("ROTS");
    var metalPlatform = new THREE.Mesh(plataformaGeo, metallicMaterial);
    metalPlatform.position.set(0.0, -1.0, 0.0);
    metalPlatform.scale.set(0.2,0.2,0.2);
    scene.add(metalPlatform);
  }
}

var controls = new InfoBox();
  controls.add("Controls: ");
  controls.addParagraph();
  controls.add("Use mouse left button to interact");
  controls.add("Mouse wheel to zoom");
  controls.show();

// run the rendering loop
requestAnimationFrame(function animate(nowMsec)
{
	var lastTimeMsec= null;
	// keep looping
	requestAnimationFrame( animate );
	keyboardUpdate();
	// measure time
	lastTimeMsec	= lastTimeMsec || nowMsec-1000/60
	var deltaMsec	= Math.min(200, nowMsec - lastTimeMsec)
	lastTimeMsec	= nowMsec
	// call each update function
	onRenderFcts.forEach(function(onRenderFct){
		onRenderFct(deltaMsec/1000, nowMsec/1000)
		// Animation control
        if(carroGirando){
            player.rotateY(degreesToRadians(0.1));
        }
		if (playAction) {
			for(var i = 0; i<mixer.length; i++)
				mixer[i].update( deltaMsec/5000 );
		}
	})
})
