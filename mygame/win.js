class win extends Phaser.Scene {

    constructor ()
    {
        super({ key: "win" });
    }

    preload() {
      this.load.image('win', 'assets/winpage.png')
  
  }
  
 create () {
      this.win1 = this.add.image(0, 0, 'win').setOrigin(0, 0).setScale(1);
     
      console.log("menu page - welcome");
      let map = this.make.tilemap({ key: "world" });
  
      var spaceDown = this.input.keyboard.addKey('SPACE');
      
      spaceDown.on('down', function(){
      console.log("Spacebar pressed, go to next menu");
      this.scene.stop("win");
      this.scene.start("intropage");
      }, this );
  
   }
    
}