var preloadScene = {};

preloadScene.Main = function (game) {
    this.ready = false;
};


preloadScene.Main.prototype = {
    preload: function() {
        this.preloadBarOutline = this.add.sprite(this.game.world.centerX,this.game.world.centerY, 'preloadBarOutline');
        this.preloadBarOutline.anchor.setTo(0.5);

        this.preloadBar = this.add.sprite(this.game.world.centerX,this.game.world.centerY, 'preloadBar');
        this.preloadBar.anchor.setTo(0,0.5);
        this.preloadBar.x = this.game.world.centerX - (this.preloadBar.width/2);
        this.load.setPreloadSprite(this.preloadBar);


        $(".helpbtn").hide();
        $(".scrollIndicator").hide();
        game.stage.backgroundColor = '#fff';
        // text = game.add.text(this.game.world.centerX, this.game.world.centerY, 'Loading...', { fill: '#2c9b8a' });
        // text.anchor.setTo(0.5,0.5);

        game.load.bitmapFont('myFont', 'images/CustomFont.png', 'images/CustomFont.fnt');

        game.load.image('backgroundImg','images/BG.png');
        game.load.image('dateRectImg','images/dateRect.png');
        game.load.atlas('carImg', 'images/cars.png', 'images/cars.json');//, Phaser.Loader.TEXTURE_ATLAS_JSON_HASH
        game.load.atlas('foCar', 'images/flyOverCar.png', 'images/flyOverCar.json');//, Phaser.Loader.TEXTURE_ATLAS_JSON_HASH
        game.load.atlas('cityImg','images/citySprites.png','images/citySprites.json');

        game.load.image('deliveryImg','images/g152121.png');

        game.load.atlas('train','images/train.png','images/train.json');
        game.load.atlas('waterfall','images/waterfall.png','images/waterfall.json');
        game.load.atlas('boatImg','images/Boat.png','images/Boat.json');
        game.load.atlas('craneImg','images/crane.png','images/crane.json');
        game.load.atlas('folderSmallImg','images/folderSmall.png','images/folderSmall.json');
        game.load.atlas('folderLong1Img','images/folderLong1.png','images/folderLong1.json');
        game.load.atlas('folderLong2Img','images/folderLong2.png','images/folderLong2.json');

        game.load.atlas('singleWindmillImg','images/singleWindmill.png','images/singleWindmill.json');
        game.load.atlas('windmill1Img','images/windmill1.png','images/windmill1.json');
        game.load.atlas('windmill2Img','images/windmill2.png','images/windmill2.json');

        game.load.atlas('smokeImg','images/smoke.png','images/smoke.json');
        game.load.atlas('tickImg','images/tick.png','images/tick.json');

        game.load.image('trainMaskImg','images/train_mask.png');
        game.load.image('trainStationImg','images/station.png');
        game.load.image('trainTunnelRTImg','images/tunnel_rt.png');
        game.load.image('trainTunnelLTImg','images/tunnel_lt.png');
        game.load.image('chimneyImg', 'images/chimni.png');

        game.load.image('bridgeImg','images/bridge.png');
        game.load.image('railingImg','images/railing.png');

        game.load.image('notification', 'images/u210.png');


        this.load.onLoadComplete.add(this.loadComplete, this);
    },
    loadComplete: function(){
        this.ready = true;
        // console.log("LOADED ALL ASSETS OF MAIN SCENE");
    },
    update: function(){
        if(this.ready === true)
        {
            game.state.start('scene3');
        }
    }


};