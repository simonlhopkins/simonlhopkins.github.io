class levelStats extends Phaser.Scene {
    constructor(levelNum, bgScrollSpeed,
        enemyMinSpawnTime, enemyMaxSpawnTime,
        featherGoal, featherSpawnTimeInterval
        ) {
        super('levelStats');

        this.LEVELNUM = levelNum;
        this.BGSCROLLSPEED = bgScrollSpeed;

        this.ENEMYMINSPAWNTIME = enemyMinSpawnTime;
        this.ENEMYMAXSPAWNTIME = enemyMaxSpawnTime;

        this.FEATHERGOAL = featherGoal;
        this.FEATHERSPAWNTIMEINTERVAL = featherSpawnTimeInterval;
    }


    loadLevel(level) {
        bgScrollSpeed = level.BGSCROLLSPEED;

        enemyMinSpawnTime = level.ENEMYMINSPAWNTIME;
        enemyMaxSpawnTime = level.ENEMYMAXSPAWNTIME;

        featherGoal = level.FEATHERGOAL
        featherSpawnTimeInterval = level.FEATHERSPAWNTIMEINTERVAL;  
    }
}
