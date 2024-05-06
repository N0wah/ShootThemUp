import Player from './Player.js';
import Enemy from './Enemy.js';

const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

canvas.width = 1280;
canvas.height = 720;

function getRandom(){
    var choose = Math.random()
    console.log(choose);
    if (choose <=0.5){
        _x = randomPosX()[0]
        _y = randomPosX()[1]
    } else{
        _x = randomPosY()[0]
        _y = randomPosY()[1]
    }
}

var _x;
var _y;

function randomPosY() {
    var x = Math.random() * (1310-(-10))-10
    var y = Math.random() * (740-(-10))-10
    if (x > 0 || x < 1280){
        while (y > 0 && y < 720){
            var y = Math.random() * (740-(-10))-10
        }
    }
    let x_y = [x, y]
    return x_y
}

function randomPosX() {
    var x = Math.random() * (1310-(-10))-10
    var y = Math.random() * (740-(-10))-10
    if (y > 0 || y < 720){
        while (x > 0 && x < 1280){
            var x = Math.random() * (1310-(-10))-10
        }
    }
    let x_y = [x, y]
    return x_y
}

getRandom();

const player = new Player(canvas.width / 2, canvas.height / 2);
const enemy = new Enemy({
    position : {
        x: _x,
        y: _y
    },
    target : {
        x: player.x,
        y : player.y
    },
    life: {
        health: 50,
    }
})



function gameLoop() {
    console.log(enemy.position)
    enemy.target.x = player.x
    enemy.target.y = player.y
    ctx.clearRect(0,0,canvas.width, canvas.height)
    player.draw(ctx)
    enemy.draw(ctx)
}


setInterval(gameLoop, 1000 / 60);