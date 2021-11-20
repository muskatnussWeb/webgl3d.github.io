import{Renderer}from'./renderer.js';
import{Game}from'./game.js';

class Engine{

    constructor(){
        this.canvas = document.querySelector('#glcanvas');
        this.gl = this.canvas.getContext('webgl');
        if (this.gl === null) {
            alert("Unable to initialize WebGL. Your browser or machine may not support it.");
            return;
        }
        this.game = new Game(this.gl);
        this.renderer = new Renderer(this.gl, this.game);
        
    }

    loop(){
        this.game.update();
        this.renderer.render();

    }

}

export{Engine};