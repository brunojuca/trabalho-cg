import * as THREE from "../build/three.module.js";
import { degreesToRadians } from "../libs/util/util.js";

export class LambertTestCar extends THREE.Group {
  wheel1;
  wheel2;
  wheel3;
  wheel4;
  wheel1Holder;
  wheel2Holder;
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
  rotacao;

  constructor() {
    super();
    this.wheelAngle = 0;
    this.carAngle = 0;
    this.rotacao = 1;
    var neonColor = "rgb(0,255,255)";
    var neonColor2 = "rgb(255,0,0)";
    // Axis
    this.frontAxis = this.createAxis();
    this.backAxis = this.createAxis();

    this.positionAxis();

    // Front wheels holders
    this.wheel1Holder = new THREE.Object3D();
    this.wheel1Holder.position.set(2, -0.3, 2.5);
    this.wheel1Holder.rotateZ(degreesToRadians(90));

    this.wheel2Holder = new THREE.Object3D();
    this.wheel2Holder.position.set(-2, -0.3, 2.5);
    this.wheel2Holder.rotateZ(degreesToRadians(90));

    // Wheels
    this.wheel1 = this.createWheel();
    this.wheel2 = this.createWheel();
    this.wheel3 = this.createWheel();
    this.wheel4 = this.createWheel();

    this.positionWheels();
    this.wheel1Holder.add(this.wheel1);
    this.wheel2Holder.add(this.wheel2);

    // Body
    this.body = this.createBody();
    this.body.layers.enable(1);

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

    this.backAxis.add(this.wheel3);
    this.backAxis.add(this.wheel4);


    //UndergroundSpotLight
    this.underSpotLight1 = new THREE.SpotLight(neonColor);
    this.setSpotLight(this.underSpotLight1, "NeonLights", new THREE.Vector3(0,0,5));
    this.underPointLight1 = new THREE.PointLight(neonColor);
    this.setSpotLight(this.underPointLight1, "NeonLight1", new THREE.Vector3(0,0,0));

    this.underSpotLight2 = new THREE.SpotLight(neonColor2);
    this.setSpotLight(this.underSpotLight2, "NeonLights", new THREE.Vector3(0,2,5));
    this.underSpotLight2.visible = false;

    this.add( this.underSpotLight1 );
    this.add( this.underPointLight1 );
    this.add( this.underSpotLight2 );
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
    this.add(this.wheel1Holder);
    this.add(this.wheel2Holder);
  }

  alternaSpotLight(pistaAtual){
    if (pistaAtual == 1){
      this.underSpotLight1.visible = true;
      this.underSpotLight2.visible = false;
    }
    else if (pistaAtual == 2){
      this.underSpotLight1.visible = false;
      this.underSpotLight2.visible = true;
    }
  }

  setSpotLight(spotLight, lightName, position)
  {
    spotLight.position.copy(position);
    spotLight.shadow.mapSize.width = 128;
    spotLight.shadow.mapSize.height = 128;
    spotLight.distance = 150;
    spotLight.angle = degreesToRadians(90);
    spotLight.castShadow = true;
    spotLight.decay = 2;
    spotLight.penumbra = 1;
    spotLight.name = lightName;
  }

  setPointLight(position)
  {
    pointLight.position.copy(position);
    pointLight.name = "Point Light"
    pointLight.castShadow = true;
    pointLight.visible = false;
    spotLight.penumbra = 0.5;
  }

  createWheel() {
    var group = new THREE.Group();
    var tireGeometry = new THREE.CylinderGeometry(1, 1, 1.0, 50, 10);
    var tireMaterial = new THREE.MeshLambertMaterial({ color: "rgb(50,50,50)" });
    var tire = new THREE.Mesh(tireGeometry, tireMaterial);

    var wheelGeometry = new THREE.CylinderGeometry(0.7, 0.7, 1.01, 50, 10);
    var wheelMaterial = new THREE.MeshLambertMaterial({
      color: "rgb(255,255,255)",
    });
    var wheel = new THREE.Mesh(wheelGeometry, wheelMaterial);

    var rimGeometry = new THREE.BoxGeometry(0.15, 1.02, 1.4);
    var rimMaterial = new THREE.MeshLambertMaterial({
      color: "rgb(200,200,0)",
    });

    var rimsQuantity = 4;
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
    var axisMaterial = new THREE.MeshLambertMaterial({
      color: "rgb(255,255,255)",
    });
    var axis = new THREE.Mesh(axisGeometry, axisMaterial);

    return axis;
  }

  createBody() {
    var bodyGeometry = new THREE.BoxGeometry(3, 1.8, 7, 1, 1, 1);
    var bodyMaterial = new THREE.MeshPhongMaterial({ color: "rgb(0,255,0)" });
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
    var windowMaterial = new THREE.MeshLambertMaterial({
      color: "rgb(50,50,50)",
      opacity: 0,
    });
    var window = new THREE.Mesh(windowGeometry, windowMaterial);

    return window;
  }

