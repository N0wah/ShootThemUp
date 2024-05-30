export default class Boss {
     constructor({position, target, life, img}) {
        this.position = position;
        this.width = 160;
        this.height = 160;
        this.speed = 1;
        this.target = target;
        this.life = life;
        this.isDead = false;
        this.img = img;
        this.facingRight = true;
        this.toucheJoueur = false;
    }
    draw(ctx){
        ctx.save(); 
        
        if (this.facingRight) {
            ctx.drawImage(this.img.img, this.position.x, this.position.y, this.width, this.height);
        } else {
            ctx.translate(this.position.x + this.width, this.position.y);
            ctx.scale(-1, 1);
            ctx.drawImage(this.img.img, 0, 0, this.width, this.height);
        }

        ctx.restore(); 
        this.drawLife(ctx);
        this.move();
    }

    drawLife(ctx){
        ctx.fillStyle = 'green';
        ctx.fillRect(this.position.x + 15, this.position.y - 8, this.life.health / 15, 5);
    }

    move(){
        const dx = this.target.x - this.position.x;
        const dy = this.target.y - this.position.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance > 0) {
            const moveX = (dx / distance) * this.speed;
            const moveY = (dy / distance) * this.speed;

            this.position.x += moveX;
            this.position.y += moveY;

            this.facingRight = moveX > 0;
        }

        this.checkCollisionWithPlayer();
    }

    checkCollisionWithPlayer() {
        const playerX = this.target.x;
        const playerY = this.target.y;
        const playerWidth = 80;
        const playerHeight = 80;

        if (
            this.position.x < playerX + playerWidth &&
            this.position.x + this.width > playerX &&
            this.position.y < playerY + playerHeight &&
            this.position.y + this.height > playerY
        ) {
            this.toucheJoueur = true;
        } else {
            this.toucheJoueur = false;
        }
    }

    die(){
        this.width = 0;
        this.height = 0;
        this.isDead = true;
    }
}