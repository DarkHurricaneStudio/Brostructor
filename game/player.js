var Player = function() {};

// fields
Player.prototype.speedY = -0.01;
Player.prototype.CONST_SPEED_X = 3;
Player.prototype.speedX = 0;
Player.prototype.posX = 512/2-32/2; // middle of the canvas - middle of the player
Player.prototype.posY = 600; // because why not


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

Player.prototype.updatePosition = function() {
	//this.posY = Engine.normaliseValue(this.posY+this.speedY);
    //this.posX = Engine.normaliseValue(this.posX+this.speedX);
    this.posX+=this.speedX;
    this.posY+=this.speedY;
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