import * as THREE from "../build/three.module.js";
import { GLTFLoader } from "../build/jsm/loaders/GLTFLoader.js";
import { degreesToRadians } from "../libs/util/util.js";

export class Obstacles extends THREE.Group {
  body;
  carregado;
  tipoColisao;

  constructor(modelPath, modelFolder, tipo) {
    super();
    let loader = new GLTFLoader();
    loader.load(modelPath + modelFolder + '/scene.gltf', (gltf) => this.onBodyLoad(gltf));
    this.tipoColisao = tipo;
  }

  onBodyLoad(gltf) {
    gltf.scene.traverse( function( node ) {
      if ( node.isMesh ) { node.castShadow = true; }
    } );
    this.body = gltf.scene;
    this.body.castShadow = true;
    this.body.position.set(0,0,0);
    this.add(this.body);
    this.carregado = true;
  }
}
