var mainScene = {};
var textConcept, textStrategy, textPrelim, textBusiness, textInvest, textDelivery;
var yearText;

mainScene.Main = function (game) {

};


mainScene.Main.prototype = {
    preload: function() {


    },

    create: function () {
        // loadPieChart();
        $(".helpbtn").show();
        $(".scrollIndicator").show();

        $(".scene1_Text").hide();
        var canvasWidth = 1206;
        $(".leftColumn").show();
        $(".heading").show();
        $(".projects").show();
        $(".highlightPanel").show();
        $(".scrollIndicator").show();
        $("#canvasContainer").css('overflow-y','scroll');

        loadAnnualInfo();


        this.stage.backgroundColor = '#fff';
        this.scale.setGameSize(canvasWidth, 1061);
        Phaser.RESOLUTION = window.devicePixelRatio;

        // game.load.onLoadStart.add(loadStart, this);
        //    game.load.onFileComplete.add(fileComplete, this);
        //    game.load.onLoadComplete.add(loadComplete, this);



        this.backgroundSprite = this.add.sprite(canvasWidth,64,'backgroundImg');
        this.backgroundSprite.anchor.setTo(1,0)
        // this.backgroundSprite.scale.setTo(1.019,1.019);
        // this.backgroundSprite.scale.setTo(0.495,0.495);
        // this.backgroundSprite.alpha = 0.5;


        this.dateRect = this.add.sprite(750,395,'dateRectImg');
        this.dateRect.scale.setTo(0.8,0.8);
        this.dateRect.anchor.set(1,0);


        var style = { font: "20px Arial",fontStyle:'normal', fill: "#6ad0c9", wordWrap: true, wordWrapWidth: this.dateRect.width, align: "center", backgroundColor: "transparent" };
        yearText = game.add.text(660, 440, yearglobal, style);
        // this.text = game.add.bitmapText(750, 395, 'myFont', num, 18);
        yearText.anchor.set(0,0);
        yearText.angle = -35;
        // this.text.skewX = -10;


        // this.dateRect.tint = "0x0f0";
        // this.dateRect.alpha = 0.9;


        // game.debug.geom(floor,'#0fffff');
        // this.sprite = this.add.sprite(398, 570, 'smokeImg');
        // this.sprite.anchor.setTo(1,1);
        // this.sprite.backgroundColor = "#000";
        // this.sprite.animations.add('smoking');
        // this.sprite.animations.play('smoking', 20, true);


        this.trainSprite = this.add.sprite(canvasWidth, 64, 'train');
        this.trainSprite.anchor.setTo(1,0);
        this.trainSprite.animations.add('trainAnim',Phaser.Animation.generateFrameNames('', 0, 350, '.png', 4), 18, false);
        this.trainSprite.animations.play('trainAnim',18,true);

        this.trainMask = this.add.sprite(945, 639, 'trainMaskImg');
        this.trainMask.anchor.setTo(1,0);

        this.trainStation = this.add.sprite(1202, 384, 'trainStationImg');
        this.trainStation.anchor.setTo(1,0);
        // this.trainStation.alpha = 0.2;

        this.trainTunnelRT = this.add.sprite(1007, 610, 'trainTunnelRTImg');
        this.trainTunnelRT.anchor.setTo(1,0);
        // this.trainTunnelRT.alpha = 0.2;

        this.trainTunnelLT = this.add.sprite(667, 791, 'trainTunnelLTImg');
        this.trainTunnelLT.anchor.setTo(1,0);
        // this.trainTunnelLT.alpha = 0.2;


        this.boat = this.add.sprite(canvasWidth,64,'boatImg');
        this.boat.anchor.setTo(1,0);
        this.boat.animations.add('boatAnim',Phaser.Animation.generateFrameNames('Boat', 0, 1380, '.png', 5), 18, false);
        this.boat.animations.play('boatAnim',18,true);

        this.bridge = this.add.sprite(323, 776, 'bridgeImg');
        this.bridge.anchor.setTo(1,0);
        // this.bridge.tint = 0x0f0;
        // this.bridge.alpha = 0.2;





        // this.trainMask.alpha = 0.5;

        this.busSprite = this.add.sprite(canvasWidth, 64, 'carImg');
        this.busSprite.anchor.setTo(1,0);
        this.busSprite.animations.add('bus',Phaser.Animation.generateFrameNames('BusA', 0, 700, '.png', 4), 18, false);
        // this.busSprite.frameName = 'BusA0206.png';
        this.busSprite.animations.play('bus',18,true);
        this.busSprite.animations.currentAnim.setFrame(426, true);

        this.carASprite = this.add.sprite(canvasWidth, 64, 'carImg');
        this.carASprite.anchor.setTo(1,0);
        this.carASprite.animations.add('car1',Phaser.Animation.generateFrameNames('CarA', 0, 700, '.png', 4), 18, false);
        this.carASprite.animations.play('car1',18,true);
        this.carASprite.animations.currentAnim.setFrame(130, true);

        this.carBSprite = this.add.sprite(canvasWidth, 64, 'carImg');
        this.carBSprite.anchor.setTo(1,0);
        this.carBSprite.animations.add('car2',Phaser.Animation.generateFrameNames('CarB', 0, 700, '.png', 4), 18, false);
        this.carBSprite.animations.play('car2',18,true);

        this.carCSprite = this.add.sprite(canvasWidth, 64, 'carImg');
        this.carCSprite.anchor.setTo(1,0);
        this.carCSprite.animations.add('car3',Phaser.Animation.generateFrameNames('CarC', 0, 700, '.png', 4), 18, false);
        this.carCSprite.animations.play('car3',18,true);
        this.carCSprite.animations.currentAnim.setFrame(536, true);

        this.carDSprite = this.add.sprite(canvasWidth, 64, 'carImg');
        this.carDSprite.anchor.setTo(1,0);
        this.carDSprite.animations.add('car4',Phaser.Animation.generateFrameNames('CarD', 0, 700, '.png', 4), 18, false);
        this.carDSprite.animations.play('car4',18,true);


        ////// YELLLOW JEEP/////
        this.carESprite = this.add.sprite(canvasWidth, 64, 'carImg');
        this.carESprite.anchor.setTo(1,0);
        this.carESprite.animations.add('car5',Phaser.Animation.generateFrameNames('CarE', 0, 700, '.png', 4), 18, false);
        this.carESprite.animations.play('car5',18,true);
        this.carESprite.animations.currentAnim.setFrame(240, true);
        // this.carESprite.frameName = "CarE0240.png";
        // console.log(this.carESprite);

        this.truckASprite = this.add.sprite(canvasWidth, 64, 'carImg');
        this.truckASprite.anchor.setTo(1,0);
        this.truckASprite.animations.add('truck1',Phaser.Animation.generateFrameNames('TruckA', 0, 700, '.png', 4), 18, false);
        this.truckASprite.animations.play('truck1',18,true);

        this.truckBSprite = this.add.sprite(canvasWidth, 64, 'carImg');
        this.truckBSprite.anchor.setTo(1,0);
        this.truckBSprite.animations.add('truck2',Phaser.Animation.generateFrameNames('TruckB', 0, 700, '.png', 4), 18, false);
        this.truckBSprite.animations.play('truck2',18,true);


        this.folderSmall = this.add.sprite(698,310,'folderSmallImg');
        this.folderSmall.anchor.setTo(1,0);
        this.folderSmall.animations.add('folderSmallAnim',Phaser.Animation.generateFrameNames('Folder Small Path_small_Slow', 1, 311, '.png', 4), 18, false);
        this.folderSmall.animations.play('folderSmallAnim',18,true);

        this.folderLong1 = this.add.sprite(700,449,'folderLong1Img');
        this.folderLong1.anchor.setTo(1,0);
        this.folderLong1.scale.setTo(1,1);
        this.folderLong1.animations.add('folderLong1Anim',Phaser.Animation.generateFrameNames('Folder Long Path_small_Slow', 1, 220, '.png', 4), 18, false);
        this.folderLong1.animations.play('folderLong1Anim',18,false);
        this.folderLong1.animations.currentAnim.onComplete.add(startFolderLong2,this);

        this.folderLong2 = this.add.sprite(700,449,'folderLong2Img');
        this.folderLong2.anchor.setTo(1,0);
        this.folderLong2.scale.setTo(1,1);
        this.folderLong2.animations.add('folderLong2Anim',Phaser.Animation.generateFrameNames('Folder Long Path_small_Slow', 221, 323, '.png', 4), 18, false);
        this.folderLong2.animations.currentAnim.onComplete.add(startFolderLong1,this);
        this.folderLong2.visible = false;


        this.chimney = this.add.sprite(522,558,'chimneyImg');
        this.chimney.anchor.setTo(1,0);
        // this.chimney.tint = 0x0f0;
        // this.chimney.alpha = 0.2;


        this.smokeSprite = this.add.sprite(570, 510, 'smokeImg');
        this.smokeSprite.anchor.setTo(1,0);
        this.smokeSprite.animations.add('smokeAnim',Phaser.Animation.generateFrameNames('Smoke new', 1, 158, '.png', 4), 18, false);
        this.smokeSprite.animations.play('smokeAnim',18,true);

        this.tickSprite = this.add.sprite(428, 432, 'tickImg');
        this.tickSprite.anchor.setTo(1,0);
        this.tickSprite.scale.setTo(0.6,0.6);
        this.tickSprite.animations.add('tickAnim',Phaser.Animation.generateFrameNames('Tick', 1, 70, '.png', 2), 18, false);
        this.tickSprite.animations.play('tickAnim',18,true);


        this.singleWindmill = this.add.sprite(390,600,'singleWindmillImg');
        this.singleWindmill.anchor.setTo(1,0);
        this.singleWindmill.animations.add('singleWindmillAnim',Phaser.Animation.generateFrameNames('Wind Mill', 1, 299, '.png', 4), 18, false);
        this.singleWindmill.animations.play('singleWindmillAnim',18,true);

        this.windmill1 = this.add.sprite(1198,749,'windmill1Img');
        this.windmill1.anchor.setTo(1,0);
        this.windmill1.animations.add('windmill1Anim',Phaser.Animation.generateFrameNames('Wind Mill', 1, 200, '.png', 4), 18, false);
        this.windmill1.animations.play('windmill1Anim',18,false);
        this.folderLong1.animations.currentAnim.onComplete.add(startWindmill2,this);

        this.windmill2 = this.add.sprite(1198,749,'windmill2Img');
        this.windmill2.anchor.setTo(1,0);
        this.windmill2.animations.add('windmill2Anim',Phaser.Animation.generateFrameNames('Wind Mill', 201, 299, '.png', 4), 18, false);
        this.windmill2.animations.currentAnim.onComplete.add(startWindmill1,this);
        this.windmill2.visible = false;

        this.cityPart1 = this.add.sprite(403, 691, 'cityImg');// DISH ANTENNA BUILDING
        this.cityPart1.frameName = "g13903.png";
        // this.cityPart1.alpha = 0.5;
        // this.cityPart1.tint = 0x000000;

        this.cityPart2 = this.add.sprite(782, 501, 'cityImg');// TREE
        this.cityPart2.frameName = "g146659.png";
        // this.cityPart2.alpha = 0.5;
        // this.cityPart2.tint = 0x000000;

        this.cityPart3 = this.add.sprite(735, 323, 'cityImg');// BLUE CAR STARTING
        this.cityPart3.frameName = "g148523.png";
        // this.cityPart3.alpha = 0.5;
        // this.cityPart3.tint = 0x000000;

        this.cityPart4 = this.add.sprite(994, 326, 'cityImg');
        this.cityPart4.frameName = "g148939.png";
        // this.cityPart4.alpha = 0.5;
        // this.cityPart4.tint = 0x000000;

        // this.cityPart5 = this.add.sprite(238, 783, 'cityImg'); // BRIDGE
        // this.cityPart5.frameName = "g150945.png";
        // this.cityPart5.alpha = 0.5;
        // this.cityPart5.tint = 0x000000;

        this.cityPart6 = this.add.sprite(503, 681, 'cityImg'); // FLYOVER
        this.cityPart6.frameName = "g151622.png";
        // this.cityPart6.alpha = 0.5;
        // this.cityPart6.tint = 0x000000;

        this.Singlecar = this.add.sprite(canvasWidth,64, 'foCar');
        this.Singlecar.anchor.setTo(1,0);
        this.Singlecar.animations.add('fCar',Phaser.Animation.generateFrameNames('Image', 0, 700, '.png', 4), 18, false);
        this.Singlecar.animations.play('fCar',18,true);
        // this.Singlecar.animations.currentAnim.setFrame(524, true);


        this.cityPart7 = this.add.sprite(894, 382, 'cityImg'); // CRANE
        this.cityPart7.frameName = "g151998.png";
        // this.cityPart7.alpha = 0.5;
        // this.cityPart7.tint = 0x000000;

        this.cityPart8 = this.add.sprite(711, 531, 'deliveryImg'); // DELIVERY
//		this.cityPart8.frameName = "g152121.png";

        // this.cityPart8.alpha = 0.5;
        // this.cityPart8.tint = 0x000000;
//        this.trainMask.anchor.setTo(1,0);

        this.cityPart9 = this.add.sprite(600, 604, 'cityImg'); // BUILDING LEFT OF DELIVERY
        this.cityPart9.frameName = "g152124.png";
        // this.cityPart9.alpha = 0.5;
        // this.cityPart9.tint = 0x000000;

        // this.cityPart1.anchor.setTo(0.5,0.5);

        this.wf = this.add.sprite(458,669,'waterfall');
        this.wf.anchor.setTo(1,0);
        this.wf.animations.add('wfAnim',Phaser.Animation.generateFrameNames('Waterfall', 0, 34, '.png', 4), 18, false);
        this.wf.animations.play('wfAnim',18,true);
        // this.wf.animations.currentAnim.setFrame(130, true);


        this.crane = this.add.sprite(canvasWidth,64,'craneImg');
        this.crane.anchor.setTo(1,0);
        this.crane.animations.add('craneAnim',Phaser.Animation.generateFrameNames("", 0, 1380, '.png', 4), 18, false);
        this.crane.animations.play('craneAnim',18,true);


        this.railing = this.add.sprite(303, 792, 'railingImg');
        this.railing.anchor.setTo(1,0);
        // this.railing.tint = 0x0f0;
        // this.railing.alpha = 0.2;


        this.bubbleConcept = loadSprite('notification',380,150,0.5,1);
        this.bubbleStrategy = loadSprite('notification',435,192,0.5,1);
        this.bubblePrelim = loadSprite('notification',490,234,0.5,1);
        this.bubbleBusiness = loadSprite('notification',555,280,0.5,1);
        // this.bubbleInvest = loadSprite('notification',410,420,0.5,1);
        this.bubbleDelivery = loadSprite('notification',770,530,0.5,1);


        // this.text.x = Math.round(this.text.x);
        // this.text.y = Math.round(this.text.y);
        // this.text.defuzz();

        textConcept = loadText(conceptCount,'Proposals');
        this.bubbleConcept.addChild(textConcept[0]);
        this.bubbleConcept.addChild(textConcept[1]);
        this.bubbleConcept.name = "Concept";
        this.bubbleConcept.inputEnabled = true;
        this.bubbleConcept.events.onInputDown.add(openProposalPanel, this,0,this.bubbleConcept.name);

        textStrategy = loadText(strategicCount,'Proposals');
        this.bubbleStrategy.addChild(textStrategy[0]);
        this.bubbleStrategy.addChild(textStrategy[1]);
        this.bubbleStrategy.name = "Strategic Assessment";
        this.bubbleStrategy.inputEnabled = true;
        this.bubbleStrategy.events.onInputDown.add(openProposalPanel, this,0,this.bubbleStrategy.name);

        textPrelim = loadText(preliminaryCount,'Proposals');
        this.bubblePrelim.addChild(textPrelim[0]);
        this.bubblePrelim.addChild(textPrelim[1]);
        this.bubblePrelim.name = "Preliminary Evaluation";
        this.bubblePrelim.inputEnabled = true;
        this.bubblePrelim.events.onInputDown.add(openProposalPanel, this,0,this.bubblePrelim.name);

        textBusiness = loadText(businessCount,'Proposals');
        this.bubbleBusiness.addChild(textBusiness[0]);
        this.bubbleBusiness.addChild(textBusiness[1]);
        this.bubbleBusiness.name = "Business Case";
        this.bubbleBusiness.inputEnabled = true;
        this.bubbleBusiness.events.onInputDown.add(openProposalPanel, this,0,this.bubbleBusiness.name);

        // textInvest = loadText(investmentCount,'Proposals');
        // this.bubbleInvest.addChild(textInvest[0]);
        // this.bubbleInvest.addChild(textInvest[1]);
        // this.bubbleInvest.name = "Investment Decision";
        // this.bubbleInvest.inputEnabled = true;
        // this.bubbleInvest.events.onInputDown.add(openProposalPanel, this,0,this.bubbleInvest.name);

        textDelivery = loadText(deliveryCount,'Projects');
        this.bubbleDelivery.addChild(textDelivery[0]);
        this.bubbleDelivery.addChild(textDelivery[1]);
        this.bubbleDelivery.name = "Delivery";
        this.bubbleDelivery.inputEnabled = true;
        this.bubbleDelivery.events.onInputDown.add(openProjectPanel, this,0,this.bubbleDelivery.name);

        //|--|--|
        //|--|--|
        //|--|--|

        game.renderer.renderSession.roundPixels = true;
        filterFunction(true);
    },
    update: function () {

    }
};


