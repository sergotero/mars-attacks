class Game {

    constructor(idCanvas, idScoreDOM, idLivesDOM, idTimeDOM) {
        
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
        this.livesDOM = document.getElementById(idLivesDOM);
        this.lives = 3;

        //Score
        this.scoreDOM = document.getElementById(idScoreDOM);
        this.score = 0;

        //TimeCounter
        this.timeDOM = document.getElementById(idTimeDOM);
        this.time = new TimeCounter();
        //Background
        this.space = new Space(this.ctx, this.canvas.width, this.canvas.height, "/assets/images/backgrounds/bg-main.png");

        //Player
        this.spacecraft = new Spacecraft(this.ctx, 40, 40, "/assets/images/sprites/spacecraft.sprite.png");

        this.army = new BaseArmy(this.ctx, this.width, this.height);
        this.army.setUpArmy("weak");
        this.army.setUpArmy("normal");
        this.army.setUpArmy("strong");
        this.army.placeArmy();

        // this.enemies = [
        //     new EnemyPawn(this.ctx, 20, 22, "", 4, 1, "weak"),
        //     new EnemyPawn(this.ctx, 20, 22, "", 4, 1, "normal"),
        //     new EnemyPawn(this.ctx, 20, 22, "", 4, 1, "strong"),
        //     new EnemySpecial(this.ctx, 23, 23,"", 7, 2),
        // ];
        
    }

    start() {
        //The game starts
        this.idInterval = setInterval(() => {
            this.clear();
            this.move();
            // this.checkCollisions();
            this.update();
            this.draw();
        }, Constants.FPS);
    }

    setUpListeners() {
        addEventListener("keydown", (event) => this.spacecraft.onKeyPressed(event));
        addEventListener("keyup", (event) => this.spacecraft.onKeyPressed(event));
        addEventListener("click", () => this.time.start());
    }

    stop() {
        //The intervals stops
        clearInterval(this.idInterval);
        this.idInterval = undefined;
        this.time.stop();
    }

    move(){
        //The space moves
        this.space.move();
        this.spacecraft.move();
        //this.enemies.forEach((enemy) => enemy.move());
        this.army.weakArmy.forEach(enemy => enemy.move());
        this.army.normalArmy.forEach(enemy => enemy.move());
        this.army.strongArmy.forEach(enemy => enemy.move());
    }

    // checkCollisions() {
    //     this.enemies.forEach((enemy) => {
    //         //Checks if any enemy has collided with a laser beam from the spacecraft
    //         this.spacecraft.beamGenerator.forEach((beam) => {
    //             if(enemy.checkCollisions(beam) && beam.type === "friend") {
    //                 enemy.hitCount++;
    //                 enemy.checkLife();
    //                 this.score += enemy.score;
    //                 beam.isUsed = true;
    //             }
    //         });

    //         //Checks if the spacecraft has collided with a laser beam from the enemy
    //         enemy.beamGenerator.forEach((beam) => {
    //             if(this.spacecraft.checkCollisions(beam) && beam.type === "foe") {
    //                 this.spacecraft.hitCount++;
    //                 this.spacecraft.checkLife();
    //                 beam.isUsed = true;
    //             }
    //         });
    //     })

        
    // }

    //Update scores, lives, etc.
    update() {
        if(this.lives === 0) {
            this.gameOver();
        }
        
        if (this.spacecraft.isDead) {
            this.lives--;
        }

        this.scoreDOM.textContent = Number(this.score);
        this.livesDOM.textContent = (Number(this.lives) <= 0)? +0 : Number(this.lives);
        this.timeDOM.textContent = `${this.time.hours}:${this.time.minutes}:${this.time.seconds}`;
        
    }

    clear(){
        //Clean the whole canvas
        this.ctx.clearRect(this.x, this.y, this.canvas.width, this.canvas.height);
        // this.enemies = this.enemies.filter(enemy => !enemy.isDead);
        // this.enemies.forEach(enemy => enemy.clear());
        this.army.weakArmy.forEach(enemy => enemy.clear());
        this.army.normalArmy.forEach(enemy => enemy.clear());
        this.army.strongArmy.forEach(enemy => enemy.clear());
    }

    draw() {
        this.space.draw();
        this.spacecraft.draw();
        // this.enemies.forEach(enemy => enemy.draw());
        this.army.weakArmy.forEach(enemy => enemy.draw());
        this.army.normalArmy.forEach(enemy => enemy.draw());
        this.army.strongArmy.forEach(enemy => enemy.draw());
    }

    gameOver() {
        if (this.lives === 0) {
            this.stop();
        }
    }

}