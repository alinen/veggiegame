
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
        this.NUM_ASSETS = 20;

        this.images = new Array(this.NUM_ASSETS);
    }

    load(id, name) {
        var a = document.getElementById("assets");
        var svgDoc = a.contentDocument;

        var element = svgDoc.getElementById(name);
        if (element === null) {
            console.log("Cannot find element "+name);
        } else {
            
            var xforms = element.transform.baseVal; // An SVGTransformList
            var transform = xforms.consolidate();
            if (transform === null) {
                element.setAttribute("transform", "matrix(1,0,0,1,0,0)");
                xforms = element.transform.baseVal; // An SVGTransformList
                transform = xforms.consolidate();
            }

            //console.log(element.id+" layer pos "+layerm.e+" "+layerm.f);
            //console.log(element.id+" bbox "+element.getBBox().x+" "+element.getBBox().y+" "+element.getBBox().width+" "+element.getBBox().height );

            // almost works? except for horizontal bandaid
            /*
            var originEle = svgDoc.getElementById('gBackground');
            var originBBox = originEle.getBBox();
            var transformx = originBBox.x - (transform.matrix.a * element.getBBox().x + transform.matrix.c * element.getBBox().y + transform.matrix.e);
            var heighttest = (transform.matrix.b * element.getBBox().width + transform.matrix.d * element.getBBox().height);
            var transformy = 480 + originBBox.y -  heighttest - (transform.matrix.b * element.getBBox().x + transform.matrix.d * element.getBBox().y + transform.matrix.f);
            // should be zero
            console.log(element.id+" bbox converted "+transformx+" "+transformy);
            */

            /*
            var toBackground = element.getTransformToElement(originEle);
            var transformheight = toBackground.b * element.getBBox().width + toBackground.d * element.getBBox().height;
            var transformx = toBackground.a * element.getBBox().x + toBackground.c * element.getBBox().y + toBackground.e;
            var transformy = 480 - transformheight + toBackground.b * element.getBBox().x + toBackground.d * element.getBBox().y + toBackground.f;
            */

            this.images[id] = {
                img: element, 
                matrix: {a: transform.matrix.a, 
                         b: transform.matrix.b, 
                         c: transform.matrix.c,
                         d: transform.matrix.d,
                         e: transform.matrix.e,
                         f: transform.matrix.f
                }
            };

            this.hide(id);
        }
    }

    ready() {
        return true;
    }

    height(id) {
        return this.images[id].img.getBBox().height;
    }

    width(id) {
        return this.images[id].img.getBBox().width;
    }

    originx(id) {
        return this.images[id].img.getBBox().x;
    }

    originy(id) {
        return this.images[id].img.getBBox().y;
    }

    matrix(id) {
        return this.images[id].matrix;
    }

    hide(id) {
        this.setPosition(id, -500,-500);
    }

    loadAssets() {
        for (var i = 0; i < this.images.length; i++) {
            this.images[i] = null;
        }

        var a = document.getElementById("assets");
        var svgDoc = a.contentDocument;
    
        this.load(this.SCENE, 'gBackground');
        this.load(this.BANDAID_H, 'gBandaidH');
        this.load(this.BANDAID_V, 'gBandaidV');
        this.load(this.BIGPEA_LEFT_CLOSED, 'gBigPeaLeftClosed');
        this.load(this.BIGPEA_LEFT_OPEN, 'gBigPeaLeftOpen');
        this.load(this.BIGPEA_RIGHT_OPEN, 'gBigPeaRightOpen');
        this.load(this.BIGPEA_RIGHT_CLOSED, 'gBigPeaRightClosed');
        this.load(this.BUILDINGS, 'gBuildings');
        this.load(this.CAR, 'gCar');
        this.load(this.EXPLOSION, "gExplosion");
        this.load(this.KILLER_BROCCOLI, "gBroccoli");
        this.load(this.KILLER_CARROT, "gCarrot");
        this.load(this.KILLER_EGGPLANT, "gEggplant");
        this.load(this.KILLER_HOTPEPPER, "gHotpepper");
        this.load(this.KILLER_ONION, "gOnion");
        this.load(this.KILLER_PEA, "gPea");
        this.load(this.KILLER_TOMATO, "gTomato");
        this.load(this.MISSILE, "gMissile");
        this.load(this.TITLE_TOMATO, 'gTitleTomato');
    }

    setPosition(id, newx, newy) {
        var xforms = this.images[id].img.transform.baseVal; // An SVGTransformList
        var transform = xforms.consolidate();
        if (transform)
        {
            var x = this.images[id].matrix.e;
            var y = this.images[id].matrix.f;

            var currentx = transform.matrix.e;
            var currenty = transform.matrix.f;
            transform.matrix.e = x + newx;
            transform.matrix.f = y - this.height(this.SCENE) + newy + this.height(id);
            //console.log("AFTER: "+m.e+" "+m.f);
        }
    }

    setScale(id, s) {
        var element = this.images[id];
        var xforms = element.img.transform.baseVal; // An SVGTransformList
        var xform = xforms.consolidate();
        xform.matrix.a = s * element.matrix.a;
        xform.matrix.b = element.matrix.b;
        xform.matrix.c = element.matrix.c;
        xform.matrix.d = s* element.matrix.d;
    }

    drawAsset(id, newx, newy, size) {
        this.setPosition(id, newx, newy);
        //if (size !== undefined) {
            //this.setScale(id, size);
        //} 
    }
}
