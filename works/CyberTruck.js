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

  rotation;
  wheelAngle;

  carAngle;

  constructor() {
    super();
    this.wheelAngle = 0;
    this.carAngle = 0;
    this.rotation = 1;
    let loader = new GLTFLoader();
    loader.load("./assets/objects/body.gltf", (gltf) => this.onBodyLoad(gltf));
    loader.load("./assets/objects/wheel.gltf", (gltf) => this.onWheelLoad(gltf));
  }

  onBodyLoad(gltf) {
    console.log(gltf);
    this.body = gltf.scene;
    this.body.position.set(0,-1.4,0);
    this.add(this.body);
  }

  onWheelLoad(gltf) {
    this.wheel1 = gltf.scene;
    this.wheel2 = this.wheel1.clone();
    this.wheel3 = this.wheel1.clone();
    this.wheel4 = this.wheel1.clone();

    this.wheel1.rotateZ(degreesToRadians(180));
    this.wheel3.rotateZ(degreesToRadians(180));

    this.wheel3.position.set(1.8, -0.4, -3.5);
    this.wheel4.position.set(-1.8, -0.4, -3.5);

    // Front wheels holders
    this.wheel1Holder = new THREE.Object3D();
    this.wheel1Holder.position.set(1.8, -0.4, 3.9);

    this.wheel2Holder = new THREE.Object3D();
    this.wheel2Holder.position.set(-1.8, -0.4, 3.9);

    this.wheel1Holder.add(this.wheel1);
    this.wheel2Holder.add(this.wheel2);

    this.add(this.wheel1Holder);
    this.add(this.wheel2Holder);
    this.add(this.wheel3);
    this.add(this.wheel4);
  }

  accelerate(speed) {
    this.translateZ(speed);
    this.rotation = Math.abs(speed) > 0 ? 4 : -4;
    this.wheel1.rotateX(degreesToRadians(this.rotation));
    this.wheel2.rotateX(-degreesToRadians(this.rotation));
    this.wheel3.rotateX(degreesToRadians(this.rotation));
    this.wheel4.rotateX(-degreesToRadians(this.rotation));
  }

  turnLeft(degrees) {
    if (this.wheelAngle >= -30) {
      this.wheel1Holder.rotateY(degreesToRadians(3));
      this.wheel2Holder.rotateY(degreesToRadians(3));
      this.wheelAngle -= 3;
    }
    this.rotateY(degreesToRadians(degrees));
  }

  turnRight(degrees) {
    if (this.wheelAngle <= 30) {
      this.wheel1Holder.rotateY(degreesToRadians(-3));
      this.wheel2Holder.rotateY(degreesToRadians(-3));
      this.wheelAngle += 3;
    }
    this.rotateY(degreesToRadians(-degrees));
  }

  defaultUpdate() {
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
    if (Math.abs(this.rotation) > 1) {
      this.wheel1.rotateX(degreesToRadians(this.rotation));
      this.wheel2.rotateX(-degreesToRadians(this.rotation));
      this.wheel3.rotateX(degreesToRadians(this.rotation));
      this.wheel4.rotateX(-degreesToRadians(this.rotation));
      this.rotation /= 1.05;
    }
  }

  turnUp(degrees, speed) {
    if(this.carAngle <= degrees*100 - 9){
      this.body.rotateX(degreesToRadians(-2.2*speed));
      this.carAngle += 2.2*speed;
      if(this.carAngle >= (-degrees*100 + 5)/4 && speed < 1.05){

        this.wheel3.position.set(1.8, -2.3, -3.4);
        this.wheel4.position.set(-1.8, -2.3, -3.4);
      }
      this.body.position.set(0,-1.6,0);
    }
    else if(speed < 1.05){
      this.wheel1Holder.position.set(1.8, 0.6, 3.4);
      this.wheel2Holder.position.set(-1.8, 0.6, 3.4);
    }
  }

  turnDefault(speed) {
    if(this.carAngle > 0.01){
      this.body.rotateX(degreesToRadians(10.4*speed));
      this.carAngle -= 10.4*speed;
    }
    else if(this.carAngle < 0.01){
      this.body.rotateX(degreesToRadians(-10.4*speed));
      this.carAngle += 10.4*speed;
    }
    this.body.position.set(0,-1.4,0);
    this.wheel1Holder.position.set(1.8, -0.4, 3.9);
    this.wheel2Holder.position.set(-1.8, -0.4, 3.9);
    this.wheel3.position.set(1.8, -0.4, -3.5);
    this.wheel4.position.set(-1.8, -0.4, -3.5);
  }

  turnDown(degrees, speed) {
    if(this.carAngle >= -degrees*100 + 9){
      this.body.rotateX(degreesToRadians(2.2*speed));
      this.carAngle -= 2.2*speed;
      if(this.carAngle <= (-degrees*100 + 5)/8){
        this.wheel1Holder.position.set(1.8, -2.5, 3.7);
        this.wheel2Holder.position.set(-1.8, -2.5, 3.7);
        if (speed < 1.05){
          this.wheel3.position.set(1.8, 0.7, -2.9);
          this.wheel4.position.set(-1.8, 0.7, -2.9);
        }
      }
      this.body.position.set(0,-1.6,0);
    }
  }
}
