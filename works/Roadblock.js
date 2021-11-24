import * as THREE from "../build/three.module.js";

export default class Roadblock
{
    constructor(x, y, z, blockType, largura=10, comprimento=10, altura=0.3) {
        this.LARGURA = largura;
        this.COMPRIMENTO = comprimento;
        this.ALTURA = altura;

        this.X = x * largura;
        this.Y = y * comprimento;
        this.Z = z * altura;
        
        switch (blockType) {
            case 1:
                this.blockType = "COMUM";
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
        switch (this.blockType) {
            case "COMUM":
            case "CHECKPOINT":
                cor = '#808080'; // cinza
                break;
            case "LARGADA":
                cor = '#FADA5E'; // amarelo
                break;
            default:
                cor = '#000000'; // preto

        }
        var cubeMaterial = new THREE.MeshPhongMaterial( {color: cor} );
        var bloco = new THREE.Mesh( cubeGeometry, cubeMaterial );
        bloco.position.set(this.X, this.Z, this.Y);
        return bloco;
    }

}