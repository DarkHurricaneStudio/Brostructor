var LoadingGame = function() {};

LoadingGame.imageCounter = 0; // public counter

LoadingGame.init = function() {

    // we initialize the audioManager
    Main.audioManager.load();

    //we use a counter to know if all images are loaded
    // we load each image
    IMAGE_GAME_BACKGROUND.src = "images/background.png";
    IMAGE_GAME_BACKGROUND.onload = function() {
        LoadingGame.imageCounter++;
    }
    IMAGE_HUD.src = "images/HUD.png";
    IMAGE_HUD.onload = function() {
        LoadingGame.imageCounter++;
    }
    IMAGE_EXPLOSION.src = "images/explosion.png";
    IMAGE_EXPLOSION.onload = function() {
        LoadingGame.imageCounter++;
    }
    IMAGE_BROSTRUCTOR.src = "images/brostructor.png";
    IMAGE_BROSTRUCTOR.onload = function() {
        LoadingGame.imageCounter++;
    }
    IMAGE_ENEMY.src = "images/enemy.png";
    IMAGE_ENEMY.onload = function() {
        LoadingGame.imageCounter++;
    }
    IMAGE_KAMIKAZE.src = "images/kamikaze.png";
    IMAGE_KAMIKAZE.onload = function() {
        LoadingGame.imageCounter++;
    }
    IMAGE_LOGO_DHS.src = "images/logoDHS.png";
    IMAGE_LOGO_DHS.onload = function() {
        LoadingGame.imageCounter++;
    }
    IMAGE_BD_INTRO.src = "images/intro.png";
    IMAGE_BD_INTRO.onload = function() {
        LoadingGame.imageCounter++;
    }

}


LoadingGame.coreUpdate = function() {
    // we load the game
    Game.init();
    if (LoadingGame.imageCounter == NUMBER_OF_IMAGES_TO_LOAD_LOADINGGAME) {
        // we can stop
        LoadingGame.stop();
    }

}

LoadingGame.graphicalUpdate = function() {

    Main.context.font = "20px Arial";
    Main.context.fillStyle = "#000000";
    Main.context.fillText("Loading the game...", 10, 645);

}

LoadingGame.stop = function() {
    Main.changeStateTo(MAIN_STATE_DHS_LOGO_TRANSITION, MAIN_STATE_DHS_LOGO_TRANSITION_TIMER);
}