 // Fragment shader program

  const fsSource = `
    varying highp vec2 vTextureCoord;
    varying highp vec3 vLighting;

    uniform sampler2D uSampler;

    void main() {
      highp vec4 texelColor = texture2D(uSampler, vtextureCoord);

      gl_FragColor = texture2D(uSampler, vTextureCoord);
    }
`;

export {fsSource};