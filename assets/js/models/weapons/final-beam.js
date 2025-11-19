class FinalBeam extends Beam{

    constructor(ctx, width, height, sprite, x, y, direction, fireType) {
        super(ctx, width, height, sprite, x, y, direction);
        
        this.fireType = fireType;
        
        switch (this.fireType) {
            case "laser":
                this.sprite.src = "/assets/images/sprites/laser-beam.sprite.png";
                break;
            case "fire":
                this.sprite.src = "/assets/images/sprites/fire-beam.sprite.png";

                break;
            case "energy":
                this.sprite.src = "/assets/images/sprites/energy-beam.sprite.png";
                break;
        }
    }
}