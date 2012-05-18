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
				//var z = computeZ(x, y, centreX, centreY, radius);

				// For now, just do some stripes
				var uv = computeUV(x, y, centreX, centreY, radius);
				var colour = (uv.u) * 255;

				hose.draw(x, y, { r: 0, g: uv.u * 255, b: uv.v * 255, a: 255 });
			}
		}
	}

	hose.flip();
}

/// Get Euclidian distance between two points on the same coordinate
/// system.
function distance(x1, y1, x2, y2) {
	return Math.sqrt((y2-y1) * (y2-y1) + (x2-x1)*(x2-x1));
}

/// Get the depth at a given screen position
function computeZ(x, y, centreX, centreY, radius) {
	// Figure out the Z for X dimension
	var dx = Math.abs(centreX - x);
	var zx = Math.sqrt(radius*radius - dx*dx);
	// Figure out the Z for Y dimension
	var dy = Math.abs(centreY - y);
	var zy = Math.sqrt(radius*radius - dy*dy);
	return (zx + zy) / 2; // I dunno, average seems right?
}

/// Get the U,V coordinate on the face of the sphere at a given
/// screen position.
function computeUV(x, y, centreX, centreY, radius) {
	// figure out Z
	var z = computeZ(x, y, centreX, centreY, radius);
	// compute UV from Z
	return { u: x / Math.sqrt(x*x + y*y + z*z), v: y / Math.sqrt(x*x + y*y + z*z) };
}
