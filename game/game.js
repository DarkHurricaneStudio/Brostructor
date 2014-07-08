var Game = function() {};

Game.display;
Game.engine;
Game.audioManager;

Game.gameCanvas;
Game.backCanvas;
Game.context;

Game.state = GAME_STATE_MAIN_MENU; // the state of the game
Game.StateTimer = 0; // a btimer used to compute the time remaining until the end of a transistion
Game.fpsCount = 0; // used to compute fps during the game
Game.bestScore = 0; // The best score from this session


Game.init = function() {
    // we init the game
    // we load the canvas used for the game (player, enemies, lasers, scoring & HUD)
    Game.gameCanvas = document.getElementById('jeu');
    // we load the canvas used for the background and the planet
    Game.backCanvas = document.getElementById('background');
    // we laod the context of the game canvas
    Game.context = Game.gameCanvas.getContext('2d');


    // we create the display engine
    Game.display = new Display(Game.gameCanvas, Game.backCanvas);
    // we create the game engine
    Game.engine = new Engine();
    // we create the audioManager object, to play sounds
    Game.audioManager = new AudioManager();


    // we start by generating a level
    Game.engine.generateLevel();

    // we set the game in the ingame mode (for test, must be GAME_STATE_MAIN_MENU for final version)
    Game.state = GAME_STATE_INGAME;


    // used to debug the fps during the game
    Game.fpsCount = 0;
    Game.initDate = window.performance.now();

}

Game.coreUpdate = function() {

    // we always check the inputs
    Game.engine.checkInputs(keys);

    // we update the engine only if we are in game
    if (Game.state == GAME_STATE_INGAME) {
        Game.engine.update();
    }

}

Game.graphicalUpdate = function() {

    // we request the next painting
    requestAnimationFrame(Game.graphicalUpdate);

    // we compute the fps
    Game.fpsCount++;
    var currentDate = window.performance.now();
    if (currentDate - Game.initDate >= 3000) {
        console.log(Game.fpsCount / 3)
        Game.initDate = currentDate;
        Game.fpsCount = 0;
    }

    // we clear the canvas
    Game.context.clearRect(0, 0, Game.gameCanvas.width, Game.gameCanvas.height);

    // we redraw the actual frame
    Game.display.draw(Game.engine);
}

Game.die = function() {
    // we go to the death menu
    Game.state = GAME_SATE_DEATH_MENU;
    // we check if the score is higher than the actual best score
    if (Game.engine.points > Game.bestScore) {
        Game.bestScore = Game.engine.points;
    }
}