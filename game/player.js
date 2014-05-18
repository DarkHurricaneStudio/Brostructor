var Player = function() {};

// fields
Player.prototype.speedY = PLAYER_START_SPEED_Y;
Player.prototype.speedX = 0;
Player.prototype.posX = PLAYER_START_X; // middle of the canvas - middle of the player
Player.prototype.posY = PLAYER_START_Y; // because why not


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
    this.speedY -= PLAYER_Y_SPEED_INCRETION;
}

Player.prototype.resetToStart = function() {
    this.posX = PLAYER_START_X;
    this.posY = PLAYER_START_Y;
    this.speedY = PLAYER_START_SPEED_Y;
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