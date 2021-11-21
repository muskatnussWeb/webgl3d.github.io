class ShaderProgram{

    constructor(gl, vsCode, fsCode){
        this.gl = gl;
        const program = this.initShaderProgram(vsCode, fsCode);
        this.programInfo = {
            program:program,
            attribLocation:{
                vertexPosition:this.gl.getAttribLocation(program, 'aVertexPosition'),
                vertexNormal:this.gl.getAttribLocation(program, 'aVertexNormal')
            },
            uniformLocation:{
                projectionMatrix:this.gl.getUniformLocation(program, 'uProjectionMatrix'),
                modelViewMatrix:this.gl.getUniformLocation(program, 'uModelViewMatrix'),
                normalMatrix:this.gl.getUniformLocation(program, 'uNormalMatrix'),
                colorVertex:this.gl.getUniformLocation(program, 'uColorVertex'),
                backgroundColorVertex:this.gl.getUniformLocation(program, 'uBackgroundColor'),
                isPlayer:this.gl.getUniformLocation(program, 'uIsPlayer')
            }
        };
    }

    initShaderProgram(vsSource, fsSource) {
        const vertexShader = this.loadShader(this.gl.VERTEX_SHADER, vsSource);
        const fragmentShader = this.loadShader(this.gl.FRAGMENT_SHADER, fsSource);
        const shaderProgram = this.gl.createProgram();
        this.gl.attachShader(shaderProgram, vertexShader);
        this.gl.attachShader(shaderProgram, fragmentShader);
        this.gl.linkProgram(shaderProgram);
        if (!this.gl.getProgramParameter(shaderProgram, this.gl.LINK_STATUS)) {
          alert('Unable to initialize the shader program: ' + this.gl.getProgramInfoLog(shaderProgram));
          return null;
        }
        return shaderProgram;
      }


    loadShader(type, source) {
        const shader = this.gl.createShader(type);
        this.gl.shaderSource(shader, source);
        this.gl.compileShader(shader);
        if (!this.gl.getShaderParameter(shader, this.gl.COMPILE_STATUS)) {
          alert('An error occurred compiling the shaders: ' + this.gl.getShaderInfoLog(shader));
          this.gl.deleteShader(shader);
          return null;
        }
        return shader;
      }
}
export{ShaderProgram};