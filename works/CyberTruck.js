import * as THREE from "../build/three.module.js";
import { GLTFLoader } from "../build/jsm/loaders/GLTFLoader.js";
import { degreesToRadians } from "../libs/util/util.js";

export class CyberTruck extends THREE.Group {
  body;
  wheel1; // frente esquerda
  wheel2; // frente direita
  wheel3; // tras esquerda
  wheel4; // tras direita

  wheel1Holder;
  wheel2Holder;

  vynilRight;
  vynilLeft;

  speakers;

  hood;

  rotacao;
  wheelAngle;

  carAngle;
  carregado; // garante que nao executa função antes do gltf carregar

  constructor() {
    super();
    this.wheelAngle = 0;
    this.carAngle = 0;
    this.rotacao = 1;
    this.carregado = false;
    let loader = new GLTFLoader();
    let textureLoader = new THREE.TextureLoader()
    
    let akatsukiTexture = textureLoader.load("./texture/akatsuki.png");
    let speakerTexture = textureLoader.load("./texture/speakerMargin.png")
    let hoodTexture = textureLoader.load("./texture/herby.png");
    speakerTexture.wrapS = THREE.RepeatWrapping;
    speakerTexture.wrapT = THREE.RepeatWrapping;
    //speakerTexture.offset = 0.1;
    speakerTexture.repeat.set(2,2)

    loader.load("./assets/objects/body.gltf", (gltf) => this.onBodyLoad(gltf));
    loader.load("./assets/objects/wheel.gltf", (gltf) => this.onWheelLoad(gltf));

    var vynilGeometry = new THREE.PlaneGeometry(6, 1.8, 10, 10);
    var vynilMaterial = new THREE.MeshBasicMaterial({ transparent: true, opacity: 1});
    this.vynilRight = new THREE.Mesh(vynilGeometry, vynilMaterial);
    this.vynilRight.position.set(-1.9,1.7,0)
    this.vynilRight.rotateY(degreesToRadians(90))
    this.vynilRight.rotateZ(degreesToRadians(2))
    this.vynilRight.rotateX(degreesToRadians(175))
    this.vynilRight.rotateZ(degreesToRadians(180))
    this.vynilRight.material.map = akatsukiTexture;

    this.vynilLeft = new THREE.Mesh(vynilGeometry, vynilMaterial);
    this.vynilLeft.position.set(1.9,1.7,0)
    this.vynilLeft.rotateY(degreesToRadians(90))
    this.vynilLeft.rotateZ(degreesToRadians(2))
    this.vynilLeft.rotateX(degreesToRadians(5))
    
    this.vynilLeft.rotateZ(degreesToRadians(180))

    var speakerGeometry = new THREE.PlaneGeometry(3,3.3, 10, 10);
    var speakerMaterial = new THREE.MeshBasicMaterial({side:THREE.DoubleSide, transparent: true, opacity: 1});
    this.speakers = new THREE.Mesh(speakerGeometry, speakerMaterial);
    this.speakers.renderOrder = 1
    this.speakers.position.set(0,3.11,-3.7);
    this.speakers.rotateX(degreesToRadians(81))
    this.speakers.material.map = speakerTexture;

    var hoodGeometry = new THREE.PlaneGeometry(1.49,1.49, 10, 10);
    var hoodMaterial = new THREE.MeshBasicMaterial({side:THREE.DoubleSide, transparent: true, opacity: 1});
    this.hood = new THREE.Mesh(hoodGeometry, hoodMaterial);
    this.hood.renderOrder = 1
    this.hood.position.set(0,2.33,5);
    this.hood.rotateX(degreesToRadians(289.5))
    //this.hood.rotateY(degreesToRadians(180))
    
    this.hood.material.map = hoodTexture;
  }

  onBodyLoad(gltf) {
    gltf.scene.traverse( function( node ) {
      if ( node.isMesh ) { node.castShadow = true; }
    } );
    this.body = gltf.scene;
    this.body.castShadow = true;
    this.body.position.set(0,-1.4,0);
    this.body.traverse((o)=>{
      if (o.isMesh) {
        o.material.metalness = 0;
      }
    })
    this.add(this.body);
    this.carregado = true;
    this.body.add(this.vynilRight)
    this.body.add(this.vynilLeft)
    this.body.add(this.speakers)
    this.body.add(this.hood)
  }

  onWheelLoad(gltf) {
    gltf.scene.traverse( function( node ) {
      if ( node.isMesh ) { node.castShadow = true; }
    } );
    this.wheel1 = gltf.scene;
    this.wheel2 = this.wheel1.clone();
    this.wheel3 = this.wheel1.clone();
    this.wheel4 = this.wheel1.clone();

    this.wheel1.rotateZ(degreesToRadians(180));
    this.wheel3.rotateZ(degreesToRadians(180));

    // Front wheels holders
    this.wheel1Holder = new THREE.Object3D();
    this.wheel1Holder.position.set(1.8, -0.4, 3.9);

    this.wheel2Holder = new THREE.Object3D();
    this.wheel2Holder.position.set(-1.8, -0.4, 3.9);

    this.wheel1Holder.add(this.wheel1);
    this.wheel2Holder.add(this.wheel2);


    // Front wheels holders
    this.wheel3Holder = new THREE.Object3D();
    this.wheel3Holder.position.set(1.8, -0.4, -3.5);

    this.wheel4Holder = new THREE.Object3D();
    this.wheel4Holder.position.set(-1.8, -0.4, -3.5);

    this.wheel3Holder.add(this.wheel3);
    this.wheel4Holder.add(this.wheel4);

    this.add(this.wheel1Holder);
    this.add(this.wheel2Holder);
    this.add(this.wheel3Holder);
    this.add(this.wheel4Holder);
  }

