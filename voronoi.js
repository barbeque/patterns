function main() {
	var canvas = document.getElementById("canvas");
	var context = canvas.getContext("2d");
	var hose = new PixelHose(canvas, context);
	
	hose.clear();
	
	for(var y = 0; y < canvas.height; ++y) {
		for(var x = 0; x < canvas.width; ++x) {
			var colour = { r: 255, g: 255, b: 255, a: 255 };
			if((x + y) % 4 == 0) {
				colour.g = 0;
				colour.b = 0;
			}
			hose.draw(x, y, colour);
		}
	}
	
	blitInversionRect(25, 25, 50, 75, hose);
	
	hose.flip();
}

function blitInversionRect(startX, startY, w, h, hose) {
	for(var y = startY; y < startY + h; ++y) {
		for(var x = startX; x < startX + w; ++x) {
			var colour = hose.get(x, y);
			if((x + y) % 2 == 0) {
				colour.r = 255 - colour.r;
				hose.draw(x, y, colour);
			}
		}
	}
}