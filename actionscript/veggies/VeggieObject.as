package veggies
{
   import veggies.*;
   import flash.geom.Point;
   import mx.core.BitmapAsset;
   import mx.controls.Image;

   public class VeggieObject extends GameObject
   {      
      //-------------------------------------------------------
      // Constants
      //-------------------------------------------------------
      static public var theCar:GameObject = null; // Hack for now
      static public var theGravity:Number = 9.8;  // downward force
      static public var theDrag:Number = 0.01;  // inertial force
      static public var theRepulse:Number = 2.0;  // repulsion force
      static public var theAttract:Number = 0.1;  // attraction force
      static public var theCollision:Number = 0.5;  // collision constant
      static public var theSpeed:Number = 100.0;  // speed
      static public var theMaxSpeed:Number = 200.0;  // max speed
      static public var theVeggieHitNumber:int = 1;

      // dynamics
      public var mass:Number = 1.0;
      public var vel:Point = new Point(0, 0);
      public var accel:Point = new Point(0, 0);
      public var forces:Point = new Point(0, 0);
      public var collisionForces:Point = new Point(0, 0); // hack

      // visual effects
      protected var mySmokeTrail:SmokeTrail = new SmokeTrail();
      protected var myWorriedImage:Image = null;

      static public function distanceSqr(v:VeggieObject, other:VeggieObject):Number
      {
         return ((other.center.x-v.center.x)*(other.center.x-v.center.x) + 
                 (other.center.y-v.center.y)*(other.center.y-v.center.y));
      }

      static public function avoid(others:Array):void
      {
         for (var i:int = 0; i < others.length; i++)
         {
            others[i].calculateCollisionForces(others);
         } 
      }

      public function calculateCollisionForces(others:Array):void
      {
         collisionForces.x = 0;
         collisionForces.y = 0;
         var dir:Point = new Point();
         for (var i:int = 0; i < others.length; i++)
         {
            if (this == others[i]) continue;

            if (intersects(others[0]))
            {
               var angle:Number = Math.random()*Math.PI;
               dir.x = 50*Math.cos(angle);
               dir.y = 50*Math.sin(angle); 

               collisionForces.x += dir.x;
               collisionForces.y += dir.y;
            }
         }
         
      }

      public function VeggieObject()
      {
         super();
         myNumHits = theVeggieHitNumber; // Override default value 
      }

      override public function restart():void
      {
         myNumHits = theVeggieHitNumber; // Override default value 
         super.restart();
         //myDead = theVeggieHitNumber; // override default
         var angle:Number = Math.random()*Math.PI;
         vel.x = theSpeed*Math.cos(angle);
         vel.y = theSpeed*Math.sin(angle);

         if (myWorriedImage) myWorriedImage.visible = false;
         myImage.visible = true;
         mySmokeTrail.reset();
      }

      override protected function loadEffects():void
      {
          super.loadEffects(); 
          mySmokeTrail.addTo(parent);
      }

      override public function hit():void
      {
         super.hit();
         if (isFalling()) startFall();
      }

      public function isFalling():Boolean
      {
         return myDead >= 1;
      }

      public function loadWorried(bitmap:BitmapAsset):void
      {
         if (!myWorriedImage)
         {
            myWorriedImage = new Image();
            myWorriedImage.load(bitmap);
            myWorriedImage.visible = false;
            addChild(myWorriedImage);
         }
      }

      protected function startFall():void
      {
         if (myWorriedImage)
         {
            myImage.visible = false;
            myWorriedImage.visible = true;
         }

         mySmokeTrail.initialize(x + center.x, y + center.y);
      }

      protected function calculateForces():Point
      {
         forces.x = 0.0;
         forces.y = theGravity;

         forces.x += -theDrag*vel.x;
         forces.y += -theDrag*vel.y;

         if (!isFalling())
         {
            // Veggie directed forces
            forces.x += collisionForces.x;
            forces.y += collisionForces.y;

	    if (x < theRight && (theRight - x) < 50) 
	    {
	       forces.x += theRepulse*(50-(theRight-x));
	    }
	    if (x > 0 && x < 50) forces.x += theRepulse*(50-x);
	    if (y > 0 && y < 50) forces.y += theRepulse*(50-y);

	    forces.x += theAttract*(theCar.x-x); 
	    forces.y += theAttract*(theCar.y-y+height); 
         }
         return forces;
      }

      override public function update(deltaTimeS:Number):void
      {
         super.update(deltaTimeS);
         if (isDead()) { mySmokeTrail.reset(); return; }
         if (!visible) return;

         calculateForces();
         accel.x = forces.x/mass; 
         accel.y = forces.y/mass; 

         vel.x += deltaTimeS*accel.x;
         vel.y += deltaTimeS*accel.y;
  
         // Ensure speed stays below maximum
         var magnitude:Number = Math.sqrt(vel.x*vel.x + vel.y*vel.y); 
         if (magnitude > theMaxSpeed)
         {
            vel.x = (theMaxSpeed/magnitude)*vel.x;
            vel.y = (theMaxSpeed/magnitude)*vel.y;
         }

         if (vel.y > 0 && y+height > theBottom) 
         {
/*
            if (isFalling()) // crash
            {
               hit();
            }
            else */ // bounce
            {
               vel.y = -vel.y; // reflect
               y = theBottom-height;
            }
         }

         if (vel.y < 0 && y < 0)
         {
            vel.y = -vel.y; // reflect
            y = 0;
         }

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

         x += vel.x*deltaTimeS; // + 0.5*deltaTimeS*deltaTimeS*accel.x;
         y += vel.y*deltaTimeS; // + 0.5*deltaTimeS*deltaTimeS*accel.y;        
         if (mySmokeTrail.isActive()) 
         {
            mySmokeTrail.update(x+center.x, y+center.y, deltaTimeS);
         }
      }
   }
}

