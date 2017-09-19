
class AssetMgr98 extends AssetMgr 
{
    constructor() {
        super();
        this.FONT_SIZE_BIG = '50';
        this.FONT_SIZE_SMALL = '18';
    }

    loadAssets() {
        for (var i = 0; i < this.images.length; i++) {
            this.images[i] = null;
        }

        this.load(this.SCENE, 'imgs98/scene1.png');
        this.load(this.BANDAID_H, 'imgs98/band-aidHT.gif');
        this.load(this.BANDAID_V, 'imgs98/band-aidVT.gif');
        this.load(this.BIGPEA_LEFT_CLOSED, 'imgs98/bigPeaLeftClosedT.gif');
        this.load(this.BIGPEA_LEFT_OPEN, 'imgs98/bigPeaLeftOpenT.gif');
        this.load(this.BIGPEA_RIGHT_OPEN, 'imgs98/bigPeaRightOpenT.gif');
        this.load(this.BIGPEA_RIGHT_CLOSED, 'imgs98/bigPeaRightClosedT.gif');
        this.load(this.BUILDINGS, 'imgs98/buildingsT.png');
        this.load(this.CAR, 'imgs98/carT.gif');
        this.load(this.EXPLOSION, "imgs98/ExplosionT.png");
        this.load(this.KILLER_BROCCOLI, "imgs98/killerBroccoliT.gif");
        this.load(this.KILLER_CARROT, "imgs98/killerCarrotT.gif");
        this.load(this.KILLER_EGGPLANT, "imgs98/killerEggplantT.gif");
        this.load(this.KILLER_HOTPEPPER, "imgs98/killerHotpepperT.gif");
        this.load(this.KILLER_ONION, "imgs98/killerOnionT.gif");
        this.load(this.KILLER_PEA, "imgs98/killerPeaT.gif");
        this.load(this.KILLER_TOMATO, "imgs98/killerTomatoT.gif");
        this.load(this.MISSILE, "imgs98/missileT.gif");
        this.load(this.TITLE_PAGE, "imgs98/titlePage.png");
        this.load(this.TITLE_TOMATO, 'imgs98/demoTomatoT.png');
    }
}
