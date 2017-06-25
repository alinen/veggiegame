
class GameOverScreen extends Screen {
    constructor(width, height) {
        super(width, height); 
        this.message = "Game Over";
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

    draw(assetMgr) {
        assetMgr.drawAsset(assetMgr.SCENE, 0, 0);

        /*
        ctx.font = '58px serif';
        ctx.fontStyle = 'bold';
        ctx.fillStyle = '#000000';
        var metrics = ctx.measureText(this.message);
        var height = Math.floor(assetMgr.height(assetMgr.TITLE_PAGE) * 0.5 );
        var width = Math.floor((canvas.width-metrics.width)*0.5);
        ctx.fillText(this.message, width, height);
        */
    }
}


