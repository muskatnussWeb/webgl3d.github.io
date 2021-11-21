class Camera{

    constructor(){
        this.position = [0.0, 0.0, 0.0];
        this.rotation = [0.0, 0.0, 0.0];
    }

    translate(x, y, z){
        this.position[0] += x;
        this.position[1] += y;
        this.position[2] += z;
    }

    rotate(x, y, z){
        this.rotation[0] += x;
        this.rotation[1] += y;
        this.rotation[2] += z;
    }
}
export{ Camera };