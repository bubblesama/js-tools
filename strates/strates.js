var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");

//******* init control *******
var keyMap ={};

document.addEventListener('keydown', (event) => {
	keyMap[event.key] = true;
  /*
  if (keyName === 'Control') {
    // not alert when only Control key is pressed.
    return;
  }

  if (event.ctrlKey) {
    // Even though event.key is not 'Control' (i.e. 'a' is pressed),
    // event.ctrlKey may be true if Ctrl key is pressed at the time.
    alert(`Combination of ctrlKey + ${keyName}`);
  } else {
    alert(`Key pressed ${keyName}`);
  }
  
  */
}, false);

document.addEventListener('keyup', (event) => {
	keyMap[event.key] = false;
}, false);


function getMousePosition(canvas, evt) {
	var rect = canvas.getBoundingClientRect();
	return {
		x: evt.clientX - rect.left,
		y: evt.clientY - rect.top
	};
}

var mouse = {
	x: 200,
	y: 200
};

canvas.addEventListener('mousemove', function(evt) {
	var mousePosition = getMousePosition(canvas, evt);
	if (isInRectangle(mousePosition.x, mousePosition.y, 0, 0, game.display.viewport.w, game.display.viewport.h)){
		mouse.x = mousePosition.x;
		mouse.y = mousePosition.y;
	}
}, false);


//**********  game *

var game = {};
//données de base
game.ticker = 0;
game.lastFpsCountDate = Date.now();
game.fps = 0;


//COMPOSANTS DU JEU
//MODEL
game.model = {

	map: {
		WIDTH: 200.0,
		HEIGHT: 100.0,
		elements: [],
		addElement: function(type, x, y, size){
			game.model.map.elements.push({"type": type, "x":x, "y": y, "size":size});
		}
	},
	addMapElement: function(type, x, y, size){
		game.model.map.addElement(type, x, y, size);
	},
	_update: function(){

	}
};
//CONTROLES
game.controls = {
	scroll: {
		conf: {
			dx: 2,
			dy: 1
		},
		state: {
			isScrolling : false,
			dx: 0,
			dy: 0
		},
		update: function(){
			game.controls.scroll.state.dx = 0;
			game.controls.scroll.state.dy = 0;
			if (isInRectangle(mouse.x, mouse.y, 0, 0, game.display.viewport.w, game.display.controls.scroll.width)){
				game.controls.scroll.state.isScrolling = true;
				game.controls.scroll.state.dy = -game.controls.scroll.conf.dy;
			}
			if (isInRectangle(mouse.x, mouse.y, 0, game.display.viewport.h-game.display.controls.scroll.width, game.display.viewport.w, game.display.controls.scroll.width)){
				game.controls.scroll.state.isScrolling = true;
				game.controls.scroll.state.dy = game.controls.scroll.conf.dy;
			}
			if (isInRectangle(mouse.x, mouse.y, 0, 0, game.display.controls.scroll.width,game.display.viewport.h)){
				game.controls.scroll.state.isScrolling = true;
				game.controls.scroll.state.dx = -game.controls.scroll.conf.dx;
			}
			if (isInRectangle(mouse.x, mouse.y, game.display.viewport.w-game.display.controls.scroll.width, 0, game.display.controls.scroll.width, game.display.viewport.h)){
				game.controls.scroll.state.isScrolling = true;
				game.controls.scroll.state.dx = game.controls.scroll.conf.dx;
			}
		}
	},
	update: function(){
		game.controls.scroll.update();
	}
};


function isInRectangle(x, y, rectX0, rectY0, width, height){
	return (x> rectX0 && x<rectX0+width && y > rectY0 && y < rectY0+height)
};

