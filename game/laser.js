var Laser = function(pPosX, pPosY) {
    this.posX = pPosX;
    this.posY = pPosY;
    // we define a totally random color
    this.color = "#";
    var r = Math.floor(Math.random() * 255);
    var g = Math.floor(Math.random() * 255);
    var b = Math.floor(Math.random() * 255);
    this.color += r + g + b;
};

// fields
Laser.prototype.posX = 0;
Laser.prototype.posY = 0;
Laser.prototype.color = "";
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

Laser.prototype.getColor = function() {
    return this.color;
}