
class GameOverScreen extends Screen {
    constructor(width, height) {
        super(width, height); 
        this.message = "Game Over";
        this.messageSize = null;
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
        //assetMgr.drawAsset(ctx, assetMgr.SCENE, 0, 0);

        ctx.font = '58px serif';
        ctx.fontStyle = 'bold';
        ctx.fillStyle = '#000000';
        var metrics = ctx.measureText(this.message);
        var y = Math.floor(assetMgr.height(assetMgr.TITLE_PAGE) * 0.5 );
        var x = Math.floor((canvas.width-metrics.width)*0.5);
        ctx.fillText(this.message, x, y);
        this.messageSize = {x: x, y:y, width:metrics.width, height:58};
    }
}


