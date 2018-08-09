var infoScene = {};

infoScene.Main = function (game) {

};

infoScene.Main.prototype = {
	preload: function() {
		this.load.image('info','images/u39.png');
		this.load.image('skipImg','images/skip.png');
	},

	create: function () {

		$("#canvasContainer").css("overflowY", "scroll");

		this.scale.setGameSize(1256, 1930);

		this.stage.backgroundColor = '#ffffff';

		this.infotext = game.add.sprite(0,0,'info');
		// this.infotext.anchor.setTo(0.5,0.5);
		this.infotext.scale.setTo(1,1);

		// this.skipBtn =  game.add.button(800,0,'skipImg');
		this.skipBtn = game.add.button(1141,  27, 'skipImg', actionOnClick2, this, 0, 1, 2);
		this.skipBtn.scale.setTo(1,1);

	}

};

function actionOnClick2 () {
	game.state.add('scene3', mainScene.Main, true);
	game.state.start('scene3');
}