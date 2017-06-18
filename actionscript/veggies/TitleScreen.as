package veggies
{
   import mx.containers.Canvas;
   import mx.core.BitmapAsset;
   import mx.controls.Image;
   import mx.controls.Label;

   import flash.events.*;
   import flash.events.KeyboardEvent;
   import flash.events.MouseEvent;
   import mx.events.FlexEvent;

   import veggies.LogPanel;

   public class TitleScreen extends Canvas
   {
      //-------------------------------------------------------
      // Embedded Bitmap Assets (imgs will be stored in swf file)
      //-------------------------------------------------------
      [Embed(source='imgs/titlePage.png')]
      static private var theTitlePageAsset:Class;

      [Embed(source='imgs/bigKillerTomato.png')]
      static private var theDemoTomatoAsset:Class;

      static public var theBackgroundImg:Image = null;
      static public var theTomatoImg:Image = null;

      //-------------------------------------------------------
      // Implementation
      //-------------------------------------------------------
      static public const IN_PROGRESS:int = 0;
      static public const COMPLETE:int = 1;
      private var myStatus:int = IN_PROGRESS;
      private var myTomatoScale:Number = 0.1;

      private var myInstructionLabel1:Label = new Label();
      private var myInstructionLabel2:Label = new Label();
      private var myInstructionLabel3:Label = new Label();

      public function TitleScreen()
      {
         super();
         loadImages();

         percentWidth = 100.0;
         percentHeight = 100.0;
         clipContent = true;
         horizontalScrollPolicy = "off";
         verticalScrollPolicy = "off";

         opaqueBackground = 0x000000;

         myInstructionLabel1.setStyle("fontSize", 12);
         myInstructionLabel1.setStyle("fontFamily", "Arial");
         myInstructionLabel1.setStyle("fontWeight", "bold");
         myInstructionLabel1.setStyle("fontStyle", "normal");
         myInstructionLabel1.setStyle("color", "0xFA0000");
         myInstructionLabel1.text = "Left/Right arrow keys to move";

         myInstructionLabel2.setStyle("fontSize", 12);
         myInstructionLabel2.setStyle("fontFamily", "Arial");
         myInstructionLabel2.setStyle("fontWeight", "bold");
         myInstructionLabel2.setStyle("fontStyle", "normal");
         myInstructionLabel2.setStyle("color", "0xFA0000");
         myInstructionLabel2.text = "Spacebar to shoot";

         myInstructionLabel3.setStyle("fontSize", 12);
         myInstructionLabel3.setStyle("fontFamily", "Arial");
         myInstructionLabel3.setStyle("fontWeight", "bold");
         myInstructionLabel3.setStyle("fontStyle", "normal");
         myInstructionLabel3.setStyle("color", "0xFA0000");
         myInstructionLabel3.text = "Click to begin";

         addChild(myInstructionLabel1);
         addChild(myInstructionLabel2);
         addChild(myInstructionLabel3);
         addChildAt(theTomatoImg, 0);
         addChildAt(theBackgroundImg, 0);
         addEventListener(MouseEvent.CLICK, onMouseClick);
         addEventListener(FlexEvent.CREATION_COMPLETE, onCreateCb);
         addEventListener(Event.ADDED_TO_STAGE, onAddToStageCb);
         restart();
      }

      private function loadImages():void
      {
         if (theBackgroundImg == null)
         {
            LogPanel.log("Loading title screen images...");
            theBackgroundImg = new Image();
            theTomatoImg = new Image();

            theBackgroundImg.load(new theTitlePageAsset() as BitmapAsset);
            theTomatoImg.load(new theDemoTomatoAsset() as BitmapAsset);
         }
      }

      public function onCreateCb(e:FlexEvent):void
      {
         // Center Image now that we are loaded
         theBackgroundImg.x = (width/2.0 - theBackgroundImg.width/2.0);
         theBackgroundImg.y = (height/2.0 - theBackgroundImg.height/2.0);
         myInstructionLabel1.x = width/2 - myInstructionLabel1.textWidth/2;
         myInstructionLabel1.y = height - myInstructionLabel1.textHeight - 55;
         myInstructionLabel2.x = width/2 - myInstructionLabel2.textWidth/2;
         myInstructionLabel2.y = height - myInstructionLabel2.textHeight - 40;
         myInstructionLabel3.x = width/2 - myInstructionLabel3.textWidth/2;
         myInstructionLabel3.y = height - myInstructionLabel3.textHeight - 25;
      }

      public function onAddToStageCb(e:Event):void
      {
         stage.addEventListener(KeyboardEvent.KEY_UP, reportKeyUp);
      }

      public function reportKeyUp(event:KeyboardEvent):void
      {
         myStatus = COMPLETE; 
      }

      public function restart():void
      {
         myStatus = IN_PROGRESS; 
         theTomatoImg.x = 50;
         theTomatoImg.y = 50;
         theTomatoImg.scaleX = 0.1;
         theTomatoImg.scaleY = 0.1;
         
         theTomatoImg
      }

      public function onMouseClick(e:MouseEvent):void
      {
         myStatus = COMPLETE; 
      }

      public function update(deltaTimeS:Number):Number
      {
         theTomatoImg.x += 100*deltaTimeS*theTomatoImg.scaleX;
         theTomatoImg.y += 50*deltaTimeS*theTomatoImg.scaleY;
         theTomatoImg.scaleX += 0.25*deltaTimeS;
         theTomatoImg.scaleY += 0.25*deltaTimeS;

         if (theTomatoImg.x > width) restart();
         return myStatus;
      }
   }
}
