const vsCode=`
attribute vec3 aVertexPosition;
attribute vec3 aVertexNormal;

uniform mat4 uProjectionMatrix;
uniform mat4 uModelViewMatrix;
uniform mat4 uNormalMatrix;
uniform vec3 uColorVertex;
uniform vec3 uBackgroundColor;
uniform int uIsPlayer;

varying highp vec3 vLighting;
varying highp vec3 vColor; 

vec3 calcFog(vec4 color, float z){
    float factor = 1.0 / exp((z*0.04));
    factor = clamp(factor, 0.0, 1.0);
    vec3 result = mix(uBackgroundColor, color.xyz, factor);
    return result;
}

void main(){    
    gl_Position = uProjectionMatrix*uModelViewMatrix*vec4(aVertexPosition, 1.0);

    highp vec3 ambientlight = vec3(0.3, 0.3, 0.3);
    highp vec3 directionalLightColor = vec3(1, 1, 1);
    highp vec3 directionalVector = vec3(1.5, 1, 1);
    highp vec4 transformedNormal = uNormalMatrix*vec4(aVertexNormal, 1.0);
    highp float directional = max(dot(transformedNormal.xyz, directionalVector), 0.0);
    vLighting = ambientlight + (directionalLightColor * directional);
    
    if(uIsPlayer == 1){
        vColor = calcFog(vec4(uColorVertex*vLighting, 1.0), gl_Position.z);
        vLighting *= 9.0;
    }
    else{
        vColor = calcFog(vec4(uColorVertex*vLighting, 1.0), gl_Position.z);
        vLighting = vec3(1.0, 1.0, 1.0);
    }
}
`;
export{vsCode};