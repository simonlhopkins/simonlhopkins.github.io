class healthDrop extends Phaser.Scene {
    constructor() {
        super('healthDrop');
    }

    // Drops health if the game is not over.
    dropHealth() {
        if (gameIsOver) return;

        if (!isPaused) {
            var xPos = Phaser.Math.RND.integerInRange(leftBound, rightBound);
            var heart = this.physics.add.sprite(xPos, 0, 'heart');
            heart.scaleX = 2;
            heart.scaleY = 2;
            healthGroup.add(heart);
        }
    }

    // Handle each health drop
    handleHealthDrops() {
        var children = healthGroup.getChildren();
        children.forEach(
            function (healthDrop) {

                // Move drop
                healthDrop.y += bgScrollSpeed;

                // Check collision with player
                if (Phaser.Geom.Intersects.RectangleToRectangle(player.getBounds(), healthDrop.getBounds())) {
                    PLAYERSTATS.increaseHP();
                    healthGroup.remove(healthDrop);
                    healthDrop.destroy();
                }

                // Check if drop hit the bottom of the screen -> despawn
                else if (healthDrop.y >= this.SCREENHEIGHT) {
                    healthGroup.remove(healthDrop);
                    healthDrop.destroy();
                }

            }, this);
    }
}