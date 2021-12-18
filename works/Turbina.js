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
  lowerBase2;
  height;
  turbo;

  constructor() {
    super();

    const loader = new THREE.TextureLoader();

    const silverTexture = loader.load( 'texture/track2/silver.jpg' );
    this.silverMaterial = new THREE.MeshBasicMaterial ( { map: silverTexture } );

    const redMetalTexture = loader.load( 'texture/track2/redMetal.png' );
    this.redMetalMaterial = new THREE.MeshBasicMaterial ( { map: redMetalTexture } );

    const cobaltTexture = loader.load( 'texture/track2/cobalt.jpg' );
    cobaltTexture.wrapS = cobaltTexture.wrapT = THREE.RepeatWrapping;
    cobaltTexture.repeat.set( 5, 5 );
    cobaltTexture.anisotropy = 16;
    this.cobaltMaterial = new THREE.MeshBasicMaterial ( { map: cobaltTexture } );
    this.cobaltMaterial2 = new THREE.MeshBasicMaterial ( { map: cobaltTexture } );
    this.cobaltMaterial2.side = THREE.DoubleSide;
    this.height = 60;
    this.turbo = 0;
    var eolicColor = "rgb(0,255,255)";

    // Body
    this.body = this.createBody(this.height)
    this.positionBody(this.height);

    // TopBase
    this.topBase = this.createTopBase(this.height);
    this.positionTopBase(this.height);
    //this.topBase.visible = false;


    // TopBaseLathe
    this.topBaseLathe = this.createTopMotor(this.height);
    this.positionTopMotor(this.height);
    this.topBaseLathe.visible = false;

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

    // LowerBase
    this.lowerBase = this.createLowerBase(this.height);
    this.positionLowerBase(this.height);

    // LowerBase2
    this.lowerBase2 = this.createLowerBase2(this.height);
    this.positionLowerBase2(this.height);

    this.add(this.body);
    this.add(this.topBase);
    this.add(this.spinningAxis);
    this.add(this.topBaseLathe);
    this.add(this.lowerBase);
    this.add(this.lowerBase2);

  }


  setSpotLight(spotLight, lightName, position)
  {
    spotLight.position.copy(position);
    spotLight.shadow.mapSize.width = 1024;
    spotLight.shadow.mapSize.height = 1024;
    spotLight.angle = degreesToRadians(180);
    spotLight.castShadow = true;
    spotLight.decay = 1;
    spotLight.penumbra = 10.5;
    spotLight.name = lightName;
    this.add( this.undergroundSpotLight );

  }

  //-------------------------------------------------------------------------------
  // Corpo
  //-------------------------------------------------------------------------------

  createBody(height) {
    var bodyGeometry = new THREE.CylinderGeometry(2, 4, height, 64, 64, false, 0, 2*Math.PI );
    var body = new THREE.Mesh(bodyGeometry, this.silverMaterial)
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
    var top = new THREE.Mesh(extrudeGeometry, this.cobaltMaterial);
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
      topShape.quadraticCurveTo( 15.0, -500, 18.0, -40.0)
      topShape.quadraticCurveTo( -1, -5, 2, 4.0)
      topShape.quadraticCurveTo(0, 5, -1.3, 4.0)
      topShape.quadraticCurveTo( -1, 2, -4.0, -2.0)
    return topShape;
  }
  createBlade() {
    var extrudeSettings =
    {
      depth: 0.5,
      steps: 3,
      bevelEnabled: true,
      bevelThickness: 1,
      bevelSize: 2,
      bevelOffset: 1,
      bevelSegments: 1
    };
    var extrudeGeometry = new THREE.ExtrudeGeometry(this.bladeShape(), extrudeSettings);
    var blade = new THREE.Mesh(extrudeGeometry, this.redMetalMaterial);
    blade.scale.set(0.4, 0.2, 1);
    return blade;
  }



  //-------------------------------------------------------------------------------
  // Motor Frontal que gira
  //-------------------------------------------------------------------------------

  createBallMotor() {
    var ballGeometry = new THREE.SphereGeometry(4.2, 50, 50);
    var ball = new THREE.Mesh(ballGeometry, this.cobaltMaterial);
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
    var axisMaterial = new THREE.MeshBasicMaterial({
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
    points.push(new THREE.Vector2(0, -3));
    points.push(new THREE.Vector2(1.0, -2));
    points.push(new THREE.Vector2(2, -1));
    for (var i = 0; i < 12; i++) {
      points.push(new THREE.Vector2(Math.sin(i*2 / 4.17)+3, i));
    }
    const geometry = new THREE.LatheGeometry( points );
    const material =  new THREE.MeshPhongMaterial ( {color: 0x0000ff} );
    material.side = THREE.DoubleSide;
    const lathe = new THREE.Mesh( geometry, this.cobaltMaterial2 );
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
    var hole1Path = new THREE.Path();
      hole1Path.absarc( 6.7, 6.7, 1.3, 0, Math.PI * 2, false );
    var hole2Path = new THREE.Path();
      hole2Path.absarc( 6.7, -6.7, 1.3, 0, Math.PI * 2, false );
    var hole3Path = new THREE.Path();
      hole3Path.absarc( -6.7, 6.7, 1.3, 0, Math.PI * 2, false );
    var hole4Path = new THREE.Path();
      hole4Path.absarc( -6.7, -6.7, 1.3, 0, Math.PI * 2, false );
    lowerbaseShape.holes.push( hole1Path );
    lowerbaseShape.holes.push( hole2Path );
    lowerbaseShape.holes.push( hole3Path );
    lowerbaseShape.holes.push( hole4Path );

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



  lowerShape2()
  {
    var lowerbaseShape = new THREE.Shape();
      //x do ponto de max, y do ponto de max, x e y do destino
      lowerbaseShape.moveTo( -6.0, -4.0 );
      lowerbaseShape.quadraticCurveTo( -3.0, 0.0, -6.0, 4.0)
      lowerbaseShape.moveTo( -4.0, 6.0 );
      lowerbaseShape.quadraticCurveTo( 0.0, 3.0, 4.0, 6.0)
      lowerbaseShape.moveTo( 6.0, 4.0 );
      lowerbaseShape.quadraticCurveTo( 3.0, 0.0, 6.0, -4.0)
      lowerbaseShape.moveTo( 4.0, -6.0 );
      lowerbaseShape.quadraticCurveTo( 0.0, -3.0, -4.0, -6.0)
      lowerbaseShape.moveTo( -8.0, -6.0 );

    return lowerbaseShape;
  }
  createLowerBase2() {
    var extrudeSettings =
    {
      depth: 0,
      steps: 2,
      bevelEnabled: true,
      bevelThickness: 4,
      bevelSize: 2,
      bevelOffset: -1.0,
      bevelSegments: 20
    };
    var extrudeGeometry = new THREE.ExtrudeGeometry(this.lowerShape2(), extrudeSettings);
    var lower2Material = new THREE.MeshPhongMaterial({color: "rgb(50,50,50)", opacity: 0});
    var lower2 = new THREE.Mesh(extrudeGeometry, lower2Material);
    return lower2;
  }
  positionLowerBase2(height) {
    this.lowerBase2.position.set(0.0, 1.0, 0.0);
    this.lowerBase2.rotateX(degreesToRadians(90));
  }




  defaultUpdate(speed) {
    this.spinningAxis.rotateY(degreesToRadians(-speed));
  }

}
