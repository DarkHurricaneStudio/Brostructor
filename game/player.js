var Player = function () {};

// attributes
Player.prototype.speedY = 0;
Player.prototype.CONST_SPEED_Y = 2;
Player.prototype.CONST_SPEED_X = 0.1;

// methods
Player.prototype.move = function (direction) {

	if (direction == 'right') {
		this.speedY = this.CONST_SPEED_Y;
	} else if (direction == 'left') {
		this.speedY = -this.CONST_SPEED_Y;
	} else {
		this.speedY = 0;
	}

};

//getters
Player.prototype.getSpeedY = function() {
	return this.speedY;
};