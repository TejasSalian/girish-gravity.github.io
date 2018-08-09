var game = new Phaser.Game(1256,630,Phaser.AUTO,'canvasContainer',{preload:preload});

// window.onload = function() {
//  game.state.add('Game', PhaserGame, true);
//}
function preload() {
    game.stage.backgroundColor = '#ffffff';
}

window.onload = function() {
    game.state.add('scene-boot', bootScene.Main,true);
	game.state.add('scene-preload', preloadScene.Main,true);
	game.state.add('scene1', cubeScene.Main,true);
	game.state.add('scene3', mainScene.Main,true);
	game.state.start('scene-boot');

	// game.state.add('scene3', mainScene.Main, true);
	// game.state.start('scene3');
}