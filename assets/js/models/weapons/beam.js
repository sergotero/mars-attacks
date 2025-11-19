class Beam extends Spritable{

    constructor(ctx, width, height, sprite, x, y, direction){
        super(ctx, width, height, sprite);

        this.x = x;
        this.y = y;

        this.rowFrames = 1;
        this.colFrames = 1;

        this.rowIndex = 0;
        this.colIndex = 0;

        this.vy = Constants.LASER_BEAM_SPEED_Y;

        this.direction = direction;
        
        this.isUsed = false;
    }

    move() {
        if(this.direction === "up") {
            this.y += -this.vy;
        } else if (this.direction === "down") {
            this.y += this.vy;
        }
    }

    checkBounds() {
        if (this.y < 0) {
            return true;
        } else if (this.y > this.ctx.canvas.height) {
            return true;
        } else {
            return false;
        }
    }

    draw() {
        if(this.sprite.isReady){
            if (Constants.DEBUG) Utils.debuggin(this);
            this.ctx.drawImage(this.sprite, this.x, this.y, this.width, this.height);
        }
    }
}