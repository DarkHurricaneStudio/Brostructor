var Display = function(canvas) {

    this.context = canvas.getContext('2d');
    this.height = canvas.height;
    this.width = canvas.width;
};

//attributes
Display.prototype.context;
Display.prototype.width;
Display.prototype.height;

Display.prototype.imageBackground;

// methods



Display.prototype.drawBackground = function() {
    this.context.drawImage(this.imageBackground, 0, 0);
}

Display.prototype.drawPlanet = function(planet, engine) {

    var map = planet.getMap();
    for (var i = 0; i < this.width; i++) {
        var y = Utils.getPlanetCurvePosition(i, this.width, 64);
        var mapPos = engine.convertPosition(-i);
        this.context.putImageData(map[mapPos], i, y);
    }
};

Display.prototype.drawPlayer = function(player, engine) {
    this.context.fillStyle = '#ff0000';
    this.context.fillRect(this.context.fillRect(engine.convertPosition(player.getPosX()), player.getPosY(), 32, 32);
}

Display.prototype.drawEnemy = function(enemy, engine) {
    this.context.fillStyle = '#00ff00';
    var x = engine.convertPosition(enemy.getPosX());
    var y = Utils.getPlanetCurvePosition(x, this.width, 64) + enemy.getPosY();
    this.context.fillRect(x, y, 32, 32);

}

Display.prototype.drawCity = function(city, engine) {
    this.context.fillStyle = '#0000ff';
    var x = engine.convertPosition(city.getPosX());
    var y = Utils.getPlanetCurvePosition(x, this.width, 64) + city.getPosY();
    this.context.fillRect(x, y, 32, 32);

}

Display.prototype.drawLaser = function(laser, engine) {
    this.context.fillStyle = '#ffffff';
    //this.context.fillRect(engine.convertPosition(laser.getPosX()), laser.getPosY(), 5, 20);
    this.context.fillRect(laser.getPosX(),(Utils.getPlanetCurvePosition(laser.getPosX(),this.width,64)+laser.getPosY()), 5, 20);
}

Display.prototype.draw = function(engine) {
    this.drawBackground();
    this.drawPlanet(engine.getPlanet(), engine);
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
};


Display.prototype.load = function() {
    this.imageBackground = new Image();
    this.imageBackground.src = "images/background.png";
}
