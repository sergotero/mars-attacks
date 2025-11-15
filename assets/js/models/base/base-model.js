class BaseModel {

    constructor(ctx, width, height, x = 0, y = 0, vx = 0, vy = 0) {
        //Context
        this.ctx = ctx;
        
        //Size
        this.width = width;
        this.height = height;
        
        //Coordinates
        this.x = x;
        this.y = y;

        //Movement
        this.vx = vx;
        this.vy = vy;
    }

    //These 3 methods are essential for all classes
    move() {}

    clear() {}

    checkCollisions(other) {
        if (
            this.x < other.x + other.width &&
            this.x + this.width > other.x &&
            this.y < other.y + other.height &&
            this.height + this.y > other.y
        ) {
            return true;
        } else {
            return false;
        }
    }

    draw() {}
}