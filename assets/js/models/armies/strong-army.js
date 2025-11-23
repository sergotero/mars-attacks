class StrongArmy extends Army {
    
    constructor(ctx, width, height, canFire, canCheck) {
        super(ctx, width, height);

        this.canFire = canFire;
        this.canCheck = canCheck;

        this.enemies = [];
    }
}