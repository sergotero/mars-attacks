class Spritable extends BaseModel {

    constructor(ctx, width, height, sprite = "", rowFrames, colFrames) {
        super(ctx, width, height);

        //Sprite
        this.sprite = new Image();
        this.sprite.src = sprite;
        
        //Sprite: number of frames per row and column
        this.rowFrames = rowFrames;
        this.colFrames = colFrames;

        //Frame Indexes
        this.rowIndex;
        this.colIndex;

        //Draw count (for animations)
        this.drawCount = 0;

        this.sprite.onload = () => {
            this.sprite.isReady = true;
            this.sprite.width = this.width;
            this.sprite.height = this.height;
            //To capture naturalWidth/Height we have to wait until the image is loaded
            this.frameWidth = this.sprite.naturalWidth / this.rowFrames;
            this.frameHeight = this.sprite.naturalHeight / this.colFrames;
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