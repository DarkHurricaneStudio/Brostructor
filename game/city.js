var City = function(posX, posY) {
    this.posX = posX;
    this.posY = posY;
}

City.prototype.posX = 0;
City.prototype.posY = 0;
City.prototype.life = CITY_MAX_LIFE;

City.prototype.getHit = function() {
    if (this.life > 0)
        this.life -= 1;
}

City.prototype.isDead = function() {
    return (this.life <= 0);
}

City.prototype.getPosX = function() {
    return this.posX;
}

City.prototype.getPosY = function() {
    return this.posY;
}