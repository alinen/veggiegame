class Car extends Entity { 
    
    constructor(type, worldW, worldH) {
        super(type, worldW, worldH);
        this.visible = true;
    }

    reset() {
        this.pos.y = this.worldHeight - this.height();
        this.pos.x = (this.worldWidth - this.width())* 0.5;
        this.stop();
    }
  
    moveLeft()
    {
        this.vel.x = -1600;
    }

    moveRight()
    {
        this.vel.x = 1600;
    }
  
    stop()
    {
        this.vel.x = 0;
    }
  
    _update(dt) {
        this.pos.y = this.worldHeight - this.height();
        this.pos.x = Math.min(this.worldWidth-this.width(), this.pos.x);
        this.pos.x = Math.max(0, this.pos.x);
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
}
  
