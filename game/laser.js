var Laser = function(pPosX, pPosY, shotByPlayer) {
    this.posX = pPosX;
    this.posY = pPosY;
    // we define a totally random color
    this.color = "#";
    var r = Math.floor(205 + Math.random() * 50);
    var g = Math.floor(205 + Math.random() * 50);
    var b = Math.floor(205 + Math.random() * 50);
    this.color += r + g + b;

    if (shotByPlayer) {
        this.SPEEDY = -this.SPEEDY;
    }

    audioManager.laserSound.play();

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