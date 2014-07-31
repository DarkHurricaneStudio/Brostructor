var BDState = function() {

};

BDState.prototype.image = null;
BDState.prototype.opacity = 0;
BDState.prototype.posY = 0;
BDState.prototype.scrollingCurrentFrame = 0;
BDState.prototype.scrollingFrames = 0;
BDState.prototype.scrollingPixels = 0;

BDState.init = function() {
    this.image = IMAGE_BD_INTRO;

    this.posY = 0;
    this.scrollingCurrentFrame = 0;

    // Number of frames during scrolling
    this.scrollingFrames = MAIN_STATE_BD_TIMER - 2 * MAIN_STATE_BD_FADE_TIME;

    // Pixels to scroll
    this.scrollingPixels = this.image.height - CANVAS_HEIGHT;
}

BDState.coreUpdate = function() {
    // Opacity update
    var tmp = Main.getStateTimer() / MAIN_STATE_BD_TIMER;
    if (tmp > 1) {
        tmp = 1;
    } else {
        if (tmp > 0.5) {
            tmp = 1 - tmp;
        }
    }

    this.opacity = tmp * 2 * (MAIN_STATE_BD_TIMER / (MAIN_STATE_BD_TIMER - this.scrollingFrames));

    //Position update
    if (this.opacity >= 1) {
        this.scrollingCurrentFrame++;
        this.posY = Math.floor(this.scrollingPixels * this.scrollingCurrentFrame / this.scrollingFrames);

        console.log(this.posY / this.scrollingPixels + "     " + this.scrollingCurrentFrame / this.scrollingFrames);
    }
}

BDState.graphicalUpdate = function() {
    //we hide the background
    Main.context.fillStyle = "black";
    Main.context.fillRect(0, 0, Main.gameCanvas.width, Main.gameCanvas.height);

    // We set the alpha
    Main.context.globalAlpha = this.opacity;
    Main.context.drawImage(this.image, 0, this.posY, CANVAS_WIDTH, CANVAS_HEIGHT, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    // We reset the alpha for other graphic operations
    Main.context.globalAlpha = 1;
}

BDState.stop = function() {

    // normally we have to go to the menu, but fuck it
    Main.changeStateTo(MAIN_STATE_INGAME, 0);

}