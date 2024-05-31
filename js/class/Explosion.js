export default class Explosion {
    constructor({enemy, img, isBoss}) {
        this.x = enemy.enemy.position.x;
        this.y = enemy.enemy.position.y;
        this.img = img;
        this.width = 80;
        this.height = 80;
        this.step = 0;
        this.isBoss = isBoss
        this.isDrawing = false
    }
    draw(ctx, step){
        if (this.isBoss){
            this.width = 160;
            this.height = 160;
        }
        switch (step) {
            case 1:
                ctx.drawImage(this.img.ex1, this.x, this.y, this.width, this.height);
                setTimeout(() => { this.step = 2; }, 30);
                break;
            case 2:
                ctx.drawImage(this.img.ex2, this.x, this.y, this.width, this.height);
                setTimeout(() => { this.step = 3; }, 30);
                break;
            case 3:
                ctx.drawImage(this.img.ex3, this.x, this.y, this.width, this.height);
                setTimeout(() => { this.step = 4;; }, 30);
                break;
            case 4:
                ctx.drawImage(this.img.ex4, this.x, this.y, this.width, this.height);
                setTimeout(() => { this.step = 5; }, 30);
                break;
            case 5:
                ctx.drawImage(this.img.ex5, this.x, this.y, this.width, this.height);
                setTimeout(() => { this.step = 6; }, 30);
                break;
            case 6:
                ctx.drawImage(this.img.ex6, this.x, this.y, this.width, this.height);
                setTimeout(() => { this.step = 7; }, 30);
                break;
            case 7:
                ctx.drawImage(this.img.ex7, this.x, this.y, this.width, this.height);
                setTimeout(() => { this.step = 0; }, 30);
                break;
            default:
                break;
        }
    }
}