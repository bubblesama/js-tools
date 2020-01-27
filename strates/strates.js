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

var game = {};
//données de base
game.ticker = 0;
game.lastFpsCountDate = Date.now();
game.fps = 0;


//COMPOSANTS DU JEU
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

game.display = {
	map: {
		pixels_per_unit: 10,
		from: {
			x: 0,
			y:0
		}
	}


};

// METHODE DE DESSIN
game.draw = function(){
	//clean
	context.fillStyle = "rgb(200,200,200)";
	context.fillRect(0,0,800,600);
	context.fillStyle = "rgb(0,0,0)";
	context.fillText("FPS: "+this.fps,10,20);
	//map
	context.fillStyle = "rgb(60,120,60)";
	context.strokeStyle = "rgb(60,120,60)";
	for (var i=0;i < game.model.map.elements.length;i++){
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
	// rendu du modele
	game.model._update();
};



//************************************ INIT ***********************************
function start(){
	//init
	game.model.addMapElement("tree", 10.0, 10.0, 2.0);
	game.model.addMapElement("tree", 10.0, 18.0, 4.0);

	//graphical context
	context.imageSmoothingEnabled = false;
	requestAnimationFrame(mainLoop)
};

function mainLoop() {
	game.update();
	game.draw();
	requestAnimationFrame(mainLoop);
}


