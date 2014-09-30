var DHSLogoTransition = function() {};

// Fields
DHSLogoTransition.prototype.opacity = 0;

// Methods
DHSLogoTransition.init = function() {
     Main.context.fillStyle = "black";
    Main.context.fillRect(0, 0, Main.gameCanvas.width, Main.gameCanvas.height); 
}

DHSLogoTransition.coreUpdate = function() {
    // The TMP is a value going from -1 to 1 to -1 regularly
    var tmp = Main.getStateTimer() / MAIN_STATE_DHS_LOGO_TRANSITION_TIMER;
    if (tmp > 1) {
        tmp = 1;
    } else {
        if (tmp > 0.5) {
            tmp = 1 - tmp;
        }
    }
    tmp *= 2;

    // TMP multiplied by TIMER/TRANSISTION_TIME to increase the value of opacity
    this.opacity = tmp * (MAIN_STATE_DHS_LOGO_TRANSITION_TIMER / (MAIN_STATE_DHS_LOGO_TRANSITION_TIMER - MAIN_STATE_DHS_LOGO_TRANSITION_STATIC_TIME));
}

DHSLogoTransition.graphicalUpdate = function() {
    //we hide the background
   

    // We set the alpha
    Main.context.globalAlpha = this.opacity;
    Main.context.drawImage(IMAGE_LOGO_DHS, 0, 0);

    // Next step begin by alpha 0, so no reset
    // We reset the alpha for other graphic operations 
    //Main.context.globalAlpha = 1;

}
/**
 * Called when the state is ended. Call the next logical state
 */
DHSLogoTransition.stop = function() {
    Main.changeStateTo(MAIN_STATE_BD, MAIN_STATE_BD_TIMER);
}