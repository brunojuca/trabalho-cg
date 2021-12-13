import * as THREE from "../build/three.module.js";
import { degreesToRadians } from "../libs/util/util.js";

export class Turbina extends THREE.Group {
  body;
  topBase;
  blade1;
  blade2;
  blade3;
  ballMotor;
  spinningAxis;
  topBaseLathe;
  lowerBase;
  height;
  turbo;

  constructor() {
    super();
    this.height = 60;
    this.turbo = 0;

    // Body
    this.body = this.createBody(this.height)
    this.positionBody(this.height);

    // TopBase
    this.topBase = this.createTopBase(this.height);
    this.positionTopBase(this.height);

    // Blade
    this.blade1 = this.createBlade(this.height);
    this.blade2 = this.createBlade(this.height);
    this.blade3 = this.createBlade(this.height);

    // BallMotor
    this.ballMotor = this.createBallMotor();
    this.adicionaBladesAMotor();

    // Axis
    this.spinningAxis = this.createAxis();
    this.adicionaMotorASpinningAxis();
    this.positionSpinningAxis(this.height);

    // TopBaseLathe
    this.topBaseLathe = this.createTopMotor(this.height);
    this.positionTopMotor(this.height);
    this.topBaseLathe.visible = false;

    // LowerBase
    this.lowerBase = this.createLowerBase(this.height);
    this.positionLowerBase(this.height);

    this.add(this.body);
    this.add(this.topBase);
    this.add(this.spinningAxis);
    this.add(this.topBaseLathe);
    this.add(this.lowerBase);

  }




  //-------------------------------------------------------------------------------
  // Corpo
  //-------------------------------------------------------------------------------

  createBody(height) {
    var bodyGeometry = new THREE.CylinderGeometry(2, 4, height, 64, 64, false, 0, 2*Math.PI );
    var bodyMaterial = new THREE.MeshPhongMaterial({ color: "rgb(200,200,200)" });
    var body = new THREE.Mesh(bodyGeometry, bodyMaterial)
    return body;
  }
  positionBody(height) {
    this.body.position.set(0, height/2, 0);
  }



  //-------------------------------------------------------------------------------
  // Motor Traseiro
  //-------------------------------------------------------------------------------

  topShape()
  {
    var topShape = new THREE.Shape();
      topShape.moveTo( -4.0, -2.0 );
      //x do ponto de max, y do ponto de max, x e y do destino
      topShape.quadraticCurveTo( 0.0, -12, 4.0, -2.0)
      topShape.quadraticCurveTo( 1, 2, 2, 4.0)
      topShape.quadraticCurveTo(0, 4, -2, 4.0)
      topShape.quadraticCurveTo( -1, 2, -4.0, -2.0)

    return topShape;
  }
  createTopBase() {
    var extrudeSettings =
    {
      depth: 3,
      steps: 2,
      bevelEnabled: true,
      bevelThickness: 1,
      bevelSize: 1,
      bevelOffset: 0,
      bevelSegments: 5
    };
    var extrudeGeometry = new THREE.ExtrudeGeometry(this.topShape(), extrudeSettings);
    var topMaterial = new THREE.MeshPhongMaterial({color: "rgb(50,50,255)"});
    var top = new THREE.Mesh(extrudeGeometry, topMaterial);
    return top;
  }
  positionTopBase(height) {
    this.topBase.position.set(0.0, height + 1.5, 2.0);
    this.topBase.rotateX(degreesToRadians(90));
  }




  //-------------------------------------------------------------------------------
  // Pás do Motor Frontala
  //-------------------------------------------------------------------------------

  bladeShape()
  {
    var topShape = new THREE.Shape();
      topShape.moveTo( -4.0, -2.0 );
      //x do ponto de max, y do ponto de max, x e y do destino
      topShape.quadraticCurveTo( 15.0, -500, 4.0, -40.0)
      topShape.quadraticCurveTo( -1, -5, 2, 4.0)
      topShape.quadraticCurveTo(0, 5, -1.3, 4.0)
      topShape.quadraticCurveTo( -1, 2, -4.0, -2.0)
    return topShape;
  }
  createBlade() {
    var extrudeSettings =
    {
      depth: 0.1,
      steps: 3,
      bevelEnabled: true,
      bevelThickness: 1,
      bevelSize: 2,
      bevelOffset: 1,
      bevelSegments: 1
    };
    var extrudeGeometry = new THREE.ExtrudeGeometry(this.bladeShape(), extrudeSettings);
    var bladeMaterial = new THREE.MeshPhongMaterial({color: "rgb(255,0,0)"});
    var blade = new THREE.Mesh(extrudeGeometry, bladeMaterial);
    blade.scale.set(0.4, 0.2, 1);
    return blade;
  }



  //-------------------------------------------------------------------------------
  // Motor Frontal que gira
  //-------------------------------------------------------------------------------

