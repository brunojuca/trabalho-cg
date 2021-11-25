import * as THREE from "../build/three.module.js";
import { degreesToRadians } from "../libs/util/util.js";

export class Car extends THREE.Group {
  wheel1;
  wheel2;
  wheel3;
  wheel4;
  frontAxis;
  backAxis;
  body;
  backWindow;
  frontWindow;
  ballWindow;
  noseWindow;
  headLight1;
  headLight2;
  wheelAngle;

  constructor() {
    super();
    this.wheelAngle = 0;

    // Axis
    this.frontAxis = this.createAxis();
    this.backAxis = this.createAxis();

    this.positionAxis();

    // Wheels
    this.wheel1 = this.createWheel();
    this.wheel2 = this.createWheel();
    this.wheel3 = this.createWheel();
    this.wheel4 = this.createWheel();

    this.positionWheels(); // relative to axis position

    // Body
    this.body = this.createBody();

    this.positionBody();

    // Windows
    this.backWindow = this.createWindow(1.6, 1.6, 2.5);
    this.frontWindow = this.createWindow(0.8, 1.2, 3);
    this.earWindow = this.createBallWindow();
    this.earWindow2 = this.createBallWindow();
    this.earWindow.scale.set(1, 1, 0.3);
    this.earWindow2.scale.set(1, 1, 0.3);
    this.ballWindow = this.createBallWindow();
    this.noseWindow = this.createBallWindow();
    this.noseWindow.scale.set(0.6, 0.5, 1);

    this.positionWindows();

    // HeadLights
    this.headLight1 = this.createHeadLight();
    this.headLight2 = this.createHeadLight();

    this.positionHeadLights();

    this.frontAxis.add(this.wheel1);
    this.frontAxis.add(this.wheel2);
    this.backAxis.add(this.wheel3);
    this.backAxis.add(this.wheel4);

    this.add(this.frontAxis);
    this.add(this.backAxis);
    this.add(this.body);
    this.add(this.backWindow);
    this.add(this.frontWindow);
    this.add(this.earWindow);
    this.add(this.earWindow2);
    this.add(this.ballWindow);
    this.add(this.noseWindow);
    this.add(this.headLight1);
    this.add(this.headLight2);
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

    var rimsQuantity = 1;
    for (let i = 0; i < rimsQuantity; i++) {
      var rim = new THREE.Mesh(rimGeometry, rimMaterial);
      rim.rotateY(degreesToRadians((180 / rimsQuantity) * i));
      group.add(rim);
    }

    group.add(rim);
    group.add(tire);
    group.add(wheel);

    return group;
  }

  createAxis() {
    var axisGeometry = new THREE.CylinderGeometry(0.1, 0.1, 4, 50, 10);
    var axisMaterial = new THREE.MeshPhongMaterial({
      color: "rgb(255,255,255)",
    });
    var axis = new THREE.Mesh(axisGeometry, axisMaterial);

    return axis;
  }

  createBody() {
    var bodyGeometry = new THREE.BoxGeometry(3, 1.8, 7, 1, 1, 1);
    var bodyMaterial = new THREE.MeshPhongMaterial({ color: "rgb(255,0,0)" });
    var body = new THREE.Mesh(bodyGeometry, bodyMaterial);

    return body;
  }

  createWindow(radius1, radius2, lenght) {
    var windowGeometry = new THREE.CylinderGeometry(
      radius1,
      radius2,
      lenght,
      50,
      10
    );
    var windowMaterial = new THREE.MeshPhongMaterial({
      color: "rgb(50,50,50)",
      opacity: 0,
    });
    var window = new THREE.Mesh(windowGeometry, windowMaterial);

    return window;
  }

  createBallWindow() {
    var ballGeometry = new THREE.SphereGeometry(0.8, 50, 50);
    var ballMaterial = new THREE.MeshPhongMaterial({
      color: "rgb(50,50,50)",
    });
    var ball = new THREE.Mesh(ballGeometry, ballMaterial);

    return ball;
  }

  createHeadLight() {
    var lightGeometry = new THREE.SphereGeometry(0.4, 50, 50);
    var lightMaterial = new THREE.MeshPhongMaterial({
      color: "rgb(255,255,255)",
    });
    var light = new THREE.Mesh(lightGeometry, lightMaterial);

    return light;
  }

  positionHeadLights() {
    this.headLight1.position.set(0.8, 0.8, 3.3);
    this.headLight2.position.set(-0.8, 0.8, 3.3);
  }

  positionWindows() {
    this.backWindow.position.set(0.0, 1.7, -1.6);
    this.backWindow.rotateZ(degreesToRadians(90));

    this.frontWindow.position.set(0.0, 1.7, 0.5);
    this.frontWindow.rotateX(degreesToRadians(90));

    this.earWindow.position.set(-1.5, 3.5, -2.0);
    this.earWindow2.position.set(1.5, 3.5, -2.0);

    this.ballWindow.position.set(0.0, 1.7, 1.9);
    this.noseWindow.position.set(0.0, 2.4, 2.5);
  }

  positionBody() {
    this.body.position.set(0, 0.6, 0);
  }

  positionWheels() {
    this.wheel1.position.set(0, -2, 0.0);
    this.wheel2.position.set(0, 2, 0.0);
    this.wheel3.position.set(0, -2, 0.0);
    this.wheel4.position.set(0, 2, 0.0);
  }

  positionAxis() {
    this.backAxis.position.set(0, 0, -2.5);
    this.backAxis.rotateZ(degreesToRadians(90));
    this.frontAxis.position.set(0, 0, 2.5);
    this.frontAxis.rotateZ(degreesToRadians(90));
  }

  accelerate(speed) {
    this.translateZ(speed);
    this.wheel1.rotateY(degreesToRadians(-10));
    this.wheel2.rotateY(degreesToRadians(-10));
    this.wheel3.rotateY(degreesToRadians(-10));
    this.wheel4.rotateY(degreesToRadians(-10));
  }

  turnLeft(degrees) {
    if (this.wheelAngle > -5) {
      this.frontAxis.rotateX(degreesToRadians(3));
      this.wheelAngle--;
    }

    this.rotateY(degreesToRadians(degrees));
  }

  turnRight(degrees) {
    if (this.wheelAngle < 5) {
      this.frontAxis.rotateX(degreesToRadians(-3));
      this.wheelAngle++;
    }

    this.rotateY(degreesToRadians(-degrees));
  }

  defaultUpdate() {
    // if (Math.abs(this.wheelAngle) < 5) {
    //   if (this.wheelAngle > 0) this.frontAxis.rotateX(degreesToRadians(1));
    //   else if (this.wheelAngle < 0)
    //     this.frontAxis.rotateX(degreesToRadians(-1));
    // }
  }
}
