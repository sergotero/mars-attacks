class BaseEnemy extends BaseSprite {
    
    constructor(ctx, width, height, sprite, rowFrames, colFrames) {
        super(ctx, width, height, sprite);

        this.rowFrames = rowFrames;
        this.colFrames = colFrames;

        this.rowIndex = 0;
        this.colIndex = 0;

        this.vx = Constants.ENEMY_PAWN_SPEED_X;

        this.maxHits = 0;
        this.hitCount = 0;

        this.isDead = false;

        this.beamGenerator = [];
        this.reloadTime = Constants.ENEMY_RELOAD_TIME;
        this.beamGeneratorInterval = setInterval(() => {
            this.generateBeam();
        }, this.reloadTime);

    }

    move() {
        this.x += this.vx;
        this.checkBounds();
        this.beamGenerator.forEach(beam => beam.move());
    }

    checkBounds() {
        if(this.x < 40) {
            this.vx = Constants.ENEMY_PAWN_SPEED_X;
        } else if (this.x + 60 > this.ctx.canvas.width){
            this.vx = -this.vx;
        }
    }

    checkLife() {
        if (this.hitCount === this.maxHits) {
            this.isDead = true;
            //We need to clear the interval even thou the enemy is killed, because it's stored in the browser and the browser would try to invoke it everytime it renders.
            clearInterval(this.beamGeneratorInterval);
        } else {
            this.isDead = false;
        }
    }

    generateBeam() {
        const beam = new LaserBeam(this.ctx, 2, 10, "/assets/images/sprites/laser-beam.sprite.png", this.x, this.y, "foe");
        this.beamGenerator.push(beam);
    }

    clear() {
        this.beamGenerator = this.beamGenerator
            .filter(beam => !beam.isUsed)
            .filter(beam => beam.y < this.ctx.canvas.height);
    }

    draw() {
        if(this.sprite.isReady){
            /*
            Syntaxis:
            ctx.drawImage(image, sx, sy, sWidth, sHeight,  dx,  dy, dWidth, dHeight);
                sx, sy, sWidth, sHeight --> source image
                dx, dy, dWidth, dHeight --> destiny (place within canvas)
            */
            if (Constants.DEBUG) Utils.debuggin(this);
            this.ctx.drawImage(
                this.sprite,
                this.frameWidth * this.rowIndex,
                this.frameHeight * this.colIndex,
                this.frameWidth,
                this.frameHeight,
                this.x,
                this.y,
                this.width,
                this.height
            );
            this.checkLife();
            this.animate();
            this.beamGenerator.forEach(beam => beam.draw());
        }
        //Increase the number to change the frame
        this.drawCount++;
    }

    animate() {
        if(this.vx !== 0) {
            this.animateFrames(this.rowIndex, this.colIndex, this.rowFrames, 30);
        }
    }

    animateFrames(initialRowFrame, initialColFrame, rowFrames, frequency) {
        if(this.rowIndex !== initialRowFrame) {
            this.rowIndex = initialRowFrame;
            this.colIndex = initialColFrame;
        } else if (this.drawCount % frequency === 0) {
            this.drawCount = 0;
            this.rowIndex = (this.rowIndex + 1) % rowFrames;
        }
    }
}