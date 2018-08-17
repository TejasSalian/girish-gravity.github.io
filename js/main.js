var TechnoTip = {};

TechnoTip.Main = function (game) {

};

TechnoTip.Main.prototype = {
	preload: function() {
		this.load.image('img1','images/img1.jpg');
		this.load.image('img2', 'images/img2.jpg');

	},

	create: funtion () {
		this.add.sprite(10,20,'img1');
		this.add.sprite(20,10,'img2');
		
	}
}