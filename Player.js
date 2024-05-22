import Bullet from './Bullet.js';

export default class Player {
    constructor(x, y, canvas) {
        this.x = x;
        this.y = y;
        this.width = 20;
        this.height = 50;
        this.speed = 4;
        this.bullets = [];
        this.canvas = canvas;
        this.canShoot = true;
        this.shootDelay = 200;

        document.addEventListener("keydown", this.keydown);
        document.addEventListener("keyup", this.keyup);
        document.addEventListener("mousedown", this.mousedown);
        document.addEventListener("mousemove", this.mousemove);
    }

    draw(ctx){
        this.move();
        ctx.strokeStyle='black';
        ctx.strokeRect(this.x, this.y, this.width, this.height);
        ctx.fillStyle='black';
        ctx.fillRect(this.x, this.y, this.width, this.height);
        this.bullets.forEach(bullet => bullet.draw(ctx));
    }

    move(){
        if (this.downPressed && this.y < 720 - this.height){
            this.y += this.speed;
        }
        if (this.upPressed && this.y > 0){
            this.y -= this.speed;
        }
        if (this.rightPressed && this.x < 1280 - this.width){
            this.x += this.speed;
        }
        if (this.leftPressed && this.x > 0){
            this.x -= this.speed;
        }
        this.bullets.forEach(bullet => bullet.update());
    }

    shoot(){
        if (this.canShoot) {
            const bulletSpeed = 20;
            const angle = Math.atan2(this.mouseY - this.y - this.height / 2, this.mouseX - this.x - this.width / 2);
            const velocity = {
                x: bulletSpeed * Math.cos(angle),
                y: bulletSpeed * Math.sin(angle)
            };
            this.bullets.push(new Bullet(this.x + this.width / 2, this.y + this.height / 2, velocity));

            this.canShoot = false;
            setTimeout(() => {
                this.canShoot = true;
            }, this.shootDelay);
        }
    }

    mousedown = (e) => {
        if (e.button === 0){
            this.shoot();
        }
    }

    mousemove = (e) => {
        const rect = this.canvas.getBoundingClientRect();
        this.mouseX = e.clientX - rect.left;
        this.mouseY = e.clientY - rect.top;
    }

    keydown = (e) => {
        if (e.code === 'KeyD'){
            this.rightPressed = true;
        }
        if (e.code === 'KeyA'){
            this.leftPressed = true;
        }
        if (e.code === 'KeyW'){
            this.upPressed = true;
        }
        if (e.code === 'KeyS'){
            this.downPressed = true;
        }
    }

    keyup = (e) => {
        if (e.code === 'KeyD'){
            this.rightPressed = false;
        }
        if (e.code === 'KeyA'){
            this.leftPressed = false;
        }
        if (e.code === 'KeyW'){
            this.upPressed = false;
        }
        if (e.code === 'KeyS'){
            this.downPressed = false;
        }
    }
}