class levelComplete extends Phaser.Scene {

    constructor() {
        super('levelComplete');
    }

    preload() {
        console.log("preload");
        this.load.image('prizeImage', 'assets/sprite/' + prizeImages[currentLvl] + '.png');
        this.load.image('continue', 'assets/sprite/Continue.png');
    }

    create() {
        console.log("create");
        background = this.add.tileSprite(SCREENWIDTH / 2, SCREENHEIGHT / 2, 800, 600, 'pauseScreen');
        background.scaleY = 10;
        
        this.prizeImage = this.add.sprite(SCREENWIDTH / 2, SCREENHEIGHT / 3, 'prizeImage');
        this.prizeImage.scaleX = 0.6;
        this.prizeImage.scaleY = 0.6;

        var message =  "Congratulations!\nYou won a " + prizeNames[currentLvl] + "!\nParts Collected: " + (currentLvl + 1) +  "/3";
        var widthOffset = 0.25;
        var heightOffset = 0.65;
        
        if(currentLvl == 2){
            message +=  "\nShow this image to claim your paper model at the Cohoes library.";
            widthOffset = 0.2;
            heightOffset = 0.74;
        }

        this.add.text(SCREENWIDTH *widthOffset, SCREENHEIGHT * 0.48, message,
            {
                font: '50px Palatino',
                fill: '#000', 
                align: 'center', 
                wordWrap: { width: SCREENWIDTH * 0.7}
            });

        this.continueButton = this.add.sprite(SCREENWIDTH /2, SCREENHEIGHT * heightOffset, 'continue').setInteractive();
        this.continueButton.on('pointerdown', function (event) {
            //this.scene.start('main');
            if(currentLvl == 0) 
                this.scene.start('startScreen');  // go to start screen
            else
                window.location.href="./ar.html"

        }, this);

        // Increment the level counter
        // currentLvl++;
        // if(currentLvl > lvlMax){
        //     currentLvl = 0;
        // }
    }
}