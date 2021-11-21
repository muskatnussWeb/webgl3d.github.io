import{ShaderProgram}from'./shaderProgram.js';
import{vsCode}from'./shaders/vertexShader.js';
import{fsCode}from'./shaders/fragmentShader.js';

class Renderer{

    constructor(gl, game){
        this.gl = gl;
        this.game = game;
        this.shaderProgram = new ShaderProgram(this.gl, vsCode, fsCode);
        this.fov = 45*Math.PI/180;
        this.aspect = this.gl.canvas.clientWidth/this.gl.canvas.clientHeight;
        this.near = 0.1;
        this.far = 100.0;
        this.backgroundColor = [0.24/2, 0.16/2, 0.0];
        //sthis.backgroundColor = [1.0, 0.0, 0.0];
        this.itemCount = 0;
        
    }

    initBuffers(){
        for(let i = 0; i < this.game.itemList.length; i++){
            this.initBuffer(this.game.itemList[i]);
        }
    }

    initBuffer(item){
        const numComponents = 3;
        const type = this.gl.FLOAT;
        const normalize = false; 
        const stride = 0;
        const offset = 0;
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, item.mesh.buffers.position);
        this.gl.vertexAttribPointer(this.shaderProgram.programInfo.attribLocation.vertexPosition, numComponents, type, normalize, stride, offset);
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, item.mesh.buffers.normal);
        this.gl.vertexAttribPointer(this.shaderProgram.programInfo.attribLocation.vertexNormal, numComponents, type, normalize, stride, offset);
        this.itemCount += 1;
    }

    initMatrices(item){
        this.projectionMatrix = mat4.create();
        mat4.perspective(this.projectionMatrix, this.fov, this.aspect, this.near, this.far);
        this.modelViewMatrix = mat4.create();
        mat4.translate(this.modelViewMatrix, this.modelViewMatrix, [-this.game.camera.position[0], -this.game.camera.position[1], -this.game.camera.position[2]]);
        mat4.rotate(this.modelViewMatrix, this.modelViewMatrix, this.game.camera.rotation[0], [1, 0, 0]);
        mat4.rotate(this.modelViewMatrix, this.modelViewMatrix, this.game.camera.rotation[1], [0, 1, 0]);
        mat4.rotate(this.modelViewMatrix, this.modelViewMatrix, this.game.camera.rotation[2], [0, 0, 1]);
        mat4.translate(this.modelViewMatrix, this.modelViewMatrix, item.position);
        mat4.rotate(this.modelViewMatrix, this.modelViewMatrix, -item.rotation[0], [1, 0, 0]);
        mat4.rotate(this.modelViewMatrix, this.modelViewMatrix, -item.rotation[1], [0, 1, 0]);
        mat4.rotate(this.modelViewMatrix, this.modelViewMatrix, -item.rotation[2], [0, 0, 1]);
        
        this.normalMatrix = mat4.create();
        mat4.invert(this.normalMatrix, this.modelViewMatrix);
        mat4.transpose(this.normalMatrix, this.normalMatrix);
    }

    clear(){
        this.gl.clearColor(this.backgroundColor[0], this.backgroundColor[1], this.backgroundColor[2], 1.0);
        this.gl.clearDepth(1.0);
        this.gl.enable(this.gl.DEPTH_TEST);
        this.gl.depthFunc(this.gl.LEQUAL);
        this.gl.clear(this.gl.COLOR_BUFFER_BIT|this.gl.DEPTH_BUFFER_BIT);
        
    }

    render(){
        this.clear();
        this.gl.enableVertexAttribArray(this.shaderProgram.programInfo.attribLocation.vertexPosition);
        this.gl.enableVertexAttribArray(this.shaderProgram.programInfo.attribLocation.vertexNormal);
        this.gl.useProgram(this.shaderProgram.programInfo.program);
        for(let i = 0; i < this.game.itemList.length; i++){
            this.renderItem(this.game.itemList[i]);
        }
    }

    renderItem(item){
        this.initBuffer(item);
        this.initMatrices(item);
        this.gl.uniformMatrix4fv(this.shaderProgram.programInfo.uniformLocation.projectionMatrix, false, this.projectionMatrix);
        this.gl.uniformMatrix4fv(this.shaderProgram.programInfo.uniformLocation.modelViewMatrix, false, this.modelViewMatrix);
        this.gl.uniformMatrix4fv(this.shaderProgram.programInfo.uniformLocation.normalMatrix, false, this.normalMatrix);
        this.gl.uniform3fv(this.shaderProgram.programInfo.uniformLocation.colorVertex, item.color);
        this.gl.uniform3fv(this.shaderProgram.programInfo.uniformLocation.backgroundColorVertex, this.backgroundColor);

        this.gl.uniform1i(this.shaderProgram.programInfo.uniformLocation.isPlayer, item.isPlayer==true?1:0);
        this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, item.mesh.buffers.indices);
        this.draw(item);
    }

    draw(item){
        const offset = 0;
        const vertexCount = item.mesh.buffers.vertexCount;
        const type = this.gl.UNSIGNED_SHORT;
        this.gl.drawElements(this.gl.TRIANGLES, vertexCount, type, offset);
    }
}

export{Renderer};