window.onload = () => {
    //Audio initialization
    const audioDOM = document.querySelector(".audio");
    const audioDOMIcon = audioDOM.querySelector("i");
    const startAudio = new Audio("/assets/audio/morse.mp3");

    //Game initialization
    const game = new Game("game-screen", "score", "lives", "time");
    const startScreen = document.querySelector(".load");

    startAudio.addEventListener("loadeddata", () => {
        startAudio.volume = 0.05;
        startAudio.loop = true;
        startAudio.play();
    });
    
    audioDOM.addEventListener("click", () => {

        startAudio.pause();

        audioDOMIcon.classList.toggle("fa-volume-high");
        audioDOMIcon.classList.toggle("fa-volume-xmark");

        if(audioDOMIcon.classList.contains("fa-volume-high")&& !game.isStarted) {
            startAudio.play();
        }
    });
    
    document.getElementById("start").addEventListener("click", (event) => {
        event.preventDefault();
        startScreen.classList.add("hidden");
        startAudio.pause();
        game.space.canPlay();
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
            startScreen.getElementById("try-again").addEventListener("click", () => window.location.reload());
        }
        
    });
}
