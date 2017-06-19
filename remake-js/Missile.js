class Missile extends Entity
{      
    constructor(type, worldW, worldH) {
        super(type, worldW, worldH);
        this.visible = false;
    }

    reset() {
        this.visible = false;
    }

    /*
    hit()
    {
     explode();
     visible = false;
    }*/

    _update(dt)
    {
        if (this.pos.y < 0) {
            this.visible = false;
        }
    }
}
