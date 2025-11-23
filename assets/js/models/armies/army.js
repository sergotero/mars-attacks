class Army{
    
    constructor(ctx, width, height) {
        this.ctx = ctx;
        this.width = width;
        this.height = height;
    }

    setUpArmy(number = 11) {
        
        this.weakArmy = new WeakArmy(this.ctx, this.width, this.height, true, true);
        this.normalArmy = new NormalArmy(this.ctx, this.width, this.height, false, true);
        this.strongArmy = new StrongArmy(this.ctx, this.width, this.height, false, true);
        
        for (let i = 0; i < number; i++) {

            const reloadTime = this.getRandomReloadTime(3, 12) * 1000;

            const weak = new Pawn(this.ctx, 20, 22, "", 4, 1, reloadTime, "weak");
            this.weakArmy.enemies.push(weak);

            const normal = new Pawn(this.ctx, 20, 22, "", 4, 1, reloadTime, "normal");
            this.normalArmy.enemies.push(normal);

            const strong = new Pawn(this.ctx, 20, 22, "", 4, 1, reloadTime, "strong");
            this.strongArmy.enemies.push(strong);
        }
    }

    placeArmy() {
        let previousWeakX = 0;
        let previousNormalX = 0;
        let previousStrongX = 0;

        this.weakArmy.enemies.forEach(enemy => {
            if (previousWeakX === 0){
                enemy.x = Constants.MARGIN_LEFT;
                previousWeakX = enemy.x + enemy.width;
            } else {
                enemy.x = previousWeakX + Constants.MARGIN_ENEMY_X;
                previousWeakX = enemy.x +  enemy.width;
            }
        });

        this.normalArmy.enemies.forEach(enemy => {
            if (previousNormalX === 0){
                enemy.x = Constants.MARGIN_LEFT;
                previousNormalX = enemy.x + enemy.width;
            } else {
                enemy.x = previousNormalX + Constants.MARGIN_ENEMY_X;
                previousNormalX = enemy.x +  enemy.width;
            }
        });

        this.strongArmy.enemies.forEach(enemy => {
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
            this.normalArmy.enemies.forEach((enemy, index = 0) => {
                if (index % 2 === 0){
                    const random = this.getRandomReloadTime(0, 6) * 1000;
                    const delay = setTimeout(() => {enemy.canFire = true}, random);
                } else {
                    const random = this.getRandomReloadTime(3, 9) * 1000;
                    const delay = setTimeout(() => {enemy.canFire = true}, random);
                }
            });
        }

        if (this.strongArmy.canFire) {
            this.strongArmy.enemies.forEach((enemy, index = 0) => {
                if (index % 2 === 0){
                    const random = this.getRandomReloadTime(0, 6) * 1000;
                    const delay = setTimeout(() => {enemy.canFire = true}, random);
                } else {
                    const random = this.getRandomReloadTime(3, 9) * 1000;
                    const delay = setTimeout(() => {enemy.canFire = true}, random);
                }
            });
        }
    }
}