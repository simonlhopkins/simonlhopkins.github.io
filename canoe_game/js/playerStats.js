class playerStats extends Phaser.Scene {
    constructor() {
        super('playerStats');
    }

    // Increase the player's health by a specified amt.
    // Default value is 1 hp if no amt was specified.
    increaseHP(amt = 1) {
        if (this.gameOver || pStats.hp >= baseHealth) return;

        pStats.hp += amt;
        hpText.setText(pStats.hp);
    }


    // The player hit an enemy, so decrease their hp.
    hitEnemy() {
        player.tint = flashColor; // player's sprite is tinted red
        pStats.hp--;
        hpText.setText(pStats.hp);

        tintCtr = 0;
    }

    // Reset the player's
    resetToBaseStats() {
        pStats = {
            "hp": baseHealth,
            "score": 0,
            "speed": baseSpeed
        }
    }
}