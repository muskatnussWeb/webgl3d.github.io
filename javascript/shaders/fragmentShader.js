const fsCode=`
varying highp vec3 vLighting;
varying highp vec3 vColor;

void main(){
    gl_FragColor = vec4(vColor*vLighting, 1.0);
}


`;
export{fsCode};