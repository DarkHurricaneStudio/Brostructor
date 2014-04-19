var Enemy = function(posX,posY,kamikaze) {
	this.posX = posX;
	this.posY = posY;
	this.kamikaze = kamikaze;
}

// fields
Enemy.prototype.posX = 0;
Enemy.prototype.posY = 0;
Enemy.prototype.speedX = 0;
Enemy.prototype.speedY = 0;
Enemy.prototype.kamikaze = false;
Enemy.prototype.CONST_MAX_SPEED = 4;
Enemy.prototype.CONST_RELOADING_TIME = 4; // minimum time between each shooting (in s)


// methods
Enemy.prototype.updatePosition = function() {

	this.posX = Engine.normaliseValue(this.posX+this.speedX);
	/* non normalised version :
    this.posX += this.speedX */
    this.posY+=this.speedY;
}

Enemy.prototype.setSpeed = function(speedX,speedY) {
	this.speedX = speedX;
	this.speedY = speedY;
}




// getters

Enemy.prototype.getPosX = function() {
	return this.posX;
}

Enemy.prototype.getPosY = function() {
	return this.posY;
}