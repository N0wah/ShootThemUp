import Player from './Player.js';
import Enemy from './Enemy.js';

const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");
const img = document.getElementById("source");
const gun_img = document.getElementById("gun");
const enemy_img = document.getElementById("enemy");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const arenaImg = new Image();
arenaImg.src = './assets/arena.png';

// ---------------------------- Get random position for the enemy outside the canvas -------------------------- //
var _x;
var _y;

function getRandom(){
    var choose = Math.random();
    if (choose <= 0.5){
        _x = randomPosX()[0];
        _y = randomPosX()[1];
    } else {
        _x = randomPosY()[0];
        _y = randomPosY()[1];
    }
}

function randomPosY() {
    var x = Math.random() * ((window.innerWidth+30) - (-10)) - 10;
    var y = Math.random() * ((window.innerHeight+30) - (-10)) - 10;
    if (x > 0 || x < window.innerWidth){
        while (y > 0 && y < window.innerHeight){
            y = Math.random() * ((window.innerHeight+30) - (-10)) - 10;
        }
    }
    return [x, y];
}

function randomPosX() {
    var x = Math.random() * ((window.innerWidth+30) - (-10)) - 10;
    var y = Math.random() * ((window.innerHeight+30) - (-10)) - 10;
    if (y > 0 || y < window.innerHeight){
        while (x > 0 && x < window.innerWidth){
            x = Math.random() * ((window.innerWidth+30) - (-10)) - 10;
        }
    }
    return [x, y];
}

// ---------------------------- Create Player and Enemy -------------------------- //

const player = new Player(canvas.width / 2, canvas.height / 2, canvas, img, gun_img);
const enemies = [];

// ---------------------------- Check collision to kill enemy with bullets -------------------------- //

function checkCollision(enemy){
    player.bullets.forEach(function (bullet) {
        if (bullet != null){
            const i = player.bullets.indexOf(bullet);
            if (bullet.x > canvas.width || bullet.y > canvas.height || bullet.x < 0 || bullet.y < 0) {
                player.bullets[i] = null;
            }
            if (
                bullet.x > enemy.position.x &&
                bullet.x < enemy.position.x + enemy.width &&
                bullet.y > enemy.position.y &&
                bullet.y < enemy.position.y + enemy.height
            ) {
                if (enemy.life.health > 0){
                    enemy.life.health -= 25;
                    player.bullets[i] = null;
                } 
                if (enemy.life.health <= 0) {
                    enemy.die();
                    player.bullets[i] = null;
                }
            }
        }
    });
}

// ---------------------------- Create new enemy -------------------------- //
let _add = 3;

function SpawnEnemy(){
    _add++;
    for (let i = 0; i < _add; i++){
        getRandom();
        enemies[i] = (new Enemy({
            position: {
                x: _x,
                y: _y
            },
            target: {
                x: player.x,
                y: player.y
            },
            life: {
                health: 50,
            },
            img: {
                img: enemy_img
            },
            allEnemies: enemies
        }));
    }
}

// ---------------------------- Game Logic -------------------------- //

SpawnEnemy();
let current_level = 1;
function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(arenaImg, 0, 0, canvas.width, canvas.height);
    ctx.font = "48px serif";
    ctx.fillStyle = "black";
    ctx.fillText("Level " + current_level.toString(), 10, 50);
    player.draw(ctx);
    if (current_level != 5) {
        let null_enemy = 0;
        for (let index = 0; index < enemies.length; index++) {
            if (enemies[index] == null){
                null_enemy++;
            }
        }
        if (null_enemy == _add) {
            current_level++;
            null_enemy = 0;
            _add += 7
            SpawnEnemy();
        }
        enemies.forEach(function (enemy) {
            if (enemy != null){
                const i = enemies.indexOf(enemy);
                enemy.target.x = player.x;
                enemy.target.y = player.y;
                enemy.draw(ctx);
                checkCollision(enemy);
                if (enemy.isDead == true){
                    enemies[i] = null;
                }
            }
        });
    }
    if (current_level == 5){
        //boss
    } 
}

setInterval(gameLoop, 1000 / 60);
