
class TitleScreen extends Screen {

    constructor(width, height) {
        super(width, height);
        this.message = 'Press any key to begin';
        this.instructions = 'Left, Right keys to move; Spacebar to shoot';
    }

    _init() {
        this.pos = {x:0, y:0};
        this.vel = {x:500, y:300};
        this.size = 0.1;
    }

    keyDown(e) {
        this.finished = true;
    }

    update(dt) {
        this.pos.x += this.vel.x * dt * this.size * this.size;
        this.pos.y += this.vel.y * dt * this.size * this.size;
        this.size += dt*2;        

        if (this.pos.x > this.width && this.pos.y > this.height) {
            this._init();
        }    
    }

    draw(ctx, assetMgr) {
        ctx.fillStyle = '#000000';
        ctx.fillRect(0,0, canvas.width, canvas.height);
        var w = (canvas.width - assetMgr.width(assetMgr.TITLE_PAGE)) * 0.5;
        var h = (canvas.height - assetMgr.height(assetMgr.TITLE_PAGE)) * 0.5;
        assetMgr.drawAsset(ctx, assetMgr.TITLE_PAGE, w, h);
        assetMgr.drawAsset(ctx, assetMgr.TITLE_TOMATO, this.pos.x, this.pos.y, this.size);

        ctx.font = assetMgr.FONT_SIZE_SMALL + 'px Treasure';
        ctx.fontStyle = 'bold';
        ctx.fillStyle = '#FF0000';
        var metrics = ctx.measureText(this.message);
        ctx.fillText(this.message, (canvas.width-metrics.width)*0.5, canvas.height-50);

        metrics = ctx.measureText(this.instructions);
        ctx.fillText(this.instructions, (canvas.width-metrics.width)*0.5, canvas.height-25);
    }
}

