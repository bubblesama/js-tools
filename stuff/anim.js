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
game.ticker = 0;
game.lastFpsCountDate = Date.now();
game.fps = 0;
//declaration des composants du ju


game.draw = function(){
	//clean
	context.fillStyle = "rgb(128,128,128)";
	context.fillRect(0,0,800,600);
	context.fillStyle = "rgb(0,0,0)";
	context.fillText("FPS: "+this.fps,10,20);
	
}

game.update = function(){
	// fps
	if (Date.now()-this.lastFpsCountDate > 1000){
		this.lastFpsCountDate = Date.now();
		this.fps = this.ticker;
		this.ticker = 0;
	}else{
		this.ticker++;
	}
};



//************************************ INIT ***********************************
function start(){
	//graphical context
	context.imageSmoothingEnabled = false;
	requestAnimationFrame(mainLoop)
};

function mainLoop() {
	game.update();
	game.draw();
	requestAnimationFrame(mainLoop);
}


