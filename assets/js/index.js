window.onload = () => {

    //Game initialization
    const game = new Game("game-screen", "score", "lives", "time");
    const startScreen = document.querySelector(".load");
    
    document.getElementById("start").addEventListener("click", (event) => {
        event.preventDefault();
        startScreen.classList.add("hidden");

        game.start();
        game.setUpListeners();
    });

    addEventListener("gameOver", () => {

        startScreen.classList.remove("hidden");
        if (game.lives === 0) {
            startScreen.innerHTML = `
            <h1>GAME OVER</h1>
            <h2>Would you like to try again?</h2>
            <a href="" id="try-again">Try</a>
            `;
            startScreen.getElementById("try-again").addEventListener("click", () => window.location.reload());
        } else if (game.boss.isDead) {
            startScreen.innerHTML = `
            <h1>YOU WON</h1>
            <h2>Would you like to try again?</h2>
            <a href="" id="try-again">Try</a>
            `;
        }
        
    });
}
