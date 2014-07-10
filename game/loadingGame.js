var LoadingGame = function() {};


LoadingGame.init = function() {

    // we initialize the audioManager
    Main.audioManager.load();
}


LoadingGame.coreUpdate = function() {
    // we load the game
    Game.init();
    // we can stop
    LoadingGame.stop();

}

LoadingGame.graphicalUpdate = function() {

    Main.context.font = "20px Arial";
    Main.context.fillStyle = "#000000";
    Main.context.fillText("Loading the game...", 10, 645);

}

LoadingGame.stop = function() {

    // the game finishes loading
    console.log("Game succesfully load !");

    // normally we have to go to the menu, but fuck it
    Main.changeStateTo(MAIN_STATE_DHS_LOGO_TRANSITION, 500);

}