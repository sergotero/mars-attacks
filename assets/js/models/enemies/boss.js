class Boss extends Enemy {

    constructor(ctx, width, height, sprite, rowFrames, colFrames, reloadTime) {
        super(ctx, width, height, sprite = "/assets/images/sprites/boss.sprite.png", rowFrames, colFrames, reloadTime = Constants.BOSS_RELOAD_TIME);

        this.x = ((this.ctx.canvas.width / 2) - (this.width / 2));
        this.y = (0 - this.height);

        this.vy = Constants.BOSS_SPEED_Y;
        this.vx = Constants.BOSS_SPEED_X;
        
        this.maxHits = 30;
        this.hitCount = 0;

        this.isReady = false;
        this.isInvoked = false;
        this.canFire = false;

        this.beamGeneratorInterval = setInterval(() => {
            if (this.beamGenerator.length < 3 && this.canFire) {
                this.generateBeam();
            }
        }, this.reloadTime);
    }

    move() {
        if (this.y < Constants.INITIAL_STRONG_Y) {
            this.y += this.vy;  
        } else if (this.y === Constants.INITIAL_STRONG_Y) {
            this.vy = 0;
            this.canFire = true;
            this.x += this.vx;
            this.checkBounds();
        }
    }

    checkBounds() {
        if(this.x < 0) {
            this.vx = Constants.BOSS_SPEED_X;
        } else if (this.x + this.width > this.ctx.canvas.width){
            this.vx = -this.vx;
        }
    }

    generateBeam() {
        const energyBeam = new FinalBeam(this.ctx, 14, 40, "", this.x, this.y, "down", "energy");
        energyBeam.vy = Constants.LASER_BEAM_SPEED_Y + 2;
        this.beamGenerator.push(energyBeam);
    }

    clear() {
        this.beamGenerator = this.beamGenerator
            .filter(beam => !beam.isUsed)
            .filter(beam => beam.y < this.ctx.canvas.height);
    }

    checkLife() {
        switch (this.hitCount) {
            case 10:
                this.colIndex = 1;
                this.isDead = false;
                break;
            case 20:
                this.isDead = false;
                this.colIndex = 2;
                break;
            case this.maxHits:
                this.isDead = true;
                clearInterval(this.beamGeneratorInterval);
                this.beamGenerator = [];
                break;
            default:
                this.isDead = false;
                break;
        }
    }

    animate() {
        if(this.vx !== 0) {
            this.animateFrames(this.rowIndex, this.colIndex, this.rowFrames, 30);
        }
    }
}