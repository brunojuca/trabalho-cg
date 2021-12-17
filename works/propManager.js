import * as THREE from "../build/three.module.js";
import { degreesToRadians } from "../libs/util/util.js";
import { Turbina } from './turbina.js';

export class PropManager extends THREE.Group {
    constructor() {
        super();
    }

    carregaEolics(eolics, scene){
        eolics = [];
        for (let i = 0; i < 21; i++) {
            var eolicTurbine = new Turbina();
            eolicTurbine.rotateY(degreesToRadians(180));
            eolics.push(eolicTurbine);
            eolics[i].position.set(-600+100*i, 0.0, 500.0);
            scene.add(eolics[i]);
        }
        return eolics;
    }


    carregaScenaryEolics(scenicEolics, scenicTemp, scene){
        for(let j = 0; j < 5; j++){
            scenicTemp = [];
            for (let i = 0; i < 21; i++) {
                var eolicTurbine = new Turbina();
                eolicTurbine.rotateY(degreesToRadians(180));
                scenicTemp.push(eolicTurbine);
            }
            scenicEolics.push(scenicTemp)
            for (let i = 0; i < 21; i++) {
                scenicEolics[j][i].position.set(-600+100*i, 0.0, 500.0 + 200*j);
                scene.add(scenicEolics[j][i]);
            }
        }
    }

    limpaEolics(eolics, scenicEolics, scene){
        for (let i = 0; i < eolics.length; i++) {
            scene.remove(eolics[i]);
        }
        for(let j = 0; j < 5; j++){
            for (let i = 0; i < 21; i++) {
                scene.remove(scenicEolics[j][i]);
            }
        }
    }


}