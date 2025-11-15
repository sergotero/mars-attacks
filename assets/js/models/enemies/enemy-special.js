class EnemySpecial extends BaseEnemy {

    constructor(ctx, width, height, sprite, rowFrames, colFrames) {
        super(ctx, width, height, sprite = "/assets/images/sprites/special-enemy.sprite.png", rowFrames, colFrames);
        this.y = 260;
        
        this.score = 100;
        this.maxHits = 1;
        this.hitCount = 0;
    }

    animate() {
        if(this.vx !== 0) {
            this.animateFrames(this.rowIndex, this.colIndex, this.rowFrames, 50);
        }
    }
}