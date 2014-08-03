var Player = function() {};

// fields
Player.prototype.speedY = PLAYER_START_SPEED_Y;
Player.prototype.speedX = 0;
Player.prototype.posX = PLAYER_START_X; // middle of the canvas - middle of the player
Player.prototype.posY = PLAYER_START_Y; // because why not
Player.prototype.graphicState = 0; // Tile to select when the player is displayed. From -4 to 4


// methods
/**
 *
 */
Player.prototype.move = function(direction) {
    if (direction == 'right') {
        this.speedX = PLAYER_SPEED_X;
    } else if (direction == 'left') {
        this.speedX = -PLAYER_SPEED_X;
    } else {
        this.speedX = 0;
    }

    this.updateGraphicState(direction);
};

/**
 * Update the graphicState field
 * This method is intern, only called in move
 */
Player.prototype.updateGraphicState = function(direction) {
    switch (direction) {
        case "left":
            if (this.graphicState != (-1) * PLAYER_TRANSITION_FRAMES * PLAYER_FRAMES_PER_ANIMATION) {
                this.graphicState--;
            }
            break;

        case "right":
            if (this.graphicState != PLAYER_TRANSITION_FRAMES * PLAYER_FRAMES_PER_ANIMATION) {
                this.graphicState++;
            }
            break;

            // If the two direction keys are released
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

/**
 * Physical update of the player.
 * Position and speed are updated
 */
Player.prototype.update = function() {
    // Position update
    this.posX = Engine.normaliseValue(this.posX + this.speedX);
    this.posY += this.speedY;

    // Speed update because of gravity (gravity is a bitch)
    this.speedY -= PLAYER_Y_SPEED_INCRETION;
}

/**
 * Physical reset of the player.
 * Position and speed are reseted
 */
Player.prototype.resetToStart = function() {
    this.posX = PLAYER_START_X;
    this.posY = PLAYER_START_Y;
    this.speedY = PLAYER_START_SPEED_Y;
}

// Getters
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

Player.prototype.getGraphicState = function() {
    return this.graphicState;
}