//AFFICHAGE
game.display = {
	viewport: {
		w: 800,
		h: 600
	},
	map: {
		pixels_per_unit: 10,
		from: {
			x: 0,
			y:0
		}
	},
	controls: {
		scroll :{
			width: 40
		}
	},
	update: function(){
		//update from input
		//scroll
		if (game.controls.scroll.state.isScrolling){
			game.display.map.from.x += game.controls.scroll.state.dx;
			game.display.map.from.y += game.controls.scroll.state.dy;

			game.display.map.from.x = Math.max(0, game.display.map.from.x);
			game.display.map.from.x = Math.min(game.display.map.from.x, game.model.map.WIDTH);
			game.display.map.from.y = Math.max(0, game.display.map.from.y);
			game.display.map.from.y = Math.min(game.display.map.from.y, game.model.map.HEIGHT);

		}
	}
};

// METHODE DE DESSIN
game.draw = function(){
	//clean
	context.fillStyle = "rgb(200,200,200)";
	context.fillRect(0,0,game.display.viewport.w,game.display.viewport.h);
	context.fillStyle = "rgb(0,0,0)";
	context.fillText("FPS: "+this.fps,10,20);
	//controls
	// four scroll zones
	context.strokeStyle = "rgb(255,0,0)";
	context.strokeRect(0,0,game.display.viewport.w,game.display.controls.scroll.width);
	context.strokeRect(0,game.display.viewport.h-game.display.controls.scroll.width,game.display.viewport.w,game.display.controls.scroll.width);
	context.strokeRect(0,0,game.display.controls.scroll.width,game.display.viewport.h);
	context.strokeRect(game.display.viewport.w-game.display.controls.scroll.width,0,game.display.controls.scroll.width,game.display.viewport.h);
	

	//map
	for (var i=0;i < game.model.map.elements.length;i++){
		context.fillStyle = "rgb(60,120,60)";
		context.strokeStyle = "rgb(60,120,60)";
		//context.fillRect(
		//	game.display.map.pixels_per_unit*(game.model.map.elements[i].x-game.model.map.elements[i].size/2),
		//	game.display.map.pixels_per_unit*(game.model.map.elements[i].y-game.model.map.elements[i].size/2),
		//	game.display.map.pixels_per_unit*game.model.map.elements[i].size,
		//	game.display.map.pixels_per_unit*game.model.map.elements[i].size
		//);
		fillEllipse(
			context,
			game.display.map.pixels_per_unit*(game.model.map.elements[i].x-game.model.map.elements[i].size/2-game.display.map.from.x),
			game.display.map.pixels_per_unit*(game.model.map.elements[i].y-game.model.map.elements[i].size/2-game.display.map.from.y),
			game.display.map.pixels_per_unit*game.model.map.elements[i].size,
			game.display.map.pixels_per_unit*game.model.map.elements[i].size
		);

	}

	//mouse
	context.fillStyle = "rgb(255,255,0)";
	fillEllipse(
		context,
		mouse.x,
		mouse.y,
		10,
		10
	);
};


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



// METHODE DE MaJ
game.update = function(){
	// fps
	if (Date.now()-this.lastFpsCountDate > 1000){
		this.lastFpsCountDate = Date.now();
		this.fps = this.ticker;
		this.ticker = 0;
	}else{
		this.ticker++;
	}
	//inputs update
	game.controls.update();
	//model
	game.model._update();
	// display
	game.display.update();
};



//************************************ INIT ***********************************
function start(){
	//init
	game.model.addMapElement("tree", 10.0, 10.0, 2.0);
	game.model.addMapElement("tree", 10.0, 18.0, 4.0);
	for (var i=0;i<400;i++){
		game.model.addMapElement("tree", i, i/10, 1.0);
		game.model.addMapElement("tree", i, i, 1.0);
		game.model.addMapElement("tree", i/10, i, 1.0);
	}
	//graphical context
	context.imageSmoothingEnabled = false;
	requestAnimationFrame(mainLoop)
};

function mainLoop() {
	game.update();
	game.draw();
	requestAnimationFrame(mainLoop);
}


