import {Renderer} from "./renderer.js";

main();

function main() {
  const canvas = document.querySelector('#glCanvas');
  const gl = canvas.getContext('webgl');
  const renderer = new Renderer(gl);
  renderer.init();
  renderer.camera.translate(0, 0, -10);

  if (!gl) {
    alert('Unable to initialize WebGL. Your browser or machine may not support it.');
    return;
  }

  function loop(){
    renderer.camera.rotate(0.03, 0.03, 0.03);
    render(renderer);
    requestAnimationFrame(loop);
  }

  requestAnimationFrame(loop);
}

function render(renderer) {
  
  renderer.render();
}