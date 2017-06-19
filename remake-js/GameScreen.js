
class GameScreen extends Screen {
    constructor(width, height) {
        super(width, height); 

        this.levels = [
            { 
              enemies: [{type: theAssetMgr.KILLER_CARROT, count: 2}, {type: theAssetMgr.KILLER_TOMATO, count: 2}],
              speed: 1
            },
            { 
              enemies: [{type: theAssetMgr.KILLER_HOTPEPPER, count: 2}, {type: theAssetMgr.KILLER_ONION, count: 2}],
              speed: 1
            },
            { 
              enemies: [{type: theAssetMgr.KILLER_BROCCOLI, count: 2}, {type: theAssetMgr.KILLER_EGGPLANT, count: 2}],
              speed: 1
            }
            //{ 
            //  enemies: [{type: theAssetMgr.KILLER_PEAPOD, count: 2}, {type: theAssetMgr.KILLER_EGGPLANT, count: 2}],
            //  speed: 1
            //}
        ];
        this.currentLevel = 0;

        this.missile = new Missile(theAssetMgr.MISSILE, width, height);
        this.car = new Car(theAssetMgr.CAR, width, height);

    }

    _init() {
        this.carLives = 3;
        this.score = 0;
        this.currentLevel = 0;
        this.reset();
    }

    reset() {
        this.timer = 0.1;

        this.entities = new Array();
        this.hitCount = 0;
        this.numEnemies = 0;
        var enemies = this.levels[this.currentLevel % this.levels.length].enemies;
        for (var i = 0; i < enemies.length; i++) {
            var count = enemies[i].count;
            this.numEnemies += count;
            var type = enemies[i].type;
            for (var j = 0; j < count; j++) {
                this.entities.push(new KillerVeggie(type, this.width, this.height));
            }
        }        
        this.entities.push(this.missile); 
        this.entities.push(this.car); 

        for (var i = 0; i < this.entities.length; i++) {
            this.entities[i].reset();
        }        
        this.explosions = new Array(); // for explosions
        this.missile.visible = false;
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

    contains(pos, corner, width, height) {
        var test = (pos.x > corner.x && pos.x < corner.x + width && 
                    pos.y > corner.y && pos.y < corner.y + height);
        return test;
    }

    checkIntersections(entity) {
        var pos = entity.pos;
        var width = entity.width;
        var height = entity.height;
        var corner1 = {x: pos.x, y: pos.y };
        var corner2 = {x: pos.x+width, y:pos.y}; 
        var corner3 = {x: pos.x+width, y:pos.y+height}; 
        var corner4 = {x: pos.x, y:pos.y+height}; 

        for (var j = 0; j < this.entities.length; j++) {
            if (this.entities[j] === entity) continue;
            if (!this.entities[j].visible) continue;

            // axis aligned bbox intersection test
            var posj = this.entities[j].pos;
            var widthj = this.entities[j].width;
            var heightj = this.entities[j].height;

            if (this.contains(corner1, posj, widthj, heightj) ||
                this.contains(corner2, posj, widthj, heightj) ||
                this.contains(corner3, posj, widthj, heightj) ||
                this.contains(corner4, posj, widthj, heightj)) { 

                return this.entities[j];
            }
        }
        return null;
    }

    createExplosion(entity) {
        var explosion = null;
        for (var i = 0; i < this.explosions.length; i++) {
            if (!this.explosions[i].visible) {
                explosion = this.explosions[i];
            }
        }
        if (explosion === null) {
            explosion = new Explosion(theAssetMgr.EXPLOSION, this.worldWidth, this.worldHeight);
            this.explosions.push(explosion);
        }
        explosion.reset();
        explosion.visible = true;
        explosion.pos.x = entity.pos.x + (entity.width - explosion.width) * 0.5;
        explosion.pos.y = entity.pos.y + (entity.height - explosion.height) * 0.5;
    }

    update(dt) {
        this.timer = this.timer - dt;
        if (this.timer > 0) return;

        for (var i = 0; i < this.entities.length; i++) {
            this.entities[i].update(dt);
        }

        if (this.hitCount === this.numEnemies) {
            this.currentLevel = this.currentLevel + 1;
            this.reset();
        }

        for (var i = 0; i < this.explosions.length; i++) {
            this.explosions[i].update(dt);
        }

        if (this.missile.visible) {
            var missileHit = this.checkIntersections(this.missile);
            if (missileHit) {
                missileHit.vel.x = missileHit.vel.y = 0;
                missileHit.visible = false;
                this.hitCount++;
                this.missile.visible = false;
                this.createExplosion(missileHit);
            }
        }

        var carHit = this.checkIntersections(this.car);
        if (carHit) {

            this.carLives--;
            if (this.carLives <= 0) {
                this.finished = true;
            } else {
                this.reset();
            }
        }
    }

    draw(ctx, assetMgr) {
        assetMgr.drawAsset(ctx, assetMgr.SCENE, 0, 0);
        for (var i = 0; i < this.entities.length; i++) {
            var entity = this.entities[i];
            if (!entity.visible) continue;
            assetMgr.drawAsset(ctx, entity.type, entity.pos.x, entity.pos.y);
        }

        for (var i = 0; i < this.explosions.length; i++) {
            var entity = this.explosions[i];
            if (!entity.visible) continue;
            assetMgr.drawAsset(ctx, entity.type, entity.pos.x, entity.pos.y);
        }

        if (this.timer > 0) {
            ctx.font = '58px serif';
            ctx.fontStyle = 'bold';
            ctx.fillStyle = '#000000';
            var message = 'Level '+(this.currentLevel+1);
            var metrics = ctx.measureText(message);
            var height = Math.floor(assetMgr.height(assetMgr.TITLE_PAGE) * 0.5 );
            var width = Math.floor((canvas.width-metrics.width)*0.5);
            ctx.fillText(message, width, height);        
        }
    }
}


