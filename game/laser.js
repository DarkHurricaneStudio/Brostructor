var Laser = function(pPosX, pPosY, shotByPlayer) {
    this.posX = pPosX;
    this.posY = pPosY;
    // we define a totally random color
    this.color = "#";
    var r = Math.floor(100 + Math.random() * 155);
    var g = Math.floor(100 + Math.random() * 155);
    var b = Math.floor(100 + Math.random() * 155);
    this.color += r + g + b;

    if (shotByPlayer) {
        this.SPEEDY = -this.SPEEDY;
    }
};

// fields
Laser.prototype.posX = 0;
Laser.prototype.posY = 0;
Laser.prototype.color = "";
Laser.prototype.SPEEDY = LASER_SPEED;

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