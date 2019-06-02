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


//******************* CLASSES **********************************************************


class WorldTile {

	constructor(type,i,j){
		this.i = i;
		this.j = j;
		this.type = type;
		this.discovered = false;
	}

	getTileToShowCoordinates(){
		if (!this.discovered && (this.type == "MOUTAIN_GREY" || this.type == "MOUTAIN_RED" || this.type == "MOUTAIN_BLUE" ||this.type == "MOUTAIN_PURPLE")){
			return WorldTile.worldSpritesCoordinatesByName()["MOUTAIN_BLACK"];
		}else{
			return WorldTile.worldSpritesCoordinatesByName()[this.type];
		}
	}

	isDungeon(){
		var result = false;
		switch(this.type) {
			case "MOUTAIN_GREY":
			case "MOUTAIN_BLUE": 
			case "MOUTAIN_RED": 
			case "MOUTAIN_PURPLE":
				result = true;
				break;
			case "EMPTY":
			case "HOUSE":
			case "RIVER_UP_DOWN":
			case "RIVER_UP_DOWN": 
			case "RIVER_UP_RIGHT":
			case "RIVER_RIGHT_DOWN":
			case "RIVER_DOWN_LEFT":
			case "RIVER_LEFT_UP":
			case "FOREST":
			case "WALL_DOOR_UP_DOWN":
			case "WALL_DOOR_LEFT_RIGHT":
			case "MOUTAIN_BLACK": 
			case "MOUTAIN_BLANK":
			case "WALL_UP_DOWN":
			case "WALL_LEFT_RIGHT":
				break;
			default:
				result = false;
		}
		return result;
	}
	
	isPassable(player){
		var result = false;
		switch(this.type) {
			case "EMPTY":
			case "HOUSE":
			case "MOUTAIN_GREY":
			case "MOUTAIN_BLUE": 
			case "MOUTAIN_RED": 
			case "MOUTAIN_PURPLE":
				result = true;
				break;
			case "RIVER_UP_DOWN":
			case "RIVER_UP_DOWN": 
			case "RIVER_UP_RIGHT":
			case "RIVER_RIGHT_DOWN":
			case "RIVER_DOWN_LEFT":
			case "RIVER_LEFT_UP":
				result =  player.isPossessing("boat");
				break;
			case "FOREST":
				result =  player.isPossessing("axe");
				break;
			case "WALL_DOOR_UP_DOWN":
			case "WALL_DOOR_LEFT_RIGHT":
				result =  player.isPossessing("key");
				break;
			case "MOUTAIN_BLACK": 
			case "MOUTAIN_BLANK":
			case "WALL_UP_DOWN":
			case "WALL_LEFT_RIGHT":
				result = false;
				break;
			default:
				result = true;
		}
		return result;
	}
	
	static worldSpritesCoordinatesByName() {
		return {
			"EMPTY": [7,0],
			"RIVER_UP_DOWN": [4,2],
			"RIVER_UP_RIGHT": [0,2],
			"RIVER_RIGHT_DOWN": [1,2],
			"RIVER_DOWN_LEFT": [2,2],
			"RIVER_LEFT_UP": [3,2],
			"MOUTAIN_BLACK": [0,0],
			"MOUTAIN_GREY": [2,0],
			"MOUTAIN_BLUE": [3,0],
			"MOUTAIN_RED": [4,0],
			"MOUTAIN_PURPLE": [5,0],
			"MOUTAIN_BLANK": [1,0],
			"MOUTAIN_BIG": [5,1],
			"WALL_DOOR_UP_DOWN": [0,3],
			"WALL_DOOR_LEFT_RIGHT": [1,3],
			"WALL_UP_DOWN": [3,3],
			"WALL_LEFT_RIGHT": [2,3],
			"FOREST": [0,1],
			"HOUSE": [2,1]
		}
	}
	
};

//******************* fin CLASSES *******************************************************



var worldTileByLetter = {
	"r": "RIVER_UP_DOWN",
	"s": "RIVER_UP_RIGHT",
	"t": "RIVER_RIGHT_DOWN",
	"u": "RIVER_DOWN_LEFT",
	"v": "RIVER_LEFT_UP",
	"l": "MOUTAIN_BLANK",
	"m": "MOUTAIN_BLACK",
	"n": "MOUTAIN_GREY",
	"o": "MOUTAIN_BLUE",
	"p": "MOUTAIN_RED",
	"q": "MOUTAIN_PURPLE",
	"w": "WALL_DOOR_UP_DOWN",
	"x": "WALL_DOOR_LEFT_RIGHT",
	"y": "WALL_UP_DOWN",
	"z": "WALL_LEFT_RIGHT",
	"f": "FOREST",
	"h": "HOUSE",
	" ": "EMPTY"
};

