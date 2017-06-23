class Missile extends Entity
{      
    constructor(type, worldW, worldH) {
        super(type, worldW, worldH);
        this.visible = false;
        this.vel.y = -1000;
        this.firePos = null;
    }

    reset() {
        this.visible = false;
        this.firePos = null;
    }

    fire(car) {
        var x = car.pos.x + (car.width() - this.width()) * 0.5;
        var y = car.pos.y - this.height();
        this.firePos = {x:x, y:y};
    }

    update(dt) {
        if (this.firePos !== null) {
            this.visible = true;
            this.pos.x = this.firePos.x;
            this.pos.y = this.firePos.y;
            this.firePos = null;
        }
        super.update(dt);
    }

    _update(dt)
    {
        if (this.pos.y < 0) {
            this.visible = false;
        }
    }
}
