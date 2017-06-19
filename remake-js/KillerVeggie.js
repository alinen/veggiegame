class KillerVeggie {      

    constructor(type, assetMgr, canvas) {
        this.type = type;
        this.speed = 500.0;
        this.mass = 1.0;
        this.pos = {x:0, y:0};
        this.vel = {x:0, y:0};
        this.width = assetMgr.width(type);
        this.height = assetMgr.height(type);
        this.worldWidth = canvas.width;
        this.worldHeight = canvas.height;
    }

    reset() {
        this.pos.x = Math.random()*this.worldWidth;
        this.pos.y = 0;
        var angle = Math.random()*Math.PI;
        this.vel.x = this.speed*Math.cos(angle);
        this.vel.y = this.speed*Math.sin(angle);
        this.visible = true;
        this.alive = true;
    }

  /*
  override public function hit():void
  {
     super.hit();
     if (isFalling()) startFall();
  }*/

    update(dt) {
        if (!this.visible) return;

        // Ensure speed stays below maximum
        if (this.vel.y > 0 && this.pos.y+this.height > this.worldHeight) 
        {
           this.vel.y = -this.vel.y; // reflect
           this.y = this.worldHeight-this.height;
        }
   
        if (this.vel.y < 0 && this.pos.y < 0)
        {
           this.vel.y = -this.vel.y; // reflect
           this.pos.y = 0;
        }
   
        if  (this.vel.x > 0 && this.pos.x + this.width > this.worldWidth)
        {
           this.vel.x = -this.vel.x;
           this.pos.x = this.worldWidth-this.width;
        }
        if (this.vel.x < 0 && this.pos.x < 0)
        {
           this.vel.x = -this.vel.x;
           this.pos.x = 0;
        }

        this.pos.x += this.vel.x*dt; 
        this.pos.y += this.vel.y*dt; 
    }

    draw(ctx, assetMgr) {
        assetMgr.drawAsset(ctx, this.type, this.pos.x, this.pos.y);
    }
}

