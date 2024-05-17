import Player from './Player.js';
import Enemy from './Enemy.js';


const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

canvas.width = 1280;
canvas.height = 720;

// ---------------------------- Get random position for the enemy outside the canvas -------------------------- //
var _x;
var _y;

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



// ---------------------------- Create Player and Enemy -------------------------- //

const player = new Player(canvas.width / 2, canvas.height / 2, canvas);
const enemies = new Array(4)

// ---------------------------- Check collision to kill enemy with bullets -------------------------- //

function checkCollision(enemy){
    player.bullets.forEach(function (bullet) {
        const i = player.bullets.indexOf(bullet)
        if (bullet.x > canvas.width || bullet.y > canvas.height || bullet.x < 0 || bullet.y < 0) {
            player.bullets.pop(i)
        }
        if (
            bullet.x > enemy.position.x &&
            bullet.x < enemy.position.x + enemy.width &&
            bullet.y > enemy.position.y &&
            bullet.y < enemy.position.y + enemy.height
        ) {
            if (enemy.life.health > 0){
                enemy.life.health -= 25;
                player.bullets.pop(i)
            } 
            if (enemy.life.health <= 0) {
                enemy.die()
                player.bullets.pop(i)
            }
        }
    })
    
}

// ---------------------------- Create new enemy -------------------------- //

function SpawnEnemy(){
    for (let i = 0; i < 4; i++){
        getRandom()
        enemies[i] = new Enemy({
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
            },                
            player : {
              player : player
            }
        })
    }
}


// ---------------------------- Game Logic -------------------------- //


SpawnEnemy()
function gameLoop() {
    ctx.clearRect(0,0,canvas.width, canvas.height);
    player.draw(ctx);
    enemies.forEach(function (enemy) {
        if (enemy != null){
            const i = enemies.indexOf(enemy)
            enemy.target.x = player.x
            enemy.target.y = player.y
            enemy.draw(ctx);
            checkCollision(enemy)
            if (enemy.isDead == true){
                enemies[i] = null
                console.log(enemies);
            }
        }
    })
}


setInterval(gameLoop, 1000 / 60);