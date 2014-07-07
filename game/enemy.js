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
Enemy.prototype.reloadTime = ENEMY_LASER_RECOVERY + ENEMY_LASER_RECOVERY * Math.random();
Enemy.prototype.graphicState = 0;

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
    // if this enemy is a kamikaze
    if (this.kamikaze) {
        // we update its speed
        this.speedX = Math.sqrt((this.posX - engine.getPlayer().getPosX()) * (this.posX - engine.getPlayer().getPosX())) / Math.sqrt((this.posX - engine.getPlayer().getPosX()) * (this.posX - engine.getPlayer().getPosX()) + (this.posY - engine.getPlayer().getPosY()) * (this.posY - engine.getPlayer().getPosY()));
        this.speedY = Math.sqrt((this.posY - engine.getPlayer().getPosY()) * (this.posY - engine.getPlayer().getPosY())) / Math.sqrt((this.posX - engine.getPlayer().getPosX()) * (this.posX - engine.getPlayer().getPosX()) + (this.posY - engine.getPlayer().getPosY()) * (this.posY - engine.getPlayer().getPosY()));
        // We had speed between 0 and 1. We compute to have a normal speed
        this.speedX *= ENEMY_KAMIKAZE_MAX_SPEED;
        this.speedY *= ENEMY_KAMIKAZE_MAX_SPEED;
        // we check if the enemy has to go to the right or the left
        if (this.posX > engine.getPlayer().getPosX()) {
            this.speedX = -this.speedX;
        }
        // Robrock's greatest achievment of all time : trying to correct a "feature" (it's obviously not a bug)
        if (Math.abs(this.posX - engine.getPlayer().getPosX()) > 1024) {
            this.speedX = -this.speedX;
        }
        if (this.posY > engine.getPlayer().getPosY()) {
            this.speedY = -this.speedY;
        }

    } else {
        // Now, it's time for us to shoot some invader !
        // first way
        // random shot, because we are not very good in defense (in attack either, in fact)
        if (this.reloadTime <= 0) {
            engine.addEnemyLaser(this.posX + ENEMY_WIDTH / 2, this.posY + ENEMY_HEIGHT / 2);

            // we reload
            this.reloadTime = ENEMY_LASER_RECOVERY + ENEMY_LASER_RECOVERY * Math.random();
        }
        this.reloadTime--;
    }
    var direction;
    if (this.speedX > 0) {
        direction = "right";
    } else {
        direction = "left";
    }
    this.updateGraphicState(direction);

}

Enemy.prototype.updateGraphicState = function(direction) {
    switch (direction) {
        case "left":
            if (this.graphicState != (-1) * ENEMY_TRANSITION_FRAMES * ENEMY_FRAMES_PER_ANIMATION) {
                this.graphicState--;
            }
            break;

        case "right":
            if (this.graphicState != ENEMY_TRANSITION_FRAMES * ENEMY_FRAMES_PER_ANIMATION) {
                this.graphicState++;
            }
            break;

        default:
            if (this.graphicState > 0) {
                this.graphicState--;
            } else {
                if (this.graphicState < 0) {
                    this.graphicState++;
                }
            }
            break;
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

Enemy.prototype.isKamikaze = function() {
    return this.kamikaze;
}

Enemy.prototype.getGraphicState = function() {
    return this.graphicState;
}