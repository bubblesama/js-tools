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

canvas.addEventListener('mousemove', function(evt) {
	var mousePosition = getMousePosition(canvas, evt);
	if (isInRectangle(mousePosition.x, mousePosition.y, 0, 0, game.conf.display.viewport.W, game.conf.display.viewport.H)){
		game.controls.mouse.x = mousePosition.x;
		game.controls.mouse.y = mousePosition.y;
	}
}, false);

canvas.addEventListener('mouseout', function(evt) {
	game.controls.mouse.in = false;
	game.controls.mouse.x = -1;
	game.controls.mouse.y = -1;
}, false);

canvas.addEventListener('mouseover', function(evt) {
	game.controls.mouse.in = true;
}, false);

canvas.addEventListener('click', function(evt) {
	//console.log("click");
	game.controls.mouse.clicked = true;

}, false);

//**********  game *

var game = {};
//données de base
game.ticker = 0;
game.lastFpsCountDate = Date.now();
game.fps = 0;


//CONFIGURATION

game.conf = {
	controls: {

	},
	display:{
		viewport: {
			W: 800,
			H: 600
		},
		map: {
			PX_PER_UNIT: 10
		},
		portaits: {
			W: 100,
			H: 150
		},
	}

}




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
	mobs: {
		list: [],
		addMob: function(type, x0, y0, size){
			this.list.push({
				//mob definition
				type: type,
				trunk: {
					x: x0,
					y: y0,
					size: size
				},
				//TODO mob brain and updates
				legs: {}
				
			});
		}
	},
	//global functions
	_update: function(){

	},
	registerPlayerAction: function(x, y){
		console.log("#registerPlayerAction action on map point: "+x +" "+y);
	}

};


function isInRectangle(x, y, rectX0, rectY0, width, height){
	return (x> rectX0 && x<rectX0+width && y > rectY0 && y < rectY0+height)
};

//AFFICHAGE
game.display = {
	map: {
		pixels_per_unit: 10,
		from: {
			//coords
			x: 0,
			y: 0
		}
	},
	sprites: {
		// gobo: 804x1324 pour 13x21 => ?x?
		gobo: {
			//248,127, 50x45
			from: {x: 248, y: 127},
			width: 50,
			height: 45,
			sheet: null
		},
		chars: {
			sheet: null
		}
	},
	controls: {
		scroll: {
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
			game.display.map.from.x = Math.min(game.display.map.from.x, game.model.map.WIDTH-game.conf.display.viewport.W/game.conf.display.map.PX_PER_UNIT);
			game.display.map.from.y = Math.max(0, game.display.map.from.y);
			game.display.map.from.y = Math.min(game.display.map.from.y, game.model.map.HEIGHT-game.conf.display.viewport.H/game.conf.display.map.PX_PER_UNIT);

		}
	}
};


