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
        this.vel.x = -800;
    }

    moveRight()
    {
        this.vel.x = 800;
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
}
  
