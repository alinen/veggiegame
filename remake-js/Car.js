class Car extends Entity { 
    
    constructor(type, worldW, worldH) {
        super(type, worldW, worldH);
    }

    reset() {
        this.pos.y = this.worldHeight - this.height;
        this.pos.x = (this.worldWidth - this.width)* 0.5;
        this.stop();
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
  
    /*
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
  */
  
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
  
