export default class Bullet {
    constructor(x, y, velocity) {
        this.x = x;
        this.y = y;
        this.radius = 5;
        this.velocity = velocity;
    }

    draw(ctx) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = 'red';
        ctx.fill();
        ctx.closePath();
    }

    update() {
        this.x += this.velocity.x;
        this.y += this.velocity.y;
    }
}