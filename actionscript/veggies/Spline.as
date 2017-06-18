package veggies
{
   import flash.geom.Point;
   import flash.display.Graphics;
   import mx.containers.Canvas;
   import veggies.LogPanel;

   public class Spline extends Canvas 
   {
       private var mPoints:Array = new Array();
       private var mPosition:Point = new Point(0,0);

       // These two vars are intended to be used together as a map
       private var mArcLengths:Array = new Array();
       private var mArcTimes:Array = new Array();

       public function Spline()
       {
          super();
          clipContent = true;
          horizontalScrollPolicy = "off";
          verticalScrollPolicy = "off";
       }

       public function setPosition(_x:int, _y:int):void
       {
          mPosition.x = _x;
          mPosition.y = _y;
       }

       public function isEmpty():Boolean
       {
          return mPoints.length == 0;
       }

       public function setPoints(pts:Array):void
       {
          mPoints = new Array();
          for (var i:int = 0; i < pts.length; i++)
          {
             mPoints.push(pts[i]);
          }

          calculateSpline(); // LATER: Auto-calculate control points?
          updateArcLengths();
       }

       public function draw():void
       {
          if (mPoints.length == 0) return;

          graphics.lineStyle(1,0);
          graphics.moveTo(mPoints[0].x, mPoints[0].y); 
          for (var i:int = 0; i < mPoints.length; i+=4)
          {
             for (var j:int = 0; j < 10; j++)
             {
                var fract:Number = 0.1*j;
                var pt:Point = calculateValue(i, fract);
                pt.x += mPosition.x;
                pt.y += mPosition.y;
                graphics.lineTo(pt.x, pt.y);
             }
          }
       }

       public function getValueByDistance(desiredDistance:Number): Point
       {
          if (mPoints.length == 0) return mPosition;

          var totalDistance:Number = mArcLengths[mArcLengths.length-1];
          desiredDistance = desiredDistance % totalDistance;
          var t:Number = calculateTime(desiredDistance);
          return getValueByTime(t);
       }

       public function getValueByTime(t:Number): Point
       {
          if (mPoints.length == 0) return mPosition;

          var splinet:int = Math.floor(t) % (mPoints.length/4);
          var splineFract:Number = t - Math.floor(t);

          var pt:Point = calculateValue(splinet*4, splineFract);
          pt.x += mPosition.x;
          pt.y += mPosition.y;
          //LogPanel.log("getValues "+splinet+", "+splineFract+" : "+pt);
          return pt;
       }

       protected function calculateValue(splinet:int, fract:Number):Point
       {
          // Use splinet to find start segment
          var b0:Point = mPoints[splinet];
          var b1:Point = mPoints[splinet+1];
          var b2:Point = mPoints[splinet+2];
          var b3:Point = mPoints[splinet+3];

          fract = 1.0-fract;
          var tmp1:Point = Point.interpolate(b0, b1, fract);
          var tmp2:Point = Point.interpolate(b1, b2, fract);
          var tmp3:Point = Point.interpolate(b2, b3, fract);

          var tmp11:Point = Point.interpolate(tmp1, tmp2, fract);
          var tmp12:Point = Point.interpolate(tmp2, tmp3, fract);

          return Point.interpolate(tmp11, tmp12, fract); 
       }

       protected function calculateTime(distance:int):Number
       {
          for (var i:int = 0; i < mArcLengths.length-1; i++)
          {
             if (mArcLengths[i] <= distance && distance < mArcLengths[i+1])
             {
                var fract:Number = (distance-mArcLengths[i])/(mArcLengths[i+1] - mArcLengths[i]);
                var t:Number = mArcTimes[i]*(1-fract) + mArcTimes[i+1]*fract;
                return t;
             }
          }
          LogPanel.log("ERROR: Could not find "+distance+" in arc length table");
          return -1;
       }

       private function calculateSpline():void
       {
          // Calculate control points
          
       }

       private function updateArcLengths():void
       {
          if (mPoints.length == 0) return;

          mArcLengths = new Array();
          mArcTimes = new Array();

          var du:Number = 0.1;
          var last:Point = mPoints[0];
          var total:Number = 0.0;
          for (var i:int = 0; i < mPoints.length/4; i++)
          {
             var tmp:Number = total;
             for (var j:int = 0; j < 10; j++)
             {
                var fract:Number = du*j;
                var pt:Point = calculateValue(i*4, fract);
                total += Point.distance(pt,last);

                mArcTimes.push(i+fract);
                mArcLengths.push(total);
                last = pt;
                //LogPanel.log(i+") "+(i+fract)+" "+total);
             }
             //LogPanel.log("Distance "+i+") "+(total-tmp));
          }
       }
   }
}
