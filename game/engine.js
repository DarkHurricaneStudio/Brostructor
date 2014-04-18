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

    // we generate the planet
    this.planet.generate(context);
    // we generate the enemies
    // todo
    // TEST - one enemy because fuck you, that's why
    this.enemies[0] = new Enemy(30,120);
    // we generate the cities
    // todo

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

Engine.prototype.convertPosition = function(old_x) {

    var x = (this.offset + old_x) - (Math.floor((this.offset + old_x)/Planet.width)*Planet.width);
     //if (x < 0) {
     //   x = Planet.width - x;
    //}
    return x;
};

Engine.normaliseValue = function(old_x) {
    var x = old_x;
    if (old_x >= Planet.width) {
        x = old_x - Planet.width;
    } else if (-old_x >= Planet.width) {
        x = old_x + Planet.width;
    }
    return x;
}


Engine.prototype.setOffset = function(newOffset) {

	this.offset = Engine.normaliseValue(newOffset);

};

Engine.prototype.update = function() {

	// we update the player position
    this.player.updatePosition();

    // we update enemies position
    for(var i = 0;i<this.enemies.length;i++) {
        this.enemies[i].updatePosition();
    }

    // we update the camera speed
    //this.cameraSpeed = Math.round((this.cameraSpeed+this.player.getSpeed())/4);
    this.cameraSpeed = -this.player.getSpeedX();

    // we update the offset position
    if (this.cameraSpeed != 0) {
        this.setOffset(this.offset + this.cameraSpeed);
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

Engine.prototype.getEnemies = function() {
    return this.enemies;
}