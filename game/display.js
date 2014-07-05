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

Display.prototype.imageBackground;
Display.prototype.HUD;
Display.prototype.explosionTiles;
Display.prototype.playerTiles;

// Methods
Display.prototype.drawBackground = function() {
    this.backContext.drawImage(this.imageBackground, 0, 0);
}

Display.prototype.drawPlanet = function(planet, engine) {
    /*
    var map = planet.getMap();

    for (var i = 0; i < this.width; i++) {
        var y = Utils.getPlanetCurvePosition(i, this.width, PLANET_DEVIATION);
        var mapPos = engine.convertPosition(-i);
        this.backContext.drawImage(map, mapPos, 0, 1, PLANET_HEIGHT, i, y, 1, PLANET_HEIGHT);

    }
    */
    if (planet.getRender(PLANET_WIDTH - 1 - engine.getOffset()) == null) {
        planet.render(PLANET_WIDTH - 1 - engine.getOffset());
    }

    this.backContext.drawImage(planet.getRender(PLANET_WIDTH - 1 - engine.getOffset()), 0, 0);
};

Display.prototype.drawPlayer = function(player, engine) {
    this.context.fillStyle = '#ff0000';
    var x = engine.convertPosition(player.getPosX());
    var y = Utils.getPlanetCurvePosition(x, this.width, PLANET_DEVIATION) + player.getPosY();
    this.context.drawImage(this.playerTiles, PLAYER_WIDTH * (player.getGraphicState()/PLAYER_FRAMES_PER_ANIMATION+PLAYER_TRANSITION_FRAMES), 0, PLAYER_WIDTH, PLAYER_HEIGHT, x, y, PLAYER_WIDTH, PLAYER_HEIGHT);
}

Display.prototype.drawEnemy = function(enemy, engine) {
    if (enemy != null) {
        this.context.fillStyle = '#00ff00';
        var x = engine.convertPosition(enemy.getPosX());
        var y = Utils.getPlanetCurvePosition(x, this.width, PLANET_DEVIATION) + enemy.getPosY();
        this.context.fillRect(x, y, ENEMY_WIDTH, ENEMY_HEIGHT);
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
        this.context.drawImage(this.explosionTiles, EXPLOSION_WIDTH * explosion.getGraphicState(), 0, EXPLOSION_WIDTH, EXPLOSION_HEIGHT, x, y, EXPLOSION_WIDTH, EXPLOSION_HEIGHT);
    }
}

Display.prototype.drawHUD = function(engine) {
    this.context.drawImage(this.HUD, 0, 0);

    this.context.font = "20px Arial";
    this.context.fillStyle = "#FFFFFF";
    this.context.fillText("Points : " + engine.getPoints(), 10, 645);
}

Display.prototype.drawLoadingScreen = function() {
    this.context.font = "30px Arial";
    this.context.fillStyle = "#FFFFFF";
    this.context.fillText("Loading...", CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2);
}

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


Display.prototype.load = function() {
    this.imageBackground = new Image();
    this.imageBackground.src = "images/background.png";

    this.HUD = new Image();
    this.HUD.src = "images/HUD.png";

    this.explosionTiles = new Image();
    this.explosionTiles.src = "images/explosion.png";

    this.playerTiles = new Image();
    this.playerTiles.src = "images/brostructor.png";

    // once the background is loaded, we display it and the planet
    this.imageBackground.onload = function() {
        display.drawBackground();
    }
}