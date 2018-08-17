var cubeScene = {};

cubeScene.Main = function (game) {

};

cubeScene.Main.prototype = {
	preload: function() {
//		this.load.image('info','images/u16.png');
//		this.load.spritesheet('button', 'images/cubeBtn2.png', 136,229);
//		this.load.image('cube', 'images/cube_u7.png');
//		this.load.image('cubehover', 'images/cube_u7_mouseover.png');
//		// this.load.video('cubeAnim','images/CubeAnim2.mp4');
//		this.load.video('cubeAnim','images/CubeAnimConverted.mp4');
//		// this.load.video('cubeAnim','images/CubeAnimConverted.webm');
//		this.load.image('preloadBarOutline','images/progressBarOutline.png');
//		this.load.image('preloadBar','images/progressBar.png');

	},

	create: function () {
		$(".infoSection").hide();
		$(".footer").css('top', '0px');	
		
		$("#canvasContainer").css("overflowY", "hidden");
		this.scale.setGameSize(1256, 630);

		this.stage.backgroundColor = '#ffffff';

		this.button = game.add.button(game.world.centerX,  480, 'button', actionOnClick, this, 0, 1, 2);
	    this.button.anchor.setTo(0.5, 0.5);
	    this.button.x = game.world.centerX-10;

	    var tween = game.add.tween(this.button).to( { x: game.world.centerX+10 }, 1500, "Linear", true, 0, -1);

	    //  And this tells it to yoyo, i.e. move back to zero again before repeating.
	    //  The 0 tells it to wait for 0 seconds before starting the fade back.
	    tween.yoyo(true, 0);

	    this.video = this.add.video('cubeAnim');
	    this.video.onComplete.addOnce(delay, this);
		this.videoSprite = this.video.addToWorld(0, 0,0, 0, 1, 1);
		this.videoSprite.visible = false;
		
		// this.infotext = game.add.sprite(game.world.centerX,200,'info');
	    // setting the anchor to the center
	    // this.infotext.anchor.setTo(0.5,0.5);

	}

};

function actionOnClick () {
	//  Manually changing the frames of the button, i.e, how it will look when you play with it
	// this.button.setFrames(1, 0, 1);
	
	// this.add.tween(this.infotext).to( { alpha: 0 }, 2000, Phaser.Easing.Linear.None, true);

	$(".scene1_Text").fadeOut("slow");

	this.videoSprite.visible = true;
	this.video.play(false);
	this.button.visible = false;

	// this.video.onComplete('changeScene');
}

function delay()
{
	game.time.events.add(1000, changeScene, this);
}

function changeScene() {
	$(".infoSection").css({'display':'block'});
	isVisible();

}
