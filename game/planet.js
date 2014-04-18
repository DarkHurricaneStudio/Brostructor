// We create the class Planet
var Planet = function() {
	this.offset = 0;
};

// attributes
// @var map an array of 'length' imageData (1px*'height'px)
Planet.prototype.map = new Array();
Planet.width = 2048;


// methods

// generate
// generate a planet (no shit Sherlock)
// @param context the context from the canvas
Planet.prototype.generate = function(context) {
	// we define some constants
	var width = Planet.width;
	var length = 128;
	var persistance = 0.5;
	var nbOctaves = 4;
	var pas = 64;
	var max = 80;
	this.map = Utils.imageDataPerlinNoise(width,length,max,pas,pas,persistance,nbOctaves,context);
};




// getters
Planet.prototype.getMap = function() {
	return this.map;
};