var graphical = {
	world: {
		tile: {
			height: 8,
			width: 8
		},
		zoom: 4,
		playerBlink: {
			shown : true, 
			last: Date.now(),
			delay: 300
		},
		clouds :{
			state: 0,
			last: Date.now(),
			delay: 1200
		},
		items:{
			boat: {i:5,j:3},
			axe: {i:4,j:3},
			key: {i:6,j:3}
		},
		resetBlink: function(){
			this.playerBlink.shown = true;
			this.playerBlink.last = Date.now()
		}
	},
	dungeon: {
		zoom: 4,
		tiles: {
			width: 9,
			height: 13
		}
	}
};

var model = {
	refresh : {
		delay: 100,
		last: Date.now()
	},
	player: {
		lives: 3,
		world: {
			i: worldMapData.start.i,
			j: worldMapData.start.j
		},
		dungeon: {
			i: -1,
			j: -1,
			faceRight: false,
			maxStep: 2,
			currentStep: 0,
			stepDi: 0,
			stepDj: 0,
			stepDx: 3,
			stepDy: 4,
			isMoving: false,
			walkPart: 0,
			walkCycle: 4
		},
		inventory:{
			arrow: 4,
			boat: 0,
			axe: 0,
			key: 0,
			crown: 0
		},
		isPossessing: function(itemName){
			return (this.inventory[""+itemName] != null && this.inventory[""+itemName] > 0);
		},
		moveOnWorldIfPossible(deltaI, deltaJ){
			var newI = this.world.i+deltaI;
			var newJ = this.world.j+deltaJ;
			if (
				(newI >= 0) && 
				(newJ >= 0) &&
				(newI< worldMapData.width) &&
				(newJ < worldMapData.height) 
			){
				if (worldMap[newI][newJ].isPassable(this)){
					this.world.i = this.world.i+deltaI;
					this.world.j = this.world.j+deltaJ;
					graphical.world.resetBlink();
					//discovery
					for (var i=-1;i<2;i++){
						for (var j=-1;j<2;j++){
							var scannedI = this.world.i+i;
							var scannedJ = this.world.j+j;
							if (
								(scannedI >= 0) && 
								(scannedJ >= 0) &&
								(scannedI< worldMapData.width) &&
								(scannedJ < worldMapData.height) 
							){
								worldMap[scannedI][scannedJ].discovered = true;
							}
						}
					}
					// entering a dungeon
					if (worldMap[newI][newJ].isDungeon()){
						console.log("DBG player#moveIfPossible entering a dungeon");
						game.state = STATES.dungeon;
						var newMaze = generateMaze();
						model.dungeon.currentMaze = newMaze;
						model.player.dungeon.i = newMaze.start.i;
						model.player.dungeon.j = newMaze.start.j;
					}
				}else{
					console.log("DBG player#moveIfPossible unpassable");
				}
			}  
		},
		startMovingOnDungeonIfPossible(deltaI, deltaJ){
			var fullMazeSize = mazeGeneratorConfiguration.size*mazeGeneratorConfiguration.bits.tiles.width;
			var newI = (this.dungeon.i+deltaI+fullMazeSize)%fullMazeSize;
			var newJ = (this.dungeon.j+deltaJ+fullMazeSize)%fullMazeSize;
			if (model.dungeon.currentMaze.map[newI][newJ] == 0){
				this.dungeon.stepDi = deltaI;
				this.dungeon.stepDj = deltaJ;

				if (deltaI > 0){
					this.dungeon.faceRight = true;
				}else if (deltaI < 0){
					this.dungeon.faceRight = false;
				}
				this.dungeon.isMoving = true;
				this.stepInDungeon();
			}
		},
		stepInDungeon(){
			this.dungeon.currentStep++;
			if (this.dungeon.currentStep >= this.dungeon.maxStep){
				this.dungeon.currentStep = 0;
				this.dungeon.isMoving = false;
				this.dungeon.i = this.dungeon.i+this.dungeon.stepDi;
				this.dungeon.j = this.dungeon.j+this.dungeon.stepDj;
			}
			this.dungeon.walkPart++;
			if (this.dungeon.walkPart >= this.dungeon.walkCycle){
				this.dungeon.walkPart = 0;
			}
		}
	},
	
	dungeon: {
		currentMaze: null
	},
	
	update: function(){
		if (game.state == STATES.world){
			/*
			if (keyMap.d){
				this.player.moveOnWorldIfPossible(1,0);
			}
			if (keyMap.q){
				this.player.moveOnWorldIfPossible(-1,0);
			}
			if (keyMap.z){
				this.player.moveOnWorldIfPossible(0,-1);
			}
			if (keyMap.x){
				this.player.moveOnWorldIfPossible(0,1);
			}
			if (keyMap.a){
				this.player.moveOnWorldIfPossible(-1,-1);
			}
			if (keyMap.e){
				this.player.moveOnWorldIfPossible(1,-1);
			}
			if (keyMap.c){
				this.player.moveOnWorldIfPossible(1,1);
			}
			if (keyMap.w){
				this.player.moveOnWorldIfPossible(-1,1);
			}
			*/
			if (keyMap.d){
				this.player.moveOnWorldIfPossible(1,0);
			}
			if (keyMap.q){
				this.player.moveOnWorldIfPossible(-1,0);
			}
			if (keyMap.z){
				this.player.moveOnWorldIfPossible(0,-1);
			}
			if (keyMap.s){
				this.player.moveOnWorldIfPossible(0,1);
			}
		}else if (game.state == STATES.dungeon){
			//update for player
			if (this.player.dungeon.isMoving){
				this.player.stepInDungeon();
			}else{
				var shouldStopStepAnimation = true;
				if (keyMap.d){
					this.player.startMovingOnDungeonIfPossible(1,0);
					shouldStopStepAnimation = false;
				}else if (keyMap.q){
					this.player.startMovingOnDungeonIfPossible(-1,0);
					shouldStopStepAnimation = false;
				}else if (keyMap.z){
					this.player.startMovingOnDungeonIfPossible(0,-1);
					shouldStopStepAnimation = false;
				} else if (keyMap.s){
					this.player.startMovingOnDungeonIfPossible(0,1);
					shouldStopStepAnimation = false;
				}
				if (shouldStopStepAnimation){
					this.player.dungeon.walkPart = 0;
				}	
			}
		}
	},
};

