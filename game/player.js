var Player = function() {};

// fields
Player.prototype.speedY = -0.01;
Player.prototype.speedX = 0;
Player.prototype.posX = 512 / 2 - 32 / 2; // middle of the canvas - middle of the player
Player.prototype.posY = 550; // because why not


// methods
Player.prototype.move = function(direction) {
    if (direction == 'right') {
        this.speedX = PLAYER_SPEED_X;
    } else if (direction == 'left') {
        this.speedX = -PLAYER_SPEED_X;
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

Player.prototype.getLasers = function() {
    return this.lasers;
}
