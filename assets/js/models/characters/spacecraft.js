class Spacecraft extends Spritable {

    constructor(ctx, width, height, sprite) {
        super(ctx, width, height, sprite);
        this.x = (this.ctx.canvas.width / 2) - (this.width - 40);
        this.y = this.ctx.canvas.height - this.height - 40;
        
        //Laser beams
        this.beamGenerator = [];
        this.reloadTime = Constants.RELOAD_TIME;
        this.isFiring = false;

        //Life
        this.maxHits = 3;
        this.hitCount = 0;
        this.isDead = false;
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
                    const beam = new FinalBeam(this.ctx, 2, 10, "", (this.x + this.width / 2), this.y, "up", "laser");
                    this.beamGenerator.push(beam);
                    this.idReload = setTimeout(() => this.isFiring = false, this.reloadTime);
                }
                break;
        }
    }

    move() {
        this.x += this.vx;
        this.checkbounds();
        this.beamGenerator.forEach((beam) => beam.move());
    }

    checkbounds() {
        if((this.x + this.width) > this.ctx.canvas.width) {
            this.x = this.ctx.canvas.width - this.width;
        } else if (this.x < 0) {
            this.x = 0;
        }
    }

    checkLife() {
        if (this.hitCount === this.maxHits) {
            this.isDead = true;
        }
    }

    //Clear bullets, not the ship itself
    clear() {
        this.beamGenerator = this.beamGenerator
            .filter((beam) => !beam.isUsed)
            .filter((beam) => !(beam.y < 0));
    }

    draw() {
        if(this.sprite.isReady) {
            if (Constants.DEBUG) Utils.debuggin(this);
            this.ctx.drawImage(this.sprite, this.x, this.y, this.width, this.height);
        }
        this.beamGenerator.forEach((beam) => beam.draw());
        this.clear();
    }
}