var Laser = function(pPosX, pPosY) {
    this.posX = pPosX;
    this.posY = pPosY;
};

// fields
Laser.prototype.posX = 0;
Laser.prototype.posY = 0;
Laser.prototype.SPEEDX = -5;

// methods
Player.prototype.update = function() {

}


//getters
Player.prototype.getPosX = function() {
    return this.posX;
}

Player.prototype.getPosY = function() {
    return this.posY;
}