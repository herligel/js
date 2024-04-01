class level1 extends Phaser.Scene {
  constructor() {
    super({ key: "level1" });
  }

  preload() {
    // Step 1, load JSON

    this.load.tilemapTiledJSON("level1", "assets/InformationCounter.tmj");

    // Step 2 : Preload any images here

   

    this.load.audio("oof", "assets/oof.mp3");

    this.load.audio("kaching", "assets/kaching.mp3");

    this.load.image("minielements", "assets/16_Grocery_store_32x32.png");
    this.load.image("biggerelements", "assets/22_Museum_32x32.png");
    this.load.image("wallsandfloors", "assets/Room_Builder_32x32.png");
    this.load.image(
      "escalators",
      "assets/17_Visibile_Upstairs_System_32x32.png"
    );
    this.load.spritesheet("gen", "assets/eliza.png", {
      frameWidth: 64,
      frameHeight: 64,
    });

    this.load.spritesheet("fire", "assets/bitch.png", {
      frameWidth: 64,
      frameHeight: 64,
    });

    this.load.spritesheet("ticket", "assets/ticket.png", {
      frameWidth: 102,
      frameHeight: 64,
    });

    this.load.spritesheet("passport", "assets/passport.png", {
      frameWidth: 102,
      frameHeight: 64,
    });

  }

  
  // end of preload //

  create() {
    console.log("animationScene");

    
this.oofSnd = this.sound.add("oof");

this.kachingSnd = this.sound.add("kaching");



    this.anims.create({
      key: "fireburn",
      frames: this.anims.generateFrameNumbers("fire", { start: 0, end: 5 }),
      frameRate: 5,
      repeat: -1,
    });

    this.anims.create({
      key: "ticket",
      frames: this.anims.generateFrameNumbers("ticket", { start: 0, end: 5 }),
      frameRate: 5,
      repeat: -1,
    });

    this.anims.create({
      key: "passport",
      frames: this.anims.generateFrameNumbers("passport", { start: 0, end: 5 }),
      frameRate: 5,
      repeat: -1,
    });

    //Step 3 - Create the map from main
    let map = this.make.tilemap({ key: "level1" });

    // Step 4 Load the game tiles
    // 1st parameter is name in Tiled,
    let minielementsTiles = map.addTilesetImage(
      "16_Grocery_store_32x32",
      "minielements"
    );
    let biggerelementsTiles = map.addTilesetImage(
      "22_Museum_32x32",
      "biggerelements"
    );
    let wallsandfloorsTiles = map.addTilesetImage(
      "Room_Builder_32x32",
      "wallsandfloors"
    );
    let escalatorsTiles = map.addTilesetImage("Stairs32x32", "escalators");

    //Step 5  create an array of tiles
    let tilesArray = [
      minielementsTiles,
      biggerelementsTiles,
      wallsandfloorsTiles,
      escalatorsTiles,
    ];

    // Step 6  Load in layers by layers
    this.FloorsLayer = map.createLayer("Floors", tilesArray, 0, 0);

    this.WallsLayer = map.createLayer("Walls", tilesArray, 0, 0);

    this.EscNWindLayer = map.createLayer("EscNWind", tilesArray, 0, 0);

    this.ElementsLayer = map.createLayer("Elements", tilesArray, 0, 0);

    this.WallbordersLayer = map.createLayer("Wallborders", tilesArray, 0, 0);

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

    this.anims.create({
      key: "enemy1",
      frames: this.anims.generateFrameNumbers("enemy1", { start: 105, end: 112 }),
      frameRate: 5,
      repeat: -1,
    });

    var start = map.findObject("objectLayer", (obj) => obj.name === "start");
    this.player = this.physics.add.sprite(start.x, start.y, "gen");
    window.player = this.player;

    var fire1 = map.findObject("objectLayer", (obj) => obj.name === "fire1");
    var fire2 = map.findObject("objectLayer", (obj) => obj.name === "fire2");

    var ticket = map.findObject("objectLayer", (obj) => obj.name === "ticket");
    this.ticket1=this.physics.add.sprite(ticket.x, ticket.y, 'ticket').setScale (0.5)

    var passport = map.findObject("objectLayer", (obj) => obj.name === "passport");
    this.passport1=this.physics.add.sprite(passport.x, passport.y, 'passport').setScale (0.5)

    window.player = this.player;
    this.player.body.setSize(this.player.width * 0.2, this.player.height * 0.6);

// When object overlap with player, call the this.collectFire function
this.physics.add.overlap(this.player, this.ticket1, this.hitticket, null, this)

this.physics.add.overlap(this.player, this.passport1, this.hitpassport, null, this)

    this.enemy1 = this.physics.add
      .sprite(fire1.x, fire1.y, "fire")
      .play("fireburn");
    this.enemy2 = this.physics.add
      .sprite(fire2.x, fire2.y, "fire")
      .play("fireburn");

    this.physics.add.overlap(
      this.player,
      this.enemy1,
      this.hitFire,
      null,
      this
    );
    this.physics.add.overlap(
      this.player,
      this.enemy2,
      this.hitFire,
      null,
      this
    );

    this.tweens.add({
      targets: this.enemy1,
      x: 500,
      //flipX: true,
      yoyo: true,
      duration: 1000,
      repeat: -1,
    });

    this.tweens.add({
      targets: this.enemy2,
      y: 500,
      //flipX: true,
      yoyo: true,
      duration: 1500,
      repeat: -1
  })

    this.WallsLayer.setCollisionByExclusion(-1, true);
    this.physics.add.collider(this.player, this.WallsLayer);

    this.WallbordersLayer.setCollisionByExclusion(-1, true);
    this.physics.add.collider(this.player, this.WallbordersLayer);

    this.ElementsLayer.setCollisionByExclusion(-1, true);
    this.physics.add.collider(this.player, this.ElementsLayer);

    this.cursors = this.input.keyboard.createCursorKeys();


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

    if (this.player.x > 998 && this.player.x < 1016 && this.player.y > 588) {
      console.log("escalator");
      this.level2();
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

  //this function is called when player touch the heart
   hitticket(player, item) {
    console.log("Hit ticket!!!");
    this.kachingSnd.play()
    // this.cameras.main.shake(200);
    item.disableBody(true, true); // remove ticket
    return false;

   }

   hitpassport(player, item) {
    console.log("Hit passport!!!");
    this.kachingSnd.play()
    // this.cameras.main.shake(200);
    item.disableBody(true, true); // remove ticket
    return false;

   }
  level2(player, tile) {
    console.log("level2 function");
    this.scene.start("level2");
  }
}
