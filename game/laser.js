var Laser = function(pPosX, pPosY, shotByPlayer) {
    this.posX = pPosX;
    this.posY = pPosY;
    // we define a totally random color
    this.color = "#";
    var r, g, b;

    switch (NB_LASERS % 3) {
        case 0:
            r = Math.floor(255).toString(16);
            g = Math.floor(55 + Math.random() * 200).toString(16);
            b = Math.floor(55 + Math.random() * 200).toString(16);
            break;
        case 1:
            r = Math.floor(55 + Math.random() * 200).toString(16);
            g = Math.floor(255).toString(16);
            b = Math.floor(55 + Math.random() * 200).toString(16);
            break;
        case 2:
            r = Math.floor(55 + Math.random() * 200).toString(16);
            g = Math.floor(55 + Math.random() * 200).toString(16);
            b = Math.floor(255).toString(16);
            break;
        default:
            console.log("Erreur");
            r = Math.floor(55 + Math.random() * 200).toString(16);
            g = Math.floor(55 + Math.random() * 200).toString(16);
            b = Math.floor(55 + Math.random() * 200).toString(16);
    }

    NB_LASERS++;
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

var NB_LASERS = 1;

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