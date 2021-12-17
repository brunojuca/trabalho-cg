import * as THREE from "../build/three.module.js";

export default class Roadblock
{
    constructor(x, y, z, blockType, largura=50, comprimento=50, altura=0.3) {
        this.LARGURA = largura;
        this.COMPRIMENTO = comprimento;
        this.ALTURA = altura;

        this.X = x * largura;
        this.Y = y * comprimento;
        this.Z = z * altura;

        switch (blockType) {
            case '1A':
                this.blockType = "COMUM1";
                break;
            case '1B':
                this.blockType = "COMUM2";
                break;
            case 2:
                this.blockType = "LARGADA";
                break;
            case 3:
                this.blockType = "CHECKPOINT";
                break;
            default:
                this.blockType = "OUT_OF_TRACK";
        }

        this.bloco = this.criaBloco();
    }

    criaBloco()
    {
        var cubeGeometry = new THREE.BoxGeometry(this.LARGURA, this.ALTURA, this.COMPRIMENTO);
        var cor;
        const loader = new THREE.TextureLoader();

        const roadTexture = loader.load( 'texture/road1.jpg' );
        const roadTexture2 = loader.load( 'texture/road2.jpeg' );
        const goalTexture = loader.load( 'texture/checkers.png' );

        //roadTexture.wrapS = roadTexture.wrapT = THREE.RepeatWrapping;
        goalTexture.wrapS = goalTexture.wrapT = THREE.RepeatWrapping;

        var lastRoadMaterial = new THREE.MeshStandardMaterial( { map: roadTexture } );
        var road1Material = new THREE.MeshStandardMaterial( { map: roadTexture } );
        var road2Material = new THREE.MeshStandardMaterial( { map: roadTexture2 } );

        var goalMaterial = new THREE.MeshStandardMaterial( { map: goalTexture } );
        switch (this.blockType) {
            case "COMUM1":
                cor = '#808080'; // cinza
                lastRoadMaterial = road1Material;
                //var cubeMaterial = new THREE.MeshPhongMaterial( {color: cor} );
                var bloco = new THREE.Mesh( cubeGeometry,  lastRoadMaterial  );
                break;
            case "COMUM2":
                cor = '#808080'; // cinza
                //var cubeMaterial = new THREE.MeshPhongMaterial( {color: cor} );
                lastRoadMaterial = road2Material;
                var bloco = new THREE.Mesh( cubeGeometry,  lastRoadMaterial  );
                break;
            case "CHECKPOINT":
                cor = '#808080'; // cinza
                //var cubeMaterial = new THREE.MeshPhongMaterial( {color: cor} );
                var bloco = new THREE.Mesh( cubeGeometry,  lastRoadMaterial  );
                break;
            case "LARGADA":
                cor = '#FADA5E'; // amarelo
                var cubeMaterial = new THREE.MeshPhongMaterial( {color: cor} );
                var bloco = new THREE.Mesh( cubeGeometry,  goalMaterial  );
                break;
            default:
                cor = '#000000'; // preto
                var cubeMaterial = new THREE.MeshPhongMaterial( {color: cor} );
                var bloco = new THREE.Mesh( cubeGeometry,  cubeMaterial  );

        }
        bloco.position.set(this.X, this.Z, this.Y);

        var outlineGeo = new THREE.BoxGeometry(this.LARGURA, this.ALTURA+0.1, this.COMPRIMENTO);
        var outlineMat = new THREE.MeshBasicMaterial({color : "#000000", side: THREE.BackSide});
        var outline = new THREE.Mesh(outlineGeo, outlineMat);
        bloco.add(outline);

        return bloco;
    }

    getBlockType(){
        return this.blockType;
    }
}