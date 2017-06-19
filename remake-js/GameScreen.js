
class GameScreen extends Screen {
    constructor(width, height) {
        super(width, height); 
        this.levels = new Array();
        var canvas = document.getElementById('canvas');
        this.levels.push(new Level(theAssetMgr, canvas, undefined)); 
        this.car = new Car(theAssetMgr, canvas);
    }

    _init() {
        this.carLives = 3;
        this.score = 0;
        this.level = 0;
    }

    keyDown(e) {
        this.finished = true;
    }

    mouseMove(e) {
    }

    mouseDown(e) {
    }

    update(dt) {
        this.car.update(dt);
        this.levels[0].update(dt);
    }

    draw(ctx, assetMgr) {
        assetMgr.drawAsset(ctx, assetMgr.SCENE, 0, 0);
        this.car.draw(ctx, assetMgr);
        this.levels[0].draw(ctx, assetMgr);
    }
}


