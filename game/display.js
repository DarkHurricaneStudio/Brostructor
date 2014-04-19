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
	this.context.fillRect(engine.convertPosition(player.getPosX()),player.getPosY(),32,32);
}

Display.prototype.drawEnemy = function(enemy, engine) {
	this.context.fillStyle = '#00ff00';
	var x = engine.convertPosition(enemy.getPosX());
	var y = Utils.getPlanetCurvePosition(x, this.width, 64) + enemy.getPosY() + 128;
	this.context.fillRect(x,y,32,32);
}

Display.prototype.drawCity = function(city,engine) {
    this.context.fillStyle = '#0000ff';
    var x = engine.convertPosition(enemy.getPosX());
    var y = Utils.getPlanetCurvePosition(x, this.width, 64) + city.getPosY() + 128;
    this.context.fillRect(x,y,32,32);
}

Display.prototype.draw = function(engine) {
    this.drawBackground();
    this.drawPlanet(engine.getPlanet(),engine);
    this.drawPlayer(engine.getPlayer(),engine);
    for(var i = 0; i < engine.getEnemies().length;i++) {
    	this.drawEnemy(engine.getEnemies()[i],engine);
    }
}; 

Display.prototype.load = function() {
    this.imageBackground = new Image();
    this.imageBackground.src = "images/background.png";
}