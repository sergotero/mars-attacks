class Spacecraft extends BaseSprite{

    constructor(ctx, width, height, sprite) {
        super(ctx, width, height, sprite);
        this.x = (this.ctx.canvas.width / 2) - (this.width - 40);
        this.y = this.ctx.canvas.height - this.height - 40;
        
        //Laser beams
        this.beamGenerator = [];
        this.reloadTime = Constants.RELOAD_TIME;

        this.isFiring = false;
    }

    onKeyPressed(event){
        const isPressed = event.type === "keydown";
    
        switch (event.keyCode) {
            case Constants.ARROW_LEFT:
                if(isPressed){
                    this.vx = -Constants.SPACECRAFT_SPEED_X;
                } else {
                    this.vx = 0;
                }
                break;
            case Constants.ARROW_RIGHT:
                if(isPressed){
                    this.vx = Constants.SPACECRAFT_SPEED_X;
                } else {
                    this.vx = 0;
                }
                break;
            case Constants.SPACE_BAR:
                if(!this.isFiring){
                    this.isFiring = true;
                    const beam = new LaserBeam(this.ctx, 2, 10, "", (this.x + this.width / 2), this.y, "friend");
                    this.beamGenerator.push(beam);
                    setTimeout(() => this.isFiring = false, Constants.RELOAD_TIME);
                }
                break;
        }
    }

    move() {
        this.x += this.vx;

        if((this.x + this.width) > this.ctx.canvas.width) {
            this.x = this.ctx.canvas.width - this.width;
            console.log(this.x, this.y);
            
        } else if (this.x < 0) {
            this.x = 0;
        }

        this.beamGenerator.forEach((beam) => beam.move());
    }

    //Clear bullets, not the ship itself
    clear(){

    }

    draw(){
        if(this.sprite.isReady) {
            if (Constants.DEBUG) Utils.debuggin(this);
            this.ctx.drawImage(this.sprite, this.x, this.y, this.width, this.height);
        }
        this.beamGenerator.forEach((beam) => beam.draw());
    }
}