//global variables
var worldMap;
var worldSprites;
var dungeonSprites;

var game = {};
game.ticker = 0;
game.lastFpsCountDate = Date.now();
game.fps = 0;

const STATES = {world: "STATE_WORLD",dungeon: "STATE_DUNGEON"};
game.state = STATES.world;

game.draw = function(){
	if (this.state == STATES.world){
		//map
		for (var i=0;i<worldMapData.width;i++){
			for (var j=0;j<worldMapData.height;j++){
				var spriteToShowCoordinates = worldMap[i][j].getTileToShowCoordinates();
				context.drawImage(
					worldSprites,
					spriteToShowCoordinates[0]*graphical.world.tile.width,
					spriteToShowCoordinates[1]*graphical.world.tile.height,
					graphical.world.tile.width,
					graphical.world.tile.height,
					5+i*graphical.world.tile.width*graphical.world.zoom,
					74+j*graphical.world.tile.height*graphical.world.zoom,
					graphical.world.tile.width*graphical.world.zoom,
					graphical.world.tile.height*graphical.world.zoom
				);
				
			}
		}
		//moutain and clouds
		context.drawImage(
			worldSprites,
			5*graphical.world.tile.width,
			1*graphical.world.tile.height,
			2*graphical.world.tile.width,
			2*graphical.world.tile.height,
			5+worldMapData.bossTopLeft.i*graphical.world.tile.width*graphical.world.zoom,
			74+worldMapData.bossTopLeft.j*graphical.world.tile.height*graphical.world.zoom,
			2*graphical.world.tile.width*graphical.world.zoom,
			2*graphical.world.tile.height*graphical.world.zoom
		);
		context.drawImage(
			worldSprites,
			7*graphical.world.tile.width,
			(1+graphical.world.clouds.state)*graphical.world.tile.height,
			2*graphical.world.tile.width,
			graphical.world.tile.height,
			5+worldMapData.bossTopLeft.i*graphical.world.tile.width*graphical.world.zoom,
			74+(worldMapData.bossTopLeft.j)*graphical.world.tile.height*graphical.world.zoom,
			2*graphical.world.tile.width*graphical.world.zoom,
			graphical.world.tile.height*graphical.world.zoom
		);
		//player
		if (graphical.world.playerBlink.shown){
			//item if necessary
			var shouldDrawItem = false;
			var item = "";
			switch (worldMap[model.player.world.i][model.player.world.j].type){
				case "FOREST":
					shouldDrawItem = true;
					item = "axe";
					break;
				case "RIVER_UP_DOWN":
				case "RIVER_UP_DOWN": 
				case "RIVER_UP_RIGHT":
				case "RIVER_RIGHT_DOWN":
				case "RIVER_DOWN_LEFT":
				case "RIVER_LEFT_UP":
					shouldDrawItem = true;
					item = "boat";
					break;
				case "WALL_DOOR_UP_DOWN":
				case "WALL_DOOR_LEFT_RIGHT":
					shouldDrawItem = true;
					item = "key";
					break;
			}
			if (shouldDrawItem){
				context.drawImage(
					worldSprites,
					graphical.world.items[""+item].i*graphical.world.tile.width,
					graphical.world.items[""+item].j*graphical.world.tile.height,
					graphical.world.tile.width,
					graphical.world.tile.height,
					5+model.player.world.i*graphical.world.tile.width*graphical.world.zoom,
					74+model.player.world.j*graphical.world.tile.height*graphical.world.zoom,
					graphical.world.tile.width*graphical.world.zoom,
					graphical.world.tile.height*graphical.world.zoom
				);
			}
			// player with lives
			for (var i=0;i<model.player.lives;i++){
				context.drawImage(
					worldSprites,
					9*graphical.world.tile.width,
					i*graphical.world.tile.height,
					graphical.world.tile.width,
					graphical.world.tile.height,
					5+model.player.world.i*graphical.world.tile.width*graphical.world.zoom,
					74+model.player.world.j*graphical.world.tile.height*graphical.world.zoom,
					graphical.world.tile.width*graphical.world.zoom,
					graphical.world.tile.height*graphical.world.zoom
				);
			}
		}
		context.fillText("FPS: "+this.fps,10,90);
	}else if (this.state == STATES.dungeon){
		context.fillStyle = "rgb(117,204,128)";
		context.fillRect(0,0,618,490);
		context.fillStyle = "rgb(0,0,0)";
		context.fillText("DUNGEON",10,90);
		//display for full maze
		var fullWidth = mazeGeneratorConfiguration.size * mazeGeneratorConfiguration.bits.tiles.width;
		var fullHeight = mazeGeneratorConfiguration.size * mazeGeneratorConfiguration.bits.tiles.height;
		for (var i=-2;i<19;i++){
			for (var j=-2;j<11;j++){
				context.drawImage(
					dungeonSprites,
					model.dungeon.currentMaze.map[(i+fullWidth+model.player.dungeon.i-8)%fullWidth][(j+fullHeight+model.player.dungeon.j-4)%fullHeight]*graphical.dungeon.tiles.width,
					0,
					graphical.dungeon.tiles.width,
					graphical.dungeon.tiles.height,
					3+i*graphical.dungeon.tiles.width*graphical.dungeon.zoom-model.player.dungeon.currentStep*model.player.dungeon.stepDx*model.player.dungeon.stepDi*graphical.dungeon.zoom,
					10+j*graphical.dungeon.tiles.height*graphical.dungeon.zoom-model.player.dungeon.currentStep*model.player.dungeon.stepDy*model.player.dungeon.stepDj*graphical.dungeon.zoom,
					graphical.dungeon.tiles.width*graphical.dungeon.zoom,
					graphical.dungeon.tiles.height*graphical.dungeon.zoom
				);
			}
		}
		var playerPicI = 0;
		playerPicI += model.player.dungeon.walkPart;
		var playerPicJ = 1;
		if (!model.player.dungeon.faceRight){playerPicJ++;}
		// display player
		context.drawImage(
			dungeonSprites,
			playerPicI*graphical.dungeon.tiles.width,
			playerPicJ*graphical.dungeon.tiles.height,
			graphical.dungeon.tiles.width,
			graphical.dungeon.tiles.height,
			3+8*graphical.dungeon.tiles.width*graphical.dungeon.zoom,
			10+4*graphical.dungeon.tiles.height*graphical.dungeon.zoom,
			graphical.dungeon.tiles.width*graphical.dungeon.zoom,
			graphical.dungeon.tiles.height*graphical.dungeon.zoom
		);

	}
}

