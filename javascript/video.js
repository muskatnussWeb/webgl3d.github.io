class Video {

    constructor(gl, url) {
        this.gl = gl;
        this.copyVideo = false;
        this.texture = this.initTexture();
        this.video = this.setupVideo(url);
    }
    setupVideo(url) {
        const video = document.createElement('video');

        var playing = false;
        var timeupdate = false;

        video.autoplay = true;
        video.muted = true;
        video.loop = true;

        var cop = this.copyVideo;
        video.addEventListener('playing', function () {
            playing = true;
            checkReady();
        }, true);

        video.addEventListener('timeupdate', function () {
            timeupdate = true;
            checkReady();
        }, true);

        video.src = url;
        video.play();

        function checkReady() {
            if (playing && timeupdate) {
                cop = true;
                console.log(cop);
            }
        }

        return video;
    }
    initTexture() {
        const texture = this.gl.createTexture();
        this.gl.bindTexture(this.gl.TEXTURE_2D, texture);
        const level = 0;
        const internalFormat = this.gl.RGBA;
        const width = 1;
        const height = 1;
        const border = 0;
        const srcFormat = this.gl.RGBA;
        const srcType = this.gl.UNSIGNED_BYTE;
        const pixel = new Uint8Array([0, 0, 255, 255]);  // opaque blue
        this.gl.texImage2D(this.gl.TEXTURE_2D, level, internalFormat,
            width, height, border, srcFormat, srcType,
            pixel);

        this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_S, this.gl.CLAMP_TO_EDGE);
        this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_T, this.gl.CLAMP_TO_EDGE);
        this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MIN_FILTER, this.gl.LINEAR);

        return texture;
    }
    updateTexture() {
        const level = 0;
        const internalFormat = this.gl.RGBA;
        const srcFormat = this.gl.RGBA;
        const srcType = this.gl.UNSIGNED_BYTE;
        this.gl.bindTexture(this.gl.TEXTURE_2D, this.texture);
        this.gl.texImage2D(this.gl.TEXTURE_2D, level, internalFormat,
            srcFormat, srcType, this.video);
    }
}


export { Video };
