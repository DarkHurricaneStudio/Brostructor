var PLANET_WIDTH = 2048;
var PLANET_HEIGHT = 128;
var PLANET_MAX_HEIGHT = 80;
var PLANET_PERSISTANCE = 0.5;
var PLANET_OCTAVES_NUMBER = 4;
var PLANET_STEP = 64;

var PLAYER_WIDTH = 32;
var PLAYER_HEIGHT = 32;
var PLAYER_SPEED_X = 3;
var PLAYER_START_X = 240;
var PLAYER_START_Y = 550;
var PLAYER_START_SPEED_Y = -0.01;
var PLAYER_Y_SPEED_INCRETION = 0.0001;
var PLAYER_MAX_LASERS = 5;
var PLAYER_LASER_RECOVERY = 40;
var PLAYER_Y_NEXT_LEVEL = 40;
var PLAYER_TRANSITION_FRAMES = 4;
var PLAYER_FRAMES_PER_ANIMATION = 3;
var PLAYER_MIDDLE_POSITION = 240;

var LASER_WIDTH = 5;
var LASER_HEIGHT = 20;
var LASER_SPEED = 3;

var ENEMY_WIDTH = 32;
var ENEMY_HEIGHT = 32;
var ENEMY_KAMIKAZE_PERCENTAGE = 0.1; // 10% of enemies are kamikazes
var ENEMY_MAX_SPEED = 2;
var ENEMY_KAMIKAZE_MAX_SPEED = 1.5;
var ENEMY_LASER_RECOVERY = 80;
var ENEMY_TRANSITION_FRAMES = 4;
var ENEMY_FRAMES_PER_ANIMATION = 3;

var CITY_POS_Y = 40;
var CITY_WIDTH = 20;
var CITY_HEIGHT = 20;
var CITY_MAX_LIFE = 5;

var PLANET_DEVIATION = 64;

var SPAWN_ENEMY_HEIGHT = PLANET_HEIGHT + 32;
var SPAWN_ENEMY_LAYERS_NUMBER = 5;
var SPAWN_ENEMY_LAYER_PERSISTANCE = 0.6;
var SPAWN_ENEMY_LAYER_HEIGHT = ENEMY_HEIGHT + 25;

var KEY_LEFT = 37;
var KEY_RIGHT = 39;
var KEY_SPACE = 32;
var KEY_ESCAPE = 27;

var POINTS_ENEMY = 100;
var POINTS_KAMIKAZE = 150;
var POINTS_CITY = 500;
var POINTS_PLANET = 5000;

var CANVAS_WIDTH = 480;
var CANVAS_HEIGHT = 666;

var EXPLOSION_WIDTH = 32;
var EXPLOSION_HEIGHT = 32;
var EXPLOSION_TILES = 10;
var EXPLOSION_FRAMES_PER_TILE = 3;

var MAIN_STATE_LOADING_GAME = 0;
var MAIN_STATE_DHS_LOGO_TRANSITION = 1;
var MAIN_STATE_DHS_LOGO_TRANSITION_TIMER = 500;
var MAIN_STATE_MAIN_MENU = 2;
var MAIN_STATE_INGAME = 3;
var MAIN_STATE_DEATH_TRANSITION = 4;
var MAIN_STATE_DEATH_MENU = 5;