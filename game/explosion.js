var Explosion = function(pPosX, pPosY) {
    this.posX = pPosX;
    this.posY = pPosY;
};

// fields
Explosion.prototype.posX = 0;
Explosion.prototype.posY = 0;

// methods
/*
 * Return true if the explosion can be destroy
 * Otherwise, return false
 */
Laser.prototype.update = function() {
    return false;

    //getters
    Explosion.prototype.getPosX = function() {
        return this.posX;
    }

    Explosion.prototype.getPosY = function() {
        return this.posY;
    }