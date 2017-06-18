package veggies
{
   import veggies.GameObject;
   import veggies.MissileObject;
   import mx.core.BitmapAsset;
   import flash.geom.Point;
   import flash.display.DisplayObjectContainer;
   import mx.controls.Image;

   public class CarObject extends GameObject
   {
      [Embed(source='imgs/tank.png')]
      static private var theCarAsset:Class;

      [Embed(source='imgs/thrust.png')]
      static private var theThrustAsset:Class;

      private const TOP_CANNON:int = 0;
      private const LEFT_CANNON:int = 1;
      private const RIGHT_CANNON:int = 2;
      private var myMissiles:Array = new Array(3);

      private var vely:Number = 0;
      private var velx:Number = 0;
      private var forcesy:Number = 0;
      static public var theDrag:Number = 0.01;  // inertial force

      private var myThrustImage:Image = new Image();

      public function CarObject()
      {
         super();
         load(new theCarAsset as BitmapAsset);
         myMissiles[TOP_CANNON] = new MissileObject(0, -200, 0);
         myMissiles[LEFT_CANNON] = new MissileObject(-150, 0, -90);
         myMissiles[RIGHT_CANNON] = new MissileObject(150, 0, 90);

         myThrustImage.load(new theThrustAsset as BitmapAsset);
         myThrustImage.visible = false;
      }

      public function addToParent(p:DisplayObjectContainer, layer:int):void
      {
         p.addChildAt(myThrustImage, layer);
         p.addChildAt(this, layer);
         for (var i:int = 0; i < 3; i++) p.addChildAt(myMissiles[i], layer);
      }

      override public function restart():void
      {
         super.restart();
         myMissiles[TOP_CANNON].visible = false;
         myMissiles[LEFT_CANNON].visible = false;
         myMissiles[RIGHT_CANNON].visible = false;
      }

      public function moveLeft():void
      {
          velx = -200;
      }

      public function moveRight():void
      {
          velx = 200;
      }

      public function stop():void
      {
          velx = 0;
      }

      public function mouseMove(local:Point):void
      {
         x = local.x - width/2.0;
         if (x > theRight-width) x = theRight-width;
         if (x < 0) x = 0;
      }

      public function fireTopCannon():void
      {
         var m:MissileObject = myMissiles[TOP_CANNON];
         m.visible = true;
         m.x = x + width/2.0 - m.width/2.0;
         m.y = y - m.height;
      }

      public function fireSideCannons():void
      {
         var m:MissileObject = myMissiles[LEFT_CANNON];
         m.visible = true;
         m.x = x - m.width;
         m.y = y + height/2.0;

         m = myMissiles[RIGHT_CANNON];
         m.visible = true;
         m.x = x + width;
         m.y = y + height/2.0 - m.height/2.0;
      }

      public function jump(delta:Number):void
      {
         vely += -20*delta;
      }

      public function missileIntersects(target:GameObject):Boolean
      {
         for (var i:int = 0; i < 3; i++)
         {
            if (target.intersects(myMissiles[i]))
            {
               myMissiles[i].hit();
               return true;
            }
         }
         return false;
      }

      protected function calculateForces():void
      {
         forcesy = 9.8;
         forcesy += -theDrag*vely;
     }

      override public function update(deltaTimeS:Number):void
      {
         super.update(deltaTimeS);
         if (!visible) return;

         for (var i:int = 0; i < 3; i++) myMissiles[i].update(deltaTimeS);
         calculateForces();

         var accely:Number = forcesy; 
         vely += deltaTimeS*accely;

         if (vely > 0 && y+height > theBottom) 
         {
            vely = 0;
            y = theBottom - height;
         }
         if (vely < 0 && y < 0) 
         {
            vely = 0;
            y = 0;
         }

         y += vely*deltaTimeS;
         myThrustImage.visible = vely >= 0? false : true;
         myThrustImage.x = x + width/2.0 - myThrustImage.width/2.0;
         myThrustImage.y = y + height;
         myThrustImage.alpha = alpha;

         x += deltaTimeS*velx;
      }
   }
}

