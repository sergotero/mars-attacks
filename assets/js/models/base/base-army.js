class BaseArmy {
    
    constructor(ctx, width, height) {
        this.ctx = ctx;
        this.width = width;
        this.height = height;

        this.weakArmy = [];
        this.weakArmy.canFire = true;

        this.normalArmy = [];
        this.normalArmy.canFire = false;

        this.strongArmy = [];
        this.strongArmy.canFire = false;

    }

    setUpArmy(type, number = 11) {
        for (let i = 0; i < number; i++) {

            const reloadTime = this.getRandomReloadTime(3, 12) * 1000;
            let pawn;

            switch (type) {
                case "weak":
                    pawn = new Pawn(this.ctx, 20, 22, "", 4, 1, reloadTime, type);
                    this.weakArmy.push(pawn);
                    break;
                case "normal":
                    pawn = new Pawn(this.ctx, 20, 22, "", 4, 1, reloadTime, type);
                    this.normalArmy.push(pawn);
                    break;
                case "strong":
                    pawn = new Pawn(this.ctx, 20, 22, "", 4, 1, reloadTime, type);
                    this.strongArmy.push(pawn);
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

    getRandomReloadTime(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    checkCanFire() {
        if (this.normalArmy.canFire) {
            this.normalArmy.forEach(enemy => {
                const random = this.getRandomReloadTime(3, 12) * 1000;
                enemy.canFire = true;
                enemy.reloadTime = random;
            });
        }

        if (this.strongArmy.canFire) {
            this.strongArmy.forEach(enemy => {
                const random = this.getRandomReloadTime(3, 12) * 1000;
                enemy.canFire = true;
                enemy.reloadTime = random;
            });
        }
    }
}