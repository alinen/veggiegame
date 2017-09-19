
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

    draw(ctx, assetMgr) {
        assetMgr.drawAsset(ctx, assetMgr.SCENE, 0, 0);

        ctx.font = assetMgr.FONT_SIZE_BIG + 'px Treasure';
        ctx.fontStyle = 'bold';
        ctx.fillStyle = '#000000';
        var metrics = ctx.measureText(this.message);
        var height = Math.floor(canvas.height * 0.4 );
        var width = Math.floor((canvas.width-metrics.width)*0.5);
        ctx.fillText(this.message, width, height);
    }
}


