package veggies
{
   import veggies.GameObject;
   import flash.geom.Point;
   import mx.core.BitmapAsset;

   public class MissileObject extends GameObject
   {      
      [Embed(source='imgs/missileT.gif')]
      static private var theMissileAsset:Class;

      private var vel:Point = new Point();
      public function MissileObject(velx:Number, vely:Number, rot:Number)
      {
         super();
         vel.x = velx;
         vel.y = vely;
         myImage.rotation = rot;
         load(new theMissileAsset as BitmapAsset);
      }

      override public function hit():void
      {
         explode();
         visible = false;
      }

      override public function update(deltaTimeS:Number):void
      {
         super.update(deltaTimeS);
         if (visible)
         {
            y += vel.y*deltaTimeS;
            x += vel.x*deltaTimeS;
            if (y < 0) visible = false;
            if (x < 0) visible = false;
            if (x > theRight) visible = false;
         }
      }
   }
}

