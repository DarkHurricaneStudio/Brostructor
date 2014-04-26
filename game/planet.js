// We create the class Planet
var Planet = function() {
    this.offset = 0;
    this.map = document.getElementById('planet_canvas');

};

// attributes
// @var map a canvas
Planet.prototype.map;


// methods

// generate
// generate a planet (no shit Sherlock)
// @param context the context from the canvas
Planet.prototype.generate = function() {
    // we draw in the canvas
    Utils.imageDataPerlinNoise(PLANET_WIDTH, PLANET_HEIGHT, PLANET_MAX_HEIGHT, PLANET_STEP, PLANET_STEP, PLANET_PERSISTANCE, PLANET_OCTAVES_NUMBER, this.map.getContext("2d"));
};




// getters
Planet.prototype.getMap = function() {
    return this.map;
};