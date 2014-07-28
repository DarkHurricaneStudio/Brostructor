var DHSLogoTransition = function() {};

DHSLogoTransition.prototype.image = null;
DHSLogoTransition.prototype.opacity = 0;

DHSLogoTransition.init = function() {
    this.image = new Image();
    this.image.src = "images/logoDHS.png";
}

DHSLogoTransition.coreUpdate = function() {
    var tmp = Main.getStateTimer() / MAIN_STATE_DHS_LOGO_TRANSITION_TIMER ;
     if (tmp > 1 ) {
        tmp = 1;
     } else {
        if (tmp > 0.5) {
            tmp = 1 - tmp;
        } 
     }
    this.opacity = tmp * 2 * (MAIN_STATE_DHS_LOGO_TRANSITION_TIMER/MAIN_STATE_DHS_LOGO_TRANSITION_STATIC_TIME);
}

DHSLogoTransition.graphicalUpdate = function() {
    //we hide the background
    Main.context.fillStyle = "black";
    Main.context.fillRect(0, 0, Main.gameCanvas.width, Main.gameCanvas.height);

    // We set the alpha
    Main.context.globalAlpha = this.opacity;
    Main.context.drawImage(this.image, 0, 0);

    // We reset the alpha for other graphic operations
    Main.context.globalAlpha = 1;
}

DHSLogoTransition.stop = function() {

    // normally we have to go to the menu, but fuck it
    Main.changeStateTo(MAIN_STATE_INGAME, 0);

}