/*var gameCanvas = document.getElementById('jeu');
var backCanvas = document.getElementById('background');
var context = gameCanvas.getContext('2d');
var display = new Display(gameCanvas, backCanvas);
var engine = new Engine();
engine.generateLevel();
var audioManager = new AudioManager();
var pause = false;
var fpsCount = 0;
var initDate = window.performance.now();

window.addEventListener('load', function() {


    // If we don't get the canvacs, stop
    if (!gameCanvas || !gameCanvas.getContext) {
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
    setInterval(gameUpdate, 12.5);
    requestAnimationFrame(refreshGame);
}, false);


function gameUpdate() {
    if (engine.isRunning()) {
        // Bro
        engine.checkInputs(keys);
        engine.update();
    }
}


function refreshGame() {
    requestAnimationFrame(refreshGame);

    fpsCount++;
    var currentDate = window.performance.now();
    if (currentDate - initDate >= 3000) {
        console.log(fpsCount / 3)
        initDate = currentDate;
        fpsCount = 0;
    }

    // Clear the canvas
    context.clearRect(0, 0, gameCanvas.width, gameCanvas.height);

    // we draw
    display.draw(engine);
}

function mainLoop() {
    if (!pause) {
        gameUpdate();
        refreshGame();
    }
}
*/

// we init the game
Game.init();

window.addEventListener('load', function() {


    // If we don't get the canvacs, stop
    if (!Game.gameCanvas || !Game.gameCanvas.getContext) {
        return;
    }

    // If we don't get the context, stop
    if (!Game.context) {
        return;
    }


    // we initialize the display
    Game.display.load();
    // we initialize the audioManager
    Game.audioManager.load();

    // we begin the music
    Game.audioManager.backgroundMusic.play();

    // we set some serious business
    // Main loop at 80FPS
    // we call the Game.coreUpdate every 12.5 milliseconds
    setInterval(Game.coreUpdate, 12.5);
    // and we request to repaint the game with the Game.graphicalUpdate
    requestAnimationFrame(Game.graphicalUpdate);
    // false beacause not true
}, false);