game.update = function(){
	//model
	if (Date.now()-model.refresh.last > model.refresh.delay){
		model.refresh.last = Date.now();
		model.update();
	}
	
	// fps
	if (Date.now()-this.lastFpsCountDate > 1000){
		this.lastFpsCountDate = Date.now();
		this.fps = this.ticker;
		this.ticker = 0;
	}else{
		this.ticker++;
	}
	// graphical
	if (Date.now()-graphical.world.playerBlink.last > graphical.world.playerBlink.delay){
		graphical.world.playerBlink.shown = !graphical.world.playerBlink.shown;
		graphical.world.playerBlink.last = Date.now();
	}
	if (Date.now()-graphical.world.clouds.last > graphical.world.clouds.delay){
		graphical.world.clouds.state = (graphical.world.clouds.state +1) %3
		graphical.world.clouds.last = Date.now();
	}

};

//************************************ INIT ***********************************
function start(){
	//graphical context
	context.fillStyle = "rgb(117,204,128)";
	context.imageSmoothingEnabled = false;
	context.fillRect(0,0,618,490);
	//parsing world map
	worldMap = new Array(worldMapData.width);
	for (var i=0;i<worldMapData.width;i++){
		worldMap[i]= new Array(worldMapData.height);
		for (var j=0;j<worldMapData.height;j++){
			worldMap[i][j] = 
				new WorldTile(
					worldTileByLetter[""+(worldMapData.tiles.charAt(j*worldMapData.width+i))],
					i,
					j
			);
		}
	}
	//ressources loading
	worldSprites = new Image();
	worldSprites.src = "dd-world.png";
	worldSprites.onload = function(){
		dungeonSprites = new Image();
		dungeonSprites.src = "dd-dungeon.png";
		dungeonSprites.onload = function(){
			requestAnimationFrame(mainLoop)
		}
	};
};

