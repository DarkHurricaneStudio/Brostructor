var BDState = function() {};

BDState.prototype.opacity = 0;
BDState.prototype.posY = 0;
BDState.prototype.scrollingCurrentFrame = 0;
BDState.prototype.scrollingFrames = 0;
BDState.prototype.scrollingPixels = 0;

BDState.init = function() {
    this.posY = 0;
    this.scrollingCurrentFrame = 0;

    // Number of frames during scrolling
    this.scrollingFrames = MAIN_STATE_BD_TIMER - 2 * MAIN_STATE_BD_FADE_TIME;

    // Pixels to scroll
    this.scrollingPixels = IMAGE_BD_INTRO.height - CANVAS_HEIGHT;
}

BDState.coreUpdate = function() {
    // === Opacity update
    // The TMP is a value going from -1 to 1 to -1 regularly
    var tmp = Main.getStateTimer() / MAIN_STATE_BD_TIMER;
    if (tmp > 1) {
        tmp = 1;
    } else {
        if (tmp > 0.5) {
            tmp = 1 - tmp;
        }
    }
    tmp *= 2;

    // TMP multiplied by TIMER/TRANSISTION_TIME to increase the value of opacity
    this.opacity = tmp * (MAIN_STATE_BD_TIMER / (MAIN_STATE_BD_TIMER - this.scrollingFrames));

    // === Position update
    if (this.opacity >= 1) {
        this.scrollingCurrentFrame++;
        this.posY = Math.floor(this.scrollingPixels * this.scrollingCurrentFrame / this.scrollingFrames);
    }


    // If space is pushed, we end the state
    if (keys[KEY_SPACE] == true){
        // First we cancel the input
        keys[KEY_SPACE] = false;
        
        // Then we end the state
        Main.setStateTimer(MAIN_STATE_BD_FADE_TIME);
    }
}

BDState.graphicalUpdate = function() {
    //we hide the background
    Main.context.fillStyle = "black";
    Main.context.fillRect(0, 0, Main.gameCanvas.width, Main.gameCanvas.height);

    // We set the alpha
    Main.context.globalAlpha = this.opacity;
    Main.context.drawImage(IMAGE_BD_INTRO, 0, this.posY, CANVAS_WIDTH, CANVAS_HEIGHT, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    // We reset the alpha for other graphic operations
    Main.context.globalAlpha = 1;
}


/**
 * Called when the state is ended. Call the next logical state
 */
BDState.stop = function() {
    // TODO GO TO MENU
    Main.changeStateTo(MAIN_STATE_INGAME, 0);
}