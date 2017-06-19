package veggies
{
   import veggies.GameObject;
   import veggies.Spline;

   import flash.utils.*;
   import flash.display.DisplayObject;
   import flash.geom.Point;
   import flash.events.*;
   import mx.events.*;
   import mx.core.BitmapAsset;
   import mx.controls.Image;
   import mx.containers.Canvas;

   public class PeapodObject extends VeggieObject
   {
      //-------------------------------------------------------
      // Embedded Bitmap Assets (imgs will be stored in swf file)
      //-------------------------------------------------------
      [Embed(source='imgs/killerPea.png')]
      static private var thePeaAsset:Class;

      [Embed(source='imgs/worriedPea.png')]
      static private var theWorriedPeaAsset:Class;

      [Embed(source='imgs/peapodLeftClosed.png')]
      static private var thePeapodLeftClosedAsset:Class;

      [Embed(source='imgs/peapodLeftOpen.png')]
      static private var thePeapodLeftOpenAsset:Class;

      [Embed(source='imgs/peapodRightClosed.png')]
      static private var thePeapodRightClosedAsset:Class;

      [Embed(source='imgs/peapodRightOpen.png')]
      static private var thePeapodRightOpenAsset:Class;

      static private const PEA_START_OFFSETX:int = 50;
      static private const PEA_START_OFFSETY:int = 100;

      //-------------------------------------------------------
      // Implementation
      //-------------------------------------------------------
      private var myPeas:Array = new Array();

      private var myImages:Array = new Array(4);
      private const LEFT_OPEN:int = 0;
      private const LEFT_CLOSED:int = 1;
      private const RIGHT_OPEN:int = 2;
      private const RIGHT_CLOSED:int = 3;

      private var myDeltaTime:Number = 0.0;
      private var myElapsedTime:Number = 0.0;
      private var myPath:Spline = new Spline();

      // TODO - Show Peapod emerge on startup and hide on defeat

      public function PeapodObject()
      {
         super();

         vel.x = 10;
         for (var i:int = 0; i < 4; i++)  
         {
            myImages[i] = new Image();
            myImages[i].visible = false;
            addChild(myImages[i]);
         }
         myImages[LEFT_OPEN].load(new thePeapodLeftOpenAsset as BitmapAsset);
         myImages[LEFT_CLOSED].load(new thePeapodLeftClosedAsset as BitmapAsset);
         myImages[RIGHT_OPEN].load(new thePeapodRightOpenAsset as BitmapAsset);
         myImages[RIGHT_CLOSED].load(new thePeapodRightClosedAsset as BitmapAsset);
         myImages[LEFT_OPEN].visible = true;
      }

      override public function onCreateCb(e:FlexEvent):void
      {
         width = myImages[0].width;
         height = myImages[0].height;
         update(0);
      }

      protected function initializePath():void
      {
         x = 0;
         y = theBottom - height - 120;
         myPath.setPosition(x, y);

         // Path is a figure 8
         var DELTAX:int = theRight/7.0;
         var DELTAY:int = 30;

         var pts:Array = new Array();

         pts.push(new Point(0,0));   // pt = 0
         pts.push(new Point(0,DELTAY));
         pts.push(new Point(0,DELTAY));
         pts.push(new Point(DELTAX,DELTAY));   // Pt

         pts.push(new Point(DELTAX,DELTAY));   // Pt = 1
         pts.push(new Point(2*DELTAX,DELTAY));
         pts.push(new Point(2*DELTAX,DELTAY));
         pts.push(new Point(3*DELTAX,0));   // Pt

         pts.push(new Point(3*DELTAX,0));   // Pt = 2
         pts.push(new Point(4*DELTAX,-DELTAY));
         pts.push(new Point(4*DELTAX,-DELTAY));
         pts.push(new Point(5*DELTAX,-DELTAY));   // Pt

         pts.push(new Point(5*DELTAX,-DELTAY));   // Pt = 3
         pts.push(new Point(6*DELTAX,-DELTAY));
         pts.push(new Point(6*DELTAX,-DELTAY));
         pts.push(new Point(6*DELTAX,0));   // Pt

         pts.push(new Point(6*DELTAX,0));   // Pt = 4
         pts.push(new Point(6*DELTAX,DELTAY));
         pts.push(new Point(6*DELTAX,DELTAY));
         pts.push(new Point(5*DELTAX,DELTAY));   // Pt

         pts.push(new Point(5*DELTAX,DELTAY));   // Pt = 5
         pts.push(new Point(4*DELTAX,DELTAY));
         pts.push(new Point(4*DELTAX,DELTAY));
         pts.push(new Point(3*DELTAX,0)); // Pt

         pts.push(new Point(3*DELTAX,0)); // Pt = 6
         pts.push(new Point(2*DELTAX,-DELTAY)); 
         pts.push(new Point(2*DELTAX,-DELTAY)); 
         pts.push(new Point(DELTAX,-DELTAY));  // Pt

         pts.push(new Point(DELTAX,-DELTAY));  // Pt = 7
         pts.push(new Point(0,-DELTAY)); 
         pts.push(new Point(0,-DELTAY)); 
         pts.push(new Point(0,0)); // Pt

         myPath.setPoints(pts);
         myPath.draw(); // For debugging
         (parent as Canvas).addChildAt(myPath, 1); // Hack for drawing
      }

      public function loadPeas(num:int):void 
      { 
	 var i:int;
         var v:VeggieObject;
	 for (i = 0; i < num; i++)
	 {
	    v = new VeggieObject();
	    v.load(new thePeaAsset as BitmapAsset);
	    v.loadWorried(new theWorriedPeaAsset as BitmapAsset);
            v.visible = false;
            parent.addChild(v); // Position will be relative to screen coords
	    myPeas.push(v);
	 }
      }

      override public function restart():void
      {
         super.restart();
         vel.x = 50;
         for (var i:int = 0; i < myPeas.length; ++i)
         {
            myPeas[i].restart();
            myPeas[i].visible = false;
         }
      }

      override public function isDead():Boolean
      {
          var dead:Boolean = true;
          for (var i:int = 0; i < myPeas.length; i++)
          {
             // Check visible => wait until everything is offscreen
             dead = dead && myPeas[i].isDead() && !myPeas[i].visible;
          }
          return dead; 
      }

      public function checkIntersections(car:CarObject):void
      {
          for (var i:int = 0; i < myPeas.length; i++)
          {
             if (myPeas[i].intersects(car)) 
             {
                car.hit();
             }
             if (car.missileIntersects(myPeas[i]))
             {
                myPeas[i].hit();
             }
          }
      }

      public function getPath():Spline
      {
          return myPath;
      }

      override public function update(deltaTimeS:Number):void
      {
         updatePeapod(deltaTimeS);
         var isShootingPea:Boolean = launchPea(deltaTimeS, theCar);

         myImages[LEFT_OPEN].visible  = (theCar.x < x && isShootingPea);
         myImages[LEFT_CLOSED].visible    = (theCar.x < x && !isShootingPea);
         myImages[RIGHT_OPEN].visible = (theCar.x >= x && isShootingPea);
         myImages[RIGHT_CLOSED].visible   = (theCar.x >= x && !isShootingPea); 

         // Update peas
         for (var i:int = 0; i < myPeas.length; ++i)
         {
            myPeas[i].update(deltaTimeS);
         }

      }

      protected function updatePeapod(deltaTimeS:Number):void
      {
         myElapsedTime += deltaTimeS;

         //if (myPath.isEmpty()) initializePath();
         //var pos:Point = myPath.getValueByDistance(myElapsedTime*100.0);
         //x = pos.x;
         //y = pos.y;

         x += vel.x*deltaTimeS;
         if  (vel.x > 0 && x+width > theRight)
         {
            vel.x = -vel.x;
            x = theRight-width;
         }
         if (vel.x < 0 && x < 0)
         {
            vel.x = -vel.x;
            x = 0;
         }

         y = theBottom - height - 120 + 30*Math.sin(Math.PI/180*myElapsedTime*90);
      }

      protected function launchPea(deltaTimeS:Number, theCar:GameObject):Boolean
      {
         myDeltaTime += deltaTimeS;

         // Shoot pea every 2 seconds
         var isShootingPea:Boolean = false;
         if (myDeltaTime > 1.5) isShootingPea = true;
         if (myDeltaTime > 2)
         {
            myDeltaTime = 0.0;
            for (var i:int = 0; i < myPeas.length; ++i)
            {
               if (!myPeas[i].visible && !myPeas[i].isDead())
               {
                  myPeas[i].visible = true;
                  myPeas[i].x = x+PEA_START_OFFSETX;  
                  myPeas[i].y = y+PEA_START_OFFSETY;
                  myPeas[i].vel.x = theCar.x - myPeas[i].x;
                  myPeas[i].vel.y = theCar.y - myPeas[i].y;
                  break;
               }
            }
         } 
         return isShootingPea;
      }
   }
}
