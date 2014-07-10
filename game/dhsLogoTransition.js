var DHSLogoTransition = function() {};

DHSLogoTransition.init = function() {

    // nothing here
}

DHSLogoTransition.coreUpdate = function() {
    // nothing here

}

DHSLogoTransition.graphicalUpdate = function() {

    //we hide the background
    Main.context.fillStyle = "lightgrey";
    Main.context.fillRect(0, 0, Main.gameCanvas.width, Main.gameCanvas.height);

    // we write a little funny text
    Main.context.font = "20px Arial";
    Main.context.fillStyle = "#000000";
    Main.context.fillText("Some DHS stuff", 10, 10);

}

DHSLogoTransition.stop = function() {

    // normally we have to go to the menu, but fuck it
    Main.changeStateTo(MAIN_STATE_INGAME, 0);

}