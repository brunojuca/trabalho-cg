import * as THREE from "../build/three.module.js";
import { degreesToRadians } from "../libs/util/util.js";

export class Pokey extends THREE.Group {
  ball1;
  ball2;
  ball3;
  head;
  height;

  pokeySpeed;
  update1;
  update2;

  constructor() {
    super();

    const loader = new THREE.TextureLoader();

    const pokeyTexture = loader.load( 'texture/track1/pokey.jpg' );
    this.pokeyMaterial = new THREE.MeshLambertMaterial( { map: pokeyTexture } );
    this.pokeySpeed = 3.0;
    this.update1 = true;
    this.update2 = false;

    this.height = 5;
    this.turbo = 0;
    var spikeColor = "rgb(0,255,0)";

    // Balls
    this.ball1 = this.createBody(this.height);
    this.ball2 = this.createBody(this.height);
    this.ball3 = this.createBody(this.height);
    this.positionBody(this.height);

    // Head
    this.head = this.createHead(this.height);
    this.positionHead(this.height);

    this.add(this.ball1);
    this.add(this.ball2);
    this.add(this.ball3);
    this.add(this.head);

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
    var ballGeometry = new THREE.SphereGeometry(height, 32, 32);
    var ball = new THREE.Mesh(ballGeometry, this.pokeyMaterial);
    return ball;
  }

  positionBody(height) {
    this.ball1.position.set(0, 10, 0);
    this.ball2.position.set(0, 10 + 2*height, 0);
    this.ball3.position.set(0, 10 + 4*height, 0);
  }


  //-------------------------------------------------------------------------------
  // Cabeça
  //-------------------------------------------------------------------------------

  eyeShape()
  {
    var eye = new THREE.Shape();
      //x do ponto de max, y do ponto de max, x e y do destino
      eye.absellipse( 0.0, 0.0, 0.8, 2.0, 0, Math.PI * 2, false );
    var holePath = new THREE.Path();
      holePath.absellipse( 0.0, 0.0, 0.4, 0.9, 0, Math.PI * 2, false );
    eye.holes.push( holePath );
    return eye;
  }

  mouthShape()
  {
    var smileyMouthPath = new THREE.Path();
      smileyMouthPath.moveTo( -2.0, 0.0 );
      smileyMouthPath.quadraticCurveTo( 0.0, 2.0, 2.0, 0.0 )
      smileyMouthPath.quadraticCurveTo( 0.0, 4.0, -2.0, 2.0 )
      smileyMouthPath.quadraticCurveTo( -3.5, 1.0, -2.0, 0.0 );

    return smileyMouthPath;
  }

  createHead(height) {
    const eyeExtrudeSettings =
    {
      depth: 1,
      steps: 2,
      bevelEnabled: true,
      bevelThickness: 0.2,
      bevelSize: 0.1,
      bevelOffset: 0,
      bevelSegments: 20
    };

    var headGeometry = new THREE.SphereGeometry(height, 32, 32);
    var head = new THREE.Mesh(headGeometry, this.pokeyMaterial);

    var eyeGeometry = new THREE.ExtrudeGeometry(this.eyeShape(), eyeExtrudeSettings);
    var eyeMaterial = new THREE.MeshBasicMaterial({color: "rgb(50,50,50)", opacity: 0});


    var eye = new THREE.Mesh(eyeGeometry, eyeMaterial);
    eye.position.set(1.3, 0.6, -height);
    var eye2 = new THREE.Mesh(eyeGeometry, eyeMaterial);
    eye2.position.set(-1.3, 0.6, -height);

    var hatGeometry = new THREE.CylinderGeometry(2.0, 3.0, 6.0);
    var hatMaterial = new THREE.MeshBasicMaterial({color: "rgb(255,20,20)", opacity: 0});
    var hat = new THREE.Mesh(hatGeometry, hatMaterial);
    hat.position.set(0.0, 6.0, 0.0);

    var mouthGeometry = new THREE.SphereGeometry(2.0);
    var mouthMaterial = new THREE.MeshBasicMaterial({color: "rgb(50,50,50)", opacity: 0});
    var mouth = new THREE.Mesh(mouthGeometry, mouthMaterial);
    mouth.scale.set(0.6, 0.5, 1.0);
    mouth.position.set(0.0, 0.0, -height);

    head.add(eye);
    head.add(eye2);
    head.add(hat);
    head.add(mouth);

    return head;
  }

  positionHead(height) {
    this.head.position.set(0, 10 + 6*height, 0);
  }

  //-------------------------------------------------------------------------------
  // Movimentação
  //-------------------------------------------------------------------------------

  defaultUpdate1(){
    this.ball1.translateX(this.pokeySpeed);
    this.ball2.translateX(-this.pokeySpeed/2);
    this.ball2.translateY(-1.5*this.pokeySpeed);
    this.ball3.translateX(this.pokeySpeed/3);
    this.ball3.translateY(-2*this.pokeySpeed);
    this.head.translateX(-this.pokeySpeed/4);
    this.head.translateY(-2.5*this.pokeySpeed);
    this.update1 = false;
    this.update2 = true;
  }
  defaultUpdate2(){
    this.ball1.translateX(-this.pokeySpeed);
    this.ball2.translateX(this.pokeySpeed/2);
    this.ball2.translateY(1.5*this.pokeySpeed);
    this.ball3.translateX(-this.pokeySpeed/3);
    this.ball3.translateY(2*this.pokeySpeed);
    this.head.translateX(this.pokeySpeed/4);
    this.head.translateY(2.5*this.pokeySpeed);
    this.update1 = true;
    this.update2 = false;
  }
}
