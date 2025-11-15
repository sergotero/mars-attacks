window.addEventListener("DOMContentLoaded", () => {
    //Game initialization
    const game = new Game("game-screen", "score", "lives", "time");
    game.start();
    game.setUpListeners();
});