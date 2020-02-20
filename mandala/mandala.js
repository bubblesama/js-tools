var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");

//******* init canvas controls *******
var keyMap ={};

document.addEventListener(
	'keydown',
	(event) => {
		keyMap[event.key] = true;
	},
	false
);
document.addEventListener(
	'keyup', 
	(event) => {
		keyMap[event.key] = false;
	},
	false
);
function getMousePosition(canvas, evt) {
	var rect = canvas.getBoundingClientRect();
	return {
		x: evt.clientX - rect.left,
		y: evt.clientY - rect.top
	};
};
canvas.addEventListener(
	'mousemove', 
	function(evt) {},
	false
);
canvas.addEventListener(
	'mouseout', 
	function(evt) {}, 
	false
);
canvas.addEventListener(
	'mouseover', 
	function(evt) {},
	false
);
canvas.addEventListener(
	'click', 
	function(evt) {}, 
	false
);

var model = {
	update: function(){}
};

var display = {
	draw: function(){}
};


//******* draw primitives  *******
function fillEllipse(ctx, x, y, w, h) {
	var kappa = .5522848,
	ox = (w / 2) * kappa, // control point offset horizontal
	oy = (h / 2) * kappa, // control point offset vertical
	xe = x + w,           // x-end
	ye = y + h,           // y-end
	xm = x + w / 2,       // x-middle
	ym = y + h / 2;       // y-middle
	ctx.beginPath();
	ctx.moveTo(x, ym);
	ctx.bezierCurveTo(x, ym - oy, xm - ox, y, xm, y);
	ctx.bezierCurveTo(xm + ox, y, xe, ym - oy, xe, ym);
	ctx.bezierCurveTo(xe, ym + oy, xm + ox, ye, xm, ye);
	ctx.bezierCurveTo(xm - ox, ye, x, ym + oy, x, ym);
	ctx.fill();
}

//************************************ INIT ***********************************
function start(){
	requestAnimationFrame(mainLoop);
};

function mainLoop() {
	model.update();
	display.draw();
	requestAnimationFrame(mainLoop);
}
