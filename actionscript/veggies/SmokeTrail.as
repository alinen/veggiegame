package veggies
{
   import flash.display.DisplayObjectContainer;
   import flash.geom.Point;
   import mx.controls.Image;
   import mx.core.BitmapAsset;

   public class SmokeTrail
   {
      //-------------------------------------------------------
      // Embedded Bitmap Assets (imgs will be stored in swf file)
      //-------------------------------------------------------
      [Embed(source='imgs/smokePuff.png')]
      static private var theSmokePuffAsset:Class;

      private var myImages:Array = new Array(5); 
      private var myActive:Boolean = false;
      private var myLastPt:Point = new Point(0,0); 
      private var myNumPuffs:int = 0;

      public function SmokeTrail()
      {
         for (var i:int = 0; i < myImages.length; i++)
         {
            myImages[i] = new Image();
            myImages[i].load(new theSmokePuffAsset as BitmapAsset);
            myImages[i].visible = false;
         }
      }

      public function isActive():Boolean
      {
         return myActive;
      }

      public function reset():void
      {
         myActive = false;
         myNumPuffs = 0;
	 for (var i:int = 0; i < myImages.length; i++)
	 {
	    myImages[i].visible = false;
         }
      }

      public function addTo(p:DisplayObjectContainer):void
      {
         // add out images to parent
         for (var i:int = 0; i < myImages.length; i++)
         {
            p.addChildAt(myImages[i], Level.FOREGROUND_LAYER+1);
         }
      }

      public function initialize(x:int, y:int):void
      {
         // initialize our trail tail position
         myLastPt.x = x;
         myLastPt.y = y;
         myActive = true;
         addPuff(x, y);
      }

      public function addPuff(x:int, y:int):void
      {
         myImages[myNumPuffs].visible = true;
         myImages[myNumPuffs].alpha = 1.5;
         myImages[myNumPuffs].x = x - myImages[0].width/2.0;
         myImages[myNumPuffs].y = y - myImages[0].height/2.0;

         myNumPuffs = (myNumPuffs + 1) % myImages.length;
      }

      public function update(x:int, y:int, deltaTimeS:Number):void
      {
         for (var i:int = 0; i < myImages.length; i++)
         {
            if (myImages[i].visible)
            {
               myImages[i].alpha -= deltaTimeS;
            }
         }

         var threshold:Number = 30; //myImages[0].width;
         var distance:Number = Math.sqrt(
             (myLastPt.x - x)*(myLastPt.x - x) + (myLastPt.y - y)*(myLastPt.y - y));

         if (distance > threshold)
         {
            addPuff(x, y);
            myLastPt.x = x;
            myLastPt.y = y;
         }
      }
   }
}
