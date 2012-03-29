function main() {
	var canvas = document.getElementById("canvas");
	var context = canvas.getContext("2d");
	var hose = new PixelHose(canvas, context);
	
	hose.clear();
	
	var originX = 10;
	var originY = 50;
	
	for(var y = 0; y < canvas.height; ++y) {
		for(var x = 0; x < canvas.width; ++x) {
			var colour = { r: 255, g: 255, b: 255, a: 255 };
			
			if(Math.round(hose.distance(originX, originY, x, y)) % 10 == 0) {
				colour.g = 0;
				colour.b = 0;
			}
			
			hose.draw(x, y, colour);
		}
	}
	
	blitInversionRect(25, 25, 150, 205, hose);
	// interference is wacky.
	blitInversionRect(50, 50, 150, 205, hose);
	blitInversionRect(75, 75, 150, 205, hose);
	blitInversionRect(100, 100, 150, 205, hose);
	
	hose.flip();
}

function blitInversionRect(startX, startY, w, h, hose) {
	for(var y = startY; y < startY + h; ++y) {
		for(var x = startX; x < startX + w; ++x) {
			var colour = hose.get(x, y);
			if((x + y) % 10 == 0) {
				colour.r = (255 - colour.r);
				hose.draw(x, y, colour);
			}
		}
	}
}