// We create the class Planet
var Planet = function() {
    this.offset = 0;
    this.map = document.getElementById('planet_canvas');
    this.renders = new Array(PLANET_WIDTH);
};

// Fields
Planet.prototype.map; // Planet dedicated canvas
Planet.prototype.renders; // Array containing all the possible renders of one planet


// methods
Planet.prototype.generate = function() {
    // This method generate the planet randomly and also draw the first render on the canvas (last parameter)
    Utils.imageDataPerlinNoise(PLANET_WIDTH, PLANET_HEIGHT, PLANET_MAX_HEIGHT, PLANET_STEP, PLANET_STEP, PLANET_PERSISTANCE, PLANET_OCTAVES_NUMBER, this.map.getContext("2d"));
};

/**
 * Insert a new render in the renders array
 */
Planet.prototype.render = function(offset) {
    this.renders[offset] = document.createElement('canvas');
    this.renders[offset].width = CANVAS_WIDTH;
    this.renders[offset].height = PLANET_HEIGHT;
    var ctx = this.renders[offset].getContext('2d');

    for (var i = 0; i < CANVAS_WIDTH; i++) {
        var y = Utils.getPlanetCurvePosition(i, CANVAS_WIDTH, PLANET_DEVIATION);
        var mapPos = (offset + i) % PLANET_WIDTH;
        ctx.drawImage(this.map, Math.round(mapPos), 0, 1, PLANET_HEIGHT, i, Math.round(y), 1, PLANET_HEIGHT);

    }
}

// getters
Planet.prototype.getMap = function() {
    return this.map;
};

/**
 * Return one render
 */
Planet.prototype.getRender = function(p_offset) {
    return this.renders[p_offset];
}