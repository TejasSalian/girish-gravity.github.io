var bootScene = {};

bootScene.Main = function (game) {
	this.ready = false;
};

bootScene.Main.prototype = {
	preload: function() {
		this.load.image('info','images/u16.png');
		this.load.spritesheet('button', 'images/cubeBtn2.png', 136,229);
		this.load.image('cube', 'images/cube_u7.png');
		this.load.image('cubehover', 'images/cube_u7_mouseover.png');
		// this.load.video('cubeAnim','images/CubeAnim2.mp4');
		this.load.video('cubeAnim','images/CubeAnimConverted.mp4');
		// this.load.video('cubeAnim','images/CubeAnimConverted.webm');

		this.load.image('preloadBarOutline','images/progressBarOutline.png');
		this.load.image('preloadBar','images/progressBar.png');

		this.load.onLoadComplete.add(this.loadComplete, this);
	},
    loadComplete: function(){
       this.ready = true;
       // console.log("LOADED ALL ASSETS OF MAIN SCENE");
    },
    update: function(){
        if(this.ready === true) 
        {
			game.state.start('scene1');
        } 
    }


};