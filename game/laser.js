var Laser = function(pPosX, pPosY) {
    this.posX = pPosX;
    this.posY = pPosY;
};

// fields
Laser.prototype.posX = 0;
Laser.prototype.posY = 0;
Laser.prototype.SPEEDX = -5;

// methods
Laser.prototype.update = function() {
    this.posX += this.SPEEDX;
}

//getters
Laser.prototype.getPosX = function() {
    return this.posX;
}

Laser.prototype.getPosY = function() {
    return this.posY;
}