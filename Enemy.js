export default class Enemy {
    constructor({position, target, life, img, allEnemies}) {
        this.position = position;
        this.width = 80;
        this.height = 80;
        this.speed = 2;
        this.target = target;
        this.life = life;
        this.isDead = false;
        this.img = img;
        this.facingRight = true; // Ajoutez cette ligne pour suivre la direction de l'ennemi
        this.allEnemies = allEnemies; // Référence à tous les ennemis
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
        // Calculer la direction vers la cible
        const dx = this.target.x - this.position.x;
        const dy = this.target.y - this.position.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance > 0) {
            const moveX = (dx / distance) * this.speed;
            const moveY = (dy / distance) * this.speed;

            this.position.x += moveX;
            this.position.y += moveY;

            // Mise à jour de la direction de l'ennemi
            this.facingRight = moveX > 0;
        }

        // Éviter les collisions avec d'autres ennemis
        this.avoidCollisions();
    }

    avoidCollisions() {
        for (let other of this.allEnemies) {
            if (other !== this && other != null) {
                const dx = other.position.x - this.position.x;
                const dy = other.position.y - this.position.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                const minDistance = this.width; // La distance minimale pour éviter la superposition

                if (distance < minDistance) {
                    // Calculer une force de séparation
                    const angle = Math.atan2(dy, dx);
                    const forceX = Math.cos(angle) * this.speed;
                    const forceY = Math.sin(angle) * this.speed;

                    // Appliquer la force de séparation
                    this.position.x -= forceX;
                    this.position.y -= forceY;
                }
            }
        }
    }

    die(){
        this.width = 0;
        this.height = 0;
        this.isDead = true;
    }
}
