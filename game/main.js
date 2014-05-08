var elem = document.getElementById('jeu');
var context = elem.getContext('2d');
var display = new Display(elem);
var engine = new Engine();
engine.generateLevel();
var audioManager = new AudioManager();
var pause = false;

window.addEventListener('load', function() {


    // If we don't get the canvacs, stop
    if (!elem || !elem.getContext) {
        return;
    }

    // If we don't get the context, stop
    if (!context) {
        return;
    }

    // Initialisation
    display.load();
    audioManager.load();
    audioManager.backgroundMusic.play();
    // Main loop at 80FPS
    setInterval(mainLoop, 12.5);
}, false);


function gameUpdate() {
    // Bro
    engine.checkInputs(keys);
    engine.update();

}

function refreshGame() {
    // Clear the canvas
    context.clearRect(0, 0, elem.width, elem.height);

    // we draw
    display.draw(engine);

}

function mainLoop() {
    if (!pause) {
        gameUpdate();
        refreshGame();
    }
}