// We create the class Planet
var Planet = function() {
    this.offset = 0;
    this.map = document.getElementById('planet_canvas');
    this.renders = new Array(PLANET_WIDTH);
    for (var i = this.renders.length - 1; i >= 0; i--) {
        this.renders[i] = document.createElement('canvas');
        this.renders[i].width = CANVAS_WIDTH;
        this.renders[i].height = PLANET_HEIGHT;
    };
};

// attributes
// @var map a canvas
Planet.prototype.map;
Planet.prototype.renders;


// methods

// generate
// generate a planet (no shit Sherlock)
// @param context the context from the canvas
Planet.prototype.generate = function() {
    // we draw in the canvas
    Utils.imageDataPerlinNoise(PLANET_WIDTH, PLANET_HEIGHT, PLANET_MAX_HEIGHT, PLANET_STEP, PLANET_STEP, PLANET_PERSISTANCE, PLANET_OCTAVES_NUMBER, this.map.getContext("2d"));
    var t1 = new Date().getTime();
    for (var i = PLANET_WIDTH - 1; i >= 0; i--) {
        this.render();
        this.offset++;
    };
    var t2 = new Date().getTime();
    console.log(t2 - t1);

};


Planet.prototype.render = function() {
    var ctx = this.renders[this.offset].getContext('2d');

    for (var i = 0; i < CANVAS_WIDTH; i++) {
        var y = Utils.getPlanetCurvePosition(i, CANVAS_WIDTH, PLANET_DEVIATION);
        var mapPos = (this.offset + i) % PLANET_WIDTH;
        ctx.drawImage(this.map, mapPos, 0, 1, PLANET_HEIGHT, i, y, 1, PLANET_HEIGHT);

    }
}

// getters
Planet.prototype.getMap = function() {
    return this.map;
};

Planet.prototype.getRender = function(p_offset) {
    return this.renders[p_offset];
}