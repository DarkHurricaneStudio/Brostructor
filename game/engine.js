var Engine = function() {};


// attributes
// @var offset the offset used for the display
Engine.prototype.offset = 0;
// @var planet the planet
Engine.prototype.planet = new Planet();
// @var enemies an array of the enemies
Engine.prototype.enemies = new Array();
// @var cities an array of the cities
Engine.prototype.cities = new Array();
// @var player the player
Engine.prototype.player = new Player();
// @var cameraSpeed the speed of the camera

// methods
Engine.prototype.generateLevel = function(context) {

    this.planet.generate(context);

};

Engine.prototype.checkInputs = function(inputs, context) {

    // we check the movements
    if (inputs[37] == true) { // left arrow
        this.player.move('left');
    } else if (inputs[39] == true) { // right arrow
        this.player.move('right');
    } else {
        this.player.move('none');
    }

    if (inputs[32] == true) { // Space key
        console.log("création nouvelle pla");

        var startTime = new Date().getTime();

        this.generateLevel(context);

        var generationTime = new Date().getTime();
        generationTime -= startTime;
        console.log("fin ! Temps pris pour une génération : " + generationTime);
    }


};

Engine.prototype.update = function() {
    // we update the camera speed
    //this.cameraSpeed = Math.round((this.cameraSpeed+this.player.getSpeed())/4);
    this.cameraSpeed = this.player.getSpeedY();
    // we update the planet position
    this.planet.setOffset(this.planet.getOffset() + this.cameraSpeed);
};

//getters
Engine.prototype.getPlanet = function() {
    return this.planet;
};