var Laser = function(pPosX, pPosY) {
    this.posX = pPosX;
    this.posY = pPosY;
    console.log("BRO" + pPosX + pPosY);
};

// fields
Laser.prototype.posX = 0;
Laser.prototype.posY = 0;
Laser.prototype.SPEEDY = -3;

// methods
Laser.prototype.update = function() {
    this.posY += this.SPEEDY;
}

//getters
Laser.prototype.getPosX = function() {
    return this.posX;
}

Laser.prototype.getPosY = function() {
    return this.posY;
}