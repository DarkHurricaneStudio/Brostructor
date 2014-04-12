function Engine() {}


// attributes
// @var offset the offset used for the display
Engine.prototype.offset = 0;
// @var planet the planet
Engine.prototype.planet = new Planet();
// @var enemies an array of the enemies
Engine.prototype.enemies = new Array();
// @var cities an array of the cities
Engine.prototype.cities = new Array();

// methods
Engine.prototype.generateLevel = function(context) {
	this.planet = new Planet(context);

}

Engine.prototype.checkInputs = function (inputs) {

	// we check the movements
	if (inputs[37] == true) { // left arrow
		// we move left
	} elseif (inputs[39] == true) { // right arrow
		// we move right
	}

	
}