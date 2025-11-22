document.getElementById("start").addEventListener("click", () => {
    
    //Game initialization
    const game = new Game("game-screen", "score", "lives", "time");
    game.start();
    game.setUpListeners();
});

document.addEventListener("mousemove", (event) => {
    const pointer = document.getElementById("puntero");
    const height = pointer.getBoundingClientRect().height;
    const width = pointer.getBoundingClientRect().width;

    pointer.style.left = `${event.clientX - width / 2}px`;
    pointer.style.top = `${event.clientY - height / 2}px`;

});