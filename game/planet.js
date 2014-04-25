// We create the class Planet
var Planet = function() {
    this.offset = 0;
};

// attributes
// @var map an array of 'length' imageData (1px*'height'px)
Planet.prototype.map = new Array();


// methods

// generate
// generate a planet (no shit Sherlock)
// @param context the context from the canvas
Planet.prototype.generate = function(context) {
    this.map = Utils.imageDataPerlinNoise(PLANET_WIDTH, PLANET_HEIGHT, PLANET_MAX_HEIGHT, PLANET_STEP, PLANET_STEP, PLANET_PERSISTANCE, PLANET_OCTAVES_NUMBER, context);
};




// getters
Planet.prototype.getMap = function() {
    return this.map;
};