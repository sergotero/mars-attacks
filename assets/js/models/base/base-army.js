class BaseArmy {
    
    constructor(ctx, width, height) {
        this.ctx = ctx;
        this.width = width;
        this.height = height;

        this.weakArmy = [];
        this.normalArmy = [];
        this.strongArmy = [];

    }

    setUpArmy(type, number = 11) {
        for (let i = 0; i < number; i++){
            switch (type) {
                case "weak":
                    this.weakArmy.push(new EnemyPawn(this.ctx, 20, 22, "", 4, 1, type));
                    break;
                case "normal":
                    this.normalArmy.push(new EnemyPawn(this.ctx, 20, 22, "", 4, 1, type));
                    break;
                case "strong":
                    this.strongArmy.push(new EnemyPawn(this.ctx, 20, 22, "", 4, 1, type));
                    break;
            }
        }
    }

    placeArmy() {
        let previousWeakX = 0;
        let previousNormalX = 0;
        let previousStrongX = 0;

        this.weakArmy.forEach(enemy => {
            if (previousWeakX === 0){
                enemy.x = Constants.MARGIN_LEFT;
                previousWeakX = enemy.x + enemy.width;
            } else {
                enemy.x = previousWeakX + Constants.MARGIN_ENEMY_X;
                previousWeakX = enemy.x +  enemy.width;
            }
        });

        this.normalArmy.forEach(enemy => {
            if (previousNormalX === 0){
                enemy.x = Constants.MARGIN_LEFT;
                previousNormalX = enemy.x + enemy.width;
            } else {
                enemy.x = previousNormalX + Constants.MARGIN_ENEMY_X;
                previousNormalX = enemy.x +  enemy.width;
            }
        });

        this.strongArmy.forEach(enemy => {
            if (previousStrongX === 0){
                enemy.x = Constants.MARGIN_LEFT;
                previousStrongX = enemy.x + enemy.width;
            } else {
                enemy.x = previousStrongX + Constants.MARGIN_ENEMY_X;
                previousStrongX = enemy.x +  enemy.width;
            }
        });
    }

}