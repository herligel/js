class lose extends Phaser.Scene {

    constructor ()
    {
        super({ key: "lose" });
    }

    preload() {
      this.load.image('lose', 'assets/gameover.png')
  
  }
  
 create () {
      this.lose1 = this.add.image(0, 0, 'lose').setOrigin(0, 0).setScale(1);
     
      console.log("menu page - welcome");
      let map = this.make.tilemap({ key: "world" });
  
      var spaceDown = this.input.keyboard.addKey('SPACE');
      
      spaceDown.on('down', function(){
      console.log("Spacebar pressed, go to next menu");
      this.scene.stop("lose");
      this.scene.start("level1");
      }, this );
  
   }
    
}