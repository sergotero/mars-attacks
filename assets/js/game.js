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
        
        //REVISAR
        // setInterval(() => {
        //     this.army.normalArmy.forEach(enemy => enemy.canFire = false);
        //     this.army.normalArmy[Math.floor(Math.random() * this.army.normalArmy.length)].canFire = true;
        // }, 8000);
    }

    setUpListeners() {
        addEventListener("keydown", (event) => this.spacecraft.onKeyPressed(event));
        addEventListener("keyup", (event) => this.spacecraft.onKeyPressed(event));
        addEventListener("load", () => this.time.start());
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
        this.army.weakArmy.forEach(enemy => enemy.move());
        this.army.normalArmy.forEach(enemy => enemy.move());
        this.army.strongArmy.forEach(enemy => enemy.move());
    }

    checkCollisions() {
        //WEAK ARMY
        this.army.weakArmy.forEach((enemy) => {
            //Checks if any enemy has collided with a laser beam from the spacecraft
            this.spacecraft.beamGenerator.forEach((beam) => {
                if(enemy.checkCollisions(beam) && beam.type === "friend") {
                    enemy.hitCount++;
                    enemy.checkLife();
                    this.score += enemy.score;
                    beam.isUsed = true;
                }
            });
        
            //Checks if the spacecraft has collided with a laser beam from the enemy
            enemy.beamGenerator.forEach((beam) => {
                if(this.spacecraft.checkCollisions(beam) && beam.type === "foe") {
                    this.spacecraft.hitCount++;
                    this.spacecraft.checkLife();
                    beam.isUsed = true;
                }
            });
        });

        //NORMAL ARMY
        this.army.normalArmy.forEach((enemy) => {
            //Checks if any enemy has collided with a laser beam from the spacecraft
            this.spacecraft.beamGenerator.forEach((beam) => {
                if(enemy.checkCollisions(beam) && beam.type === "friend") {
                    enemy.hitCount++;
                    enemy.checkLife();
                    this.score += enemy.score;
                    beam.isUsed = true;
                }
            });
        
            //Checks if the spacecraft has collided with a laser beam from the enemy
            enemy.beamGenerator.forEach((beam) => {
                if(this.spacecraft.checkCollisions(beam) && beam.type === "foe") {
                    this.spacecraft.hitCount++;
                    this.spacecraft.checkLife();
                    beam.isUsed = true;
                }
            });
        });

        //STRONG ARMY
        this.army.strongArmy.forEach((enemy) => {
            //Checks if any enemy has collided with a laser beam from the spacecraft
            this.spacecraft.beamGenerator.forEach((beam) => {
                if(enemy.checkCollisions(beam) && beam.type === "friend") {
                    enemy.hitCount++;
                    enemy.checkLife();
                    this.score += enemy.score;
                    beam.isUsed = true;
                }
            });
        
            //Checks if the spacecraft has collided with a laser beam from the enemy
            enemy.beamGenerator.forEach((beam) => {
                if(this.spacecraft.checkCollisions(beam) && beam.type === "foe") {
                    this.spacecraft.hitCount++;
                    this.spacecraft.checkLife();
                    beam.isUsed = true;
                }
            });
        });
    }

    checkCanFire() {
        if(this.army.weakArmy.length < 8){
            this.army.setCanFire(this.army.normalArmy, true);
        }
        if (this.army.normalArmy.length < 8) {
            this.army.setCanFire(this.army.strongArmy, true);
        }
    }


    //Update scores, lives, etc.
    update() {

        this.gameOver();

        
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

        this.army.weakArmy.forEach(enemy => enemy.clear());
        this.army.weakArmy = this.army.weakArmy.filter(enemy => !enemy.isDead);
        
        this.army.normalArmy.forEach(enemy => enemy.clear());
        this.army.normalArmy = this.army.normalArmy.filter(enemy => !enemy.isDead);

        this.army.strongArmy.forEach(enemy => enemy.clear());
        this.army.strongArmy = this.army.strongArmy.filter(enemy => !enemy.isDead);
    }

    draw() {
        this.space.draw();
        this.spacecraft.draw();

        this.army.weakArmy.forEach(enemy => enemy.draw());
        this.army.normalArmy.forEach(enemy => enemy.draw());
        this.army.strongArmy.forEach(enemy => enemy.draw());
    }

    gameOver() {
        if (this.lives === 0) {
            this.stop();
        }

        if (this.army.weakArmy.length === 0 &&
            this.army.normalArmy.length === 0 &&
            this.army.strongArmy.length === 0) {
            this.stop();
        }
    }

}