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
// @var explosions an array of explosions
Engine.prototype.explosions = new Array();
// @var cities an array of the cities
Engine.prototype.cities = new Array();
// @var player the player
Engine.prototype.player = new Player();
// @var level the number of the level
Engine.prototype.level = 0;


//
Engine.prototype.enemiesLasers = new Array();
// @var loadingLevel true if the level is generating, false if not
Engine.prototype.loadingLevel = true;

// Lasers
Engine.prototype.laserCount = 0;
Engine.prototype.laserRecovery = 0;
Engine.prototype.lasers = new Array();

// points
Engine.prototype.points = 0;

//fps counter
Engine.prototype.initDate = new Date().getTime();
Engine.prototype.fpsCount = 0;


// methods
Engine.prototype.generateLevel = function() {
    this.loadingLevel = true;
    this.level++;
    // we generate the planet
    this.planet.generate();
    // we generate the enemies
    // todo
    // TEST - one enemy because fuck you, that's why
    this.spawnEnemies();
    // we generate the cities
    this.spawnCities();
    this.player.resetToStart();
    this.offset = 0;
    this.lasers = new Array();
    this.enemiesLasers = new Array();
    this.loadingLevel = false;

};

Engine.prototype.spawnEnemies = function() {
    // we have  5 levels of height where the enemies can spawn
    // each is espaced with 20px
    this.enemies = new Array();
    var height = SPAWN_ENEMY_HEIGHT;
    for (var i = SPAWN_ENEMY_LAYERS_NUMBER; i > 0; i--) {
        var number = Math.ceil(this.level * i * SPAWN_ENEMY_LAYER_PERSISTANCE);
        for (var j = 0; j < number; j++) {
            var kamikaze = (Math.random() <= ENEMY_KAMIKAZE_PERCENTAGE);
            this.enemies[this.enemies.length] = new Enemy(Math.random() * PLANET_WIDTH, height, kamikaze);
        }
        height += SPAWN_ENEMY_LAYER_HEIGHT;
    }

}

Engine.prototype.spawnCities = function() {
    this.cities = new Array();
    // there is as many cities as the level number
    for (var i = 1; i <= this.level; i++) {
        var x = Math.floor(Math.random() * PLANET_WIDTH);
        this.cities[i - 1] = new City(x, CITY_POS_Y);
    }
}





Engine.prototype.convertPosition = function(old_x) {

    var x = (this.offset + old_x) - (Math.floor((this.offset + old_x) / PLANET_WIDTH) * PLANET_WIDTH);

    return x;
};

Engine.normaliseValue = function(old_x) {

    var x = old_x - (Math.floor(old_x / PLANET_WIDTH) * PLANET_WIDTH);

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
            this.enemies[i].update(this);
        }
    }

    // we update the camera speed

    if (this.player.getSpeedX() != 0) {

        this.cameraSpeed = this.cameraSpeed - this.player.getSpeedX() / 32;
        if (Math.abs(this.cameraSpeed) >= PLAYER_SPEED_X) {
            this.cameraSpeed = -this.player.getSpeedX();
        }

    }
    if (this.convertPosition(this.player.getPosX()) != PLAYER_MIDDLE_POSITION || this.cameraSpeed != 0) { // we decrease speed until we meet the center of the screen

        this.cameraSpeed = -(this.convertPosition(this.player.getPosX()) - PLAYER_MIDDLE_POSITION) / 32;

    } else {
        this.cameraSpeed = 0;

    }


    // we update the offset position
    if (this.cameraSpeed != 0) {
        this.setOffset(this.offset + Math.round(this.cameraSpeed));
    }


    // we update lasers
    if (this.laserRecovery > 0) {
        this.laserRecovery--;
    }

    for (var i = this.lasers.length - 1; i >= 0; i--) {
        if (this.lasers[i] != null) {
            this.lasers[i].update();
            // If the laser is off the screen, we delete it
            if (this.lasers[i].getPosY() + LASER_HEIGHT < 0) {
                this.lasers[i] = null;
            }
        }
    }

    for (var i = this.enemiesLasers.length - 1; i >= 0; i--) {
        if (this.enemiesLasers[i] != null) {
            this.enemiesLasers[i].update();
            // If the laser is off the screen, we delete it
            if (this.enemiesLasers[i].getPosY() + LASER_HEIGHT < 0) {
                this.enemiesLasers[i] = null;
            }
        }
    }

    // We update explosions
    for (var i = this.explosions.length - 1; i >= 0; i--) {
        if (this.explosions[i] != null && this.explosions[i].update()) {
            this.explosions[i] = null;
        }

    };

    // We check the collisions
    this.checkEnemyLaserCollisions();
    this.checkCityLaserCollisions();
    this.checkPlayerEnemyCollisions();
    this.checkPlayerLaserCollisions();

    if (this.loadingLevel) {
        this.generateLevel();
    }

    if (this.player.getPosY() <= PLAYER_Y_NEXT_LEVEL) {
        this.points += POINTS_PLANET;
        this.loadingLevel = true;
    }
};