  createBallWindow() {
    var ballGeometry = new THREE.SphereGeometry(0.8, 50, 50);
    var ballMaterial = new THREE.MeshLambertMaterial({
      color: "rgb(50,50,50)",
    });
    var ball = new THREE.Mesh(ballGeometry, ballMaterial);

    return ball;
  }

  createHeadLight() {
    var lightGeometry = new THREE.SphereGeometry(0.4, 50, 50);
    var lightMaterial = new THREE.MeshBasicMaterial({
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
    this.wheel3.position.set(0, -2, 0.0);
    this.wheel4.position.set(0, 2, 0.0);
  }

  positionAxis() {
    this.backAxis.position.set(0, -0.3, -2.5);
    this.backAxis.rotateZ(degreesToRadians(90));
    this.frontAxis.position.set(0, -0.3, 2.5);
    this.frontAxis.rotateZ(degreesToRadians(90));
  }

  accelerate(speed) {
    this.translateZ(speed);
    this.rotacao = Math.abs(speed) > 0 ? 4 : -4;
    this.wheel1.rotateY(degreesToRadians(this.rotacao));
    this.wheel2.rotateY(degreesToRadians(this.rotacao));
    this.wheel3.rotateY(degreesToRadians(this.rotacao));
    this.wheel4.rotateY(degreesToRadians(this.rotacao));
  }

  turnLeft(degrees) {
    if (this.wheelAngle >= -30) {
      this.wheel1Holder.rotateX(degreesToRadians(3));
      this.wheel2Holder.rotateX(degreesToRadians(3));
      this.wheelAngle -= 3;
    }

    this.rotateY(degreesToRadians(degrees));
  }

  turnRight(degrees) {
    if (this.wheelAngle <= 30) {
      this.wheel1Holder.rotateX(degreesToRadians(-3));
      this.wheel2Holder.rotateX(degreesToRadians(-3));
      this.wheelAngle += 3;
    }
    this.rotateY(degreesToRadians(-degrees));
  }

  defaultUpdate() {
    if (this.wheelAngle >= 30) {
      this.wheel1Holder.rotateX(degreesToRadians(3));
      this.wheel2Holder.rotateX(degreesToRadians(3));
      this.wheelAngle -= 3;
      return;
    } else if (this.wheelAngle <= -30) {
      this.wheel1Holder.rotateX(degreesToRadians(-3));
      this.wheel2Holder.rotateX(degreesToRadians(-3));
      this.wheelAngle += 3;
      return;
    } else if (this.wheelAngle > 0) {
      this.wheel1Holder.rotateX(degreesToRadians(1));
      this.wheel2Holder.rotateX(degreesToRadians(1));
      this.wheelAngle--;
    } else if (this.wheelAngle < 0) {
      this.wheel1Holder.rotateX(degreesToRadians(-1));
      this.wheel2Holder.rotateX(degreesToRadians(-1));
      this.wheelAngle++;
    }

    if (Math.abs(this.rotacao) > 1) {
      this.wheel1.rotateY(degreesToRadians(this.rotacao));
      this.wheel2.rotateY(degreesToRadians(this.rotacao));
      this.wheel3.rotateY(degreesToRadians(this.rotacao));
      this.wheel4.rotateY(degreesToRadians(this.rotacao));
      this.rotacao /= 1.05;
    }
    //this.rotateWheel();
  }

  rotateWheel() {
    this.wheel1.matrixAutoUpdate = false;
    this.wheel2.matrixAutoUpdate = false;
    this.wheel3.matrixAutoUpdate = false;
    this.wheel4.matrixAutoUpdate = false;

    this.wheel1.matrix.identity();
    this.wheel2.matrix.identity();
    this.wheel3.matrix.identity();
    this.wheel4.matrix.identity();

    var mat = new THREE.Matrix4();

    this.wheel1.matrix.multiply(
      mat.makerotacaoY(degreesToRadians(this.rotacao))
    );
    this.wheel1.matrix.multiply(mat.makerotacaoX(this.wheelAngle));
    this.wheel1.matrix.multiply(mat.makeTranslation(0, -2, 0));
  }

  turnUp(degrees, speed) {
    if(this.carAngle <= degrees*100){
      this.body.rotateX(degreesToRadians(-0.6*speed));
      this.carAngle += 0.6*speed;
    }
  }
  turnDefault(speed) {
    if(this.carAngle > 0.01){
      this.body.rotateX(degreesToRadians(1.2*speed));
      this.carAngle -= 1.2*speed;
    }
    else if(this.carAngle < 0.01){
      this.body.rotateX(degreesToRadians(-1.2*speed));
      this.carAngle += 1.2*speed;
    }
  }
  turnDown(degrees, speed) {
    if(this.carAngle >= -degrees*100){
      this.body.rotateX(degreesToRadians(0.6*speed));
      this.carAngle -= 0.6*speed;
    }
  }
}
