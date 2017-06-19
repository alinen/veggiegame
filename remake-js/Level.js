class Level 
{
    constructor(assetMgr, canvas, options)
    {
        this.veggies = new Array();
        for (var i = 0; i < 2; i++) {
            this.veggies.push(new KillerVeggie(assetMgr.KILLER_HOTPEPPER, assetMgr, canvas));
            this.veggies.push(new KillerVeggie(assetMgr.KILLER_ONION, assetMgr, canvas));
        }
        this.init();
    }
  
    init() {
        for (var i = 0; i < this.veggies.length; ++i)
        {
            this.veggies[i].reset();
        }
    }
  
    keyDown(e)
    {
        /*
        if (this.car.isDead()) return;
        if (event.keyCode == Keyboard.LEFT)
        {
           theCar.moveLeft();
        }
        else if (event.keyCode == Keyboard.RIGHT)
        {
           theCar.moveRight();
        }
        if (event.charCode == Keyboard.SPACE)
        {
          theCar.fireTopCannon();
        }
        else if (event.keyCode == Keyboard.LEFT || 
                 event.keyCode == Keyboard.RIGHT)
        {
          theCar.stop();
        }*/
    }
  
    /*
    public function onMouseClickCb(e:MouseEvent):void
    {
       if (theCar.isDead()) return;
       theCar.fireTopCannon();
       //LATER theCar.fireSideCannons();
    }
  
    public function onMouseMoveCb(e:MouseEvent):void
    {
       if (theCar.isDead()) return;
  
       var local:Point = globalToLocal(new Point(e.stageX, e.stageY));
       theCar.mouseMove(local);
    }*/

    update(dt)
    {
       for (var i = 0; i < this.veggies.length; i++) {
           this.veggies[i].update(dt);
       }
     /*
     if (theCar.isDead())
     {
        theCar.stop()
        return theCar.visible? IN_PROGRESS: FAIL;
     }

     return IN_PROGRESS;
     */
    }

    draw(ctx, assetMgr) {
        for (var i = 0; i < this.veggies.length; i++) {
            this.veggies[i].draw(ctx, assetMgr);
        }
    }
}