//CONTROLES
game.controls = {
	over: {
		zones: [],
		init: function(){
			game.controls.over.addZone(
				"portrait_1",
				game.conf.display.viewport.W - game.conf.display.portaits.W,
				0,
				game.conf.display.portaits.W,
				game.conf.display.portaits.H,
				function(){
					document.getElementById("dbg-portait-over").innerHTML = "yes";
				}
			);
		},
		addZone: function(zoneId, x0, y0, w, h, overTrigger){
			game.controls.over.zones.push({
				zoneId: zoneId,
				x0: x0,
				y0: y0,
				w: w,
				h: h,
				trigger: overTrigger,
				over: false,
				overTick: 0
			});
		},
		getZoneById:function(zoneId) {
			for (var i=0;i<game.controls.over.zones.length; i++){
				var zone = game.controls.over.zones[i];
				if (zone.zoneId == zoneId){
					return zone;
				}
			}
			return null;
		},
		update: function(){
			for (var i=0;i<game.controls.over.zones.length; i++){
				var zone = game.controls.over.zones[i];
				zone.over = false;
				if (isInRectangle(
					game.controls.mouse.x,
					game.controls.mouse.y,
					zone.x0,
					zone.y0,
					zone.w,
					zone.h	
				)){
					zone.over = true;
					zone.overTick++;
					zone.trigger();
				}else{
					zone.overTick = 0;
				}
			}
		}
	},
	scroll: {
		conf: {
			dx: 2,
			dy: 1,
			zones: [
				{
					id: "scroll_left", 
					dx: -1, 
					dy: 0, 
					x0: 0, 
					y0: 0, 
					w: game.display.controls.scroll.width, 
					h: game.conf.display.viewport.H
				},
				{
					id: "scroll_up", 
					dx: 0, 
					dy: -1, 
					x0: 0, 
					y0: 0, 
					w: game.conf.display.viewport.W-game.conf.display.portaits.W, 
					h: game.display.controls.scroll.width
				},
				{
					id: "scroll_down", 
					dx: 0, 
					dy: 1, 
					x0: 0, 
					y0: game.conf.display.viewport.H-game.display.controls.scroll.width, 
					w: game.conf.display.viewport.W-game.conf.display.portaits.W, 
					h: game.display.controls.scroll.width
				},
				{
					id: "scroll_right", 
					dx: 1, 
					dy: 0, 
					x0: game.conf.display.viewport.W-game.display.controls.scroll.width-game.conf.display.portaits.W, 
					y0: 0, 
					w: game.display.controls.scroll.width, 
					h: game.conf.display.viewport.H
				}
			]
		},
		state: {
			isScrolling : false,
			dx: 0,
			dy: 0
		},
		update: function(){
			game.controls.scroll.state.isScrolling = false;
			game.controls.scroll.state.dx = 0;
			game.controls.scroll.state.dy = 0;
			for (var i=0; i<game.controls.scroll.conf.zones.length; i++){
				var scrollZone = game.controls.scroll.conf.zones[i];
				if (game.controls.over.getZoneById(scrollZone.id).over && game.controls.over.getZoneById(scrollZone.id).overTick > 20){
					//console.log("over scroll zone: "+zone.zoneId);
					game.controls.scroll.state.isScrolling = true;
					game.controls.scroll.state.dx += scrollZone.dx*game.controls.scroll.conf.dx;
					game.controls.scroll.state.dy += scrollZone.dy*game.controls.scroll.conf.dy;
				}
			}
		},
		init: function(){
			for (var i=0;i<game.controls.scroll.conf.zones.length;i++){
				var scrollZone = game.controls.scroll.conf.zones[i];
				game.controls.over.addZone(
					scrollZone.id,
					scrollZone.x0,
					scrollZone.y0,
					scrollZone.w,
					scrollZone.h,
					function(){
						//TODO: managing scroll: no need here
					}
				);
			}
		
		}
	},
	mouse: {
		x: 200,
		y: 200,
		in: true,
		clicked: false,
		update: function(){
			if (this.clicked){
				this.clicked = false;
				var gameX = game.controls.mouse.x/game.display.map.pixels_per_unit + game.display.map.from.x;
				var gameY = game.controls.mouse.y/game.display.map.pixels_per_unit + game.display.map.from.y;
				game.model.registerPlayerAction(gameX, gameY);
				//debug
				document.getElementById("mouse-click-y").innerHTML=(gameY+"").split(".")[0];
				document.getElementById("mouse-click-x").innerHTML=(gameX+"").split(".")[0];
			

			}
		}
	},
	init: function(){
		game.controls.over.init();
		game.controls.scroll.init();
	},
	update: function(){
		game.controls.mouse.update();
		game.controls.over.update();
		game.controls.scroll.update();
	}
};

