class Booster extends Spritable {

    constructor(ctx, width, height, sprite, rowFrames, colFrames, type) {
        super(ctx, width, height, sprite, rowFrames, colFrames);

        this.y = 0;
        this.x = Math.floor(Math.random() * (this.ctx.canvas.width - this.width));

        this.vy = Constants.LASER_BEAM_SPEED_Y;
        this.type = type;
        this.isUsed = false;

        switch (this.type) {
            case "cherry":
                this.sprite.src = "/assets/images/sprites/cherry.sprite.png";
                // this.width = 30;
                // this.height = 30;
                this.score = 300;
                break;
            case "strawberry":
                this.sprite.src = "/assets/images/sprites/strawberry.sprite.png";
                this.score = 110;
                // this.width = 24;
                // this.height = 30;
                break;
        }

        //Audio
        this.audio = new Audio("/assets/audio/booster.wav");
        this.audio.onloadeddata = () => {
            this.audio.volume = 0.1;
        }
    }

    move() {
        //this.x += this.vx;
        this.y += this.vy;
    }

    clean() {}

    draw() {
        if (this.sprite.isReady) {
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
        }
        this.drawCount++;
    }

    animate() {
        if(this.vx !== 0) {
            this.animateFrames(this.rowIndex, this.colIndex, this.rowFrames, 30);
        }
    }
}