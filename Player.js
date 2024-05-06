export default class Player {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.width = 20;
        this.height = 50;
        this.speed = 4

        document.addEventListener("keydown", this.keydown);
        document.addEventListener("keyup", this.keyup);
    }   

    draw(ctx){
        this.move();
        ctx.strokeStyle='black';
        ctx.strokeRect(this.x, this.y, this.width, this.height);
        ctx.fillStyle='black';
        ctx.fillRect(this.x, this.y, this.width, this.height);
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