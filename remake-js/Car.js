class Car { 
    
    constructor(assetMgr, canvas) {
        this.pos= {x:0, y:0};
        this.vel= {x:0, y:0};
        this.width = assetMgr.width(assetMgr.CAR);
        this.height = assetMgr.height(assetMgr.CAR);
        this.worldWidth = canvas.width;
        this.worldHeight = canvas.height;
        this.missile = new Missile(assetMgr, canvas);
    }
  
    keyDown(e) {
        if (e.key === ' ') {
        }
    }

    reset()
    {
        this.missile.visible = false;
    }

    moveLeft()
    {
        this.vel.x = -200;
    }

    moveRight()
    {
        this.vel.x = 200;
    }
  
    stop()
    {
        this.vel.x = 0;
    }
  
    mouseMove(e)
    {
       this.pos.x = e.x - this.width * 0.5;
       this.pos.x = Math.min(this.worldWidth-this.width, this.pos.x);
       this.pos.x = Math.max(0, this.pos.x);
    }
  
    fireTopCannon()
    {
        var x = this.pos.x + this.width/2.0 - this.missile.width/2.0;
        var y = this.pos.y - this.height;
        this.missile.reset(x, y);
    }
  
    /*
    public function missileIntersects(target:GameObject):Boolean
    {
       for (var i:int = 0; i < 3; i++)
       {
          if (target.intersects(myMissiles[i]))
          {
             myMissiles[i].hit();
             return true;
          }
       }
       return false;
    }*/
  
    update(dt)
    {
       this.missile.update(dt);
       this.pos.x += dt * this.vel.x;
    }

    draw(ctx, assetMgr) {
        assetMgr.drawAsset(ctx, assetMgr.CAR, this.pos.x, this.pos.y);
        if (this.missile.visible) {
            assetMgr.drawAsset(ctx, assetMgr.MISSILE, this.missile.pos.x, this.missile.pos.y);
        }
    }
}
  
