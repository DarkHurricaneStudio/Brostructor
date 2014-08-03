var Main = function() {};

Main.audioManager;

Main.fpsCount = 0; // used to compute fps
Main.initDate = 0; // used to compute fps

Main.gameCanvas; // the canvas used to draw enemies, lasers, scoring, HUD, etc.
Main.backCanvas; // the canvas used for the background and planet display
Main.context; // the context of Main.gameCanvas

Main.state = MAIN_STATE_MAIN_MENU; // the actual state
Main.stateTimer = 0; // used for transistions


Main.init = function() {

    // used to debug the fps during the game
    Main.fpsCount = 0;
    Main.initDate = window.performance.now();

    // we load the canvas used for the game (player, enemies, lasers, scoring & HUD)
    Main.gameCanvas = document.getElementById('jeu');
    // we load the canvas used for the background and the planet
    Main.backCanvas = document.getElementById('background');
    // we laod the context of the game canvas
    Main.context = Main.gameCanvas.getContext('2d');

    // we create the audioManager object, to play sounds
    Main.audioManager = new AudioManager();


    // DEBUG !
    // we start with the game state (no menu at this time)
    Main.state = MAIN_STATE_LOADING_GAME;
    // we init the first state
    LoadingGame.init();


};

Main.graphicalUpdate = function() {

    // we request the next painting
    requestAnimationFrame(Main.graphicalUpdate);

    // we compute the fps
    Main.fpsCount++;
    var currentDate = window.performance.now();
    if (currentDate - Main.initDate >= 3000) {
        console.log(Main.fpsCount / 3)
        Main.initDate = currentDate;
        Main.fpsCount = 0;
    }

    // we clear the canvas
    Main.context.clearRect(0, 0, Main.gameCanvas.width, Main.gameCanvas.height);

    // we choose what to draw
    switch (Main.state) {
        case MAIN_STATE_LOADING_GAME:
            LoadingGame.graphicalUpdate();
            break;
        case MAIN_STATE_DHS_LOGO_TRANSITION:
            DHSLogoTransition.graphicalUpdate();
            break;
        case MAIN_STATE_INGAME:
            Game.graphicalUpdate();
            break;
        case MAIN_STATE_BD:
            BDState.graphicalUpdate();
            break;
        default:
            break;
    }

}

Main.coreUpdate = function() {

    // we choose what to update
    switch (Main.state) {
        case MAIN_STATE_LOADING_GAME:
            LoadingGame.coreUpdate();
            break;
        case MAIN_STATE_DHS_LOGO_TRANSITION:
            DHSLogoTransition.coreUpdate();
            break;
        case MAIN_STATE_INGAME:
            Game.coreUpdate();
            break;
        case MAIN_STATE_BD:
            BDState.coreUpdate();
            break;
        default:
            break;
    }

    // if there is a timer, we decrease it
    if (Main.stateTimer > 0) {
        Main.stateTimer--;
        if (Main.stateTimer == 0) {
            // we stop the transition and go to another state
            switch (Main.state) { // only transition here
                case MAIN_STATE_DHS_LOGO_TRANSITION:
                    DHSLogoTransition.stop();
                    break;
                case MAIN_STATE_BD:
                    BDState.stop();
                    break;
                default:
                    break;
            }
        }
    }

}

Main.changeStateTo = function(state, newTimer) {
    // we jump to the new state
    Main.state = state;
    // we change the new timer
    Main.stateTimer = newTimer;
    // we init the new state
    // execept for the menu, that was already initiate
    switch (Main.state) {
        case MAIN_STATE_LOADING_GAME: // never called
            LoadingGame.init();
            break;
        case MAIN_STATE_INGAME: // nothing to do here
            break;
        case MAIN_STATE_DHS_LOGO_TRANSITION:
            DHSLogoTransition.init(); // this method does nothing
            break;
        case MAIN_STATE_BD:
            BDState.init();
            break;
        default:
            break;
    }

}


Main.getStateTimer = function() {
    return this.stateTimer;
}

// real game part

Main.init();

window.addEventListener('load', function() {


    // If we don't get the canvacs, stop
    if (!Main.gameCanvas || !Main.gameCanvas.getContext) {
        return;
    }

    // If we don't get the context, stop
    if (!Main.context) {
        return;
    }




    // we set some serious business
    // Main loop at 80FPS
    setInterval(Main.coreUpdate, 12.5);
    // and we request to repaint the game with the Game.graphicalUpdate
    requestAnimationFrame(Main.graphicalUpdate);
    // false beacause not true
}, false);