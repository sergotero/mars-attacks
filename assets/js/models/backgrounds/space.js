class Space extends Spritable{

    constructor(ctx, width, height, sprite, status){
        super(ctx, width, height, sprite);
        this.status = status;
        //Audio
        this.audio = new Audio("/assets/audio/main3.wav");
        this.audio.onloadeddata = () => {
            this.audio.volume = 0.1;
            this.audio.loop = true;
        }
    }

    canPlay() {
        if (this.status.classList.contains("fa-volume-xmark")) {
            this.audio.pause();
        } else if (this.status.classList.contains("fa-volume-high")) {
            this.audio.play();
        }
    }

    move() {
        this.y += Constants.SKY_PACE;
        if (this.y > this.height){
            this.y = 0;
        }
    }

    draw() {
        if(this.sprite.isReady) {
            this.ctx.drawImage(this.sprite, this.x, this.y, this.width, this.height);
            this.ctx.drawImage(this.sprite, this.x, this.y - this.height, this.width, this.height);
        }
        this.canPlay();
    }
}