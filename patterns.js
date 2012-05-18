function main() {
	var canvas = document.getElementById("canvas");
	var context = canvas.getContext("2d");
	var hose = new PixelHose(canvas, context);
	
	hose.clear();

	var sphereHeight = 256;
	var sphereWidth = 256;
	var originX = (canvas.width - sphereWidth) / 2;
	var originY = (canvas.height - sphereHeight) / 2;
	var centreX = (originX + (sphereWidth / 2));
	var centreY = (originY + (sphereHeight / 2));
	var radius = 95;

	for(var y = originY; y < originY + sphereHeight; ++y) {
		for(var x = originX; x < originX + sphereWidth; ++x) {
			if(distance(x, y, centreX, centreY) < radius) {
				hose.draw(x, y, { r: 255, g: 0, b: 0, a: 255 });
			}
		}
	}

	hose.flip();
}

function distance(x1, y1, x2, y2) {
	return Math.sqrt((y2-y1) * (y2-y1) + (x2-x1)*(x2-x1));
}