  createBallMotor() {
    var ballGeometry = new THREE.SphereGeometry(4.2, 50, 50);
    var ballMaterial = new THREE.MeshPhongMaterial({
      color: "rgb(50,50,255)",
    });
    var ball = new THREE.Mesh(ballGeometry, ballMaterial);
    ball.scale.set(0.55, 0.55, 1);
    return ball;
  }
  adicionaBladesAMotor() {
    this.blade1.position.set(0, -4.3, 1.1);
    this.blade2.position.set(3.6, 2.2, 1.1);
    this.blade2.rotateZ(degreesToRadians(120))
    this.blade3.position.set(-3.6, 2.6, 1.1);
    this.blade3.rotateZ(degreesToRadians(-120))
    this.ballMotor.add(this.blade1);
    this.ballMotor.add(this.blade2);
    this.ballMotor.add(this.blade3);
  }




  //-------------------------------------------------------------------------------
  // Axis do Motor
  //-------------------------------------------------------------------------------

  createAxis() {
    var axisGeometry = new THREE.CylinderGeometry(0.1, 0.1, 1, 50, 10);
    var axisMaterial = new THREE.MeshPhongMaterial({
      color: "rgb(255,255,255)",
    });
    var axis = new THREE.Mesh(axisGeometry, axisMaterial);
    axis.rotateX(degreesToRadians(90));
    return axis;
  }
  adicionaMotorASpinningAxis(){
    this.spinningAxis.add(this.ballMotor);
    this.ballMotor.rotateX(degreesToRadians(-90));
  }
  positionSpinningAxis(height){
    this.spinningAxis.position.set(0.0, height, 7.0);
  }




  //-------------------------------------------------------------------------------
  // Motor em Lathe (se quiser fazer diferentes)
  //-------------------------------------------------------------------------------

  createTopMotor() {
    var points = [];
    var posicoes = [ [10,0],[9,3.0],[8,4.7],[7,6.0],[6,6.9],[5,7.8],[3,8.4],[1,9.0],[0,9.5] ];
    for (var i = 0; i < 12; i++) {
      points.push(new THREE.Vector2(Math.sin(i*2 / 4.17)+3, i));
      //points.push(new THREE.Vector2(posicoes[i][0], posicoes[i][1]));
    }
    const geometry = new THREE.LatheGeometry( points );
    const material = new THREE.MeshBasicMaterial( { color: "rgb(50,50,255)" } );
    const lathe = new THREE.Mesh( geometry, material );
    return lathe;
  }
  positionTopMotor(height) {
    this.topBaseLathe.position.set(0.0, height, -3.0);
    this.topBaseLathe.rotateX(degreesToRadians(90));
  }




  //-------------------------------------------------------------------------------
  // Base
  //-------------------------------------------------------------------------------

  lowerShape()
  {
    var lowerbaseShape = new THREE.Shape();
      //x do ponto de max, y do ponto de max, x e y do destino
      lowerbaseShape.moveTo( -8.0, -6.0 );
      lowerbaseShape.quadraticCurveTo( 0.0, 0.0, -8.0, 6.0)
      lowerbaseShape.lineTo( -8.0, 8.0 );
      lowerbaseShape.moveTo( -6.0, 8.0 );
      lowerbaseShape.quadraticCurveTo( 0.0, 0.0, 6.0, 8.0)
      lowerbaseShape.lineTo( 8.0, 8.0 );
      lowerbaseShape.moveTo( 8.0, 6.0 );
      lowerbaseShape.quadraticCurveTo( 0.0, 0.0, 8.0, -6.0)
      lowerbaseShape.lineTo( 8.0, -8.0 );
      lowerbaseShape.moveTo( 6.0, -8.0 );
      lowerbaseShape.quadraticCurveTo( 0.0, 0.0, -6.0, -8.0)
      lowerbaseShape.lineTo( -8.0, -8.0 );
      lowerbaseShape.moveTo( -8.0, -6.0 );
    return lowerbaseShape;
  }
  createLowerBase() {
    var extrudeSettings =
    {
      depth: 0,
      steps: 2,
      bevelEnabled: true,
      bevelThickness: 2,
      bevelSize: 2,
      bevelOffset: 0,
      bevelSegments: 20
    };
    var extrudeGeometry = new THREE.ExtrudeGeometry(this.lowerShape(), extrudeSettings);
    var lowerMaterial = new THREE.MeshPhongMaterial({color: "rgb(50,50,50)", opacity: 0});
    var lower = new THREE.Mesh(extrudeGeometry, lowerMaterial);
    return lower;
  }
  positionLowerBase(height) {
    this.lowerBase.position.set(0.0, 0.0, 0.0);
    this.lowerBase.rotateX(degreesToRadians(90));
  }




  defaultUpdate(speed) {
    this.spinningAxis.rotateY(degreesToRadians(speed));
  }

}
