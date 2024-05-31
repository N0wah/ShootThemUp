import Bullet from './Bullet.js';

export default class Player {
    constructor(x, y, canvas, img, gun) {
        this.x = x;
        this.y = y;
        this.width = 80;
        this.height = 80;
        this.speed = 2;
        this.dash = false;
        this.bullets = [];
        this.canvas = canvas;
        this.canShoot = true;
        this.shootDelay = 0;
        this.img = img
        this.gun = gun
        this.dead = false
        this.devShoot = false;
        this.refresh = false

        document.addEventListener("keydown", this.keydown);
        document.addEventListener("keyup", this.keyup);
        document.addEventListener("mousedown", this.mousedown);
        document.addEventListener("mousemove", this.mousemove);
    }

    draw(ctx){
        this.move();
        if (this.devShoot){
            this.shoot()
        }
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height)
        this.drawGun(ctx)
        this.bullets.forEach(function (bullet) {
            if (bullet != null) {
                bullet.draw(ctx)
            }
        });
    }
    drawGun(ctx){   
        const angle = Math.atan2(this.mouseY - (this.y + this.height / 2), this.mouseX - (this.x + this.width / 2));
        ctx.save();
        ctx.translate(this.x + this.width / 2, this.y + this.height / 2);
        ctx.rotate(angle);
        ctx.drawImage(this.gun, -35 + 40, -25, 70, 50);
        ctx.restore();
    }
    
    move(){
        if (this.downPressed && this.y < window.innerHeight - this.height){
            this.y += this.speed;
        }
        if (this.upPressed && this.y > 0){
            this.y -= this.speed;
        }
        if (this.rightPressed && this.x < window.innerWidth - this.width){
            this.x += this.speed;
        }
        if (this.leftPressed && this.x > 0){
            this.x -= this.speed;
        }
        this.bullets.forEach(function (bullet) {
            if (bullet != null) {
                bullet.update()
            }
        });
    }

    shoot(){
        if (this.canShoot) {
            const bulletSpeed = 20;
            const angle = Math.atan2(this.mouseY - this.y - this.height / 2, this.mouseX - this.x - this.width / 2);
            const velocity = {
                x: bulletSpeed * Math.cos(angle),
                y: bulletSpeed * Math.sin(angle)
            };
            var audio = new Audio('../assets/sound/laserShoot.wav')
            audio.volume = 0.5
            audio.play()
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
        if (e.code === 'KeyM'){
            if (this.devShoot){
                this.devShoot = false
                console.log(this.devShoot);
                console.log(e.code);
            } else {
                this.devShoot = true
            }
        }
        if (e.code === 'KeyR'){
            this.refresh = true
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