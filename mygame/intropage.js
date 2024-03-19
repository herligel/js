class intropage extends Phaser.Scene {

    constructor ()
    {
        super({ key: "intropage" });
    }

    preload() {
      this.load.image('intropage', 'assets/intropage.png')
  
  }
  
 create () {
      this.intro1 = this.add.image(0, 0, 'intropage').setOrigin(0, 0).setScale(1);
     
      console.log("menu page - welcome");
      let map = this.make.tilemap({ key: "world" });
  
      var spaceDown = this.input.keyboard.addKey('SPACE');
      
      spaceDown.on('down', function(){
      console.log("Spacebar pressed, go to next menu");
      this.scene.stop("intropage");
      this.scene.start("instructionspage");
      }, this );
  
   }
    
}