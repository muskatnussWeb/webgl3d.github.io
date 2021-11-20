import {Mesh} from './mesh.js';


class Item{

    constructor(gl, data, color){
        this.mesh = new Mesh(gl, data);
        this.color = color;
        this.position = [0.0, 0.0, 0.0];
        this.rotation = [0.0, 0.0, 0.0];
        this.active = true;
        this.speed = 0;
        this.isPlayer = false;
    }

    translate(x, y, z){
        this.position[0] += x;
        this.position[1] += y;
        this.position[2] += z;
    }

    rotate(x, y, z){
        this.rotation[0] += x;
        this.rotation[1] += y;
        this.rotation[2] += z;
    }
/*
    applyGradient(){
        this.gradient = true;
    }*/

    kill(time){
        setTimeout(()=>{this.active = false}, time*1000);
    }
}
export{Item};