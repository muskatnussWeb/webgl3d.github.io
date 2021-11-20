import{Engine}from'./engine.js';


const engine = new Engine();
engine.canvas.addEventListener('click', input);
loop();
function loop(){
    engine.loop();
    requestAnimationFrame(loop);
}
function input(){
    engine.game.input();
}