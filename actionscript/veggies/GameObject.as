package veggies
{
   import mx.containers.Canvas;
   import mx.core.BitmapAsset;
   import mx.controls.Image;
   import mx.events.FlexEvent;
   import mx.effects.*;
   import mx.events.*;
   import flash.events.Event;
   import flash.geom.Point;
   import flash.display.BitmapData;

   public class GameObject extends Canvas
   {      
      protected var myDead:int = 2;

      //-------------------------------------------------------
      // Embedded Bitmap Assets (imgs will be stored in swf file)
      //-------------------------------------------------------
      [Embed(source='imgs/explosion.png')]
      static private var theExplosionAsset:Class;

      static public var theBottom:int = 0; // bottom limit
      static public var theRight:int = 0;  // right limit

      protected var myExplosion:Image = new Image();
      protected var myImage:Image = new Image();
      protected var myBitmapData:BitmapData = null;
      protected var myNumHits:int = 1; // How many hits until I die?
      protected var center:Point = new Point(); 

      public function GameObject()
      {
         super();
         clipContent = true;
         horizontalScrollPolicy = "off";
         verticalScrollPolicy = "off";

         addChild(myImage);
         addEventListener(FlexEvent.CREATION_COMPLETE, onCreateCb);
     }

      public function load(bitmap:BitmapAsset):void
      {
         myBitmapData = bitmap.bitmapData;
         myImage.load(bitmap);
      }

      public function onCreateCb(e:FlexEvent):void
      {
         width = myImage.width;
         height = myImage.height;
         center.x = width/2.0;
         center.y = height/2.0;
         loadEffects();
      }

      protected function loadEffects():void
      {
         loadExplosion();
      }

      protected function loadExplosion():void
      {
	 myExplosion.load(new theExplosionAsset as BitmapAsset);
         myExplosion.visible = false;
         parent.addChild(myExplosion);
      }

      public function intersects(other:GameObject):Boolean
      {
         return visible && other.visible && 
                !isDead() && !other.isDead() && 
                myBitmapData.hitTest(new Point(x, y),1, other.myBitmapData, new Point(other.x,other.y), 1);
                //myImage.hitTestObject(other);
      }

      public function explode():void
      {
          myExplosion.visible = true;
          myExplosion.alpha = 1.0;
          myExplosion.x = x + myImage.width/2.0 - (myExplosion.width/2.0); 
          myExplosion.y = y + myImage.height/2.0 - (myExplosion.height/2.0);
      }

      public function restart():void
      {
          alpha = 1;
          visible = true;
          myDead = myNumHits;
          myExplosion.visible = false;
      }

      public function hit():void
      {
          myDead--;
          explode();
      }

      public function isDead():Boolean
      {
          return myDead <= 0; 
      }

      public function update(deltaTimeS:Number):void
      {
         if (myExplosion.visible)
         {
            myExplosion.alpha -= 0.3;
	    myExplosion.scaleX += 0.0;
	    myExplosion.scaleY += 0.0;
            myExplosion.x = x + myImage.width/2.0 - (myExplosion.width/2.0); 
            myExplosion.y = y + myImage.height/2.0 - (myExplosion.height/2.0);
            if (myExplosion.alpha <= 0) 
            {
               myExplosion.visible = false;
            }
         }

         if (isDead())
         {
            alpha -= deltaTimeS;
            if (alpha < 0) visible = false;
         }
      }
   }
}

