class EnemySpecial extends BaseEnemy {

    constructor(ctx, width, height, sprite, rowFrames, colFrames) {
        super(ctx, width, height, sprite = "/assets/images/sprites/special-enemy.sprite.png", rowFrames, colFrames);
        this.y = 100;
    }
}