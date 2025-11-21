class Pawn extends Enemy{

    constructor(ctx, width, height, sprite, rowFrames, colFrames, reloadTime, type) {
        super(ctx, width, height, sprite, rowFrames, colFrames, reloadTime, type);

        this.rowIndex = 0;
        this.colIndex = 0;

        this.type = type;

        switch(this.type) {
            case Constants.ENEMY_TYPE_A:
                this.x = 0;
                this.y = Constants.INITIAL_STRONG_Y;
                this.score = 80;
                this.maxHits = 3;
                this.canFire = false;
                this.sprite.src = "/assets/images/sprites/strong-enemy.sprite.png";
                break;
            case Constants.ENEMY_TYPE_B:
                this.x = 0;
                this.y = Constants.INITIAL_NORMAL_Y;
                this.score = 40;
                this.maxHits = 2;
                this.canFire = false;
                this.sprite.src = "/assets/images/sprites/normal-enemy.sprite.png";
                break;
            case Constants.ENEMY_TYPE_C:
                this.x = 0;
                this.y = Constants.INITIAL_WEAK_Y;
                this.score = 20;
                this.maxHits = 1;
                this.canFire = true;
                this.sprite.src = "/assets/images/sprites/weak-enemy.sprite.png";
                break;
        }

        this.vx = Constants.ENEMY_PAWN_SPEED_X;
    }

    generateBeam() {
        let beam;
        switch (this.type) {
            case Constants.ENEMY_TYPE_C:
                beam = new FinalBeam(this.ctx, 2, 10, "", this.x, this.y, "down", "laser");
                this.beamGenerator.push(beam);
                break;
            case Constants.ENEMY_TYPE_B:
                beam = new FinalBeam(this.ctx, 7, 20, "", this.x, this.y, "down", "fire");
                this.beamGenerator.push(beam);
                break;
            case Constants.ENEMY_TYPE_A:
                beam = new FinalBeam(this.ctx, 7, 20, "", this.x, this.y, "down", "energy");
                this.beamGenerator.push(beam);
            break;
        }
    }

}