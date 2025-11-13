class LaserBeam extends BaseSprite{

    constructor(ctx, width, height, sprite, type){
        super(ctx, width, height, sprite);

        this.x;
        this.y;

        this.rowFrames = 1;
        this.colFrames = 1;

        this.rowIndex = 0;
        this.colIndex = 0;

        this.vy = Constants.LASER_BEAM_SPEED_Y;

        this.type = type;
    }

    move() {
        if(type === "friend") {
            this.y += -this.vy;
        } else if (type === "foe") {
            this.y += this.vy;
        }
    }

    clear() {

    }

    draw() {
        if(this.sprite.isReady){
            Utils.debuggin(this);
        }
    }
}