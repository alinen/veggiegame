class Peapod extends Entity {

    // TODO - Show Peapod emerge on startup and hide on defeat
    constructor(width, height)
    {
        super(theAssetMgr.BIGPEA_RIGHT_OPEN, width, height);
        this.peas = new Array();
        this.PEA_START_OFFSETX = 25;
        this.PEA_START_OFFSETY = 80;
    }
  
    add(entity) {
        this.peas.push(entity);
    }

    setCar(car) {
        this.car = car;
    }

    reset() {
        this.pos.x = 0;
        this.pos.y = this.worldHeight - this.height();
        this.vel.x = 500;
        this.type = theAssetMgr.BIGPEA_RIGHT_OPEN;
        this.elapsedTime = 0;
        this.timer = 0;
        this.isShootingPeas = false;
        this.launchCount = 0;
    }

    update(dt) {
        this.elapsedTime += dt;
        this.pos.x += this.vel.x*dt;
        if  (this.vel.x > 0 && this.pos.x+this.width() > this.worldWidth) {
           this.vel.x = -this.vel.x;
           this.pos.x = this.worldWidth - this.width();
        } else if (this.vel.x < 0 && this.pos.x < 0) {
           this.vel.x = -this.vel.x;
           this.pos.x = 0;
        }

        this.pos.y = this.worldHeight - this.height() - 25*(Math.sin(Math.PI/180*this.elapsedTime*500)+1);
        if (this.launchCount < this.peas.length && this.launchPea(dt, this.car.pos)) {
            this.launchCount++;
        }

        if (this.car.pos.x < this.pos.x) {
            if (this.isShootingPea) {
                this.type = theAssetMgr.BIGPEA_LEFT_OPEN;
            } else {
                this.type = theAssetMgr.BIGPEA_LEFT_CLOSED;
            }
        } else if  (this.car.pos.x >= this.pos.x) {
            if (this.isShootingPea) {
                this.type = theAssetMgr.BIGPEA_RIGHT_OPEN;
            } else {
                this.type = theAssetMgr.BIGPEA_RIGHT_CLOSED;
            }
        }
    }

    launchPea(dt, targetPos) {
        this.timer += dt;

        if (this.timer > 0.2) {
            this.isShootingPea = true;
        }

        if (this.timer > 0.25) {
           this.timer = 0.0;
           this.isShootingPea = false;
           for (var i = 0; i < this.peas.length; ++i) {
              if (!this.peas[i].visible && this.peas[i].alive) {
                 this.peas[i].visible = true;
                 this.peas[i].pos.x = this.pos.x+this.PEA_START_OFFSETX;  
                 this.peas[i].pos.y = this.pos.y+this.PEA_START_OFFSETY;
                 this.peas[i].vel.x = 4 * (targetPos.x - this.peas[i].pos.x);
                 this.peas[i].vel.y = 4 * (targetPos.y - this.peas[i].pos.y);
                 //console.log("launch: "+this.pos.x+" "+this.pos.y);
                 return true;
              }
           }
        } 
        return false;
    }
}
