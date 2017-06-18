package veggies
{
   import mx.controls.TextArea;
   import mx.containers.Panel;

   public class LogPanel extends Panel
   {
      static private var theLogArea:TextArea = new TextArea();
      public function LogPanel()
      {
         super();
         theLogArea.percentWidth=100;
         theLogArea.percentHeight=100;
         addChild(theLogArea);
      }

      static public function log(newtext:String):void
      {
         theLogArea.text += newtext;
         theLogArea.text += "\n";
      }
   }
}
