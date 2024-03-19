class level22 extends Phaser.Scene {
  constructor() {
    super({ key: "level22" });
  }

  preload() {
    // Step 1, load JSON

    this.load.tilemapTiledJSON("level22", "assets/Terminals2.tmj");

    // Step 2 : Preload any images here
    this.load.image("bus", "assets/10_Vehicles_32x32.png");
    this.load.image("elements", "assets/22_Museum_32x32.png");
    this.load.image("wallsandfloors", "assets/Room_Builder_32x32.png");
    this.load.image("street", "assets/Street32x32.png");
    this.load.image("moreelements", "assets/16_Grocery_store_32x32.png");
    this.load.image("doors", "assets/Buildings32x32.png");

    this.load.spritesheet("gen", "assets/eliza.png", {
      frameWidth: 64,
      frameHeight: 64,
    });
  }

  // end of preload //

  create() {
    console.log("animationScene");

    //Step 3 - Create the map from main
    let map = this.make.tilemap({ key: "level22" });

    // Step 4 Load the game tiles
    // 1st parameter is name in Tiled,
    let busTiles = map.addTilesetImage("10_Vehicles_32x32", "bus");
    let elementsTiles = map.addTilesetImage("22_Museum_32x32", "elements");
    let wallsandfloorsTiles = map.addTilesetImage(
      "Room_Builder_32x32",
      "wallsandfloors"
    );

    let streetTiles = map.addTilesetImage("Street32x32", "street");

    let moreelementsTiles = map.addTilesetImage(
      "16_Grocery_store_32x32",
      "moreelements"
    );

    let doorsTiles = map.addTilesetImage("Buildings32x32", "doors");

    //Step 5  create an array of tiles
    let tilesArray = [
      busTiles,
      elementsTiles,
      wallsandfloorsTiles,
      streetTiles,
      moreelementsTiles,
      doorsTiles,
    ];

    // Step 6  Load in layers by layers
    this.FloorLayer = map.createLayer("Floor", tilesArray, 0, 0);

    this.WallLayer = map.createLayer("Wall", tilesArray, 0, 0);

    this.DoorsLayer = map.createLayer("Doors", tilesArray, 0, 0);

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

    var start = map.findObject("objectLayer", (obj) => obj.name === "start");
    this.player = this.physics.add.sprite(start.x, start.y, "gen");
    window.player = this.player;

    this.WallBordersLayer.setCollisionByExclusion(-1, true);
    this.physics.add.collider(this.player, this.WallBordersLayer);

    this.WallLayer.setCollisionByExclusion(-1, true);
    this.physics.add.collider(this.player, this.WallLayer);

    this.ElementsLayer.setCollisionByExclusion(-1, true);
    this.physics.add.collider(this.player, this.ElementsLayer);

    // this.WallsLayer.setCollisionByExclusion(-1, true);
    // this.physics.add.collider(this.player, this.WallsLayer);

    // this.WallbordersLayer.setCollisionByExclusion(-1, true);
    // this.physics.add.collider(this.player, this.WallbordersLayer);

    // this.ElementsLayer.setCollisionByExclusion(-1, true);
    // this.physics.add.collider(this.player, this.ElementsLayer);

    this.cursors = this.input.keyboard.createCursorKeys();

    this.player.body.setSize(this.player.width * 0.2, this.player.height * 0.6);

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

    if (this.player.x > 1252 && 
      this.player.x < 1263 && 
      this.player.y > 147.8) {
      console.log("door3");
      this.level4();
      }

  } // end of update //

  // level3(player, tile) {
  //   console.log("level3 function");
  //   this.scene.start("level3");

  level4(player, tile) {
    console.log("level4 function");
    this.scene.start("level4");
  }
}
