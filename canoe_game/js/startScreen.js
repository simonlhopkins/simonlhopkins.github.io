class startScreen extends Phaser.Scene {

    constructor() {
        super('startScreen');
    }

    preload() {
        console.log("preload create");
        this.load.image('startScreenBackground', 'assets/sprite/startScreenBackground.png');
        this.load.image('startButton', 'assets/sprite/Play.png');
    }

    create() {
        console.log("start create");

        background = this.add.tileSprite(SCREENWIDTH / 2, SCREENHEIGHT / 2, 800, 600, 'startScreenBackground');
        background.scaleX = SCREENWIDTH / 800;
        background.scaleY = SCREENHEIGHT / 600;
        
        

        this.add.text((SCREENWIDTH*0.78) / 4, SCREENHEIGHT * 0.2,
            "Journey down the Mohawk River as you follow the Peacemaker on his\n"+
            " mission to unify the five Iriqouis nations.\n"+
            "Be careful not to hit any rocks along the way and try to\n"+
            " collect feathers to progress the plot of the adventure. Good luck!\n",
            {
                font: '50px Palatino',
                fill: '#000', 
                align: 'center', 
                wordWrap: { width: SCREENWIDTH * 0.7 }
            });

        this.startButton = this.add.sprite(SCREENWIDTH /2, SCREENHEIGHT * 0.7, 'startButton').setInteractive();
        this.startButton.scaleX = 3;
        this.startButton.scaleY = 3;
        var gameJSONdata= JSON.parse(localStorage.getItem("gameJSONdata"));
        this.startButton.on('pointerdown', function (event) {
            if(gameJSONdata.level==-1){
                window.location.href="./ar.html"
            }
            else{
                this.scene.start('main');
            }
            

        }, this);

        
    
    }
}