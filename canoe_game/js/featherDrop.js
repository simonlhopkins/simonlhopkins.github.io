class featherDrop extends Phaser.Scene {
    constructor() {
        super('featherDrop');
    }

    // Drops a feather if the game is not over.
    dropFeather() {
        if (gameIsOver) return;

        if (!isPaused) {
            var xPos = Phaser.Math.RND.integerInRange(leftBound, rightBound);
            var feather = this.physics.add.sprite(xPos, 0, 'feather');
            feather.scaleX = 2;
            feather.scaleY = 2;
            featherGroup.add(feather);
        }
    }


    // Handle each feather
    handleFeathers() {
        var children = featherGroup.getChildren();
        children.forEach(
            function (feather) {

                // Move feather
                feather.y += bgScrollSpeed;

                // Check collision with player
                if (Phaser.Geom.Intersects.RectangleToRectangle(player.getBounds(), feather.getBounds())) {
                    UI.increaseScore();
                    featherGroup.remove(feather);
                    feather.destroy();
                }

                // Check if rock hit the bottom of the screen -> despawn
                else if (feather.y >= this.SCREENHEIGHT) {
                    featherGroup.remove(feather);
                    feather.destroy();
                }

            }, this);
    }
}