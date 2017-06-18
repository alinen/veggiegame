package veggies
{
   import mx.containers.Canvas;
   import mx.core.BitmapAsset;
   import mx.controls.Image;
   import mx.events.*;

   import flash.events.*;
   import flash.events.MouseEvent;
   import flash.events.KeyboardEvent;
   import flash.ui.Keyboard;   
   import flash.geom.Point;

   import veggies.*;

   public class Level extends Canvas
   {
      //-------------------------------------------------------
      // Embedded Bitmap Assets (imgs will be stored in swf file)
      //-------------------------------------------------------
      [Embed(source='imgs/background2.png')]
      static private var theSceneBackAsset:Class;

      [Embed(source='imgs/background1.png')]
      static private var theSceneFrontAsset:Class;

      [Embed(source='imgs/foreground.png')]
      static private var theSceneGrassAsset:Class;

      public var theSceneBackImg:Image = null;
      public var theSceneFrontImg:Image = null;
      public var theSceneGrassImg:Image = null;
      public var theCar:CarObject = null;

      //-------------------------------------------------------
      // Implementation
      //-------------------------------------------------------
      public static const IN_PROGRESS:int = 0;
      public static const SUCCESS:int = 1;
      public static const FAIL:int = 2;

      public static const BACKGROUND_LAYER:int = 1;
      public static const FOREGROUND_LAYER:int = 2;

      public function Level()
      {
         super();

         clipContent = true;
         horizontalScrollPolicy = "off";
         verticalScrollPolicy = "off";

         loadImages();

         addChildAt(theSceneBackImg, 0);
         addChildAt(theSceneFrontImg, BACKGROUND_LAYER);
         addChildAt(theSceneGrassImg, FOREGROUND_LAYER);
         theCar.addToParent(this, FOREGROUND_LAYER);

         addEventListener(FlexEvent.CREATION_COMPLETE, onCreateCb);
         addEventListener(Event.ADDED_TO_STAGE, onAddToStageCb);
         //addEventListener(MouseEvent.CLICK, onMouseClickCb);
         //addEventListener(MouseEvent.MOUSE_MOVE, onMouseMoveCb);
         //addEventListener(MouseEvent.MOUSE_WHEEL, onMouseWheelCb);

         restart();
      }

      private function loadImages():void
      {
         if (theSceneBackImg == null)
         {
            LogPanel.log("Loading Level images...");

            theSceneBackImg = new Image();
            theSceneFrontImg = new Image();
            theSceneGrassImg = new Image();
            theCar = new CarObject();

            theSceneBackImg.load(new theSceneBackAsset() as BitmapAsset);
            theSceneFrontImg.load(new theSceneFrontAsset() as BitmapAsset);
            theSceneGrassImg.load(new theSceneGrassAsset() as BitmapAsset);
         }
      }

      public function onCreateCb(e:FlexEvent):void
      {
         theCar.y = theSceneBackImg.height-20-theCar.height;
         theCar.x = theSceneBackImg.width/2.0 - theCar.width/2.0;

         theSceneFrontImg.y = theSceneBackImg.height - theSceneFrontImg.height;
         theSceneGrassImg.y = theSceneBackImg.height - theSceneGrassImg.height;
      }

      public function onAddToStageCb(e:Event):void
      {
         stage.addEventListener(KeyboardEvent.KEY_DOWN, reportKeyDown);
         stage.addEventListener(KeyboardEvent.KEY_UP, reportKeyUp);
      }

      public function reportKeyUp(event:KeyboardEvent):void
      {
          if (theCar.isDead()) return;
          if (event.charCode == Keyboard.SPACE)
          {
            theCar.fireTopCannon();
          }
          else if (event.keyCode == Keyboard.LEFT || 
                   event.keyCode == Keyboard.RIGHT)
          {
            theCar.stop();
          }
      }
      
      public function reportKeyDown(event:KeyboardEvent):void
      {
          if (theCar.isDead()) return;
          if (event.keyCode == Keyboard.LEFT)
          {
             theCar.moveLeft();
          }
          else if (event.keyCode == Keyboard.RIGHT)
          {
             theCar.moveRight();
          }
      }
      
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
      }

      public function onMouseWheelCb(event:MouseEvent):void 
      {
         if (theCar.isDead()) return;
         //LATER theCar.jump(event.delta);
      }

      public function restart():void
      {
         theCar.restart();
      }

      public function update(deltaTimeS:Number):int
      {
         theCar.update(deltaTimeS);
         if (theCar.isDead())
         {
            theCar.stop()
            return theCar.visible? IN_PROGRESS: FAIL;
         }

         return IN_PROGRESS;
      }
   }
}

