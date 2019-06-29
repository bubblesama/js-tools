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


/**
 * Case de la carte
 */
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

	/**
	 * Indique si la case est un élément de donjon
	 */
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
	
	/**
	 * indique la possibilité de traverser un élément de la carte, en fonction des éléments possédés par le joueur
	 * @param {*} player 
	 */
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
	
	/**
	 * fournir le découpage du sprite des éléments de la carte
	 */
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
			var newI = (((this.dungeon.i+deltaI+fullMazeSize)%fullMazeSize)+fullMazeSize)%fullMazeSize;
			var newJ = (((this.dungeon.j+deltaJ+fullMazeSize)%fullMazeSize)+fullMazeSize)%fullMazeSize;
			if (model.dungeon.currentMaze.map[newI][newJ] != 1){
				var tileIndex = model.dungeon.currentMaze.map[newI][newJ];
				var cornerFound = false;
				//no block tile: checking which tile it is
				for (var checkedTileType in dungeonTilesCornerMoves){
					if (dungeonTilesCornerMoves[checkedTileType].index == tileIndex){
						cornerFound = true;
						for (var checkedMove in dungeonTilesCornerMoves[checkedTileType].moves){
							if (deltaI == dungeonTilesCornerMoves[checkedTileType].moves[checkedMove].inDi && deltaJ == dungeonTilesCornerMoves[checkedTileType].moves[checkedMove].inDj){
								this.dungeon.stepDi = dungeonTilesCornerMoves[checkedTileType].moves[checkedMove].outDi;
								this.dungeon.stepDj = dungeonTilesCornerMoves[checkedTileType].moves[checkedMove].outDj;
							}
						}
					}
				}
				if (!cornerFound){
					this.dungeon.stepDi = deltaI;
					this.dungeon.stepDj = deltaJ;
	
				}
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
			//update player team
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
				//TODO: managing picking stuff
				//TODO: update for arrows
			}
			//TODO: update for mobs...
			//...moving
			//...searching


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

const STATES = {world: "STATE_WORLD", dungeon: "STATE_DUNGEON"};
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
					model.dungeon.currentMaze.map[(((i+fullWidth+model.player.dungeon.i-8)%fullWidth)+fullWidth)%fullWidth][(((j+fullHeight+model.player.dungeon.j-4)%fullHeight)+fullHeight)%fullHeight]*graphical.dungeon.tiles.width,
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


