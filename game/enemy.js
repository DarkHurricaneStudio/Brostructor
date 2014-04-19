var Enemy = function(posX, posY, kamikaze) {
    this.posX = posX;
    this.posY = posY;
    this.kamikaze = kamikaze;
    // we had a random speed
    this.speedX = Math.random() * Enemy.CONST_MAX_SPEED * 2 - Enemy.CONST_MAX_SPEED;
}

// fields
Enemy.prototype.posX = 0;
Enemy.prototype.posY = 0;
Enemy.prototype.speedX = 0;
Enemy.prototype.speedY = 0;
Enemy.prototype.kamikaze = false;
Enemy.CONST_MAX_SPEED = 3;
Enemy.CONST_RELOADING_TIME = 4; // minimum time between each shooting (in s)


// methods
Enemy.prototype.update = function() {

    this.posX = Engine.normaliseValue(this.posX + this.speedX);
    /* non normalised version :
    this.posX += this.speedX */
    this.posY += this.speedY;
}

Enemy.prototype.setSpeed = function(speedX, speedY) {
    this.speedX = speedX;
    this.speedY = speedY;
}




// getters

Enemy.prototype.getPosX = function() {
    return this.posX;
}

Enemy.prototype.getPosY = function() {
    return this.posY;
}