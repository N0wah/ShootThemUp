import Player from './Player.js';


const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

canvas.width = 1280;
canvas.height = 720;

const player = new Player(canvas.width / 2, canvas.height / 2, canvas);

function gameLoop() {
    ctx.clearRect(0,0,canvas.width, canvas.height)
    player.draw(ctx)

}


setInterval(gameLoop, 1000 / 60);