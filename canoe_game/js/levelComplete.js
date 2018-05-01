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

        this.add.text((SCREENWIDTH*0.78) / 4, SCREENHEIGHT * 0.48,
            "Congratulations!\nYou won a " + prizeNames[currentLvl] + "!" +
            "\nShow this image to claim your paper model at the Cohoes library.",
            {
                font: '50px Palatino',
                fill: '#000', 
                align: 'center', 
                wordWrap: { width: SCREENWIDTH * 0.7 }
            });

        this.continueButton = this.add.sprite(SCREENWIDTH /2, SCREENHEIGHT * 0.7, 'continue').setInteractive();
        this.continueButton.on('pointerdown', function (event) {
            //this.scene.start('main');
            
            window.location.href="./AR.html"

        }, this);

        // Increment the level counter
        currentLvl++;
        if(currentLvl > lvlMax){
            currentLvl = 0; // loop back to the first level.
        }
    }
}