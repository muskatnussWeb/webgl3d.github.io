import {Renderer} from "./renderer.js";
import {Video} from "./video.js";

main();

function main() {
  const canvas = document.querySelector('#glCanvas');
  const gl = canvas.getContext('webgl');
  const renderer = new Renderer(gl);
  renderer.init();
  renderer.camera.translate(0, 0, -10);
  const video = new Video(gl, 'Firefox.mp4');
  renderer.mesh.initTexture(video.texture);
  if (!gl) {
    alert('Unable to initialize WebGL. Your browser or machine may not support it.');
    return;
  }

  function loop(){
    renderer.camera.rotate(0.03, 0.03, 0.03);
    console.log(video.copyVideo);
    if(video.copyVideo){
      video.updateTexture();
    }

    render(renderer);
    requestAnimationFrame(loop);
  }

  requestAnimationFrame(loop);
}

function render(renderer) {
  
  renderer.render();
}
