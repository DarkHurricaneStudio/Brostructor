var Explosion = function(pPosX, pPosY) {
    this.posX = pPosX;
    this.posY = pPosY;
};

// fields
Explosion.prototype.posX = 0;
Explosion.prototype.posY = 0;
Explosion.prototype.state = 0;
Explosion.prototype.frameCounter = 0;

// methods
/*
 * Return true if the explosion can be destroy
 * Otherwise, return false
 */
Explosion.prototype.update = function() {
    this.frameCounter++;
    if (this.frameCounter > EXPLOSION_FRAMES_PER_TILE) {
        this.state++;
        if (this.state == EXPLOSION_TILES) {
            // Will destroy the explosion
            return true;
        }
        this.frameCounter = 0;
    }
    return false;
}

//getters
Explosion.prototype.getPosX = function() {
    return this.posX;
}

Explosion.prototype.getPosY = function() {
    return this.posY;
}

Explosion.prototype.getGraphicState = function() {
    return this.state;
}