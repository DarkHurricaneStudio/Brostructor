// We create the class Planet
var Planet = function() {
	this.offset = 0;
};

// attributes
// @var map an array of 'length' imageData (1px*'height'px)
Planet.prototype.map = new Array();
// @var offset the offset used to display the planet
Planet.prototype.offset = 0;

// methods

// generate
// generate a planet (no shit Sherlock)
// @param context the context from the canvas
Planet.prototype.generate = function(context) {
	// we define some constants
	var width = 2048;
	var length = 128;
	var persistance = 0.5;
	var nbOctaves = 4;
	var pas = 64;
	var max = 80;
	this.map = Utils.imageDataPerlinNoise(width,length,max,pas,pas,persistance,nbOctaves,context);
};

Planet.prototype.setOffset = function(newOffset) {
	if (newOffset > this.getWidth()) {
		newOffset = newOffset%this.getWidth();
	} else if (-newOffset > this.getWidth()) {
		newOffset = - ((-newOffset)%this.getWidth());
	}
	this.offset = newOffset;
};



// getters
Planet.prototype.getMap = function() {
	return this.map;
};

Planet.prototype.getOffset = function() {
	return this.offset;
};

Planet.prototype.getWidth = function() {
	return this.map.length;
};