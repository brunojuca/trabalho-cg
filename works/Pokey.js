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

    const pokeyTexture = loader.load( 'texture/pokey.jpg' );
    this.pokeyMaterial = new THREE.MeshStandardMaterial( { map: pokeyTexture } );
    this.pokeySpeed = 10.0;
    this.update1 = true;
    this.update2 = false;

    this.height = 15;
    this.turbo = 0;
    var spikeColor = "rgb(0,255,0)";

    // Balls
    this.ball1 = this.createBody(this.height);
    this.ball2 = this.createBody(this.height);
    this.ball3 = this.createBody(this.height);
    this.positionBody(this.height);

    this.add(this.ball1);
    this.add(this.ball2);
    this.add(this.ball3);

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
  // Movimentação
  //-------------------------------------------------------------------------------

  defaultUpdate1(){
    this.ball1.translateX(this.pokeySpeed);
    this.ball2.translateX(-this.pokeySpeed);
    this.ball2.translateY(-this.pokeySpeed);
    this.ball3.translateX(this.pokeySpeed);
    this.ball3.translateY(-2*this.pokeySpeed);
    this.update1 = false;
    this.update2 = true;
  }
  defaultUpdate2(){
    this.ball1.translateX(-this.pokeySpeed);
    this.ball2.translateX(this.pokeySpeed);
    this.ball2.translateY(this.pokeySpeed);
    this.ball3.translateX(-this.pokeySpeed);
    this.ball3.translateY(2*this.pokeySpeed);
    this.update1 = true;
    this.update2 = false;
  }
}
