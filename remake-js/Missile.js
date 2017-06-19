class Missile
{      
    constructor(assetMgr, canvas) {
        this.pos = {x:0, y:0};
        this.vel = {x:0, y:-100};
        this.visible = false;
        this.width = assetMgr.width(assetMgr.CAR);
        this.height = assetMgr.height(assetMgr.CAR);
    }

    reset(x, y) {
        this.visible = true;
        this.pos.x = x;
        this.pos.y = y;
    }

    /*
    hit()
    {
     explode();
     visible = false;
    }*/

    update(dt)
    {
       if (this.visible)
       {
          this.pos.y += this.vel.y*dt;
          this.pos.x += this.vel.x*dt;
          if (this.pos.y < 0) this.visible = false;
       }
    }
}
