
class main extends Phaser.Scene {

    constructor() {
        super('main');


    }

    preload() {
        currentLvl = JSON.parse(localStorage["gameJSONdata"]).level;
        if(currentLvl==-1){
            game.scene.start("startScreen");
        }
        console.log("currentLvl: " + currentLvl);
        console.log("preload main");
        this.load.image('canoe', 'assets/sprite/canoe.png');
        this.load.image('riverBG', 'assets/sprite/' + bgImgFileNames[currentLvl] + '.png');
        this.load.image('rock', 'assets/sprite/rock1.png');
        this.load.image('button', 'assets/sprite/Pause.png');
        this.load.image('play', 'assets/sprite/Play.png');
        this.load.image('pauseScreen', 'assets/sprite/pauseScreen.png');
        this.load.image('feather', 'assets/sprite/feather.png');
        this.load.image('heart', 'assets/sprite/heart.png');
        this.load.image('Ybutton', 'assets/sprite/Yes.png');
        this.load.image('Nbutton', 'assets/sprite/No.png');

        this.load.audio('mainLoop', 'assets/audio/' + musicFileNames[currentLvl] + '.mp3');
    }

    //creates all of the scenes
    create() {
        console.log("create main");
        MAIN = this.scene.get('main');
        UI = this.scene.get('ui');
        PLAYERSTATS = this.scene.get('playerStats');
        GAMEOVER = this.scene.get('gameOver');
        ROCK = this.scene.get('rock');
        HEALTHDROP = this.scene.get('healthDrop');
        FEATHERDROP = this.scene.get('featherDrop');
        LEVELSTATS = this.scene.get('levelStats');
        CUTSCENE = this.scene.get('cutscene');
        CONTINUESCREEN = this.scene.get('continueScreen');

        // Load level stats
        LEVELSTATS.loadLevel(levels[currentLvl]);

        // Scrolling River Background
        background = this.add.tileSprite(SCREENWIDTH / 2, SCREENHEIGHT / 2, 800, 600, 'riverBG');
        background.scaleX = SCREENWIDTH / 800;
        background.scaleY = SCREENHEIGHT / 600;
        // background.depth = 1;
        // Keyboard Input
        cursors = this.input.keyboard.createCursorKeys();

        mouse = this.input.mouse.manager.activePointer;
        console.log(mouse);

        // Background Music
        bgMusic = this.sound.add('mainLoop');
        bgMusic.play();
        bgMusic.loop = true;


        // Playable Character
        player = this.physics.add.sprite(SCREENWIDTH / 2, SCREENHEIGHT - (SCREENHEIGHT / 8), 'canoe');
        player.setCollideWorldBounds(true);

        // Rock Group
        enemyGroup = this.add.group();
        healthGroup = this.add.group();
        featherGroup = this.add.group();

        //  Score
        //score = 0;
        scoreText = this.add.text(80, 30, pStats.score + "/" + featherGoal, { font: '60px Palatino', fill: '#fff' });
        scoreIcon = this.add.sprite(45, 60, 'feather');
        scoreIcon.scaleX = 1.4;
        scoreIcon.scaleY = 1.4;

        console.log(pStats.hp);
        //  Lives
        hpIcon = this.add.sprite(config.width - 80, 60, 'heart');
        hpIcon.scaleX = 2;
        hpIcon.scaleY = 2;
        hpText = this.add.text(config.width - 92, 30, pStats.hp, { font: '60px Palatino', fill: '#fff' });


        //Pause menu
        pauseScreen = this.add.sprite(SCREENWIDTH / 2, SCREENHEIGHT / 2, 'pauseScreen');
        pauseScreen.scaleY = 10;
        pauseButton = this.add.sprite(60, 150, 'button').setInteractive();
        pauseScreen.alpha = 0;
        pauseScreen.depth = 1;

        pauseButton.on('pointerdown', UI.buttonPressed);

        playButton = this.add.sprite(SCREENWIDTH / 2, SCREENHEIGHT / 2, 'play').setInteractive();
        playButton.visible = false;
        playButton.depth = 2;

        playButton.on('pointerdown', UI.buttonPressed);


        //Continue Menu
        continueScreenSprite = this.add.sprite(SCREENWIDTH / 2, SCREENHEIGHT / 2, 'pauseScreen');
        continueScreenSprite.scaleY = 10;
        continueYbutton = this.add.sprite(SCREENWIDTH / 2 - 100, SCREENHEIGHT / 2, 'Ybutton').setInteractive();
        continueNbutton = this.add.sprite(SCREENWIDTH / 2 + 100, SCREENHEIGHT / 2, 'Nbutton').setInteractive();
        continueScreenSprite.alpha = 0;
        continueScreenSprite.depth = 1;

        continueYbutton.on('pointerdown', UI.YbuttonPressed);
        continueYbutton.depth = 2;
        continueNbutton.on('pointerdown', UI.NbuttonPressed);
        continueNbutton.depth = 2
        continueYbutton.visible = false;
        continueNbutton.visible = false;

        continueText = this.add.text(SCREENWIDTH * 0.3, SCREENHEIGHT * 0.4, 'Continue game?', { font: '60px Palatino', fill: '#0' })
        continueText.depth = 2;
        continueText.visible = false;

        // Randomly spawn a rock
        spawnEnemy = this.time.addEvent({
            delay: Phaser.Math.RND.integerInRange(enemyMinSpawnTime, enemyMaxSpawnTime),
            callback: ROCK.createNewEnemy, callbackScope: this, loop: true
        })

        // Randomly spawn a heart
        spawnHealth = this.time.addEvent({
            delay: Phaser.Math.RND.integerInRange(healthMinSpawnTime, healthMaxSpawnTime),
            callback: HEALTHDROP.dropHealth, callbackScope: this, loop: true
        });

        // Spawn a feather at a specified time interval
        spawnFeather = this.time.addEvent({
            delay: featherSpawnTimeInterval,
            callback: FEATHERDROP.dropFeather, callbackScope: this, loop: true
        });


        player.tint = 0xffffff
        tintCtr = 0;
        console.log("RESTART: ");
    }


    update() {
        if (askContinue) {
            isPaused = true;
            continueYbutton.visible = true;
            continueNbutton.visible = true;
            continueScreenSprite.alpha = 0.8;

            continueText.visible = true;
            return;
        }

        if (pStats.score == featherGoal) {
            bgMusic.stop(); // stop the background music completely
            PLAYERSTATS.resetToBaseStats(); // reset to the player's base stats
            this.scene.start('levelComplete');
        }

        // Game is over ignore everything in this 
        if (gameIsOver) {
            bgMusic.volume = bgMusic.volume * 0.9;  // Slowly lerp the volume down
            return;
        }

        // Player ran out of health

        if (pStats.hp == 0) {
            console.log("game end");
            restartGame(this);
            return;
        }

        // Reset tint
        if (tintCtr >= tintReset) {
            player.tint = 0xffffff
        }
        else 
            tintCtr++;

        // Looping Background
        background.tilePositionY -= bgScrollSpeed;

        // Keyboard Input

        if (cursors.left.isDown || (mouse.isDown && mouse.x < SCREENWIDTH / 2)) {
            player.x -= playerSpeed;

            if (player.x < leftBound)
                player.x = leftBound;
        }
        else if (cursors.right.isDown || (mouse.isDown && mouse.x >= SCREENWIDTH / 2)) {
            player.x += playerSpeed;

            if (player.x > rightBound)
                player.x = rightBound;
        }

        ROCK.handleRocks();
        HEALTHDROP.handleHealthDrops();
        FEATHERDROP.handleFeathers();
    }
}