function mainLoop() {
	game.update();
	game.draw();
	requestAnimationFrame(mainLoop);
}


//********************************** MAZE GENERATOR **********************************************
function generateMaze(){
	generateRotatedPatterns();
	var size = mazeGeneratorConfiguration.size;
	var tries = 0;
	var width = size;
	var height = size;
	var valid = false;
	var firstTry = Date.now();
	var bitsMaze;
	while ((tries == 0 || !valid) && (tries < 100)){
		// generate the blocks maze
		valid = true;
		tries = tries+1;
		//init result, the big blocks maze
		var bitsMaze = new Array(width);
		for (var i=0;i<width;i++){
			bitsMaze[i]=new Array(height);
			for (var j=0;j<height;j++){
				bitsMaze[i][j] = "todo";
			}
		}
		for (var j=0;j<height;j++){
			for (var i=0;i<width;i++){
				var potentials = ["top","down","left","right"];
				for (var k=0;k<mazeGeneratorConfiguration.neighbours.length;k++){
					var checkI = (i+mazeGeneratorConfiguration.neighbours[k].i+width)%width;
					var checkJ = (j+mazeGeneratorConfiguration.neighbours[k].j+height)%height;
					var neighbourTile = bitsMaze[checkI][checkJ];
					var sideOfNeighbourToCheck = mazeGeneratorConfiguration.neighbours[k].check;
					if (neighbourTile != "todo"){
						//console.log("DBG generateMaze: "+i+","+j+" checkI="+checkI+" checkJ="+checkJ+" is "+neighbourTile+" and should check availility for "+sideOfNeighbourToCheck);
						var  sieved = [];
						for (var p in potentials){
							var potential = potentials[p];
							if (mazeGeneratorConfiguration.bits.list[neighbourTile].availables[sideOfNeighbourToCheck].indexOf(potential) > -1){
								//console.log("DBG generateMaze: "+i+","+j+" checkI="+checkI+" checkJ="+checkJ+" is "+neighbourTile+" and should check availility for "+sideOfNeighbourToCheck+" so "+potential+" is not available");
								sieved.push(potential);
							}else{
								//console.log("DBG generateMaze: "+i+","+j+" checkI="+checkI+" checkJ="+checkJ+" is "+neighbourTile+" and should check availility for "+sideOfNeighbourToCheck+" so "+potential+" is not available");
							}
						}
						potentials = sieved;
					}else{
						//console.log("DBG generateMaze: "+i+","+j+" checkI="+checkI+" checkJ="+checkJ+" is todo: no check");
					}
				}
				if (potentials.length > 0){
					bitsMaze[i][j] = shuffle(potentials)[0];
					//console.log("DBG generateMaze: tile for "+i+","+j+" ="+bitsMaze[i][j]);
				}else{
					valid = false;
					//console.log("ERROR generateMaze: no potential tile for "+i+","+j);
				}
			}
		}
	}
	var delay = Date.now() - firstTry;
	console.log("generateMaze done, valid="+valid+" tries="+tries+" in "+delay+"ms");
	//generate maze tiles from bit patterns
	var fullWidth = width * mazeGeneratorConfiguration.bits.tiles.width;
	var fullHeight = height * mazeGeneratorConfiguration.bits.tiles.height;
	var fullMaze = new Array(fullWidth);
	for (var i=0;i<fullWidth;i++){
		fullMaze[i]=new Array(fullHeight);
		for (var j=0;j<fullHeight;j++){
			fullMaze[i][j] = "todo";
		}
	}
	for (var i=0;i<width;i++){
		for (var j=0;j<height;j++){
			//choose pattern map: currently choose the only one
			var patternMap = availablePatternsMap[""+bitsMaze[i][j]][Math.floor(Math.random() * availablePatternsMap[""+bitsMaze[i][j]].length)];
			//var bit = maze.bits.list[""+bitsMaze[i][j]];
			//var pattern = bit.patterns[0];
			//console.log("generateMaze pattern OK for i="+i+" and j="+j);
			for (var m=0;m<mazeGeneratorConfiguration.bits.tiles.width;m++){
				for (var n=0;n<mazeGeneratorConfiguration.bits.tiles.height;n++){
					fullMaze[i*mazeGeneratorConfiguration.bits.tiles.width+m][j*mazeGeneratorConfiguration.bits.tiles.height+n]=patternMap[m+n*mazeGeneratorConfiguration.bits.tiles.width];
				}
			}
		}
	}
	context.fillText("Tries: "+tries,300,300);
	var result = {
		map: fullMaze,
		start: {i: 4, j: 4}
	};
	return result;
}

