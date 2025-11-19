class Special extends Enemy {

    constructor(ctx, width, height, sprite, rowFrames, colFrames) {
        super(ctx, width, height, sprite = "/assets/images/sprites/special-enemy.sprite.png", rowFrames, colFrames);
        this.y = 260;
        
        this.score = 100;
        this.maxHits = 1;
        this.hitCount = 0;
    }

    move() {
        this.x += this.vx;
        this.checkBounds();
        if (this.canFire) {
            this.beamGenerator.forEach(beam => beam.move());
        }
    }

    checkPosition() {
        const middlePoint = this.ctx.canvas.width / 2;
        if (this.x < middlePoint) {

        } else if (this.x > middlePoint) {
            
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

    animate() {
        if(this.vx !== 0) {
            this.animateFrames(this.rowIndex, this.colIndex, this.rowFrames, 50);
        }
    }
}