Engine.prototype.createLaser = function() {
    if (this.laserRecovery == 0) {
        this.lasers[this.laserCount] = new Laser(this.getPlayer().getPosX() + PLAYER_WIDTH / 2, this.getPlayer().getPosY() + PLAYER_HEIGHT / 2, true);
        if (this.laserCount == PLAYER_MAX_LASERS) {
            this.laserCount = 0;
        } else {
            this.laserCount++;
        }
        this.laserRecovery = PLAYER_LASER_RECOVERY;
    }
}

Engine.prototype.addEnemyLaser = function(posX, posY) {
    this.enemiesLasers[this.enemiesLasers.length] = new Laser(posX, posY, false);
}

Engine.prototype.checkEnemyLaserCollisions = function() {
    for (var i = this.enemies.length - 1; i >= 0; i--) {
        if (this.enemies[i] != null) { // useless ?
            for (var j = this.lasers.length - 1; j >= 0; j--) {
                if (this.lasers[j] != null && this.lasers[j].getPosY() < this.enemies[i].getPosY() + ENEMY_HEIGHT && this.lasers[j].getPosY() + LASER_HEIGHT > this.enemies[i].getPosY() && this.lasers[j].getPosX() + LASER_WIDTH > this.enemies[i].getPosX() && this.lasers[j].getPosX() < this.enemies[i].getPosX() + ENEMY_WIDTH) {
                    this.lasers[j] = null;

                    if (this.enemies[i].isKamikaze()) {
                        this.points += POINTS_KAMIKAZE;
                    } else {
                        this.points += POINTS_ENEMY;
                    }

                    this.explosions.push(new Explosion(this.enemies[i].getPosX(), this.enemies[i].getPosY()));
                    this.enemies[i] = null;
                    break;
                }

            };
        }
    };
}

Engine.prototype.checkCityLaserCollisions = function() {
    for (var i = this.cities.length - 1; i >= 0; i--) {
        if (this.cities[i] != null) { // useless ?
            for (var j = this.lasers.length - 1; j >= 0; j--) {
                if (this.lasers[j] != null && this.lasers[j].getPosY() < this.cities[i].getPosY() + CITY_HEIGHT && this.lasers[j].getPosY() + LASER_HEIGHT > this.cities[i].getPosY() && this.lasers[j].getPosX() + LASER_WIDTH > this.cities[i].getPosX() && this.lasers[j].getPosX() < this.cities[i].getPosX() + CITY_WIDTH) {
                    this.lasers[j] = null;
                    this.cities[i].getHit();
                    if (this.cities[i].isDead()) {
                        this.points += POINTS_CITY;
                        this.cities[i] = null;
                    }
                    this.explosions.push(new Explosion(this.cities[i].getPosX(), this.cities[i].getPosY()));
                    break;
                }

            };
        }
    };
}

Engine.prototype.checkPlayerEnemyCollisions = function() {

    // we decide hat player and enemy are circle with a radius of 32/2 = 16
    // if the distance between the center of the player and the center of the enemy is lower than 32 (16 +16), bim ! Else, not bim (for the moment :D)
    var minimumRadius = PLAYER_WIDTH / 2 + ENEMY_WIDTH / 2;
    var playerXCenter = this.player.getPosX() + PLAYER_WIDTH / 2;
    var playerYCenter = this.player.getPosY() + PLAYER_HEIGHT / 2;

    for (var i = 0; i < this.enemies.length; i++) {

        if (this.enemies[i] != null) {
            var enemyXCenter = this.enemies[i].getPosX() + ENEMY_WIDTH / 2;
            var enemyYCenter = this.enemies[i].getPosY() + ENEMY_HEIGHT / 2;

            if (Math.sqrt((playerXCenter - enemyXCenter) * (playerXCenter - enemyXCenter) + (playerYCenter - enemyYCenter) * (playerYCenter - enemyYCenter)) <= minimumRadius) {
                // oups, we are dead !
                this.explosions.push(new Explosion(this.player.getPosX(), this.player.getPosY()));
                console.log("hit by laser");
                this.endGame();
                break;
            }
        }
    }
}

Engine.prototype.checkPlayerLaserCollisions = function() {
    for (var i = 0; i < this.enemiesLasers.length; i++) {
        if (this.enemiesLasers[i] != null) {
            if (this.enemiesLasers[i].getPosY() + LASER_HEIGHT > this.player.getPosY() && this.enemiesLasers[i].getPosY() < this.player.getPosY() + PLAYER_HEIGHT && this.enemiesLasers[i].getPosX() + LASER_WIDTH > this.player.getPosX() && this.enemiesLasers[i].getPosX() < this.player.getPosX() + PLAYER_WIDTH) {
                this.enemiesLasers[i] = null;
                this.explosions.push(new Explosion(this.player.getPosX(), this.player.getPosY()));
                console.log("hit by some japanese people");
                this.endGame();
                break;
            }
        }
    }
};

Engine.prototype.endGame = function() {
    Game.stop();
}

Engine.prototype.nextlevel = function() {
    this.level++;
    this.generateLevel();
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

Engine.prototype.getEnemiesLasers = function() {
    return this.enemiesLasers;
}

Engine.prototype.getPoints = function() {
    return this.points;
}

Engine.prototype.isLoadingLevel = function() {
    return this.loadingLevel;
}

Engine.prototype.getExplosions = function() {
    return this.explosions;
}