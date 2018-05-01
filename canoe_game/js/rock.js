class rock extends Phaser.Scene {
    constructor() {
        super('rock');
    }

    // Spanws a new enemy if the game is not over.
    createNewEnemy() {
        console.log("spawn!");
        if (gameIsOver) return;

        if (!isPaused) {
            var xPos = Phaser.Math.RND.integerInRange(leftBound, rightBound);
            var rock = this.physics.add.sprite(xPos, 0, 'rock');
            rock.scaleX = 2;
            rock.scaleY = 2;
            enemyGroup.add(rock);

        }
    }

    // Handle each rock
    handleRocks() {
        var children = enemyGroup.getChildren();
        children.forEach(
            function (enemy) {

                // Move rock
                enemy.y += bgScrollSpeed;

                // Check collision with player
                if (Phaser.Geom.Intersects.RectangleToRectangle(player.getBounds(), enemy.getBounds())) {
                    PLAYERSTATS.hitEnemy();
                    enemyGroup.remove(enemy);
                    enemy.destroy();
                }

                // Check if rock hit the bottom of the screen -> despawn
                else if (enemy.y >= this.SCREENHEIGHT) {
                    enemyGroup.remove(enemy);
                    enemy.destroy();
                }

            }, this);
    }

}