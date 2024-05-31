import Player from './class/Player.js';
import Enemy from './class/Enemy.js';
import Explosion from './class/Explosion.js';
import Boss from './class/Boss.js';

const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");
const img = document.getElementById("source");
const gun_img = document.getElementById("gun");
const enemy_img = document.getElementById("enemy");
const ex1 = document.getElementById("ex1");
const ex2 = document.getElementById("ex2");
const ex3 = document.getElementById("ex3");
const ex4 = document.getElementById("ex4");
const ex5 = document.getElementById("ex5");
const ex6 = document.getElementById("ex6");
const ex7 = document.getElementById("ex7");
document.getElementById("music").loop = true;


canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const arenaImg = new Image();
arenaImg.src = '../assets/arena.png';

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
var enemies = [];
var explosion = null;

// ---------------------------- Check collision to kill enemy with bullets -------------------------- //

function checkCollision(enemy, isBoss){
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
                    var audio = new Audio('../assets/sound/explosion.wav')
                    audio.volume = 0.5;
                    audio.play()
                    explosion = new Explosion({
                        enemy : {
                            enemy : enemy
                        },
                        img : {
                            ex1 : ex1,
                            ex2 : ex2,
                            ex3 : ex3,
                            ex4 : ex4,
                            ex5 : ex5,
                            ex6 : ex6,
                            ex7 : ex7,
                        },
                        isBoss : isBoss
                    })
                    explosion.isDrawing = true
                    explosion.step = 1;
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

let current_level = 1;
if (current_level % 5 != 0 || current_level % 5 != 5) {
    SpawnEnemy();
}
var wichBoss = 1;
var boss_img = null
var init_boss = 0;
var boss = null;
var saved_enemies = null
function gameLoop() {
    switch (wichBoss) {
        case 1:
            boss_img = document.getElementById("boss1");
            break;
        case 2:
            boss_img = document.getElementById("boss2");
            break;
        case 3:
            boss_img = document.getElementById("boss3")
            break;
        default:
            break;
    }
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(arenaImg, 0, 0, canvas.width, canvas.height);
    ctx.font = "48px serif";
    ctx.fillStyle = "black";
    ctx.fillText("Level " + current_level.toString(), 10, 50);
    if (!player.dead) {
        player.draw(ctx);
        if (explosion != null){
            if (explosion.isDrawing == true){
                explosion.draw(ctx, explosion.step)
            }
        }
        if (current_level % 5 != 0 || current_level % 5 != 5) {
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
                    if (enemy.toucheJoueur){
                        player.dead = true;
                    }
                }
            });
        }
        if (current_level % 5 == 5 || current_level % 5 == 0){
            if (init_boss == 0){
                saved_enemies = enemies
                enemies = []
                player.x = 100;
                player.y = canvas.height / 2;
                boss = new Boss({
                    position: {
                        x: canvas.width - 100,
                        y: canvas.height / 2
                    },
                    target: {
                        x: player.x,
                        y: player.y
                    },
                    life: {
                        health: 2000,
                    },
                    img: {
                        img: boss_img
                    }
                })
                init_boss += 1;
            }
            boss.target.x = player.x;
            boss.target.y = player.y;
            boss.draw(ctx);
            checkCollision(boss, true)
            if (boss.toucheJoueur){
                player.dead = true;
            }
            if (boss.isDead){
                boss = null
                current_level += 1
                init_boss = 0;
                enemies = saved_enemies
                if (wichBoss != 3){
                    wichBoss +=1;
                }else {
                    wichBoss = 1
                }
            }
        }
    } else {
        ctx.font = "150px serif";
        ctx.fillStyle = "red";
        ctx.fillText("You're dead ", canvas.width/2 - 350, canvas.height /2);
        ctx.font = "70px serif";
        ctx.fillText("Press R to refresh game", canvas.width/2 - 350, canvas.height /2 + 300);
        if(player.refresh){
            location.reload()
        }
    }
}

setInterval(gameLoop, 1000 / 60);
