
class level3 extends Phaser.Scene {
    constructor ()
    {
        super({ key: 'level3' });
    }

    preload() {

        // Step 1, load JSON

        this.load.tilemapTiledJSON("world", "assets/GroceryStore.tmj")
 

        // Step 2 : Preload any images here
        this.load.image("interiorPng", "assets/Interiors_free_32x32.png")
        this.load.image("wallsPng", "assets/Room_Builder_32x32.png")
        this.load.image("elementsPng", "assets/16_Grocery_store_32x32.png" )

        this.load.spritesheet("gen", "assets/eliza.png", {
            frameWidth: 64,
            frameHeight: 64,
          });
        
        

    } // end of preload //

    create (){

    console.log("animationScene")

    //Step 3 - Create the map from main
    let map = this.make.tilemap({ key: "world" });


    
    // Step 4 Load the game tiles
    // 1st parameter is name in Tiled,
    let interiorTiles = map.addTilesetImage("interior32x32", "interiorPng");
    let floorTiles = map.addTilesetImage("wallsceilings32x32", "wallsPng");
    let elementTiles = map.addTilesetImage ("16_Grocery_store_32x32", "elementsPng");
    

    //Step 5  create an array of tiles
    let tilesArray = [
          interiorTiles,
          floorTiles,
          elementTiles
        ];

 

    // Step 6  Load in layers by layers
    this.floorsLayer = map.createLayer("floors",tilesArray,0,0);

    this.wallsLayer = map.createLayer("walls",tilesArray,0,0);

    this.windowsLayer = map.createLayer("windows",tilesArray,0,0);

    this.wallborderLayer = map.createLayer("wallborder",tilesArray,0,0);

    this.elementsLayer = map.createLayer("elements",tilesArray,0,0);

    this.anims.create({
        key: "gen-up",
        frames: this.anims.generateFrameNumbers("gen", { start: 105, end: 112 }),
        frameRate: 5,
        repeat: -1,
      });
  
      this.anims.create({
        key: "gen-left",
        frames: this.anims.generateFrameNumbers("gen", { start: 118, end: 125 }),
        frameRate: 5,
        repeat: -1,
      });
  
      this.anims.create({
        key: "gen-down",
        frames: this.anims.generateFrameNumbers("gen", { start: 131, end: 138 }),
        frameRate: 5,
        repeat: -1,
      });
  
      this.anims.create({
        key: "gen-right",
        frames: this.anims.generateFrameNumbers("gen", { start: 144, end: 151 }),
        frameRate: 5,
        repeat: -1,
      });
  
      var start = map.findObject("objectLayer", (obj) => obj.name === "start");
      this.player = this.physics.add.sprite(start.x, start.y, "gen");
       window.player = this.player;


      this.wallborderLayer.setCollisionByExclusion(-1, true);
      this.physics.add.collider(this.player, this.wallborderLayer);
  
      this.wallsLayer.setCollisionByExclusion(-1, true);
      this.physics.add.collider(this.player, this.wallsLayer);
  
      this.elementsLayer.setCollisionByExclusion(-1, true);
      this.physics.add.collider(this.player, this.elementsLayer);
  

    
    this.cursors = this.input.keyboard.createCursorKeys();

     this.player.body.setSize(this.player.width * 0.2, this.player.height * 0.6)

    
     // make the camera follow the player
      // this.cameras.main.startFollow(this.player);

      this.anims.create({
        key: "gen-up",
        frames: this.anims.generateFrameNumbers("gen", { start: 105, end: 112 }),
        frameRate: 5,
        repeat: -1,
      });
  
      this.anims.create({
        key: "gen-left",
        frames: this.anims.generateFrameNumbers("gen", { start: 118, end: 125 }),
        frameRate: 5,
        repeat: -1,
      });
  
      this.anims.create({
        key: "gen-down",
        frames: this.anims.generateFrameNumbers("gen", { start: 131, end: 138 }),
        frameRate: 5,
        repeat: -1,
      });
  
      this.anims.create({
        key: "gen-right",
        frames: this.anims.generateFrameNumbers("gen", { start: 144, end: 151 }),
        frameRate: 5,
        repeat: -1,
      });
  
      // var start = map.findObject("objectLayer", (obj) => obj.name === "start");
      // this.player = this.physics.add.sprite(start.x, start.y, "gen");
      // window.player = this.player;
  

      var level1Down = this.input.keyboard.addKey(49);

      level1Down.on(
        "down",
        function () {
          console.log("1 pressed, jump to level 1");
          this.scene.start("level1");
        },
        this
      );
  
      var level2Down = this.input.keyboard.addKey(50);
  
      level2Down.on(
          "down",
          function () {
            console.log("2 pressed, jump to level 2");
            this.scene.start("level2");
          },
          this
        );
  
      var level3Down = this.input.keyboard.addKey(51);
  
      level3Down.on(
          "down",
          function () {
            console.log("3 pressed, jump to level 3");
            this.scene.start("level3");
          },
          this
        );
  
   var level4Down = this.input.keyboard.addKey(52);
  
   level4Down.on(
          "down",
          function () {
            console.log("4 pressed, jump to level 4");
            this.scene.start("level4");
          },
          this
        );

        var level22Down = this.input.keyboard.addKey(53);

      level22Down.on(
             "down",
             function () {
               console.log("8 pressed, jump to level 22");
               this.scene.start("level22");
             },
             this
           );
           
      } // end of create //

    update () {

        if (this.cursors.left.isDown) {
            this.player.setVelocityX(-160);
            this.player.anims.play("gen-left", true);
          } else if (this.cursors.right.isDown) {
            this.player.setVelocityX(160);
            this.player.anims.play("gen-right", true);
          } else if (this.cursors.up.isDown) {
            this.player.setVelocityY(-160);
            this.player.anims.play("gen-up", true);
          } else if (this.cursors.down.isDown) {
            this.player.setVelocityY(160);
            this.player.anims.play("gen-down", true);
          } else {
            this.player.setVelocity(0);
            this.player.anims.stop();
          }

        // if (this.cursors.left.isDown)
        // {
        //     this.player.setVelocityX(-160);
        //     this.player.anims.play('gen-left', true);
        // }
        // else if (this.cursors.right.isDown)
        // {
        //     this.player.setVelocityX(160);
        //     this.player.anims.play('gen-right', true);
        // } else if (this.cursors.up.isDown)
        // {
        //     this.player.setVelocityY(-160);
        //     this.player.anims.play('gen-up', true);
        // } else if (this.cursors.down.isDown)
        // {
        //     this.player.setVelocityY(160);
        //     this.player.anims.play('gen-down', true);
        // } else {
        //     this.player.setVelocity(0);
        //     this.player.anims.stop();
        // }

        if (this.player.x > 262 && 
          this.player.x < 268 && 
          this.player.y > 416.5) {
          console.log("door2");
          this.level22();
          }
    } // end of update // 

    level22(player, tile) {
      console.log("level22 function");
      this.scene.start("level22");
    }
  }
