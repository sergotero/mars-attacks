class Game {

    constructor(idCanvas) {
        
        //Canvas
        this.canvas = document.getElementById(idCanvas);
        
        //Context
        this.ctx = this.canvas.getContext("2d");
        
        //Meassurements
        this.width = this.canvas.width;
        this.height = this.canvas.height;

        //Id setInterval
        this.idInterval = undefined;

        //Lives
        this.lives = 3;

        //Score
        this.score = 0;

        //Background
        this.space = new Space(this.ctx, this.canvas.width, this.canvas.height, "/assets/images/backgrounds/bg-main.png");
        //Player
        this.spacecraft = new Spacecraft(this.ctx, 40, 40, "/assets/images/sprites/spacecraft.sprite.png");

        //Enemies
        this.enemies = [
            new EnemyPawn(this.ctx, 20, 22, "", 4, 1, "weak"),
            new EnemyPawn(this.ctx, 20, 22, "", 4, 1, "normal"),
            new EnemyPawn(this.ctx, 20, 22, "", 4, 1, "strong"),
            new EnemySpecial(this.ctx, 23, 23,"", 7, 2),
        ];
        
    }

    start() {
        //The game starts
        this.idInterval = setInterval(() => {
            this.clear();
            this.move();
            this.checkCollisions();
            this.update();
            this.draw();
        }, Constants.FPS);
    }

    setUpListeners() {
        addEventListener("keydown", (event) => this.spacecraft.onKeyPressed(event));
        addEventListener("keyup", (event) => this.spacecraft.onKeyPressed(event));
    }

    stop() {
        //The intervals stops
        clearInterval(this.idInterval);
        this.idInterval = undefined;
    }

    move(){
        //The space moves
        this.space.move();
        this.spacecraft.move();
        this.enemies.forEach((enemy) => enemy.move());
    }

    checkCollisions() {
        this.enemies.forEach((enemy) => {
            this.spacecraft.beamGenerator.forEach((beam) => {
                if(enemy.checkCollisions(beam) && beam.type === "friend") {
                    enemy.hitCount++;
                    enemy.checkLife();
                    beam.isUsed = true;
                }
            });

            enemy.beamGenerator.forEach((beam) => {
                if(this.spacecraft.checkCollisions(beam) && beam.type === "foe") {
                    this.spacecraft.hitCount++;
                    beam.isUsed = true;
                    this.spacecraft.checkLife();
                }
            });
        })

        
    }

    //Update scores, lives, etc.
    update() {
        if(this.lives === 0) {
            this.gameOver();
        }
        
        if (this.spacecraft.isDead) {
            this.lives--;
        }

        console.log("HitCount Spacecraft: ", this.spacecraft.hitCount);
    }

    clear(){
        //Clean the whole canvas
        this.ctx.clearRect(this.x, this.y, this.canvas.width, this.canvas.height);
        this.enemies = this.enemies.filter(enemy => !enemy.isDead);
        this.enemies.forEach(enemy => enemy.clear());
    }

    draw() {
        this.space.draw();
        this.spacecraft.draw();
        this.enemies.forEach(enemy => enemy.draw());
    }

    gameOver() {
        if (this.lives === 0) {
            this.stop();
        }
    }

}