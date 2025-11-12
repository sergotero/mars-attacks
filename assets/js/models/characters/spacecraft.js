class Spacecraft extends BaseSprite{

    constructor(ctx, width, height, sprite) {
        super(ctx, width, height, sprite);
        this.x = (this.ctx.canvas.width / 2) - (this.width - 40);
        this.y = this.ctx.canvas.height - this.height - 40;
        
    }

    onKeyPressed(event){
        //console.log(event);
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
    }

    //Clear bullets, not the ship itself
    clear(){

    }

    draw(){
        // this.ctx.fillStyle = "red";
        // this.ctx.fillRect(this.x, this.y, 30, 30);
        if(this.sprite.isReady) {
            Utils.debuggin(this);
            this.ctx.drawImage(this.sprite, this.x, this.y, this.width, this.height);
        }
    }
}