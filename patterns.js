function main() {
	var canvas = document.getElementById("canvas");
	var context = canvas.getContext("2d");
	var hose = new PixelHose(canvas, context);

	var state = { offset: { u: 0, v: 0 } };

	var texMap = buildTextureMap();
	state.texture = texMap;

	var s = function() { step(canvas, context, hose, state); }
	state.stepFunction = s;
	setTimeout(s, 1000 / 30);
}

function buildTextureMap() {
	var w = 64;
	var h = 64;

	var checkerboardStep = 8;
	var yChecked = false;
	var xChecked = true;

	var map = new Array(h);
	for(var y = 0; y < map.length; ++y) {
		map[y] = new Array(w);
	}

	for(var y = 0; y < h; ++y) {
		for(var x = 0; x < w; ++x) {
			if(x > w / 2 && y > h / 2) {
				map[y][x] = { r: 0, g: 255, b: 0, a: 255 };
			}
			else if(y > h / 2) {
				map[y][x] = { r: 0, g: 128, b: 0, a: 255 };
			}
			else if(x > w / 2) {
				map[y][x] = { r: 128, g: 0, b: 0, a: 255 };
			}
			else {
				map[y][x] = { r: 255, g: 0, b: 0, a: 255 };
			}
		}
	}

	return map;
}

function step(canvas, context, hose, state) {
	state.offset.u += 5;
	state.offset.v += 5;

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
				// For now, just do some stripes
				var uv = computeUV(x, y, centreX, centreY, radius);
				var colour = sample(uv, state.offset, state.texture);

				hose.draw(x, y, colour);
			}
		}
	}

	// draw the texture map in the lower right corner
	for(var y = 0; y < state.texture.length; ++y) {
		for(var x = 0; x < state.texture[y].length; ++x) {
			var mapOriginX = 0;
			var mapOriginY = canvas.height - state.texture.length;
			hose.draw(x + mapOriginX, y + mapOriginY, state.texture[y][x]);
		}
	}

	hose.flip();

	setTimeout(state.stepFunction, 1000 / 30);
}

function sample(uv, offset, texture) {
	var yIndex = Math.floor(uv.v * (texture.length - 1)) % texture.length - 1;
	var xIndex = Math.floor(uv.u * (texture[yIndex].length - 1)) % texture[yIndex].length - 1;

	var c = texture[yIndex][xIndex];
	return c;
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
