
class AssetMgr
{
    constructor() {
        this.SCENE = 0;
        this.BUILDINGS = 1;
        this.BANDAID_H = 2;
        this.BANDAID_V = 3;
        this.BIGPEA_LEFT_CLOSED = 4;
        this.BIGPEA_LEFT_OPEN = 5;
        this.BIGPEA_RIGHT_OPEN = 6;
        this.BIGPEA_RIGHT_CLOSED = 7;
        this.BUILDINGS = 8;
        this.CAR = 9;
        this.EXPLOSION = 10;
        this.KILLER_BROCCOLI = 11;
        this.KILLER_CARROT = 12;
        this.KILLER_EGGPLANT = 13;
        this.KILLER_HOTPEPPER = 14;
        this.KILLER_ONION = 15;
        this.KILLER_PEA = 16;
        this.KILLER_TOMATO = 17;
        this.MISSILE = 18;
        this.TITLE_TOMATO = 19;
        this.TITLE_PAGE = 20;
        this.NUM_IMAGES = 21;

        this.images = new Array(this.NUM_IMAGES);
    }

    load(id, name) {
        var img = new Image(); 
        img.onload = (function(id, container) {
            console.log("loaded "+name+" "+id);
            container[id] = img;
        })(id, this.images);
        img.src = name;
    }

    ready() {
        for (var i = 0; i < this.images.length; i++) {
            if (this.images[i] === null) return false;
        }
        return true;
    }

    height(id) {
        return this.images[id].height;
    }

    width(id) {
        return this.images[id].width;
    }

    loadAssets() {
        for (var i = 0; i < this.images.length; i++) {
            this.images[i] = null;
        }

        this.load(this.SCENE, 'imgs/scene1.png');
        this.load(this.BANDAID_H, 'imgs/band-aidHT.gif');
        this.load(this.BANDAID_V, 'imgs/band-aidVT.gif');
        this.load(this.BIGPEA_LEFT_CLOSED, 'imgs/bigPeaLeftClosedT.gif');
        this.load(this.BIGPEA_LEFT_OPEN, 'imgs/bigPeaLeftOpenT.gif');
        this.load(this.BIGPEA_RIGHT_OPEN, 'imgs/bigPeaRightOpenT.gif');
        this.load(this.BIGPEA_RIGHT_CLOSED, 'imgs/bigPeaRightClosedT.gif');
        this.load(this.BUILDINGS, 'imgs/buildingsT.png');
        this.load(this.CAR, 'imgs/carT.gif');
        this.load(this.EXPLOSION, "imgs/ExplosionT.png");
        this.load(this.KILLER_BROCCOLI, "imgs/killerBroccoliT.gif");
        this.load(this.KILLER_CARROT, "imgs/killerCarrotT.gif");
        this.load(this.KILLER_EGGPLANT, "imgs/killerEggplantT.gif");
        this.load(this.KILLER_HOTPEPPER, "imgs/killerHotpepperT.gif");
        this.load(this.KILLER_ONION, "imgs/killerOnionT.gif");
        this.load(this.KILLER_PEA, "imgs/killerPeaT.gif");
        this.load(this.KILLER_TOMATO, "imgs/killerTomatoT.gif");
        this.load(this.MISSILE, "imgs/missileT.gif");
        this.load(this.TITLE_PAGE, "imgs/titlePage.png");
        this.load(this.TITLE_TOMATO, 'imgs/demoTomatoT.png');
    }

    drawAsset(ctx, id, x, y, size) {
        var scale = 1;
        if (size !== undefined) {
            scale = size;
        } 
        var w = this.images[id].width;
        var h = this.images[id].height;
        ctx.drawImage(this.images[id], x, y, w*scale, h*scale);
    }
}
