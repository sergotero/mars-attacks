class BaseArmy {
    
    constructor(ctx, width, height) {
        this.ctx = ctx;
        this.width = width;
        this.height = height;
        this.weakArmy = [

        ];
        this.normalArmy = [

        ];
        this.strongArmy = [

        ];

    }

    setUpArmy(number, type) {
        for (let i = 0; i < number; i++){
            const enemy = new EnemyPawn(new EnemyPawn(this.ctx, 20, 22, "", 4, 1, type));
            this.army.push(enemy);
        }
    }

    placeArmy() {
        this.army.filter(enemy => enemy.type === "weak").forEach(enemy => enemy.x)
    }
}