var AudioManager = function() {

}

AudioManager.prototype.laserSound;
AudioManager.prototype.backgroundMusic;

AudioManager.prototype.load = function() {
    this.laserSound = new Audio("sounds/laser.wav");
    this.backgroundMusic = new Audio("sounds/back.mp3");
}