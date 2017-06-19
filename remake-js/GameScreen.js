
class GameScreen extends Screen {
    constructor(width, height) {
        super(width, height); 

        this.entities = new Array();
        for (var i = 0; i < 2; i++) {
            this.entities.push(new KillerVeggie(theAssetMgr.KILLER_HOTPEPPER, width, height));
            this.entities.push(new KillerVeggie(theAssetMgr.KILLER_ONION, width, height));
        }        

        this.missile = new Car(theAssetMgr.MISSILE, width, height);
        this.car = new Car(theAssetMgr.CAR, width, height);

        this.entities.push(this.missile); 
        this.entities.push(this.car); 

    }

    _init() {
        this.carLives = 3;
        this.score = 0;
        this.level = 0;
        for (var i = 0; i < this.entities.length; i++) {
            this.entities[i].reset();
        }        
    }

    keyDown(e) {
        this.finished = true;
    }

    mouseMove(e) {
    }

    mouseDown(e) {
    }

    update(dt) {
        for (var i = 0; i < this.entities.length; i++) {
            this.entities[i].update(dt);
        }
    }

    draw(ctx, assetMgr) {
        assetMgr.drawAsset(ctx, assetMgr.SCENE, 0, 0);
        for (var i = 0; i < this.entities.length; i++) {
            var entity = this.entities[i];
            assetMgr.drawAsset(ctx, entity.type, entity.pos.x, entity.pos.y);
        }
    }
}