// METHODE DE DESSIN
game.draw = function(){
	//clean
	context.fillStyle = "rgb(200,200,200)";
	context.fillRect(0,0,game.conf.display.viewport.W,game.conf.display.viewport.H);
	context.fillStyle = "rgb(0,0,0)";
	context.fillText("FPS: "+this.fps,10,20);
	//controls
	// four scroll zones
	context.strokeStyle = "rgb(255,0,0)";
	context.strokeRect(
		0,
		0,
		game.conf.display.viewport.W-game.conf.display.portaits.W,
		game.display.controls.scroll.width
	);
	context.strokeRect(
		0,
		game.conf.display.viewport.H-game.display.controls.scroll.width,
		game.conf.display.viewport.W-game.conf.display.portaits.W,
		game.display.controls.scroll.width
	);
	context.strokeRect(
		0,
		0,
		game.display.controls.scroll.width,
		game.conf.display.viewport.H
	);
	context.strokeRect(
		game.conf.display.viewport.W-game.display.controls.scroll.width-game.conf.display.portaits.W,
		0,
		game.display.controls.scroll.width,
		game.conf.display.viewport.H
	);
	//map
	context.fillStyle = "rgb(60,120,60)";
	context.strokeStyle = "rgb(60,120,60)";
	for (var i=0;i < game.model.map.elements.length;i++){
		var currentElement = game.model.map.elements[i];
		if (isInRectangle(currentElement.x,currentElement.y, 0,0,game.model.map.WIDTH,game.model.map.HEIGHT)){
			fillEllipse(
				context,
				game.display.map.pixels_per_unit*(game.model.map.elements[i].x-game.model.map.elements[i].size/2-game.display.map.from.x),
				game.display.map.pixels_per_unit*(game.model.map.elements[i].y-game.model.map.elements[i].size/2-game.display.map.from.y),
				game.display.map.pixels_per_unit*game.model.map.elements[i].size,
				game.display.map.pixels_per_unit*game.model.map.elements[i].size
			);
		}
	}
	//mobs
	for (var i=0;i < game.model.mobs.list.length; i++){
		var mob = game.model.mobs.list[i];
		context.drawImage(
			game.display.sprites.gobo.sheet,
			game.display.sprites.gobo.from.x,
			game.display.sprites.gobo.from.y,
			game.display.sprites.gobo.width,
			game.display.sprites.gobo.height,
			game.display.map.pixels_per_unit*(mob.trunk.x-mob.trunk.size/2-game.display.map.from.x),
			game.display.map.pixels_per_unit*(mob.trunk.y-mob.trunk.size/2-game.display.map.from.y),
			game.display.sprites.gobo.width,
			game.display.sprites.gobo.height
		);
	}
	//controls chars
	context.drawImage(
		game.display.sprites.chars.sheet,
		0,
		0,
		game.conf.display.portaits.W,
		game.conf.display.portaits.H,
		game.conf.display.viewport.W-game.conf.display.portaits.W,
		0,
		game.conf.display.portaits.W,
		game.conf.display.portaits.H
	);
	if (game.controls.over.getZoneById("portrait_1").over){
		context.strokeStyle = "rgb(255,0,0)";
		context.strokeRect(
			game.conf.display.viewport.W-game.conf.display.portaits.W,
			0,
			game.conf.display.portaits.W,
			game.conf.display.portaits.H
		);
	}
	//mouse
	if (game.controls.mouse.in){
		context.fillStyle = "rgb(255,255,0)";
		fillEllipse(
			context,
			game.controls.mouse.x,
			game.controls.mouse.y,
			10,
			10
		);
	}
	
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
	game.model.addMapElement("tree", 10.0, 10.0, 3.0);
	//game.model.addMapElement("tree", 10.0, 18.0, 4.0);
	for (var i=0;i<400;i++){
		game.model.addMapElement("tree", i, 	i/10, 	1.0);
		game.model.addMapElement("tree", i, 	i, 		1.0);
		game.model.addMapElement("tree", i/10, 	i, 		1.0);
	}
	game.model.mobs.addMob("gobo", 10, 12, 2);
	//graphical context
	context.imageSmoothingEnabled = false;
	//ressource loading
	game.display.sprites.gobo.sheet = new Image();
	game.display.sprites.gobo.sheet.src = "strates_picto.png";
	game.display.sprites.gobo.sheet.onload = function(){
		game.display.sprites.chars.sheet = new Image();
		game.display.sprites.chars.sheet.src = "strates_chars.png";
		game.display.sprites.chars.sheet.onload = function(){
			game.controls.init();
			requestAnimationFrame(mainLoop);
		}
	};
};

function mainLoop() {
	game.update();
	game.draw();
	requestAnimationFrame(mainLoop);
}
