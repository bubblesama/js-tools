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

var conf = {
	display: {
		screen: {w: 800, h: 600},
		palette: {
			//https://coolors.co/2c302e-474a48-909590-9ae19d-537a5a
			darkest: "rgb(44,48,46)",
			dark: "rgb(71,74,72)",
			light: "rgb(144,149,144)",
			main: "rgb(154,225,157)",
			second: "rgb(83,122,90)"
		}
	}
};

var model = {
	glyphs: [],
	update: function(){
		for (var i=0;i<model.glyphs.length;i++){
			var glyph = model.glyphs[i];
			glyph.update();
		}
	},
	addGlyph(glyph){
		this.glyphs.push(glyph);
	}
};

var getSimpleCircleGlyph = function(x0, y0, r){
	return {
		x0: x0,
		y0: y0,
		r: r,
		update: function(){},
		draw: function(context){
			context.fillStyle = conf.display.palette.main;
			fillEllipse(context,this.x0,this.y0,this.r,this.r);
		}
	};
};

var getSimpleBlinkingCircleGlyph = function(x0, y0, r){
	return {
		x0: x0,
		y0: y0,
		r: r,
		maxTick: 10,
		currentTick: 0,
		visible: true,
		update: function(){
			this.currentTick++;
			if (this.maxTick < this.currentTick){
				this.currentTick = 0;
				this.visible = !this.visible;
			}
		},
		draw: function(context){
			if (this.visible){
				context.fillStyle = conf.display.palette.main;
				fillEllipse(context,this.x0,this.y0,this.r,this.r);
			}
		}
	};
};

var getRotatingCircleGlyph = function(x0, y0, wayR, r, steps, currentStep){
	return {
		steps: steps,
		currentStep: currentStep,
		x0: x0,
		y0: y0,
		r: r,
		wayR: wayR,
		update: function(){
			this.currentStep++;
			if (this.currentStep >= this.steps){
				this.currentStep = 1;
			}
		},
		draw: function(context){
			context.fillStyle = conf.display.palette.main;
			fillEllipse(
				context,
				this.x0+this.wayR*Math.cos(Math.PI*2.0*this.currentStep/this.steps),
				this.y0+this.wayR*Math.sin(Math.PI*2.0*this.currentStep/this.steps),
				this.r,
				this.r);
		}
	};
};

var display = {
	draw: function(){
		// cleaning
		context.fillStyle = conf.display.palette.darkest;
		context.fillRect(
			0,
			0,
			conf.display.screen.w,
			conf.display.screen.h
		);
		// 
		for (var i=0;i<model.glyphs.length;i++){
			var glyph = model.glyphs[i];
			glyph.draw(context);
		}
	}
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
	model.addGlyph(getSimpleBlinkingCircleGlyph(50,30,20));
	model.addGlyph(getSimpleCircleGlyph(60,30,100));
	model.addGlyph(getSimpleCircleGlyph(200,300,40));
	model.addGlyph(getRotatingCircleGlyph(200,300,100,10,400));
	model.addGlyph(getRotatingCircleGlyph(200,300,100,10,400,1));
	model.addGlyph(getRotatingCircleGlyph(200,300,100,10,400, 50));
	model.addGlyph(getRotatingCircleGlyph(200,300,100,10,400,100));
	model.addGlyph(getRotatingCircleGlyph(200,300,100,10,400,150));
	model.addGlyph(getRotatingCircleGlyph(200,300,100,10,400,200));
	model.addGlyph(getRotatingCircleGlyph(200,300,100,10,400,250));
	model.addGlyph(getRotatingCircleGlyph(200,300,100,10,400,300));
	model.addGlyph(getRotatingCircleGlyph(200,300,100,10,400,350));
	requestAnimationFrame(mainLoop);
};

function mainLoop() {
	model.update();
	display.draw();
	requestAnimationFrame(mainLoop);
};



