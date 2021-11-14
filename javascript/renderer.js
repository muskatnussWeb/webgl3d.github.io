import { ShaderProgram } from "./shaderProgram.js";
import { Mesh } from "./mesh.js";
import { Camera } from "./camera.js";

class Renderer {

    constructor(gl) {
        this.gl = gl;
        this.camera = new Camera();
        this.mesh = new Mesh(this.gl);
        this.shaderProgram = new ShaderProgram(this.gl);
        this.fieldOfView = 45 * Math.PI / 180;   // in radians
        this.aspect = this.gl.canvas.clientWidth / this.gl.canvas.clientHeight;
        this.zNear = 0.1;
        this.zFar = 100.0;
        this.projectionMatrix = mat4.create()
        this.modelViewMatrix = mat4.create();
    }

    init() {
        this.gl.enable(this.gl.DEPTH_TEST);           // Enable depth testing
        this.gl.depthFunc(this.gl.LEQUAL);
        // Near things obscure far things
        // Clear the canvas before we start drawing on it.
    }
    clear() {
        this.gl.clearColor(0.0, 0.0, 0.0, 1.0);  // Clear to black, fully opaque
        this.gl.clearDepth(1.0);
        this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
    }
    render() {
        let numComponents = 3;
        const type = this.gl.FLOAT;
        const normalize = false;
        const stride = 0;
        const offset = 0;
        this.clear();

        this.projectionMatrix = mat4.create();
        mat4.perspective(this.projectionMatrix, this.fieldOfView, this.aspect, this.zNear, this.zFar);

        this.modelViewMatrix = mat4.create();
        mat4.translate(this.modelViewMatrix, this.modelViewMatrix, this.camera.position);
        mat4.rotate(this.modelViewMatrix, this.modelViewMatrix, this.camera.rotation[0], [1, 0, 0]);
        mat4.rotate(this.modelViewMatrix, this.modelViewMatrix, this.camera.rotation[1], [0, 1, 0]);
        mat4.rotate(this.modelViewMatrix, this.modelViewMatrix, this.camera.rotation[2], [0, 0, 1]);

        //pos
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.mesh.buffers.position);
        this.gl.vertexAttribPointer(
            this.shaderProgram.programInfo.attribLocations.vertexPosition,
            numComponents,
            type,
            normalize,
            stride,
            offset);
        //color
        numComponents = 4;
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.mesh.buffers.color);
        this.gl.vertexAttribPointer(
            this.shaderProgram.programInfo.attribLocations.vertexColor,
            numComponents,
            type,
            normalize,
            stride,
            offset);

        this.gl.enableVertexAttribArray(this.shaderProgram.programInfo.attribLocations.vertexPosition);
        this.gl.enableVertexAttribArray(this.shaderProgram.programInfo.attribLocations.vertexColor);
        this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, this.mesh.buffers.indices);

        this.gl.useProgram(this.shaderProgram.programInfo.program);

        this.gl.uniformMatrix4fv(
            this.shaderProgram.programInfo.uniformLocations.projectionMatrix,
            false,
            this.projectionMatrix);
        this.gl.uniformMatrix4fv(
            this.shaderProgram.programInfo.uniformLocations.modelViewMatrix,
            false,
            this.modelViewMatrix);

        this.draw();
    }

    draw() {
        const vertexCount = 36;
        const type = this.gl.UNSIGNED_SHORT;
        const offset = 0;
        this.gl.drawElements(this.gl.TRIANGLES, vertexCount, type, offset);
    }
}

export { Renderer };