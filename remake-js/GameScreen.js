
class GameScreen extends Screen {
    constructor(width, height) {
        super(width, height); 

        this.entities = new Array();
        for (var i = 0; i < 2; i++) {
            this.entities.push(new KillerVeggie(theAssetMgr.KILLER_HOTPEPPER, width, height));
            this.entities.push(new KillerVeggie(theAssetMgr.KILLER_ONION, width, height));
        }        

        this.missile = new Missile(theAssetMgr.MISSILE, width, height);
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

    keyUp(e) {
        if (e.keyCode === 37 && this.car.vel.x < 0) { //left or right
            this.car.stop();
        } else if (e.keyCode === 39 && this.car.vel.x > 0) { //left or right
            this.car.stop();
        }
    }

    keyDown(e) {
        if (e.keyCode === 81) { // q
            this.finished = true;
        } else if (e.keyCode === 37) { //left
            this.car.moveLeft();
        } else if (e.keyCode === 39) { //right
            this.car.moveRight();
        } else if (e.keyCode === 32) { //spacebar
            this.fireCannon();
        }
    }

    mouseMove(e) {
    }

    mouseDown(e) {
    }

    /*
    mouseMove(e)
    {
       this.pos.x = e.x - this.width * 0.5;
       this.pos.x = Math.min(this.worldWidth-this.width, this.pos.x);
       this.pos.x = Math.max(0, this.pos.x);
    }
  */    
    fireCannon()
    {
        var x = this.car.pos.x + (this.car.width - this.missile.width) * 0.5;
        var y = this.car.pos.y - this.missile.height;
        this.missile.pos.x = x; 
        this.missile.pos.y = y; 
        this.missile.visible = true;
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
            if (!entity.visible) continue;
            assetMgr.drawAsset(ctx, entity.type, entity.pos.x, entity.pos.y);
        }
    }
}


