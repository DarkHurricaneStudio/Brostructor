var City = function(posX,posY) {
	this.posX = posX;
	this.posY = posY;
}

City.prototype.posX = 0;
City.prototype.posY = 0;
City.prototype.life = 5;
City.CONS_RELOADING_TIME = 2; // minimum time between each shooting (in s)

City.getHit = function() {
	if (this.life > 0)
		this.ife-=1;
}

City.isDead = function() {
	return (this.life <= 0);
}