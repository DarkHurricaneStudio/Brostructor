var Enemy = function(posX, posY, kamikaze) {
    this.posX = posX;
    this.posY = posY;
    this.kamikaze = kamikaze;
    // we had a random speed
    this.speedX = Math.random() * ENEMY_MAX_SPEED * 2 - ENEMY_MAX_SPEED;
}

// fields
Enemy.prototype.posX = 0;
Enemy.prototype.posY = 0;
Enemy.prototype.speedX = 0;
Enemy.prototype.speedY = 0;
Enemy.prototype.kamikaze = false;
Enemy.CONST_RELOADING_TIME = 4; // minimum time between each shooting (in s)


// methods
Enemy.prototype.update = function(engine) {
    this.updateAI(engine);
    this.updatePos();
}

Enemy.prototype.updatePos = function() {
    this.posX = Engine.normaliseValue(this.posX + this.speedX);
    /* non normalised version :
    this.posX += this.speedX */
    this.posY += this.speedY;
}

Enemy.prototype.updateAI = function(engine) {
    if (this.kamikaze) {
        this.speedX = Math.sqrt((this.posX - engine.getPlayer().getPosX()) * (this.posX - engine.getPlayer().getPosX())) / Math.sqrt((this.posX - engine.getPlayer().getPosX()) * (this.posX - engine.getPlayer().getPosX()) + (this.posY - engine.getPlayer().getPosY()) * (this.posY - engine.getPlayer().getPosY()));
        this.speedY = Math.sqrt((this.posY - engine.getPlayer().getPosY()) * (this.posY - engine.getPlayer().getPosY())) / Math.sqrt((this.posX - engine.getPlayer().getPosX()) * (this.posX - engine.getPlayer().getPosX()) + (this.posY - engine.getPlayer().getPosY()) * (this.posY - engine.getPlayer().getPosY()));
        this.speedX *= ENEMY_MAX_SPEED;
        this.speedY *= ENEMY_MAX_SPEED;
        if (this.posX > engine.getPlayer().getPosX()) {
            this.speedX = -this.speedX;
        }
        if (this.posY > engine.getPlayer().getPosY()) {
            this.speedY = -this.speedY;
        }
    }

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