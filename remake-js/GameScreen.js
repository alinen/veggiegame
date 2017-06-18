
class GameScreen extends Screen {
    constructor(width, height) {
        super(width, height); 
    }

    _init() {
    }

    keyDown(e) {
        this.finished = true;
    }

    mouseMove(e) {
    }

    mouseDown(e) {
    }

    update(dt) {
    }

    draw(ctx, assetMgr) {
        assetMgr.drawAsset(ctx, assetMgr.SCENE, 0, 0);
    }
}


