class EnemyPawn extends BaseEnemy{

    constructor(ctx, width, height, sprite, rowFrames, colFrames, type) {
        super(ctx, width, height, sprite, rowFrames, colFrames, type);

        this.rowIndex = 0;
        this.colIndex = 0;

        this.type = type;

        switch(this.type) {
            case Constants.ENEMY_TYPE_A:
                this.score = 80;
                this.x = (this.ctx.canvas.width / 2);
                this.y = 140;
                this.sprite.src = "/assets/images/sprites/strong-enemy.sprite.png";
                break;
            case Constants.ENEMY_TYPE_B:
                this.x = (this.ctx.canvas.width / 2);
                this.y = 170;
                this.score = 40;
                this.sprite.src = "/assets/images/sprites/normal-enemy.sprite.png";
                break;
            case Constants.ENEMY_TYPE_C:
                this.x = (this.ctx.canvas.width / 2);
                this.y = 200;
                this.score = 20;
                this.sprite.src = "/assets/images/sprites/weak-enemy.sprite.png";
                break;
        }

        this.vx = Constants.ENEMY_PAWN_SPEED_X;
    }

}