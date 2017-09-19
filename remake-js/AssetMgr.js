
class AssetMgr
{
    constructor() {
        this.SCENE = 0;
        this.BANDAID_H = 1;
        this.BANDAID_V = 2;
        this.BIGPEA_LEFT_CLOSED = 3;
        this.BIGPEA_LEFT_OPEN = 4;
        this.BIGPEA_RIGHT_OPEN = 5;
        this.BIGPEA_RIGHT_CLOSED = 6;
        this.BUILDINGS = 7;
        this.CAR = 8;
        this.EXPLOSION = 9;
        this.KILLER_BROCCOLI = 10;
        this.KILLER_CARROT = 11;
        this.KILLER_EGGPLANT = 12;
        this.KILLER_HOTPEPPER = 13;
        this.KILLER_ONION = 14;
        this.KILLER_PEA = 15;
        this.KILLER_TOMATO = 16;
        this.MISSILE = 17;
        this.TITLE_TOMATO = 18;
        this.TITLE_PAGE = 19;
        this.NUM_IMAGES = 20;

        this.FONT_SIZE_BIG = '100';
        this.FONT_SIZE_SMALL = '20';

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

        this.load(this.SCENE, 'imgs/gBackground.png');
        this.load(this.BANDAID_H, 'imgs/gBandaidH.png');
        this.load(this.BANDAID_V, 'imgs/gBandaidV.png');
        this.load(this.BIGPEA_LEFT_CLOSED, 'imgs/gBigPeaLeftClosed.png');
        this.load(this.BIGPEA_LEFT_OPEN, 'imgs/gBigPeaLeftOpen.png');
        this.load(this.BIGPEA_RIGHT_OPEN, 'imgs/gBigPeaRightOpen.png');
        this.load(this.BIGPEA_RIGHT_CLOSED, 'imgs/gBigPeaRightClosed.png');
        this.load(this.BUILDINGS, 'imgs/gBuildings.png');
        this.load(this.CAR, 'imgs/gCar.png');
        this.load(this.EXPLOSION, "imgs/gExplosion.png");
        this.load(this.KILLER_BROCCOLI, "imgs/gBroccoli.png");
        this.load(this.KILLER_CARROT, "imgs/gCarrot.png");
        this.load(this.KILLER_EGGPLANT, "imgs/gEggplant.png");
        this.load(this.KILLER_HOTPEPPER, "imgs/gHotpepper.png");
        this.load(this.KILLER_ONION, "imgs/gOnion.png");
        this.load(this.KILLER_PEA, "imgs/gPea.png");
        this.load(this.KILLER_TOMATO, "imgs/gTomato.png");
        this.load(this.MISSILE, "imgs/gMissile.png");
        this.load(this.TITLE_PAGE, "imgs/titlePage.png");
        this.load(this.TITLE_TOMATO, 'imgs/gTitleTomato.png');
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
