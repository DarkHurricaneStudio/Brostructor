var Game = function() {};

Game.display;
Game.engine;

Game.bestScore = 0; // The best score from this session


Game.init = function() {
    // we create the display engine
    Game.display = new Display(Main.gameCanvas, Main.backCanvas);

    // we create the game engine
    Game.engine = new Engine();

    // we start by generating a level
    Game.engine.generateLevel();

    // we display the background
    Game.display.drawBackground();

    // we begin the music at the launching of the state
    Main.audioManager.backgroundMusic.play();

}

Game.checkInputs = function(inputs) {
    // we check the arrow keys
    if (inputs[KEY_LEFT] == true && inputs[KEY_RIGHT] == true) {
        //nothing here
    } else if (inputs[KEY_LEFT] == true) {
        Game.engine.player.move('left');
    } else if (inputs[KEY_RIGHT] == true) {
        Game.engine.player.move('right');
    } else {
        Game.engine.player.move('none');
    }

    // other keys
    if (inputs[KEY_SPACE] == true) {
        Game.engine.createLaser();
    }

}

Game.coreUpdate = function() {
    // we always check the inputs
    Game.checkInputs(keys);

    // we update the engine
    Game.engine.update();
}

Game.graphicalUpdate = function() {
    // we draw the game
    Game.display.draw(Game.engine);
}


Game.stop = function() {
    // we go to the death menu
    Main.state = MAIN_STATE_DEATH_MENU;
    // we check if the score is higher than the actual best score
    if (Game.engine.points > Game.bestScore) {
        Game.bestScore = Game.engine.points;
    }
}