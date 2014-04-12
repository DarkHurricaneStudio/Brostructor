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
//Engine.prototype.player = new Player();

// methods
Engine.prototype.generateLevel = function(context) {

	this.planet.generate(context);

};

Engine.prototype.checkInputs = function (inputs,context) {

	// we check the movements
	if (inputs[37] == true) { // left arrow
		// we move left
	} else if (inputs[39] == true) { // right arrow
		// we move right
	}

	if (inputs[32] == true) { //
		console.log("création nouvelle pla");
		this.generateLevel(context);
		console.log("fin !");
	}

	
};

//getters
Engine.prototype.getPlanet = function() {
	return this.planet;
};