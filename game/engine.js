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
// @var level the number of the level
Engine.prototype.level = 1;


Engine.prototype.laserCount = 0;
Engine.prototype.LASERMAX = 5;
Engine.prototype.laserRecovery = 0;
Engine.prototype.RECOVERY = 40;
Engine.prototype.lasers = new Array();
// methods
Engine.prototype.generateLevel = function(context) {

    // we generate the planet
    this.planet.generate(context);
    // we generate the enemies
    // todo
    // TEST - one enemy because fuck you, that's why
    this.spawnEnemies();
    // we generate the cities
    this.spawnCities();

};

Engine.prototype.spawnEnemies = function() {
    // we have  5 levels of height where the enemies can spawn
    // each is espaced with 20px
    this.enemies = new Array();
    var height = 128 + 30; //
    for (var i = 5; i > 0; i--) {
        var number = Math.ceil(this.level * i * 0.6);
        for (var j = 0; j < number; j++) {
            this.enemies[this.enemies.length] = new Enemy(Math.random() * Planet.width, height, false);
        }
        height += 32 + 25;
    }

}

Engine.prototype.spawnCities = function() {
    this.cities = new Array();
    // there is as many cities as the level number
    for (var i = 1; i <= this.level; i++) {
        var x = Math.floor(Math.random() * Planet.width);
        this.cities[i - 1] = new City(x, 40);
    }
}

Engine.prototype.checkInputs = function(inputs) {

    // we check the movements
    if (inputs[37] == true) { // left arrow
        this.player.move('left');
    } else if (inputs[39] == true) { // right arrow
        this.player.move('right');
    } else {
        this.player.move('none');
    }

    if (inputs[32] == true) { // space
        this.createLaser();
    }
}



Engine.prototype.convertPosition = function(old_x) {

    var x = (this.offset + old_x) - (Math.floor((this.offset + old_x) / Planet.width) * Planet.width);

    return x;
};

Engine.normaliseValue = function(old_x) {

    var x = old_x - (Math.floor(old_x / Planet.width) * Planet.width);

    return x;
}


Engine.prototype.setOffset = function(newOffset) {

    this.offset = Engine.normaliseValue(newOffset);

};

Engine.prototype.update = function() {

    // we update the player position
    this.player.update();

    // we update enemies position
    for (var i = 0; i < this.enemies.length; i++) {
        if (this.enemies[i] != null) {
            this.enemies[i].update();
        }
    }

    // we update the camera speed
    //this.cameraSpeed = Math.round((this.cameraSpeed+this.player.getSpeed())/4);
    this.cameraSpeed = -this.player.getSpeedX();

    // we update the offset position
    if (this.cameraSpeed != 0) {
        this.setOffset(this.offset + this.cameraSpeed);
    }


    // we update lasers
    if (this.laserRecovery > 0) {
        this.laserRecovery--;
    }

    for (var i = this.lasers.length - 1; i >= 0; i--) {
        if (this.lasers[i] != null) {
            this.lasers[i].update();
            // If the laser is off the screen, we delete it
            if (this.lasers[i].getPosY() + 32 < 0) {
                this.lasers[i] = null;
                console.log("DETRUIT");
            }
        }
    }


    // We check the collisions
    this.checkCollisions();
};

Engine.prototype.createLaser = function() {
    if (this.laserRecovery == 0) {
        this.lasers[this.laserCount] = new Laser(this.getPlayer().getPosX(), this.getPlayer().getPosY());
        if (this.laserCount == this.LASERAMX) {
            this.laserCount = 0;
        } else {
            this.laserCount++;
        }
        this.laserRecovery = this.RECOVERY;
    }
}

Engine.prototype.checkCollisions = function() {
    for (var i = this.enemies.length - 1; i >= 0; i--) {
        if (this.enemies[i] != null) { // useless ?
            for (var j = this.lasers.length - 1; j >= 0; j--) {
                if (this.lasers[j] != null && this.lasers[j].getPosY() < this.enemies[i].getPosY() + 32 && this.lasers[j].getPosY() > this.enemies[i].getPosY() && this.enemies[i].getPosX() > this.lasers[j].getPosX() && this.enemies[i].getPosX() < this.lasers[j].getPosX() + 32) {
                    console.log("Laser : " + this.lasers[j].getPosX() + ";" + this.lasers[j].getPosY() + "    Ennemi : " + this.enemies[i].getPosX() + ";" + this.enemies[i].getPosY());
                    this.lasers[j] = null;
                    this.enemies[i] = null;
                    // TODO EXPLOSION

                    break;
                }

            };
        }
    };
}

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

Engine.prototype.getCities = function() {
    return this.cities;
}

Engine.prototype.getLasers = function() {
    return this.lasers;
}