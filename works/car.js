import * as THREE from "../build/three.module.js";
import { degreesToRadians } from "../libs/util/util.js";

export class Car extends THREE.Group {
  wheel1;
  wheel2;
  wheel3;
  wheel4;

  constructor() {
    super();
    this.wheel1 = this.createWheel();
    this.wheel2 = this.createWheel();
    this.wheel3 = this.createWheel();
    this.wheel4 = this.createWheel();
    this.positionWheels();
    this.add(this.wheel1);
    this.add(this.wheel2);
    this.add(this.wheel3);
    this.add(this.wheel4);
  }

  createWheel() {
    var group = new THREE.Group();
    var tireGeometry = new THREE.CylinderGeometry(1, 1, 1.0, 50, 10);
    var tireMaterial = new THREE.MeshPhongMaterial({ color: "rgb(50,50,50)" });
    var tire = new THREE.Mesh(tireGeometry, tireMaterial);

    var wheelGeometry = new THREE.CylinderGeometry(0.7, 0.7, 1.01, 50, 10);
    var wheelMaterial = new THREE.MeshPhongMaterial({
      color: "rgb(255,255,255)",
    });
    var wheel = new THREE.Mesh(wheelGeometry, wheelMaterial);

    var rimGeometry = new THREE.BoxGeometry(0.02, 1.02, 1.4);
    var rimMaterial = new THREE.MeshPhongMaterial({
      color: "rgb(200,200,0)",
    });
    
    var rimsQuantity = 10;
    for (let i = 0; i < rimsQuantity; i++) {
      var rim = new THREE.Mesh(rimGeometry, rimMaterial);
      rim.rotateY(degreesToRadians(180/rimsQuantity*i));
      group.add(rim);
    }

    group.add(rim);
    group.add(tire);
    group.add(wheel);

    return group;
  }

  positionWheels() {
    this.wheel2.position.set(0.0, 4, 0.0);
    this.wheel3.position.set(6, 0, 0.0);
    this.wheel4.position.set(6, 4, 0.0);
  }
}
