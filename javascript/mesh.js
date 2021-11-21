class Mesh {

    constructor(gl, data) {
        this.gl = gl;
        this.buffers = this.init(data);
    }

    init(data) {
        const positionBuffer = this.gl.createBuffer();
        const normalBuffer = this.gl.createBuffer();
        const indiceBuffer = this.gl.createBuffer();
        const positionArray = data.position;
        const normalArray = data.normal;
        const indices = data.indices;
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, positionBuffer);
        this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(positionArray), this.gl.STATIC_DRAW);
        
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, normalBuffer);
        this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(normalArray), this.gl.STATIC_DRAW);
        
        this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, indiceBuffer);
        this.gl.bufferData(this.gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), this.gl.STATIC_DRAW);
        
        return {
            position: positionBuffer,
            normal:normalBuffer,
            indices:indiceBuffer,
            vertexCount:indices.length
        };
    }
}
export { Mesh };