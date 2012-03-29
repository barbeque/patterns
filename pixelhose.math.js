var phMath = {
	// utility functions for geometry
	distance: function(x1, y1, x2, y2) {
		return Math.sqrt((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1));
	},
	
	polarToCartesian: function(r, theta) {
		return { x: r * Math.cos(theta), y: r * Math.sin(theta) };
	},
	
	cartesianToPolar: function(x, y) {
		return { r: Math.sqrt(y * y + x * x), theta: Math.atan2(y, x) };
	}
};