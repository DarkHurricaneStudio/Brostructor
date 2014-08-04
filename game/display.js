/*
 * Advanced display system
 */
var Display = function(canvas, backCanvas) {
    this.context = canvas.getContext('2d');
    this.height = canvas.height;
    this.width = canvas.width;
    this.backContext = backCanvas.getContext('2d');
};

//attributes
Display.prototype.context;
Display.prototype.backContext;
Display.prototype.width;
Display.prototype.height;

// Methods
Display.prototype.drawBackground = function() {
    this.backContext.drawImage(IMAGE_GAME_BACKGROUND, 0, 0);
}

Display.prototype.drawPlanet = function(planet, engine) {
    if (planet.getRender(PLANET_WIDTH - 1 - engine.getOffset()) == null) {
        planet.render(PLANET_WIDTH - 1 - engine.getOffset());
    }

    this.backContext.drawImage(planet.getRender(PLANET_WIDTH - 1 - engine.getOffset()), 0, 0);
};

Display.prototype.drawPlayer = function(player, engine) {
    this.context.fillStyle = '#ff0000';
    var x = engine.convertPosition(player.getPosX());
    var y = Utils.getPlanetCurvePosition(x, this.width, PLANET_DEVIATION) + player.getPosY();
    this.context.drawImage(IMAGE_BROSTRUCTOR, PLAYER_WIDTH * (Math.floor(player.getGraphicState() / PLAYER_FRAMES_PER_ANIMATION) + PLAYER_TRANSITION_FRAMES), 0, PLAYER_WIDTH, PLAYER_HEIGHT, x, y, PLAYER_WIDTH, PLAYER_HEIGHT);
}

Display.prototype.drawEnemy = function(enemy, engine) {
    if (enemy != null) {
        this.context.fillStyle = '#00ff00';
        var x = engine.convertPosition(enemy.getPosX());
        var y = Utils.getPlanetCurvePosition(x, this.width, PLANET_DEVIATION) + enemy.getPosY();

        var tmp;
        if (enemy.isKamikaze()) {
            this.context.drawImage(IMAGE_KAMIKAZE, ENEMY_WIDTH * (Math.floor(enemy.getGraphicState() / ENEMY_FRAMES_PER_ANIMATION) + ENEMY_TRANSITION_FRAMES), 0, ENEMY_WIDTH, ENEMY_HEIGHT, x, y, ENEMY_WIDTH, ENEMY_HEIGHT);
        } else {
            this.context.drawImage(IMAGE_ENEMY, ENEMY_WIDTH * (Math.floor(enemy.getGraphicState() / ENEMY_FRAMES_PER_ANIMATION) + ENEMY_TRANSITION_FRAMES), 0, ENEMY_WIDTH, ENEMY_HEIGHT, x, y, ENEMY_WIDTH, ENEMY_HEIGHT);
        }
    }
}

Display.prototype.drawCity = function(city, engine) {
    if (city != null) {
        this.context.fillStyle = '#0000ff';
        var x = engine.convertPosition(city.getPosX());
        var y = Utils.getPlanetCurvePosition(x, this.width, PLANET_DEVIATION) + city.getPosY();
        this.context.fillRect(x, y, CITY_WIDTH, CITY_HEIGHT);
    }
}

Display.prototype.drawLaser = function(laser, engine) {
    if (laser != null) {
        this.context.fillStyle = laser.getColor();
        //this.context.fillRect(engine.convertPosition(laser.getPosX()), laser.getPosY(), 5, 20);
        var x = engine.convertPosition(laser.getPosX());
        var y = Utils.getPlanetCurvePosition(x, this.width, PLANET_DEVIATION) + laser.getPosY();
        this.context.fillRect(x, y, LASER_WIDTH, LASER_HEIGHT);
    }
}

Display.prototype.drawExplosion = function(explosion, engine) {
    if (explosion != null) {
        var x = engine.convertPosition(explosion.getPosX());
        var y = Utils.getPlanetCurvePosition(x, this.width, PLANET_DEVIATION) + explosion.getPosY();
        this.context.drawImage(IMAGE_EXPLOSION, EXPLOSION_WIDTH * explosion.getGraphicState(), 0, EXPLOSION_WIDTH, EXPLOSION_HEIGHT, x, y, EXPLOSION_WIDTH, EXPLOSION_HEIGHT);
    }
}

Display.prototype.drawHUD = function(engine) {
    this.context.drawImage(IMAGE_HUD, 0, 0);

    this.context.font = "20px Arial";
    this.context.fillStyle = "#FFFFFF";
    this.context.fillText("Points : " + engine.getPoints(), 10, 645);
}

Display.prototype.drawLoadingScreen = function() {
    this.context.font = "30px Arial";
    this.context.fillStyle = "#FFFFFF";
    this.context.fillText("Loading...", CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2);
}

/**
 * Dedicated draw method for ingame state
 */
Display.prototype.draw = function(engine) {
    if (!engine.isLoadingLevel()) {
        // we only draw the planet if there is a movement
        if (engine.cameraSpeed != 0 || engine.getOffset() == 0) {
            this.drawPlanet(engine.getPlanet(), engine);
        }
        this.drawPlayer(engine.getPlayer(), engine);
        for (var i = 0; i < engine.getEnemies().length; i++) {
            this.drawEnemy(engine.getEnemies()[i], engine);
        }
        for (var i = 0; i < engine.getCities().length; i++) {
            this.drawCity(engine.getCities()[i], engine);
        }
        for (var i = engine.getLasers().length - 1; i >= 0; i--) {
            this.drawLaser(engine.getLasers()[i], engine);
        };
        for (var i = 0; i < engine.getEnemiesLasers().length; i++) {
            this.drawLaser(engine.getEnemiesLasers()[i], engine);
        }
        for (var i = 0; i < engine.getExplosions().length; i++) {
            this.drawExplosion(engine.getExplosions()[i], engine);
        }
        this.drawHUD(engine);
    } else {
        this.drawLoadingScreen();
    }
};