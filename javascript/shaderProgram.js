import { vsSource } from "./shaders/vertexShader.js";
import { fsSource } from "./shaders/fragmentShader.js";

class ShaderProgram {

  constructor(gl) {
    this.shaderProgram = this.initShaderProgram(gl, vsSource, fsSource);
    this.programInfo = {
      program: this.shaderProgram,
      attribLocations: {
        vertexPosition: gl.getAttribLocation(this.shaderProgram, 'aVertexPosition'),
        vertexColor: gl.getAttribLocation(this.shaderProgram, 'aVertexColor')
      },
      uniformLocations: {
        projectionMatrix: gl.getUniformLocation(this.shaderProgram, 'uProjectionMatrix'),
        modelViewMatrix: gl.getUniformLocation(this.shaderProgram, 'uModelViewMatrix'),
      },
    };
  }
  initShaderProgram(gl, vsSource, fsSource) {
    const vertexShader = this.loadShader(gl, gl.VERTEX_SHADER, vsSource);
    const fragmentShader = this.loadShader(gl, gl.FRAGMENT_SHADER, fsSource);


    const shaderProgram = gl.createProgram();
    gl.attachShader(shaderProgram, vertexShader);
    gl.attachShader(shaderProgram, fragmentShader);
    gl.linkProgram(shaderProgram);


    if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
      alert('Unable to initialize the shader program: ' + gl.getProgramInfoLog(shaderProgram));
      return null;
    }

    return shaderProgram;
  }
  loadShader(gl, type, source) {
    const shader = gl.createShader(type);

    gl.shaderSource(shader, source);

    gl.compileShader(shader);

    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      alert('An error occurred compiling the shaders: ' + gl.getShaderInfoLog(shader));
      gl.deleteShader(shader);
      return null;
    }

    return shader;
  }
}
export { ShaderProgram };