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
            new EnemyPawn(this.ctx, 20, 22, "/assets/images/sprites/basic-enemy.sprite.png", 4, 1)
        ];
        
    }

    start() {
        //The game starts
        this.idInterval = setInterval(() => {
            this.clear();
            this.move();
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

    clear(){
        //Clean the whole canvas
        this.ctx.clearRect(this.x, this.y, this.canvas.width, this.canvas.height);
    }

    draw() {
        this.space.draw();
        this.spacecraft.draw();
        this.enemies.forEach((enemy) => enemy.draw());
    }

}