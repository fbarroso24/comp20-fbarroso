function init() {
	var ctx = document.getElementById('game_canvas').getContext('2d');
	var img= new Image();
	img.src = 'pacman10-hp-sprite.png';

	// Draw Google background
	ctx.drawImage(img, 320, 0, 466, 138, 0, 0, 466, 138);

	// Draw Ms. Pacman on top of background
	ctx.drawImage(img, 80, 24, 20, 15, 37, 32, 18, 16);
}