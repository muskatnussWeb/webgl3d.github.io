import { Item } from './item.js';
import { Camera } from './camera.js'
import { buildSphere } from './sphere.js';

const sphere = buildSphere(40, 20, 0.7);
const planDepth = 80;
const plan = {
    position: [-1.5, 0, -planDepth, 0, 0, -planDepth, 0, 0, 0, -1.5, 0, 0, 0, 0, -planDepth, 1.5, 0, -planDepth, 1.5, 0, 0, 0, 0, 0],
    normal: [0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1],
    indices: [0, 1, 2, 0, 2, 3, 4, 5, 6, 4, 6, 7]
};
const g = 9.8;
const m = 1.5;
const v0 = 8;


class Game {

    constructor(gl) {
        this.gl = gl;
        this.camera = new Camera();
        this.jumping = false;//[1.0, 0.85, 0.6]
        this.itemList = [new Item(this.gl, sphere, [1.0, 1.0, 1.0]), new Item(this.gl, plan, [1.0, 0.75, 0.0])];
        this.init();
        this.t = 0;
        this.time = 0.0;
        //this.addChunk(1, 0.25, 2, -1, 2, -10);
        //this.addChunk(1, 0.25, 2, 0.5, 1.0, -30);
        
    }

    addChunk(width, height, depth, x, y, z){
        let item = new Item(this.gl, generateChunk(width, height, depth), [1.0, 0.85, 0.2]);
        item.translate(x, y, z);
        item.speed = 20;
        item.kill(10);
        this.itemList.push(item); 
    }

    addDecor(z){
        //getRandomInt
        const w = getRandomInt(20)/10,h=getRandomInt(15)/10,d=getRandomInt(40)/10,x=getRandomSign()*(3.5+getRandomInt(50)/10),y=getRandomSign()*getRandomInt(50)/10;
        this.addChunk(w, h, d, x, y, z);
    }

    init() {
        this.camera.translate(0, 3, 5);
        this.camera.rotate(Math.PI/12, 0, 0);
        this.itemList[0].isPlayer = true;
        this.itemList[0].translate(0, 0.7, -3);
        this.itemList[0].rotate(0, 0, Math.PI / 2);
        this.itemList[1].translate(0, 0, 0);
        for(let i = 0; i < 4; i++){
            this.addDecor(-i*20);
            this.addDecor(-i*20);
            this.addDecor(-i*20);
            this.addDecor(-i*20);
            this.addDecor(-i*20);
            this.addDecor(-i*20);
            this.addDecor(-i*20);
            this.addDecor(-i*20);
            this.addDecor(-i*20);
            this.addDecor(-i*20);
        }
       // console.log(generateChunk(2, 1, 1));
    }

    input(){
        if(!this.jumping){
            this.jumping = true;
            console.log(this.itemList.length);
        }
    }

    update() {
        
        if(this.time-Math.floor(this.time) <= 1/60){
            
            this.addDecor(-100);
            this.addDecor(-100);
            this.addDecor(-100);
            this.addDecor(-100);
            this.addDecor(-100);
            this.addDecor(-100);
            this.addDecor(-100);
            this.addDecor(-100);
            this.addDecor(-100);
            this.addDecor(-100);
            this.clean();
        }
        if(this.jumping){
            this.t += 1/60;
            if(Y(this.t) <= 0){
                this.jumping = false;
                this.t = 0;
                this.itemList[0].position[1] = 0.7;
                this.itemList[0].translate(0, 0, 0);
            }
            else{
                this.itemList[0].position[1] = Y(this.t)+0.7;
            }
        }
        this.itemList[0].rotate(0.06, 0, 0);
        this.move();
        this.time += 1/60;
    }

    move(){
        for(let i = 0; i < this.itemList.length; i++){
            this.itemList[i].translate(0, 0, this.itemList[i].speed/60);
        }
    }
    clean(){
        for(let i = 0; i < this.itemList.length; i++){
            if(!this.itemList[i].active){
                this.itemList.splice(i, 1);
            }
        }
    }
    
}

function Y(t){
    return -1/2*m*g*t**2+v0*t;
}
function getRandomInt(max) {
    return Math.floor(Math.random() * max)+1;
}
function getRandomSign(){
    return Math.floor(Math.random() * 2) == 1?1:-1;
}
function generateChunk(width, height, depth){
    
    let position = [
        // Front face
        -1.0, -1.0,  1.0,
         1.0, -1.0,  1.0,
         1.0,  1.0,  1.0,
        -1.0,  1.0,  1.0,
        // Back face
        -1.0, -1.0, -1.0,
        -1.0,  1.0, -1.0,
         1.0,  1.0, -1.0,
         1.0, -1.0, -1.0,
        // Top face
        -1.0,  1.0, -1.0,
        -1.0,  1.0,  1.0,
         1.0,  1.0,  1.0,
         1.0,  1.0, -1.0,
        // Bottom face
        -1.0, -1.0, -1.0,
         1.0, -1.0, -1.0,
         1.0, -1.0,  1.0,
        -1.0, -1.0,  1.0,
        // Right face
         1.0, -1.0, -1.0,
         1.0,  1.0, -1.0,
         1.0,  1.0,  1.0,
         1.0, -1.0,  1.0,
        // Left face
        -1.0, -1.0, -1.0,
        -1.0, -1.0,  1.0,
        -1.0,  1.0,  1.0,
        -1.0,  1.0, -1.0,
    ];
    const indices = [
        0,  1,  2,      0,  2,  3,    // front
        4,  5,  6,      4,  6,  7,    // back
        8,  9,  10,     8,  10, 11,   // top
        12, 13, 14,     12, 14, 15,   // bottom
        16, 17, 18,     16, 18, 19,   // right
        20, 21, 22,     20, 22, 23,   // left
    ];
    let normal = get4([0, 0, 1]);
    normal = normal.concat(get4([0, 0, -1]));
    normal = normal.concat(get4([0, 1, 0]));
    normal = normal.concat(get4([0, -1, 0]));
    normal = normal.concat(get4([1, 0, 0]));
    normal = normal.concat(get4([-1, 0, 0]));
    for(let i = 0; i < position.length; i += 3){
        position[i] *= width/2;
        position[i+1] *= height/2;
        position[i+2] *= depth/2;
    }
    return {
        position:position,
        normal:normal,
        indices:indices
    };
}
function get4(arr){
    let newArr = [];
    for(let i = 0; i < 4; i++){
        newArr = newArr.concat(arr);
    }
    return newArr;
}
export { Game };