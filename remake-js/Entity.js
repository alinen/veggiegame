class Entity {
    constructor(type, worldWidth, worldHeight) {
        this.type = type;
        this.visible = true;
        this.pos = {x:0, y:0};
        this.vel = {x:0, y:0};
        this.worldWidth = worldWidth;
        this.worldHeight = worldHeight;

        this.UNKNOWN = 0;
        this.ENEMY = 1;
        this.gameType = this.UNKNOWN;
    }

    width() {
       return theAssetMgr.width(this.type); 
    }

    height() {
       return theAssetMgr.height(this.type); 
    }

    reset() {
    }

    update(dt) {
        if (this.visible) {
            this.pos.y += this.vel.y*dt;
            this.pos.x += this.vel.x*dt;
            this._update(dt);
        }
    }

    _update(dt) {
    }
}

