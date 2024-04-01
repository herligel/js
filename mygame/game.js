
let config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            debug: false
        }
    },
    backgroundColor: '#000000',
    scene: [intropage,instructionspage,controlspage,lose,win,level1,level2,level3,level4,level22]

};
// preloadScene
let game = new Phaser.Game(config);
window.backpack=0
window.ticket=0
window.passport=0
window.cushion=0