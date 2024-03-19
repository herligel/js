class instructionspage extends Phaser.Scene {

    constructor ()
    {
        super({ key: "instructionspage" });
    }

    preload() {
      this.load.image('instructionspage', 'assets/instructionspage.png')
  
  }
  
 create () {
      this.instructions1 = this.add.image(0, 0, 'instructionspage').setOrigin(0, 0).setScale(1);
     
      console.log("menu page - welcome");
      let map = this.make.tilemap({ key: "world" });
  
      var spaceDown = this.input.keyboard.addKey('SPACE');
      
      spaceDown.on('down', function(){
      console.log("Spacebar pressed, go to next menu");
      this.scene.stop("instructionspage");
      this.scene.start("controlspage");
      }, this );
  
   }
    
}