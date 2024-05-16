export default class Enemy {
    constructor({position,target,life,}) {
        this.position = position
        this.width = 50;
        this.height = 50;
        this.speed = 2
        this.target = target
        this.life = life
    }
    draw(ctx){
        ctx.strokeStyle='red';
        ctx.strokeRect(this.position.x, this.position.y, this.width, this.height);
        ctx.fillStyle='red';
        ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
        this.move();
    }
    move(){
            if(this.target.y > this.position.y){
                this.position.y += this.speed
            }
            if (this.target.y < this.position.y){
                this.position.y -= this.speed
            }
            if(this.target.x < this.position.x){
                this.position.x -= this.speed
            }
            if(this.target.x > this.position.x){
                this.position.x += this.speed
            }
           
    }
    die(){
        this.width = 0;
        this.height = 0;
    }
}