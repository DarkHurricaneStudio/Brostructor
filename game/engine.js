var Engine = function() {};


// attributes
// @var offset the offset used for the display
Engine.prototype.offset = 0;
// @var cameraSpeed the speed of the camera
Engine.prototype.cameraSpeed = 0;
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

Engine.prototype.checkInputs = function(inputs) {

    // we check the movements
    if (inputs[37] == true) { // left arrow
        this.player.move('left');
    } else if (inputs[39] == true) { // right arrow
        this.player.move('right');
    } else {
        this.player.move('none');
    }

    
};

Engine.prototype.normaliseValue = function(old_x) {
    var x = Math.abs(this.offset + old_x) % this.planet.getWidth();
    if ((this.offset + old_x) < 0) {
        x = this.planet.getWidth() - x;
    }
    return x;
};


Engine.prototype.setOffset = function(newOffset) {
	if (newOffset > this.planet.getWidth()) {
		newOffset = newOffset%this.planet.getWidth();
	} else if (-newOffset > this.planet.getWidth()) {
		newOffset = - ((-newOffset)%this.planet.getWidth());
	}

	this.offset = newOffset;
};

Engine.prototype.update = function() {
	// we update the player position
    this.player.updatePosition();
    // we update the camera speed
    //this.cameraSpeed = Math.round((this.cameraSpeed+this.player.getSpeed())/4);
    this.cameraSpeed = this.player.getSpeedX();
    // we update the planet position
    if (this.cameraSpeed != 0) {
        this.setOffset(this.offset - this.cameraSpeed);
    }
};

//getters
Engine.prototype.getPlanet = function() {
    return this.planet;
};

Engine.prototype.getPlayer = function() {
    return this.player;
};

Engine.prototype.getOffset = function() {
    return this.offset;
};