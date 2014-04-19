var Player = function() {};

// fields
Player.prototype.speedY = -0.01;
Player.prototype.CONST_SPEED_X = 3;
Player.prototype.speedX = 0;
Player.prototype.posX = 512 / 2 - 32 / 2; // middle of the canvas - middle of the player
Player.prototype.posY = 600; // because why not
Player.prototype.laserRecovery = 30;
Player.prototype.lasers = new Array();


// methods
Player.prototype.move = function(direction) {
    if (direction == 'right') {
        this.speedX = this.CONST_SPEED_X;
    } else if (direction == 'left') {
        this.speedX = -this.CONST_SPEED_X;
    } else {
        this.speedX = 0;
    }

};

Player.prototype.update = function() {
    this.posX = Engine.normaliseValue(this.posX + this.speedX);
    this.posY += this.speedY;
    /* non normalised version :
    this.posX += this.speedX */
    // we update Y speed because of gravity (gravity is a bitch)
    this.speedY -= 0.0001;

    if (this.laserRecovery > 0) {
        this.laserRecovery--;
    }
}


//getters
Player.prototype.getSpeedX = function() {
    return this.speedX;
};


Player.prototype.getPosX = function() {
    return this.posX;
}

Player.prototype.getPosY = function() {
    return this.posY;
}

Player.prototype.shoot = function() {
    if (this.laserRecovery == 0) {
        this.lasers[0] = new Laser(this.posX, this.posY);
    }
}