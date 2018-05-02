console.log(document.referrer);
var SCREENWIDTH = $(window).width();;
var SCREENHEIGHT = $(window).height();;

var config = {
    type: Phaser.AUTO,
    width: SCREENWIDTH,
    height: SCREENHEIGHT,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 }
        }
    },
    // scene: [cutscene, main, levelComplete, 
    //     ui, playerStats, gameOver,
    //     rock, healthDrop, featherDrop, levelStats]
    scene: [startScreen, main, levelComplete, 
        ui, playerStats, gameOver,
        rock, healthDrop, featherDrop, levelStats, cutscene, continueScreen]
};
if(document.referrer.toUpperCase() == (window.location.origin.toUpperCase() + "/CANOE_GAME/AR.HTML")){
    console.log("came from AR.html");
    //preserve the local storage and increment level
    config.scene= [main, startScreen, levelComplete, 
        ui, playerStats, gameOver,
        rock, healthDrop, featherDrop, levelStats, cutscene, continueScreen]
    

}
//if another page sent you here. i.e. a link, or you typed it in.
else{
    //ask if the user wants to continue their adveture from last time, or if they would like to restart.
    config.scene= [startScreen, main, levelComplete, 
        ui, playerStats, gameOver,
        rock, healthDrop, featherDrop, levelStats, cutscene, continueScreen]

}

var game = new Phaser.Game(config, 'gameDiv');
var MAIN, UI, PLAYERSTATS, GAMEOVER, ROCK, 
    HEALTHDROP, FEATHERDROP, LEVELSTATS, CUTSCENE, CONTINUESCREEN, STARTSCREEN;

var player;
var baseHealth = 3;
var baseSpeed = 6;
var askContinue= false;

var pStats = {
    "hp": baseHealth,
    "score": 0,
    "speed": baseSpeed
};


//7000
var levels = [new levelStats(0, 6, 800, 1200, 5,  5000), 
              new levelStats(1, 8, 600, 1000, 8,  5000),
              new levelStats(2, 10, 500, 800, 12, 5000)]



var currentLvl;
var lvlMax = 2;

var featherGoal; 

var bgImgFileNames = ['riverBG', 'riverBG', 'riverBG'];
var musicFileNames = ['game song main loop', 'game song main loop', 'game song main loop']
var prizeNames = ['Beaver Head', 'Beaver Torso', 'Beaver Tail']
var prizeImages = ['beaver1', 'beaver2', 'beaver3']

//JSON object that is stored in local storage so you can keep data between page loads i.e. AR.html and index.html

function getGameJSONdata(){
    if(localStorage["gameJSONdata"]==null){
        var newGameJSONdata = {
            "level": -1,
            "continueState": 0
        }
        console.log("set JSON");
        localStorage.setItem("gameJSONdata", JSON.stringify(newGameJSONdata));
    }
    return JSON.parse(localStorage.getItem("gameJSONdata"));
}
//if you got to the page via the cutscenes sending you here, i.e. you are playing the game
var gameJSONdata;

if(document.referrer.toUpperCase() == (window.location.origin.toUpperCase() + "/CANOE_GAME/AR.HTML")){
    //preserve the local storage and increment level
    console.log("Came from Animation");
    //game.scene.start("main");
    gameJSONdata = getGameJSONdata();
    currentLvl = gameJSONdata.level;
    

}
//if another page sent you here. i.e. a link, or you typed it in.
else{
    //ask if the user wants to continue their adveture from last time, or if they would like to restart.
    askContinue=true;
    gameJSONdata=getGameJSONdata();
    currentLvl = gameJSONdata.level;

}

var background;
var enemyGroup;
var healthGroup;
var featherGroup;

var cursors;
var bgMusic;

var playerSpeed = 8;
var bgScrollSpeed = 6;
var leftBound = SCREENWIDTH * 0.26;
var rightBound = SCREENWIDTH * 0.74;

var scoreIncTimeInterval = 2000;
var scoreIncAmount = 1;

var enemyMinSpawnTime;
var enemyMaxSpawnTime;

var healthMinSpawnTime = 10000;
var healthMaxSpawnTime = 15000;

var featherSpawnTimeInterval;

var spawnEnemy;
var spawnFeather;
var spawnHealth;
var scoreIncEvent;
var gameIsOver = false;
var pauseScreen;
var pauseButton;

var continueScreenSprite;
var continueYbutton;
var continueNbutton;

var scoreText;
var scoreIcon;

var hpText;
var hpIcon;

var isPaused = false;

var flashColor = 0xff0000;

var mouse;
var prizeImage;
var playButton;

var continueText;
var tintReset = 3;
var tintCtr = 0;