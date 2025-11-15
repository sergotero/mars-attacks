class LaserBeam extends BaseSprite{

    constructor(ctx, width, height, sprite, x, y, type){
        super(ctx, width, height, sprite = "/assets/images/sprites/laser-beam.sprite.png");

        this.x = x;
        this.y = y;

        this.rowFrames = 1;
        this.colFrames = 1;

        this.rowIndex = 0;
        this.colIndex = 0;

        this.vy = Constants.LASER_BEAM_SPEED_Y;

        this.type = type;
        
        this.isUsed = false;
    }

    move() {
        if(this.type === "friend") {
            this.y += -this.vy;
        } else if (this.type === "foe") {
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