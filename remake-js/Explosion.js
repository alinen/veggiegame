class Explosion extends Entity
{      
    constructor(type, worldW, worldH) {
        super(type, worldW, worldH);
        this.visible = false;
        this.timer = 0.0;
    }

    reset() {
        this.timer = 0.0;
    }

    _update(dt)
    {
        this.timer += dt;
        if (this.timer > 0.1) {
            this.visible = false;
        }
    }
}