//got it from the net, do the job
function shuffle(array) {
	//console.log("shuffle DEBUG in: array.length="+array.length);
	var currentIndex = array.length, temporaryValue, randomIndex;
	// While there remain elements to shuffle...
	while (0 !== currentIndex) {
		// pick a remaining element...
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex -= 1;
		// and swap it with the current element.
		temporaryValue = array[currentIndex];
		array[currentIndex] = array[randomIndex];
		array[randomIndex] = temporaryValue;
	}
	return array;
}

// BEGIN - maze manipulations, bits flipping and rotation

// pattern list for bits, generated from generateRotatedPatterns
var availablePatternsMap = {
	left: [],
	right: [],
	top: [],
	down: []
};

// pattern type rotation for pattern generation
var rotationChange = {
	left: "down",
	right: "top",
	top: "left",
	down: "right"
};

var generatedPatterns = false;
function generateRotatedPatterns(){
	if (!generatedPatterns){
		mazeGeneratorConfiguration.bits.patterns.forEach(function(pattern) {
			availablePatternsMap[""+pattern.type].push(pattern.map);
			var currentPatternMap = pattern.map;
			var currentType	 = pattern.type;
			for (var k=0; k<3;k++){
				currentPatternMap = rotateMinus90(currentPatternMap,mazeGeneratorConfiguration.bits.tiles.width);
				currentType = rotationChange[""+currentType];
				availablePatternsMap[""+currentType].push(currentPatternMap);
			}
		});
		generatedPatterns = true;
	}
};

var rotationMapping = [0,1,5,2,3,4];

function rotateMinus90(squareMatrixString, matrixSize){
	var result = "";
	for (var j=0;j<matrixSize;j++){
		for (var i=0;i<matrixSize;i++){
			var sourceI = matrixSize-1-j;
			var sourceJ = i;
			var sourceVal = squareMatrixString.charAt(sourceJ*matrixSize+sourceI);
			var resultVal = rotationMapping[sourceVal];
			result += resultVal;
		}
	}
	return result;
};

//********************************** MAZE GENERATOR ***   END    *******************************************