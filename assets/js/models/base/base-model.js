class BaseModel {

    constructor(ctx, width, height, sprite = "", x = 0, y = 0, vx = 0, vy = 0) {
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

        //Sprite
        this.sprite = new Image();
        this.sprite.src = sprite;
        this.sprite.onload = () => {
            this.sprite.isReady = true;
            this.sprite.width = this.width;
            this.sprite.height = this.height;
        }
    }

    //These 3 methods are essential for all classes
    move() {}

    clear() {}

    draw() {}
}