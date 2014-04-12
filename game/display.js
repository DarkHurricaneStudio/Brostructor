var Display = function(canvas) {

	this.context = canvas.getContext('2d');
	this.height = canvas.height;
	this.width = canvas.width;
};

//attributes
Display.prototype.context;
Display.prototype.width;
Display.prototype.height;

// methods

Display.prototype.drawPlanet = function(planet) {

	var map = planet.getMap();
	for(var i = 0; i <this.width;i++) {
		var y = Utils.getPlanetCurvePosition(i,this.width,64);
		var mapPos = Math.abs(planet.getOffset()+i)%planet.getWidth();
		if ((planet.getOffset()+i) < 0) {
			mapPos = planet.getWidth()-mapPos;
		}
		this.context.putImageData(map[mapPos],i,y);
	}
};

Display.prototype.draw = function(engine) {

	this.drawPlanet(engine.getPlanet());
};