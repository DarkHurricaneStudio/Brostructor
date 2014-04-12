var elem = document.getElementById('jeu');
var context = elem.getContext('2d');
var display = new Display(elem);
var engine = new Engine();
engine.generateLevel(context);

window.addEventListener('load', function() {


    // If we don't get the canvacs, stop
    if (!elem || !elem.getContext) {
        return;
    }

    // If we don't get the context, stop
    if (!context) {
        return;
    }

    // Main loop at 80FPS
    setInterval(mainLoop, 10);
}, false);


function gameUpdate() {
    // Bro
    engine.checkInputs(keys,context);
}

function refreshGame() {
    // Clear the canvas
    context.clearRect(0, 0, elem.width, elem.height);

    context.fillStyle = "rgb(255,0,0)";
    context.fillRect(0, 0, elem.width, elem.height);

    // we draw
    display.draw(engine);
}

function mainLoop() {
    gameUpdate();
    refreshGame();
}