  accelerate(speed) {
    if(this.carregado){
      this.translateZ(speed);
      this.rotacao = Math.abs(speed) > 0 ? 4 : -4;
      this.wheel1.rotateX(degreesToRadians(this.rotacao));
      this.wheel2.rotateX(-degreesToRadians(this.rotacao));
      this.wheel3.rotateX(degreesToRadians(this.rotacao));
      this.wheel4.rotateX(-degreesToRadians(this.rotacao));
    }
  }

  turnLeft(degrees) {
    if(this.carregado){
      if (this.wheelAngle >= -30) {
        this.wheel1Holder.rotateY(degreesToRadians(3));
        this.wheel2Holder.rotateY(degreesToRadians(3));
        this.wheelAngle -= 3;
      }
      this.rotateY(degreesToRadians(degrees));
    }
  }

  turnRight(degrees) {
    if(this.carregado){
      if (this.wheelAngle <= 30) {
        this.wheel1Holder.rotateY(degreesToRadians(-3));
        this.wheel2Holder.rotateY(degreesToRadians(-3));
        this.wheelAngle += 3;
      }
      this.rotateY(degreesToRadians(-degrees));
    }
  }

  defaultUpdate() {
    if(this.carregado){
      if (this.wheelAngle >= 30) {
        this.wheel1Holder.rotateY(degreesToRadians(3));
        this.wheel2Holder.rotateY(degreesToRadians(3));
        this.wheelAngle -= 3;
        return;
      } else if (this.wheelAngle <= -30) {
        this.wheel1Holder.rotateY(degreesToRadians(-3));
        this.wheel2Holder.rotateY(degreesToRadians(-3));
        this.wheelAngle += 3;
        return;
      } else if (this.wheelAngle > 0) {
        this.wheel1Holder.rotateY(degreesToRadians(1));
        this.wheel2Holder.rotateY(degreesToRadians(1));
        this.wheelAngle--;
      } else if (this.wheelAngle < 0) {
        this.wheel1Holder.rotateY(degreesToRadians(-1));
        this.wheel2Holder.rotateY(degreesToRadians(-1));
        this.wheelAngle++;
      }
      if (Math.abs(this.rotacao) > 1) {
        this.wheel1.rotateX(degreesToRadians(this.rotacao));
        this.wheel2.rotateX(-degreesToRadians(this.rotacao));
        this.wheel3.rotateX(degreesToRadians(this.rotacao));
        this.wheel4.rotateX(-degreesToRadians(this.rotacao));
        this.rotacao /= 1.15;
      }
    }
  }

  turnUp(degrees, speed) {
    if(this.carregado){
      if(this.carAngle <= degrees*100 - 9){
        this.body.rotateX(degreesToRadians(-2.2*speed));
        this.carAngle += 2.2*speed;
        if(this.carAngle >= (-degrees*100 + 5)/4){
          this.wheel1Holder.translateY(0.04);
          this.wheel2Holder.translateY(0.04);
          this.wheel1Holder.translateZ(-0.02);
          this.wheel2Holder.translateZ(-0.02);
          //precisam de holder
          this.wheel3Holder.translateY(-0.07);
          this.wheel4Holder.translateY(-0.07);
        }
        if (speed > 1.05){
          this.wheel1Holder.position.set(1.8, 0.0, 3.9);
          this.wheel2Holder.position.set(-1.8, 0.0, 3.9);
        }
        this.body.position.set(0,-1.6,0);
      }
    }
  }

  turnDefault(speed) {
    //tremedeira extremamente leve no carro, pode usar como efeito pra carro ligado
    if(this.carregado){
      if(this.carAngle >= 0.5){
        this.body.rotateX(degreesToRadians(10.5*speed));
        this.carAngle -= 10.5*speed;
      }
      else if(this.carAngle < 0.0){
        this.body.rotateX(degreesToRadians(-10.5*speed));
        this.carAngle += 10.5*speed;
      }
      this.body.position.set(0,-1.4,0);
      this.wheel1Holder.position.set(1.8, -0.4, 3.9);
      this.wheel2Holder.position.set(-1.8, -0.4, 3.9);
      this.wheel3Holder.position.set(1.8, -0.4, -3.5);
      this.wheel4Holder.position.set(-1.8, -0.4, -3.5);
    }
  }

  turnDown(degrees, speed) {
    if(this.carregado){
      if(this.carAngle >= -degrees*100 + 9){
        this.body.rotateX(degreesToRadians(2.2*speed));
        this.carAngle -= 2.2*speed;
        if(this.carAngle >= (-degrees*100 + 5)/4){
          this.wheel1Holder.translateY(-0.09);
          this.wheel2Holder.translateY(-0.09);
          this.wheel1Holder.translateZ(0.02);
          this.wheel2Holder.translateZ(0.02);
          //precisam de holder
          this.wheel3Holder.translateY(0.07);
          this.wheel4Holder.translateY(0.07);
        }
        if (speed > 1.05){
          this.wheel1Holder.position.set(1.8, -2.0, 3.9);
          this.wheel2Holder.position.set(-1.8, -2.0, 3.9);
        }
        this.body.position.set(0,-1.6,0);
      }
    }
  }
}
