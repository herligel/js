class level4 extends Phaser.Scene {
  constructor() {
    super({ key: "level4" });
  }

  preload() {
    // Step 1, load JSON

    this.load.tilemapTiledJSON("level4", "assets/BoardingGate.tmj");

    // Step 2 : Preload any images here
    this.load.audio("oof", "assets/oof.mp3");

    this.load.audio("kaching", "assets/kaching.mp3");

  
    this.load.image("Escalator", "assets/Buildings32x32.png");
    this.load.image("Elements", "assets/22_Museum_32x32.png");
    this.load.image("MoreElements", "assets/23_Tevelision_and_Film_Studio_32x32.png");
    this.load.image("wallsandfloors", "assets/Room_Builder_32x32.png");
      this.load.image("evenmoreelements",
      "assets/16_Grocery_store_32x32.png");

      this.load.image("handrail",
      "assets/17_Visibile_Upstairs_System_32x32.png");

    this.load.spritesheet("gen", "assets/eliza.png", {
      frameWidth: 64,
      frameHeight: 64,
    });

    this.load.spritesheet("bitch", "assets/bitch.png", {
      frameWidth: 64,
      frameHeight: 64,
    });


    this.load.spritesheet("backpack", "assets/backpack.png", {
      frameWidth: 102,
      frameHeight: 64,
    });



  }

  

  // end of preload //

  create() {
    console.log("animationScene");

    this.oofSnd = this.sound.add("oof");
    this.kachingSnd = this.sound.add("kaching")

    this.anims.create({
      key: "fireburn",
      frames: this.anims.generateFrameNumbers("bitch", { start: 0, end: 5 }),
      frameRate: 5,
      repeat: -1,
    });


    this.anims.create({
      key: "backpack",
      frames: this.anims.generateFrameNumbers("backpack", { start: 0, end: 5 }),
      frameRate: 5,
      repeat: -1,
    });

    //Step 3 - Create the map from main
    let map = this.make.tilemap({ key: "level4" });

    // Step 4 Load the game tiles
    // 1st parameter is name in Tiled,
    let EscalatorTiles = map.addTilesetImage(
      "Buildings32x32",
      "Escalator"
    );
    let ElementsTiles= map.addTilesetImage(
      "22_Museum_32x32",
      "Elements"
    );
    let wallsandfloorsTiles = map.addTilesetImage(
      "Room_Builder_32x32",
      "wallsandfloors"
    ); 

    let handrailTiles = map.addTilesetImage(
      "17_Visibile_Upstairs_System_32x32",
      "handrail"
    );
    
    let MoreElementsTiles = map.addTilesetImage("23_Tevelision_and_Film_Studio_32x32", "MoreElements");

    let evenmoreelementsTiles = map.addTilesetImage("16_Grocery_store_32x32", "evenmoreelements");


    //Step 5  create an array of tiles
    let tilesArray = [
      EscalatorTiles,
      ElementsTiles,
      wallsandfloorsTiles,
      evenmoreelementsTiles,
      MoreElementsTiles,
      handrailTiles
    
    ];

    // Step 6  Load in layers by layers
    this.FloorsLayer = map.createLayer("Floors", tilesArray, 0, 0);

    this.WallsLayer = map.createLayer("Walls", tilesArray, 0, 0);

    this.DoorsWindowsLayer = map.createLayer("DoorsWindows", tilesArray, 0, 0);

    this.ElementsLayer = map.createLayer("Elements", tilesArray, 0, 0);

    this.WallBordersLayer = map.createLayer("WallBorders", tilesArray, 0, 0);

    // this.objectLayer = map.createLayer("objectLayer", tilesArray, 0, 0);

    // this.physics.world.bounds.width = this.WallbordersLayer.width;
    // this.physics.world.bounds.height = this.WallbordersLayer.height;
    
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

    var backpack = map.findObject("objectLayer", (obj) => obj.name === "backpack");
       this.backpack1=this.physics.add.sprite(backpack.x, backpack.y, 'backpack').setScale (0.5)


   var start = map.findObject("objectLayer", (obj) => obj.name === "start");
    this.player = this.physics.add.sprite(start.x, start.y, "gen");
    window.player = this.player;

    var bitch = map.findObject("objectLayer", (obj) => obj.name === "bitch");

    this.physics.add.overlap(this.player, this.backpack1, this.hitbackpack, null, this)

    this.enemy1 = this.physics.add
    .sprite(bitch.x, bitch.y, "bitch")
    .play("fireburn");


  this.physics.add.overlap(
    this.player,
    this.enemy1,
    this.hitFire,
    null,
    this
  );

  this.tweens.add({
    targets: this.enemy1,
    y: 300,
    //flipX: true,
    yoyo: true,
    duration: 1500,
    repeat: -1,
  });


    // this.WallsLayer.setCollisionByExclusion(-1, true);
    // this.physics.add.collider(this.player, this.WallsLayer);

    // this.WallbordersLayer.setCollisionByExclusion(-1, true);
    // this.physics.add.collider(this.player, this.WallbordersLayer);

    this.ElementsLayer.setCollisionByExclusion(-1, true);
    this.physics.add.collider(this.player, this.ElementsLayer);

    this.cursors = this.input.keyboard.createCursorKeys();

    this.player.body.setSize(this.player.width * 0.2, this.player.height * 0.6)

    this.cameras.main.startFollow(this.player);
    
    // make the camera follow the player
    // this.cameras.main.startFollow(this.player);
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

  update() {
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

    if (this.player.x > 1753 && 
      this.player.x < 1755 && 
      this.player.y > 157.8) {
      console.log("flight");
      this.scene.start("win");
      }
   
  } // end of update //

  
  hitFire(player, item) {
    console.log("Hit fire!!!");
    this.oofSnd.play()
    this.cameras.main.shake(200);
    item.disableBody(true, true); // remove fire
    this.scene.start("lose")
    return false;
  }

  hitbackpack(player, item) {
    console.log("Hit backpack!!!");
    this.kachingSnd.play()
    // this.cameras.main.shake(200);
    item.disableBody(true, true); // remove fire
    return false;
  }
}
