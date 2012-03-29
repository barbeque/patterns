function main() {
	var canvas = document.getElementById("canvas");
	var context = canvas.getContext("2d");
	var hose = new PixelHose(canvas, context);
	
	hose.clear();
	
	blitConcentricCircles(10, 50, hose);
	blitConcentricCircles(100, 300, hose);
	blitConcentricCircles(450, 500, hose);
	
	//drawPolar(canvas.width / 2, canvas.height / 2, function(theta) { return 2 * Math.sin(4 * theta); }, 45.0, hose);
	drawPolar(canvas.width / 2, canvas.height / 2, function(theta) { return 2 * Math.sin(12 * theta - 4); }, 45.0, hose);
	drawPolar(canvas.width / 2, canvas.height / 2, function(theta) { return 2 * Math.sin(4 * theta - 12); }, 45.0, hose);
	
	hose.flip();
}

function drawPolar(originX, originY, polarFunction, scale, hose) {
	for(var theta = 0.0; theta < Math.PI * 2.0; theta += 0.001) {
		var r = polarFunction(theta) * scale;
		var coords = phMath.polarToCartesian(r, theta);
		
		hose.draw(Math.round(coords.x + originX), Math.round(coords.y + originY), { r: 0, g: 0, b: 255, a: 255 });
	}
}

function blitConcentricCircles(originX, originY, hose) {
	for(var y = 0; y < canvas.height; ++y) {
		for(var x = 0; x < canvas.width; ++x) {
			var colour = { r: 255, g: 255, b: 255, a: 255 };
			
			if(Math.round(phMath.distance(originX, originY, x, y)) % 10 == 0) {
				colour.g = 0;
				colour.b = 0;
				hose.draw(x, y, colour);
			}		
		}
	}
}