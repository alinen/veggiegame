package veggies
{
   // veggies/Game.as    
   import flash.utils.*;
   import flash.display.DisplayObject;
   import flash.events.*;
   import mx.events.*;

   import mx.core.BitmapAsset;
   import mx.controls.Image;
   import mx.containers.Canvas;
   import mx.controls.Label;
   import veggies.TitleScreen;
   import veggies.LogPanel;
   import veggies.Level;
   import veggies.StandardLevel;

   public class Game extends Canvas
   {
      [Embed(source='imgs/tank.png')]
      static private var theCarAsset:Class;

      private var myTitleScreen:TitleScreen = new TitleScreen();
      private var myLevels:Array = new Array();
      private var myIsPlaying:Boolean = false;
      private var myLevelIndex:int = 0;

      private var myNumLives:int = 3;
      private var myCount:int = 0;
      private var myNumLevelsComplete:int = 1;

      private var myNumLivesImage:Image = new Image();
      private var myNumLivesLabel:Label = new Label();
      private var myScoreLabel:Label = new Label();
      private var myInfoLabel:Label = new Label();

      private var myFrameInterval:Number = 0.05;

      public function Game()
      {
         super();

         clipContent = true;
         horizontalScrollPolicy = "off";
         verticalScrollPolicy = "off";

         var level1:StandardLevel = new StandardLevel();
         level1.loadCarrots(2);
         level1.loadTomatoes(2);

         var level2:StandardLevel = new StandardLevel();
         level2.loadOnions(2);
         level2.loadHotpeppers(3);

         var level3:StandardLevel = new StandardLevel();
         level3.loadBroccoli(3);
         level3.loadEggplants(3);

         var level4:StandardLevel = new StandardLevel();
         level4.loadOnions(2);
         level4.loadEggplants(3);
         level4.loadHotpeppers(2);

         var level5:StandardLevel = new StandardLevel();
         level5.loadBroccoli(2);
         level5.loadCarrots(2);
         level5.loadHotpeppers(2);
         level5.loadEggplants(2);

         var level6:PeapodLevel = new PeapodLevel();
         level6.loadPeas(10);

         myLevels.push(level1);
         myLevels.push(level2);
         myLevels.push(level3);
         myLevels.push(level4);
         myLevels.push(level5);
         myLevels.push(level6);

         myNumLivesImage.load(new theCarAsset as BitmapAsset);
         myNumLivesImage.visible = false;
         myNumLivesImage.scaleX = 0.4;
         myNumLivesImage.scaleY = 0.4;
         myNumLivesImage.x = 0;
         myNumLivesImage.y = 0;

         myNumLivesLabel.setStyle("fontSize", 12);
         myNumLivesLabel.setStyle("fontFamily", "Arial");
         myNumLivesLabel.setStyle("fontWeight", "bold");
         myNumLivesLabel.setStyle("fontStyle", "normal");
         myNumLivesLabel.setStyle("color", "0x000000");

         myScoreLabel.setStyle("fontSize", 12);
         myScoreLabel.setStyle("fontFamily", "Arial");
         myScoreLabel.setStyle("fontWeight", "bold");
         myScoreLabel.setStyle("fontStyle", "normal");
         myScoreLabel.setStyle("color", "0x000000");
         myScoreLabel.text = "Level 1";

         myInfoLabel.setStyle("fontSize", 40);
         myInfoLabel.setStyle("fontFamily", "Times New Roman");
         myInfoLabel.setStyle("fontWeight", "bold");
         myInfoLabel.setStyle("fontStyle", "normal");
         myInfoLabel.setStyle("color", "0x000000");
         myInfoLabel.visible = false;

         addChild(myInfoLabel);
         addChild(myScoreLabel);
         addChild(myNumLivesImage);
         addChild(myNumLivesLabel);
         addChildAt(myTitleScreen, 0);
         for (var i:int = 0; i < myLevels.length; i++) addChildAt(myLevels[i], 0);

         addEventListener(Event.ADDED_TO_STAGE, onAddToStageCb);
         addEventListener(FlexEvent.CREATION_COMPLETE, onCreateCb);
      }

      public function onCreateCb(e:FlexEvent):void
      {
         myNumLivesLabel.x = myNumLivesImage.width + 5;
         myScoreLabel.x = width - myScoreLabel.width-10;
         myInfoLabel.x = width/2 - myInfoLabel.textWidth/2;
         myInfoLabel.y = height/3 - myInfoLabel.textHeight/2;
      }

      public function onAddToStageCb(e:Event):void
      {
         myFrameInterval = 1.0/stage.frameRate;
         LogPanel.log("Frame Rate: "+stage.frameRate);
         stage.addEventListener(Event.ENTER_FRAME, step);
      }

      public function step(e:Event):void
      {
         var deltaTimeS:Number = myFrameInterval;

         if (myIsPlaying)
         {
            myIsPlaying = stepGame(deltaTimeS);
         }
         else
         {
            myIsPlaying = stepTitleScreen(deltaTimeS);
         }
      }

      public function stepTitleScreen(deltaTimeS:Number):Boolean
      {
         var status:int = myTitleScreen.update(deltaTimeS);
         if (status == TitleScreen.COMPLETE)
         {
            startGame();
            return true;
         }
         return false;
      }

      public function stepGame(deltaTimeS:Number):Boolean
      {
         myNumLivesLabel.text = "X "+myNumLives.toString();

         // Display player status
         if (myLevels[myLevelIndex].theCar.isDead())
         {
            myInfoLabel.visible = true;
            if (myNumLives-1 <= 0)
            {
               myInfoLabel.text = "Game Over";
            } 
            else
            {
               myInfoLabel.text = "You've been hit!";
            }
            myInfoLabel.x = width/2 - myInfoLabel.textWidth/2;
            myInfoLabel.y = height/3 - myInfoLabel.textHeight/2;
         }

         var status:int = myLevels[myLevelIndex].update(deltaTimeS);
         if (status == Level.SUCCESS)
         {
            startNextLevel();
            return true;
         }
         else if (status == Level.FAIL)
         {
            myInfoLabel.visible = false;

            if (--myNumLives <= 0) 
            {
               endGame();
               return false;
            }
            else restartCurrentLevel();
         }
         return true;
      }

      public function startGame():void
      {
         myNumLives = 3;
         myCount = 0;
         myLevelIndex = 0;
         myNumLivesImage.visible = true;
         var level:Level = myLevels[myLevelIndex];
         level.restart();
         showOnScreen(level);
      }

      public function endGame():void
      {
         myTitleScreen.restart();
         myNumLivesImage.visible = false;
         showOnScreen(myTitleScreen);
      }

      public function restartCurrentLevel():void
      {
         var level:Level = myLevels[myLevelIndex];
         level.restart();
         showOnScreen(level);
      }

      public function startNextLevel():void
      {
         myCount++;
         if (myCount % myLevels.length == 0)
         {
             VeggieObject.theVeggieHitNumber++;
             myNumLives++;
         }

         myLevelIndex = (myLevelIndex+1)%myLevels.length;
         LogPanel.log("startNextLevel: "+myLevelIndex);
         var level:Level = myLevels[myLevelIndex];
         myScoreLabel.text = "Level "+(myCount+1);
         level.restart();
         showOnScreen(level);
      }

      private function showOnScreen(screen:Canvas):void
      {
         myTitleScreen.visible = (screen == myTitleScreen);
         for each (var level:Level in myLevels)
         {
            level.visible = (screen == level);
         }
      }

   }
}
