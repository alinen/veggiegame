class KillerPea extends KillerVeggie {      

    constructor(type, worldW, worldH) {
        super(type, worldW, worldH);
    }

    reset() {
        super.reset();
        this.visible = false;
    }
}

