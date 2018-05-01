class ui extends Phaser.Scene {
    constructor() {
        super('ui');
        console.log("game", game);
    }

    // Increase the player's score by a specified amt.
    // Uses the default scoreIncAmount if no amt was specified.
    increaseScore(amt = scoreIncAmount) {
        if (this.gameOver || isPaused) return;

        pStats.score += amt;
        scoreText.setText( pStats.score + "/" + featherGoal);
    }

    YbuttonPressed() {
        console.log("YbuttonPressed");
        askContinue=false;
        isPaused=false
        continueScreenSprite.alpha = 0;
        continueYbutton.visible = false;
        continueNbutton.visible = false;
        pauseButton.visible = true;

        continueText.visible = false;


    }

    NbuttonPressed(){


        askContinue=false;
        isPaused=false
        continueScreenSprite.alpha = 0;
        var gameJSONdata= JSON.parse(localStorage["gameJSONdata"]);
        gameJSONdata.level= -1;
        //gameJSONdata.continueState=1;
        localStorage["gameJSONdata"]= JSON.stringify(gameJSONdata);
        // console.log(game.scene.scenes[0])
        //game.scene.start("main");
        
        continueText.visible = false;
        continueYbutton.visible = false;
        continueNbutton.visible = false;
        pauseButton.visible = true;

        restartGame(game.scene.scenes[1]);
        console.log(game);
        game.scene.start("startScreen");


    }



    buttonPressed() {
        console.log("press");
        //stop spawning
        isPaused = !isPaused;



        // toggle all of our time events
        spawnEnemy.isPaused = isPaused;
        spawnFeather.isPaused = isPaused;
        spawnHealth.isPaused = isPaused;
        //scoreIncEvent.isPaused = isPaused;

        if (isPaused) {
            pauseScreen.alpha = 0.8;
            
            pauseButton.visible = false;
            playButton.visible = true;

            playButton.scaleX = 3;
            playButton.scaleY = 3;

            playerSpeed = 0;
            bgScrollSpeed = 0;

            bgMusic.pause();

        } else {
            pauseScreen.alpha = 0;
            
            pauseButton.visible = true;
            playButton.visible = false;

            playerSpeed = 5.5;
            bgScrollSpeed = pStats.speed;

            bgMusic.resume();
        }
    }
}


