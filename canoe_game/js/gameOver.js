class gameOver extends Phaser.Scene {
    constructor() {
        super('gameOver');
    }
}

// **Has to be a function for some reason...
// Player's hp hits 0. End the game.
function restartGame(myself) {
    gameIsOver = true;
    
    // shake the camera
    myself.cameras.main.shake(50);

    // fade camera
    myself.time.delayedCall(250, function () {
        myself.cameras.main.fade(250);
    }, [], myself);

    // destroy events
    //scoreIncEvent.remove(false);
    spawnEnemy.remove(false);
    spawnHealth.remove(false);
    spawnFeather.remove(false);

    // remove all enemies
    var enemies = enemyGroup.getChildren();
    for (var i = 0; i < enemyGroup.getChildren().length; i++) {
        var enemy = enemies[i];
        enemyGroup.remove(enemy);
        enemy.destroy();
    }

    // remove all health drops
    var healthDrops = healthGroup.getChildren();
    for (var i = 0; i < healthGroup.getChildren().length; i++) {
        var drop = healthDrops[i];
        healthGroup.remove(drop);
        drop.destroy();
    }

    // remove all feathers
    var feathers = featherGroup.getChildren();
    for (var i = 0; i < featherGroup.getChildren().length; i++) {
        var feather = feathers[i];
        featherGroup.remove(feather);
        feather.destroy();
    }

    // restart game
    myself.time.delayedCall(500, function () {

        bgMusic.stop(); // stop the background music completely
        PLAYERSTATS.resetToBaseStats(); // reset to the player's base stats
        gameIsOver = false;
        
        myself.scene.restart();

    }, [], myself);

    // reset camera effects
    myself.time.delayedCall(600, function () {
        myself.cameras.main.resetFX();
    }, [], myself);
}