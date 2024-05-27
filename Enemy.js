export default class Enemy {
    constructor({position, target, life, img}) {
        this.position = position;
        this.width = 80;
        this.height = 80;
        this.speed = 2;
        this.target = target;
        this.life = life;
        this.isDead = false;
        this.img = img;
        this.facingRight = true; // Ajoutez cette ligne pour suivre la direction de l'ennemi
    }

    draw(ctx){
        ctx.save(); // Sauvegarder l'état du contexte
        
        if (this.facingRight) {
            ctx.drawImage(this.img.img, this.position.x, this.position.y, this.width, this.height);
        } else {
            // Appliquer une transformation pour inverser l'image horizontalement
            ctx.translate(this.position.x + this.width, this.position.y);
            ctx.scale(-1, 1);
            ctx.drawImage(this.img.img, 0, 0, this.width, this.height);
        }

        ctx.restore(); // Restaurer l'état précédent du contexte
        this.drawLife(ctx);
        this.move(ctx);
    }

    drawLife(ctx){
        ctx.fillStyle = 'green';
        ctx.fillRect(this.position.x + 15, this.position.y - 8, this.life.health, 5);
    }

    move(ctx){
        if(this.target.y > this.position.y){
            this.position.y += this.speed;
        }
        if (this.target.y < this.position.y){
            this.position.y -= this.speed;
        }
        if(this.target.x < this.position.x){
            this.position.x -= this.speed;
            this.facingRight = false; // L'ennemi se déplace vers la gauche
        }
        if(this.target.x > this.position.x){
            this.position.x += this.speed;
            this.facingRight = true; // L'ennemi se déplace vers la droite
        }
    }

    die(){
        this.width = 0;
        this.height = 0;
        this.isDead = true;
    }
}
