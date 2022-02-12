import * as THREE from "../build/three.module.js";
import {GLTFLoader} from '../build/jsm/loaders/GLTFLoader.js';
import {
  getMaxSize,
  degreesToRadians,} from "../libs/util/util.js";
export class PropManager extends THREE.Group {
  gltfArray;
  bodyArray;
  playAction;
  mixer;
  carregado; // garante que nao executa função antes do gltf carregar

  constructor() {
      super();
      this.gltfArray = [];
      this.bodyArray = [];
      this.playAction = true;
      this.mixer = [];
  }

  loadGLTFFile(modelPath, modelFolder, desiredScale, angle, visibility, scene, newX, newY, newZ)
  {
    let gtlfloader = new GLTFLoader( );
    let funcao = function ( gltf )
    {
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
      // Normalize scale and multiple by the newScale
      var scale = getMaxSize(obj); // Available in 'utils.js'
      obj.scale.set(desiredScale * (1.0/scale),
                    desiredScale * (1.0/scale),
                    desiredScale * (1.0/scale));

      // Fix position of the object over the ground plane
      var box = new THREE.Box3().setFromObject( obj );
      if(box.min.y > 0)
        obj.translateY(-box.min.y);
      else
        obj.translateY(-1*box.min.y);

      obj.rotateY(degreesToRadians(angle));
      this.setaPosicao(obj, newX, newY, newZ);

      let body = gltf.scene;
      this.bodyArray.push(body);

      scene.add(obj);
      this.gltfArray.push(obj);
      var mixerLocal = new THREE.AnimationMixer(obj);
      mixerLocal.clipAction( gltf.animations[0] ).play();
      this.mixer.push(mixerLocal);
    }
    funcao = funcao.bind(this);
    gtlfloader.load( modelPath + modelFolder + '/scene.gltf', funcao);
  }

  setaPosicao(obj, newX, newY, newZ){
    obj.position.set(newX,newY,newZ);
  }

  limpaGLFTArray(scene){
    for (let i = 0; i < this.gltfArray.length; i++) {
      scene.remove(this.gltfArray[i]);
      scene.remove(this.bodyArray[i]);
    }
    this.gltfArray = [];
    this.bodyArray = [];
  }
}