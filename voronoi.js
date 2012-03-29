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
	
	hose.flip();
}