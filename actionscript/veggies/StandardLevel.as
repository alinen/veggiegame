package veggies
{
   import mx.events.FlexEvent;
   import mx.core.BitmapAsset;
   import mx.controls.Image;
   import veggies.*;

   public class StandardLevel extends Level
   {
      //-------------------------------------------------------
      // Embedded Bitmap Assets (imgs will be stored in swf file)
      //-------------------------------------------------------
      [Embed(source='imgs/killerCarrot.png')]
      static private var theCarrotAsset:Class;

      [Embed(source='imgs/killerTomato.png')]
      static private var theTomatoAsset:Class;

      [Embed(source='imgs/killerOnion.png')]
      static private var theOnionAsset:Class;

      [Embed(source='imgs/killerHotpepper.png')]
      static private var theHotpepperAsset:Class;

      [Embed(source='imgs/killerEggplant.png')]
      static private var theEggplantAsset:Class;

      [Embed(source='imgs/killerBroccoli.png')]
      static private var theBroccoliAsset:Class;

      //-------------------------------------

      [Embed(source='imgs/worriedCarrot.png')]
      static private var theWorriedCarrotAsset:Class;

      [Embed(source='imgs/worriedTomato.png')]
      static private var theWorriedTomatoAsset:Class;

      [Embed(source='imgs/worriedOnion.png')]
      static private var theWorriedOnionAsset:Class;

      [Embed(source='imgs/worriedHotpepper.png')]
      static private var theWorriedHotpepperAsset:Class;

      [Embed(source='imgs/worriedEggplant.png')]
      static private var theWorriedEggplantAsset:Class;

      [Embed(source='imgs/worriedBroccoli.png')]
      static private var theWorriedBroccoliAsset:Class;

      //-------------------------------------------------------
      // Implementation
      //-------------------------------------------------------
      public var myVeggies:Array = new Array();
      
      public function StandardLevel()
      {
         super();
      }

      public function loadCarrots(num:int):void 
         { loadObjects(num, theCarrotAsset, theWorriedCarrotAsset); }

      public function loadTomatoes(num:int):void 
         { loadObjects(num, theTomatoAsset, theWorriedTomatoAsset); }

      public function loadOnions(num:int):void 
         { loadObjects(num, theOnionAsset, theWorriedOnionAsset); }

      public function loadHotpeppers(num:int):void 
         { loadObjects(num, theHotpepperAsset, theWorriedHotpepperAsset); }

      public function loadBroccoli(num:int):void 
         { loadObjects(num, theBroccoliAsset, theWorriedBroccoliAsset); }

      public function loadEggplants(num:int):void 
         { loadObjects(num, theEggplantAsset, theWorriedEggplantAsset); }

      private function loadObjects(num:int, c:Class, calt:Class = null):void
      {
	 var i:int;
         var v:VeggieObject;
	 for (i = 0; i < num; i++)
	 {
	    v = new VeggieObject();
	    v.load(new c as BitmapAsset);
            if (calt) v.loadWorried(new calt as BitmapAsset);
            addChild(v); 
	    myVeggies.push(v)
	 }
      }

      override public function onCreateCb(e:FlexEvent):void
      {
         super.onCreateCb(e);
         GameObject.theBottom = theSceneBackImg.height - 20;
         GameObject.theRight = theSceneBackImg.width;
      }

      override public function restart():void
      {
         super.restart();
         VeggieObject.theCar = theCar;  // Hack
         for (var i:int = 0; i < myVeggies.length; ++i)
         {
            myVeggies[i].restart();
            myVeggies[i].x = Math.random()*theSceneBackImg.width;
            myVeggies[i].y = 0;
         }
      }

      override public function update(deltaTimeS:Number):int
      {
         if (super.update(deltaTimeS) == FAIL) return FAIL;
 
         VeggieObject.avoid(myVeggies);
         var i:int;
         for (i = 0; i < myVeggies.length; ++i)
            myVeggies[i].update(deltaTimeS);

         var levelSuccess:Boolean = true;
         for (i = 0; i < myVeggies.length; ++i)
         {
            if (theCar.intersects(myVeggies[i])) 
            { 
               theCar.hit();
            }
            if (theCar.missileIntersects(myVeggies[i])) 
            {
               myVeggies[i].hit(); 
            }
            levelSuccess = levelSuccess && myVeggies[i].isDead() && !myVeggies[i].visible;
         }
         if (levelSuccess) return SUCCESS;
         return IN_PROGRESS;
      }
   }
}
