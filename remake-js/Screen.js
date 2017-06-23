
class Screen {
    constructor(width, height) {
        this.width = width;
        this.height = height;  
    }

    keyUp(e) {
    }

    keyDown(e) {
    }

    mouseMove(e) {
    }

    mouseDown(e) {
    }

    init() {
        this.finished = false;
        this._init();
    }

    _init() {
    }

    update(dt) {
    }

    draw(ctx, assetMgr) {
    }

    clear(ctx, assetMgr) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
}

