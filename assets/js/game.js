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
        this.idOtherInterval = undefined;

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
        this.spacecraft = new Spacecraft(this.ctx, 40, 40, "/assets/images/sprites/spacecraft.sprite.png", 4, 4);

        //Enemies
        this.army = new BaseArmy(this.ctx, this.width, this.height);
        // this.army.setUpArmy("weak");
        // this.army.setUpArmy("normal");
        // this.army.setUpArmy("strong");
        // this.army.placeArmy();

        this.boss = new Boss(this.ctx, 40, 40, "", 4, 3);

        //Special objects
        this.boosters = [];

        //Game Start (prevents starting the game multiple times)
        this.isStarted = false;

        //Game Over (creates a custom Event)
        this.isOverEvent = new Event("gameOver");
    }

    start() {
        if(!this.isStarted) {
            this.isStarted = true;
            this.time.start();
            //The game starts
            this.idInterval = setInterval(() => {
                this.clear();
                this.move();
                this.checkCollisions();
                this.checkCanFire();
                this.update();
                this.draw();
            }, Constants.FPS);
            
            this.idOtherInterval = setInterval(() => {
                if (this.boosters.length <= 0) {
                    this.generateBoosters();
                }
            }, Constants.BOOSTER_GENERATION_TIME);
        }
    }

    setUpListeners() {
        addEventListener("keydown", (event) => this.spacecraft.onKeyPressed(event));
        addEventListener("keyup", (event) => this.spacecraft.onKeyPressed(event));
    }

    stop() {
        //The intervals stops
        clearInterval(this.idInterval);
        this.idInterval = undefined;
        clearInterval(this.idOtherInterval);
        this.idOtherInterval = undefined;

        clearInterval(this.spacecraft.idReload);

        this.army.weakArmy.forEach(enemy => clearInterval(enemy.beamGeneratorInterval));
        this.army.normalArmy.forEach(enemy => clearInterval(enemy.beamGeneratorInterval));
        this.army.strongArmy.forEach(enemy => clearInterval(enemy.beamGeneratorInterval));

        clearInterval(this.boss.idInterval);

        this.space.audio.pause();

        this.time.stop();
    }

    move(){
        //The space moves
        this.space.move();
        this.spacecraft.move();
        this.army.weakArmy.forEach(enemy => enemy.move());
        this.army.normalArmy.forEach(enemy => enemy.move());
        this.army.strongArmy.forEach(enemy => enemy.move());
        this.boosters.forEach(booster => booster.move());
        if (this.boss.isReady) {
            this.boss.move();
            if (this.boss.canFire) {
                this.boss.beamGenerator.forEach(beam => beam.move());
            }
        }
    }

    checkCollisions() {
        //WEAK ARMY
        this.army.weakArmy.forEach((enemy) => {
            //Checks if any enemy has collided with a laser beam from the spacecraft
            this.spacecraft.beamGenerator.forEach((beam) => {
                if(enemy.checkCollisions(beam) && beam.direction === "up") {
                    enemy.hitCount++;
                    enemy.checkLife();
                    this.score += enemy.score;
                    beam.isUsed = true;
                }
            });
        
            //Checks if the spacecraft has collided with a laser beam from the enemy
            enemy.beamGenerator.forEach((beam) => {
                if(this.spacecraft.checkCollisions(beam) && beam.direction === "down") {
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
                if(enemy.checkCollisions(beam) && beam.direction === "up") {
                    enemy.hitCount++;
                    enemy.checkLife();
                    this.score += enemy.score;
                    beam.isUsed = true;
                }
            });
        
            //Checks if the spacecraft has collided with a laser beam from the enemy
            enemy.beamGenerator.forEach((beam) => {
                if(this.spacecraft.checkCollisions(beam) && beam.direction === "down") {
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
                if(enemy.checkCollisions(beam) && beam.direction === "up") {
                    if(!this.spacecraft.immunity) {
                        enemy.hitCount++;
                        enemy.checkLife();
                        this.score += enemy.score;
                        this.spacecraft.immunity = true;
                        const idImmunity = setTimeout(()=> this.spacecraft.immunity = false, 1000);
                    }
                    beam.isUsed = true;
                }
            });
        
            //Checks if the spacecraft has collided with a laser beam from the enemy
            enemy.beamGenerator.forEach((beam) => {
                if(this.spacecraft.checkCollisions(beam) && beam.direction === "down") {
                    this.spacecraft.hitCount++;
                    this.spacecraft.checkLife();
                    beam.isUsed = true;
                }
            });
        });


        //BOSS
        this.boss.beamGenerator.forEach((beam) => {
            if (beam.checkCollisions(this.spacecraft) && beam.direction === "down") {
                if(!this.spacecraft.immunity) {
                    this.spacecraft.hitCount++;
                    this.spacecraft.checkLife();
                    this.spacecraft.immunity = true;
                    const idImmunity = setTimeout(()=> this.spacecraft.immunity = false, 1000);
                }
                beam.isUsed = true;
            }
        });
        this.spacecraft.beamGenerator.forEach((beam) => {
            if (beam.checkCollisions(this.boss) && beam.direction === "up" && this.boss.isReady) {
                this.boss.hitCount++;
                this.boss.checkLife();
                beam.isUsed = true;
            }
        });

        //BOOSTERS
        this.boosters.forEach((booster) => {
            if (booster.checkCollisions(this.spacecraft) && booster.type === "cherry") {
                booster.audio.play();
                this.score += booster.score;
                booster.isUsed = true;
            }
            if (booster.checkCollisions(this.spacecraft) && booster.type === "strawberry") {
                booster.audio.play();
                this.score += booster.score;
                booster.isUsed = true;
            }
        })
    }

    checkCanFire() {
        if(this.army.weakArmy.length < 8){
            this.army.normalArmy.canFire = true;
        }
        if (this.army.normalArmy.length < 8) {
            this.army.strongArmy.canFire = true;
        }
        this.army.checkCanFire();
    }

    generateBoosters() {
        const boosters = ["cherry", "strawberry"];
        const random = Math.floor(Math.random() * boosters.length);
        const item = boosters[random];

        let booster;
        switch (item) {
            case "cherry":
                booster = new Booster(this.ctx, 20, 20, "", 1, 1, item);
                this.boosters.push(booster);
                break;
            case "strawberry":
                booster = new Booster(this.ctx, 20, 20, "", 1, 1, item);
                this.boosters.push(booster);
                break;
        }
    }

    //Update scores, lives, etc.
    update() {
        this.gameOver();
        
        if (this.spacecraft.isDead) {
            this.lives--;
            this.spacecraft.isDead = false;
        }

        if (this.army.weakArmy.length === 0 &&
            this.army.normalArmy.length === 0 &&
            this.army.strongArmy.length === 0) {
                this.boss.isReady = true;
                this.boss.checkLife();
        }

        this.scoreDOM.textContent = Number(this.score);
        this.livesDOM.textContent = (Number(this.lives) <= 0)? +0 : Number(this.lives);
        this.timeDOM.textContent = this.time.toString();
    }

    clear() {
        //Clean the whole canvas
        this.ctx.clearRect(this.x, this.y, this.canvas.width, this.canvas.height);

        this.army.weakArmy.forEach(enemy => enemy.clear());
        this.army.weakArmy = this.army.weakArmy.filter(enemy => !enemy.isDead);
        
        this.army.normalArmy.forEach(enemy => enemy.clear());
        this.army.normalArmy = this.army.normalArmy.filter(enemy => !enemy.isDead);

        this.army.strongArmy.forEach(enemy => enemy.clear());
        this.army.strongArmy = this.army.strongArmy.filter(enemy => !enemy.isDead);

        if(this.boss.isReady) {
            this.boss.clear();
        }

        this.boosters = this.boosters
            .filter(booster => !booster.isUsed)
            .filter(booster => booster.y < this.ctx.canvas.height);
    }

    draw() {
        this.space.draw();
        this.spacecraft.draw();

        this.army.weakArmy.forEach(enemy => enemy.draw());
        this.army.normalArmy.forEach(enemy => enemy.draw());
        this.army.strongArmy.forEach(enemy => enemy.draw());

        this.boosters.forEach(booster => booster.draw());

        if(this.boss.isReady) {
            this.boss.draw();
            this.boss.beamGenerator.forEach(beam => beam.draw());
        }
    }

    gameOver() {
        if (this.lives === 0) {
            this.stop();
            //Sends the custom event to Window
            window.dispatchEvent(this.isOverEvent);
        }
        if (this.boss.isDead) {
            this.stop();
            window.dispatchEvent(this.isOverEvent);
        }
    }

}