function loadAssets() {

}


function startFolderLong1(){
    // console.log("START1");
    this.folderLong1.visible = true;
    this.folderLong2.visible = false;

    this.folderLong1.animations.play('folderLong1Anim',18,false);
};

function startFolderLong2(){
    // console.log("START2");
    this.folderLong2.visible = true;
    this.folderLong1.visible = false;

    this.folderLong2.animations.play('folderLong2Anim',18,false);
};


function startWindmill1 () {
    this.windmill1.visible = true;
    this.windmill2.visible = false;

    this.windmill1.animations.play('windmill1Anim',18,false);
}


function startWindmill2 () {
    this.windmill2.visible = true;
    this.windmill1.visible = false;

    this.windmill2.animations.play('windmill2Anim',18,false);
}

function onDown(sprite, pointer) {
    // do something wonderful here
    // console.log(sprite.name);
    // console.log("ASDFFDSA");
    openProjectPanel();
    // console.log("Bubble clicked");
};

function loadSprite(spriteImg, posx, posy, ax, ay){
    var sprite = game.add.sprite(posx,posy,spriteImg);
    sprite.anchor.setTo(ax,ay);
    sprite.inputEnabled = true;
    sprite.events.onInputOver.add(over, this);
    sprite.events.onInputOut.add(out, this);
    sprite.input.pixelPerfectOver = true;
    sprite.input.useHandCursor = true;

    return sprite;
};

function loadText(num,textType){
    // var styleNum = { font: "18px Arial", fill: "#000000", wordWrap: true, align: "center" };
    // var style = { font: "11px Arial", fill: "#000000", wordWrap: true, align: "center" };

    var text = [];
    text[0] = game.add.bitmapText(0, -45, 'myFont', num, 18);
    text[0].anchor.set(0.5,1);


    text[1] = game.add.bitmapText(0, -35, 'myFont', textType, 11);
    text[1].anchor.set(0.5,1);


    return text;

}

function updateYearText() {
    yearText.setText(yearglobal);
};

function updateText(){
    textConcept[0].setText(conceptCount);
    textStrategy[0].setText(strategicCount);
    textPrelim[0].setText(preliminaryCount);
    textBusiness[0].setText(businessCount);
    // textInvest[0].setText(investmentCount);
    textDelivery[0].setText(deliveryCount);
}

function over(spriteOver) {
    spriteOver.scale.setTo(1.1,1.1);
    game.renderer.renderSession.roundPixels = true;

};

function out(spriteout) {
    spriteout.scale.setTo(1,1);
};

