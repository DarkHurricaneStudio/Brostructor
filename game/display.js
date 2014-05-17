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

// methods



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
    this.context.fillRect(engine.convertPosition(player.getPosX()), player.getPosY(), PLAYER_WIDTH, PLAYER_HEIGHT);
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

Display.prototype.drawHUD = function(engine) {
    this.context.drawImage(this.HUD, 0, 0);

    this.context.font = "20px Arial";
    this.context.fillStyle = "#FFFFFF";
    this.context.fillText("Points : " + engine.getPoints(), 10, 645);
}

Display.prototype.draw = function(engine) {

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
    this.drawHUD(engine);

};


Display.prototype.load = function() {
    this.imageBackground = new Image();
    this.imageBackground.src = "images/background.png";
    this.HUD = new Image();
    this.HUD.src = "images/HUD.png";
    // once the background is loaded, we display it and the planet
    this.imageBackground.onload = function() {
        display.drawBackground();
        display.drawPlanet(planet, engine);
    }
}