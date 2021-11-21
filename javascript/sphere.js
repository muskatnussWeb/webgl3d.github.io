function getZX(n){
    if(n <= 2){
        console.warn("need at least 3 columns to build a sphere");
        return null;
    }
    let coordArr = [];
    for(let k = 0; k < n; k++){
        const theta = k*2*Math.PI/n;
        coordArr.push([Math.cos(theta), Math.sin(theta)]);
    }
    return coordArr;
}

function getYR(m){
    if(m <= 0){
        console.warn("need at least corners");
        return null;
    }
    let coordArr = [];
    for(let k = 0; k < m; k++){
        const phi = (k+1)*Math.PI/(m+1);
        coordArr.push([Math.cos(phi), Math.sin(phi)]);
    }
    return coordArr;
}

function getV(R, S, r){
    return [r*S[1]*R[1], r*S[0], r*S[1]*R[0]];
}

function getCurve(R, m, r){
    const arr = [];
    const YR = getYR(m);
    for(let i = 0; i < YR.length; i++){
        let S = YR[i];
        arr.push(getV(R, S, r));
    }
    return arr;
}
function buildPiece(R1, R2, m, r, offset){
    const C1 = getCurve(R1, m, r);
    const C2 = getCurve(R2, m, r);
    const l = C1.length;
    let normalArray = [];
    //first triangle
    let positionArray = [0, r, 0, C2[0][0], C2[0][1], C2[0][2], C1[0][0], C1[0][1], C1[0][2]];//toptriangle
    let indiceArray =[0, 1, 2]; 
    //quads
    if(l >= 2){
        for(let i = 1; i < l; i++){
            const fact = 2 * i - 1;
            const v3 = C2[i];
            const v4 = C1[i];
            positionArray = positionArray.concat(v3);
            positionArray = positionArray.concat(v4);
            indiceArray = indiceArray.concat(getIndice(fact));
        }
    }
    //last triangle
    positionArray = positionArray.concat([0, -r, 0]);
    let M = Math.max(...indiceArray);
    indiceArray = indiceArray.concat([M-1, M+1, M]);
    for(let i = 0; i< indiceArray.length; i++){
        indiceArray[i] += offset;
    }
    for(let i = 0; i < positionArray.length; i+=9){
        //console.log(indiceArray[i], indiceArray[i+1], indiceArray[i+2]);
        const v1 = [positionArray[i], positionArray[i+1], positionArray[i+2]];
        const v2 = [positionArray[i+3], positionArray[i+4], positionArray[i+5]];
        const v3 = [positionArray[i+6], positionArray[i+7], positionArray[i+8]];
        normalArray = normalArray.concat(getNormal(v1, v2, v3));
        normalArray = normalArray.concat(getNormal(v1, v2, v3));
        normalArray = normalArray.concat(getNormal(v1, v2, v3));
    }
    console.log(normalArray);
    return {
        position:positionArray,
        normal:normalArray,
        indices:indiceArray
    };
}
function buildPiece2(R1, R2, m, r, offset){
    const C1 = getCurve(R1, m, r);
    const C2 = getCurve(R2, m, r);
    const l = C1.length;
    
    //first triangle
    let positionArray = [0, r, 0, C2[0][0], C2[0][1], C2[0][2], C1[0][0], C1[0][1], C1[0][2]];//toptriangle
    let v1 = [positionArray[0], positionArray[1], positionArray[2]];
    let v2 = [positionArray[3], positionArray[4], positionArray[5]];
    let v3 = [positionArray[6], positionArray[7], positionArray[8]];
    let normalArray = getNormal(v1, v2, v3);
    normalArray = normalArray.concat(getNormal(v1, v2, v3));
    normalArray = normalArray.concat(getNormal(v1, v2, v3));
    
    let indiceArray =[0, 1, 2]; 
    //quads
    if(l >= 2){
        for(let i = 0; i < l-1; i++){
            const fact = 3+i*4;
            let v1 = C1[i];
            let v2 = C2[i];
            let v3 = C2[i+1];
            let v4 = C1[i+1];
            positionArray = positionArray.concat(v1);
            positionArray = positionArray.concat(v2);
            positionArray = positionArray.concat(v3);
            positionArray = positionArray.concat(v4);
            normalArray = normalArray.concat(getNormal(v1, v2, v3));
            normalArray = normalArray.concat(getNormal(v1, v2, v3));
            normalArray = normalArray.concat(getNormal(v1, v2, v3));
            normalArray = normalArray.concat(getNormal(v1, v2, v3));
            indiceArray = indiceArray.concat(getIndice2(fact));
        }
    }
    //last triangle
    positionArray = positionArray.concat([C1[l-1][0], C1[l-1][1], C1[l-1][2], C2[l-1][0], C2[l-1][1], C2[l-1][2], 0, -r, 0]);
    let M = Math.max(...indiceArray);
    indiceArray = indiceArray.concat([M+1, M+2, M+3]);
    for(let i = 0; i< indiceArray.length; i++){
        indiceArray[i] += offset;
    }
    //console.log(indiceArray);
    
    v1 = [positionArray[l-9], positionArray[l-8], positionArray[l-7]];
    v2 = [positionArray[l-6], positionArray[l-5], positionArray[l-4]];
    v3 = [positionArray[l-3], positionArray[l-2], positionArray[l-1]];
    normalArray = normalArray.concat(getNormal(v1, v2, v3));
    normalArray = normalArray.concat(getNormal(v1, v2, v3));
    normalArray = normalArray.concat(getNormal(v1, v2, v3));

    //console.log(positionArray.length);
    //console.log(normalArray);
    return {
        position:positionArray,
        normal:normalArray,
        indices:indiceArray
    };
}

function getIndice(offset){
    let indiceArray = [0, 2, 1, 1, 2, 3];
    for(let i = 0; i < indiceArray.length; i++){
        indiceArray[i] += offset;
    }
    return indiceArray;
}
function getIndice2(offset){
    let indiceArray = [0, 1, 2, 0, 2, 3];
    for(let i = 0; i < indiceArray.length; i++){
        indiceArray[i] += offset;
    }
    return indiceArray;
}

function getNormal(v1, v2, v3){
    const U = [v3[0]-v1[0], v3[1]-v1[1], v3[2]-v1[2]];
    const V = [v2[0]-v1[0], v2[1]-v1[1], v2[2]-v1[2]];
    const cross = [U[1]*V[2]-U[2]*V[1], U[2]*V[0]-U[0]*V[2], U[0]*V[1]-U[1]*V[0]];
    //console.log('cross:', cross);
    //const norm = Math.sqrt(Math.pow(cross[0], 2) + Math.pow(cross[1], 2) + Math.pow(cross[2], 2));
    //console.log('norm:', cross);
    //return [cross[0]/norm, cross[1]/norm, cross[2]/norm];
    return cross;
}

function buildSphere(n, m, r){
    const ZX = getZX(n);
    let shereData = {
        position:[],
        normal:[],
        indices:[]
    };
    let offset = 0;
    let shape = buildPiece2(ZX[0], ZX[1], m, r, offset);
    for(let i = 0; i < ZX.length; i++){
        if(i >= ZX.length-1){
            shape = buildPiece2(ZX[i], ZX[0], m, r, offset);
        }
        else{
             shape = buildPiece2(ZX[i], ZX[i+1], m, r, offset);
        }
        shereData.position = shereData.position.concat(shape.position);
        shereData.normal = shereData.normal.concat(shape.normal);
        shereData.indices = shereData.indices.concat(shape.indices);
        offset = Math.max(...shereData.indices)+1;
    }
    return shereData;
}

export{buildSphere, getNormal};