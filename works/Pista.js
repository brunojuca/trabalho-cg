import Roadblock from "./Roadblock.js";

export default class Pista {
    constructor({linhas=5, colunas=5} = {}) {
        this.LINHAS = linhas;
        this.COLUNAS = colunas;

        this.roadblocks = [];
        for (let i=0; i < this.LINHAS * this.COLUNAS; i++) {
            this.roadblocks[i] = 0;
        }
    }
    carregaPista(pista)
    {
        this.LINHAS = pista.length;
        this.COLUNAS = pista[0]?.length ?? 0;

        this.roadblocks = [];
        for (let i=0; i<this.LINHAS; i++) {
            this.roadblocks[i] = [];
            for (let j=0; j<this.COLUNAS; j++) {
                this.roadblocks[i][j] = pista[i][j];
            }
        }
    }

    montaPista()
    {
        var blockArray = [];
        for (let j=0; j<this.COLUNAS; j++) {
            for (let i=0; i<this.LINHAS; i++) {
                if (this.roadblocks[i][j] != 0) {
                    var bloco = new Roadblock(i, j, 0, this.roadblocks[i][j]);
                    blockArray.push(bloco);
                }
            }
        }
        return blockArray;
    }
    // create the ground plane
    /*
    var pista = new Pista();
    pista.carregaPista(pista1);
    var blockArray = [];
    blockArray = pista.montaPista();
    for (let i = 0; i < blockArray.length; i++) {
        scene.add(blockArray[i].bloco);
    }
    */
}