PixelHose = function(canvas, context) {
	var canvas = canvas;
	var context = context;
	var buffer = context.createImageData(canvas.width, canvas.height);
	
	return {
		clear: function() {
			for(var i = 0; i < buffer.data.length; ++i) {
				buffer.data[i] = 0;
			}
		},
		
		draw: function(x, y, colour) {
			// assuming { r, g, b, a }
			var index = (y * canvas.width * 4) + (x * 4);
			buffer.data[index] = colour.r;
			buffer.data[index + 1] = colour.g;
			buffer.data[index + 2] = colour.b;
			buffer.data[index + 3] = colour.a;
		},
		
		flip: function() {
			context.save();
			context.fillStyle = "black";
			context.fillRect(0, 0, canvas.width, canvas.height);
			context.restore();
			
			context.putImageData(buffer, 0, 0);
		}
	};
}