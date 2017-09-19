class KillerVeggie extends Entity {      

    constructor(type, worldW, worldH) {
        super(type, worldW, worldH);
        this.speed = 1000.0;
        this.gameType = this.ENEMY;
    }

    reset() {
        this.pos.x = Math.random()*this.worldWidth;
        this.pos.y = 0;

        var angle = Math.random()*Math.PI;
        this.vel.x = this.speed*Math.cos(angle);
        this.vel.y = this.speed*Math.sin(angle);
        this.alive = true;
        this.visible = true;
    }

    _update(dt) {
        // Ensure speed stays below maximum
        if (this.vel.y > 0 && this.pos.y+this.height() > this.worldHeight) 
        {
           this.vel.y = -this.vel.y; // reflect
           this.y = this.worldHeight-this.height();
        }
   
        if (this.vel.y < 0 && this.pos.y < 0)
        {
           this.vel.y = -this.vel.y; // reflect
           this.pos.y = 0;
        }
   
        if  (this.vel.x > 0 && this.pos.x + this.width() > this.worldWidth)
        {
           this.vel.x = -this.vel.x;
           this.pos.x = this.worldWidth-this.width();
        }
        if (this.vel.x < 0 && this.pos.x < 0)
        {
           this.vel.x = -this.vel.x;
           this.pos.x = 0;
        }
    }
}

