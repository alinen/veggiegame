package veggies
{
   import mx.events.FlexEvent;
   import mx.core.BitmapAsset;
   import mx.controls.Image;
   import veggies.*;

   public class PeapodLevel extends Level
   {
      //-------------------------------------------------------
      // Implementation
      //-------------------------------------------------------
      public var myPeapod:PeapodObject = new PeapodObject();
      
      public function PeapodLevel()
      {
         super();
         addChildAt(myPeapod, BACKGROUND_LAYER);
      }

      public function loadPeas(num:int):void 
      { 
         // Load peapod
         myPeapod.loadPeas(num);
      }

      override public function onCreateCb(e:FlexEvent):void
      {
         super.onCreateCb(e);
         GameObject.theBottom = theSceneBackImg.height - 20;
         GameObject.theRight = theSceneBackImg.width;

         myPeapod.getPath().width = GameObject.theRight;
         myPeapod.getPath().height = GameObject.theBottom;
      }

      override public function restart():void
      {
         super.restart();
         myPeapod.restart();
         VeggieObject.theCar = theCar; // Hack
      }

      override public function update(deltaTimeS:Number):int
      {
         if (super.update(deltaTimeS) == FAIL) return FAIL;

         myPeapod.update(deltaTimeS);
         myPeapod.checkIntersections(theCar);
         return myPeapod.isDead()? SUCCESS : IN_PROGRESS;
      }
   }
}
