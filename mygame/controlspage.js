class controlspage extends Phaser.Scene {

    constructor ()
    {
        super({ key: "controlspage" });
    }

    preload() {
      this.load.image('controlspage', 'assets/controls.png')
  
  }
  
 create () {
      this.intro1 = this.add.image(0, 0, 'controlspage').setOrigin(0, 0).setScale(1);
     
      console.log("menu page - welcome");
      let map = this.make.tilemap({ key: "world" });
  
      var spaceDown = this.input.keyboard.addKey('SPACE');
      
      spaceDown.on('down', function(){
      console.log("Spacebar pressed, go to next menu");
      this.scene.stop("controlspage");
      this.scene.start("level1");
      }, this );
  
   }
    
}