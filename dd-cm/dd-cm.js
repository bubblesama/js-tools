var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");

//******* init control *******
var keyMap ={};

document.addEventListener(
	'keydown', 
	(event) => {
		keyMap[event.key] = true;
		//console.log("keydown, event.key="+event.key);
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
		this.entered = false;
	}


	getTileToShowCoordinates(){
		if (!this.discovered && (this.type == "MOUNTAIN_GREY" || this.type == "MOUNTAIN_RED" || this.type == "MOUNTAIN_BLUE" ||this.type == "MOUNTAIN_PURPLE")){
			return WorldTile.worldSpritesCoordinatesByName()["MOUNTAIN_BLACK"];
		}else{
			return WorldTile.worldSpritesCoordinatesByName()[this.type];
		}
	}

	/**
	 * Indique si la case est un élément de donjon
	 */
	isNewDungeon(){
		var result = this.entered;
		if (!result){
			switch(this.type) {
				case "MOUNTAIN_GREY":
				case "MOUNTAIN_BLUE": 
				case "MOUNTAIN_RED": 
				case "MOUNTAIN_PURPLE":
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
				case "MOUNTAIN_BLACK": 
				case "MOUNTAIN_BLANK":
				case "WALL_UP_DOWN":
				case "WALL_LEFT_RIGHT":
					break;
				default:
					result = false;
			}
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
			case "MOUNTAIN_GREY":
			case "MOUNTAIN_BLUE": 
			case "MOUNTAIN_RED": 
			case "MOUNTAIN_PURPLE":
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
			case "MOUNTAIN_BLACK": 
			case "MOUNTAIN_BLANK":
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
			"MOUNTAIN_BLACK": [0,0],
			"MOUNTAIN_GREY": [2,0],
			"MOUNTAIN_BLUE": [3,0],
			"MOUNTAIN_RED": [4,0],
			"MOUNTAIN_PURPLE": [5,0],
			"MOUNTAIN_BLANK": [1,0],
			"MOUNTAIN_BIG": [5,1],
			"WALL_DOOR_UP_DOWN": [0,3],
			"WALL_DOOR_LEFT_RIGHT": [1,3],
			"WALL_UP_DOWN": [3,3],
			"WALL_LEFT_RIGHT": [2,3],
			"FOREST": [0,1],
			"HOUSE": [2,1]
		}
	}
	
};

const mobType = {
	rat: "rat",
	snake: "snake"
};

class Mob {
	constructor(type,i,j){
		this.i = i;
		this.j = j;
		this.type = type;
		this.faceRight = false;
		this.life = 1;
	}
	wound(){
		this.life--;
	}
	isDead(){
		return (this.life <= 0);
	}
	update(){

	}
};



//******************* fin CLASSES *******************************************************



var worldTileByLetter = {
	"r": "RIVER_UP_DOWN",
	"s": "RIVER_UP_RIGHT",
	"t": "RIVER_RIGHT_DOWN",
	"u": "RIVER_DOWN_LEFT",
	"v": "RIVER_LEFT_UP",
	"l": "MOUNTAIN_BLANK",
	"m": "MOUNTAIN_BLACK",
	"n": "MOUNTAIN_GREY",
	"o": "MOUNTAIN_BLUE",
	"p": "MOUNTAIN_RED",
	"q": "MOUNTAIN_PURPLE",
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
		},
		items:{
			ladder: {i:3,j:5},
			quiver: {i:0,j:5},
			axe: {i:2,j:5},
			boat: {i:5,j:5},
			key: {i:4,j:5}
		},
		mobs:{
			//first sprite place by type
			rat: {i:8, j:1},
			snake: {i:0, j:3}
		}
	}
};

var model = {
	refresh : {
		delay: 50,
		last: Date.now()
	},
	splash : {
		maxTick : 6,
		currentTick : 0
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
			maxStep: 4,
			currentStep: 0,
			stepDi: 0,
			stepDj: 0,
			stepDx: 3,
			stepDy: 4,
			isMoving: false,
			walkPart: 0,
			walkCycle: 8,
		},
		inventory:{
			arrows: 4,
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
					if (worldMap[newI][newJ].isNewDungeon() && !worldMap[newI][newJ].entered){
						//console.log("DBG player#moveIfPossible entering a dungeon");
						game.state = STATES.dungeon;
						worldMap[newI][newJ].entered = true;
						//dungeon maze and items
						var newMaze = generateMaze(worldMap[newI][newJ].type);
						model.dungeon.currentMaze = newMaze;
						model.player.dungeon.i = newMaze.start.i;
						model.player.dungeon.j = newMaze.start.j;
						//managers
						model.dungeon.arrowsManager.reset();
						model.dungeon.mobsManager.reset();
						model.dungeon.mobsManager.addMob("rat", 7,7);
						model.dungeon.mobsManager.addMob("snake", 7,4);

					}
				}else{
					//console.log("DBG player#moveIfPossible unpassable");
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
		},
		tryPickingUpStuff(){
			//console.log("try picking stuff");
			var potentialItem = model.dungeon.currentMaze.getItem(this.dungeon.i, this.dungeon.j);
			if (potentialItem != null){
				console.log("#tryPickingUpStuff stuff picked: "+potentialItem.type);
				if (potentialItem.type == "ladder"){
					game.state = STATES.world;
				}else{
					//TODO
					if (potentialItem.type == "quiver"){
						this.inventory["arrows"]+=4;
					}else{
						this.inventory[""+potentialItem.type]+=1;
					}
					//delete item from maze
					model.dungeon.currentMaze.removeItem(this.dungeon.i, this.dungeon.j);
				}
			}else{
				console.log("#tryPickingUpStuff nothing to pick!");
			}
		},
		tryShootingArrow(deltaI, deltaJ){
			//console.log("player#tryShootingArrow IN TODO");
			if (this.isPossessing("arrows")){
				//console.log("player#tryShootingArrow got arrow");
				if (model.dungeon.arrowsManager.canShootNow()){
					//console.log("player#tryShootingArrow can shoot");
					this.inventory.arrows -=1;
					model.dungeon.arrowsManager.spawnArrow(this.dungeon.i, this.dungeon.j,deltaI, deltaJ);
				}
			}else{
				//console.log("player#tryShootingArrow no arrow!");
			}

		}
	},
	
	dungeon: {
		currentMaze: null,
		arrowsManager: {
			TICKS_TO_SHOOT: 3,
			TICKS_TO_LIVE: 40,
			ticksSinceLast: 1000,
			arrows:[],
			update: function(){
				this.ticksSinceLast++;
				var arrowIndexesToDelete = [];
				//TODO: moving arrows
				for (var i=0;i<this.arrows.length;i++){
					var arrow = this.arrows[i]; 
					arrow.ticks++;
					if (arrow.ticks < this.TICKS_TO_LIVE){
						//TODO check wall collision
						var fullMazeSize = mazeGeneratorConfiguration.size*mazeGeneratorConfiguration.bits.tiles.width;
						var newI = (((arrow.i + arrow.di+fullMazeSize)%fullMazeSize)+fullMazeSize)%fullMazeSize;
						var newJ = (((arrow.j + arrow.dj+fullMazeSize)%fullMazeSize)+fullMazeSize)%fullMazeSize;
						var trajectoryTile = model.dungeon.currentMaze.map[newI][newJ];				
						if (trajectoryTile != 1){
							arrow.i += arrow.di;
							arrow.j += arrow.dj;
							if (trajectoryTile == 2){
								if (arrow.di == 1){
									arrow.di = 0;
									arrow.dj = 1;
								}else{
									arrow.di = -1;
									arrow.dj = 0;
								}
							}else if (trajectoryTile == 3){
								if (arrow.di == 1){
									arrow.di = 0;
									arrow.dj = -1;
								}else{
									arrow.di = -1;
									arrow.dj = 0;
								}
							}else if (trajectoryTile == 4){
								if (arrow.di == -1){
									arrow.di = 0;
									arrow.dj = -1;
								}else{
									arrow.di = 1;
									arrow.dj = 0;
								}
							}else if (trajectoryTile == 5){
								if (arrow.di == -1){
									arrow.di = 0;
									arrow.dj = 1;
								}else{
									arrow.di = 1;
									arrow.dj = 0;
								}
							}
						}else{
							//hard wall
							arrow.di = -arrow.di;
							arrow.dj = -arrow.dj;
						}
						//TODO: check mob collision
						var potentialMob = model.dungeon.mobsManager.getMobAt(arrow.i, arrow.j);
						if (potentialMob != null){
							potentialMob.wound();
							arrowIndexesToDelete.push(i);
						}
					}else{
						//TODO: delete arrow
						arrowIndexesToDelete.push(i);
					}
				}
				//delete timedout or hit arrows
				for (var i=0;i<arrowIndexesToDelete.length;i++){
					this.arrows.splice(arrowIndexesToDelete[i],1);
				}

			},
			reset: function(){
				this.arrows.splice(0,this.arrows.length);
				this.ticksSinceLast = 1000;
			},
			canShootNow: function(){
				return this.ticksSinceLast > this.TICKS_TO_SHOOT;
			},
			spawnArrow: function(spawnI, spawnJ, deltaI, deltaJ){
				console.log("arrowsManager#spawnArrow spawnI="+spawnI+", spawnJ="+spawnJ+", deltaI="+deltaI+", deltaJ="+deltaJ);
				this.ticksSinceLast = 0;
				var newArrow = {
					i: spawnI,
					j: spawnJ,
					di: deltaI,
					dj: deltaJ,
					ticks: 0
				};
				this.arrows.push(newArrow);
			}
		} ,
		mobsManager: {
			mobs: [],
			smokes: [],
			reset(){
				this.mobs.splice(0,this.mobs.length);
				this.smokes.splice(0,this.smokes.length);
			},
			addMob(type, i, j){
				this.mobs.push(new Mob(type, i, j));
			},
			getMobAt(i, j){
				var result = null;
				for  (var k=0;k<this.mobs.length;k++){
					var mob = this.mobs[k];
					if (mob.i == i && mob.j == j){
						result = mob;
					}
				}
				return result;
			},
			update(){
			//TODO: clean dead mobs

			}

		}
	},
	
	update: function(){
		if (game.state == STATES.splash){
			if (this.splash.currentTick > this.splash.maxTick){
				game.state = STATES.world;
			}else{
				this.splash.currentTick++;
				//console.log("#update this.splash.currentTick = "+this.splash.currentTick);
			}
		} else if (game.state == STATES.world){
			//update player team
			if (keyMap.a){
				this.player.moveOnWorldIfPossible(-1,-1);
				shouldStopStepAnimation = false;
			}else if (keyMap.z){
				this.player.moveOnWorldIfPossible(0,-1);
				shouldStopStepAnimation = false;
			}else if (keyMap.e){
				this.player.moveOnWorldIfPossible(1,-1);
				shouldStopStepAnimation = false;
			}else if (keyMap.q){
				this.player.moveOnWorldIfPossible(-1,0);
				shouldStopStepAnimation = false;
			} else if (keyMap.d){
				this.player.moveOnWorldIfPossible(1,0);
				shouldStopStepAnimation = false;
			}else if (keyMap.w){
				this.player.moveOnWorldIfPossible(-1,1);
				shouldStopStepAnimation = false;
			}else if (keyMap.x){
				this.player.moveOnWorldIfPossible(0,1);
				shouldStopStepAnimation = false;
			}else if (keyMap.c){
				this.player.moveOnWorldIfPossible(1,1);
				shouldStopStepAnimation = false;
			}
		}else if (game.state == STATES.dungeon){
			//update for player
			if (this.player.dungeon.isMoving){
				this.player.stepInDungeon();
			}else{
				if (keyMap.e){
					var isOrderingShoot = false;
					var di = 0;
					var dj = 0;
					if (keyMap.d){
						isOrderingShoot = true;
						di = 1;
					}else if (keyMap.q){
						isOrderingShoot = true;
						di = -1;
					}else if (keyMap.z){
						isOrderingShoot = true;
						dj = -1;
					} else if (keyMap.s){
						isOrderingShoot = true;
						dj = 1;
					}
					if (isOrderingShoot){
						this.player.tryShootingArrow(di,dj);
					}
				} else {
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
					if (keyMap.a){
						this.player.tryPickingUpStuff();
					} 
				}
			}
			//arrows
			this.dungeon.arrowsManager.update();
			//TODO: update for mobs...
			this.dungeon.mobsManager.update();
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

const STATES = {splash: "STATE_SPLASH", world: "STATE_WORLD", dungeon: "STATE_DUNGEON"};
game.state = STATES.splash;

const SPLASH_COLORS = [
	"rgb(244,244,243)",
	"rgb(232,204,53)",
	"rgb(0,133,72)",
	"rgb(30,83,43)",
	"rgb(70,94,7)",
	"rgb(177,190,143)",
	"rgb(251,65,0)",
	"rgb(0,36,237)",
	"rgb(0,0,0)"
];

game.draw = function(){
	if (this.state == STATES.splash){
		context.fillStyle = "rgb(70,94,7)";
		context.fillRect(0,0,618,490);
		for (var i=0;i<SPLASH_COLORS.length;i++){
			context.fillStyle = SPLASH_COLORS[i];
			context.fillRect(50+65*i,60,12,32);
		}
	}else if (this.state == STATES.world){
		context.fillStyle = "rgb(117,204,128)";
		context.fillRect(0,0,618,490);
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
		//MOUNTAIN and clouds
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
		//context.fillText("FPS: "+this.fps,10,90);
	}else if (this.state == STATES.dungeon){
		context.fillStyle = "rgb(117,204,128)";
		context.fillRect(0,0,618,490);
		context.fillStyle = "rgb(0,0,0)";
		//context.fillText("DUNGEON",10,90);
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
		//display items
		for (var i=0;i<model.dungeon.currentMaze.items.length;i++){
			var item = model.dungeon.currentMaze.items[i];
			context.drawImage(
				dungeonSprites,
				graphical.dungeon.items[""+item.type].i*graphical.dungeon.tiles.width,
				graphical.dungeon.items[""+item.type].j*graphical.dungeon.tiles.height,
				graphical.dungeon.tiles.width,
				graphical.dungeon.tiles.height,
				//3+(8+item.i-model.player.dungeon.i)*graphical.dungeon.tiles.width*graphical.dungeon.zoom-model.player.dungeon.currentStep*model.player.dungeon.stepDx*model.player.dungeon.stepDi*graphical.dungeon.zoom,
				getXViewFromI(item.i),
				//10+(4+item.j-model.player.dungeon.j)*graphical.dungeon.tiles.height*graphical.dungeon.zoom-model.player.dungeon.currentStep*model.player.dungeon.stepDy*model.player.dungeon.stepDj*graphical.dungeon.zoom,
				getYViewFromJ(item.j),
				graphical.dungeon.tiles.width*graphical.dungeon.zoom,
				graphical.dungeon.tiles.height*graphical.dungeon.zoom
			);
		}
		//display player
		var playerPicI = 0;
		playerPicI += Math.floor((model.player.dungeon.walkPart)/2);
		var playerPicJ = 1;
		if (!model.player.dungeon.faceRight){playerPicJ++;}
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
		//display arrows
		for (var i=0; i<model.dungeon.arrowsManager.arrows.length; i++){
			var item = model.dungeon.arrowsManager.arrows[i];
			var spriteI = 0;
			if (item.di != 0){
				spriteI = (item.di == -1)?3:2;
			}else{
				spriteI = (item.dj == -1)?0:1;
			}
			context.drawImage(
				dungeonSprites,
				spriteI*graphical.dungeon.tiles.width,
				4*graphical.dungeon.tiles.height,
				graphical.dungeon.tiles.width,
				graphical.dungeon.tiles.height,
				//3+(8+item.i-model.player.dungeon.i)*graphical.dungeon.tiles.width*graphical.dungeon.zoom-model.player.dungeon.currentStep*model.player.dungeon.stepDx*model.player.dungeon.stepDi*graphical.dungeon.zoom,
				getXViewFromI(item.i),
				//10+(4+item.j-model.player.dungeon.j)*graphical.dungeon.tiles.height*graphical.dungeon.zoom-model.player.dungeon.currentStep*model.player.dungeon.stepDy*model.player.dungeon.stepDj*graphical.dungeon.zoom,
				getYViewFromJ(item.j),
				graphical.dungeon.tiles.width*graphical.dungeon.zoom,
				graphical.dungeon.tiles.height*graphical.dungeon.zoom
			);
		}
		//display mobs
		for (var i=0; i<model.dungeon.mobsManager.mobs.length; i++){
			var mob = model.dungeon.mobsManager.mobs[i];
			var spriteI = graphical.dungeon.mobs[""+mob.type].i;
			if (!mob.faceRight){spriteI += 2};
			var spriteJ = graphical.dungeon.mobs[""+mob.type].j;
			context.drawImage(
				dungeonSprites,
				spriteI*graphical.dungeon.tiles.width,
				spriteJ*graphical.dungeon.tiles.height,
				graphical.dungeon.tiles.width,
				graphical.dungeon.tiles.height,
				//3+(8+mob.i-model.player.dungeon.i)*graphical.dungeon.tiles.width*graphical.dungeon.zoom-model.player.dungeon.currentStep*model.player.dungeon.stepDx*model.player.dungeon.stepDi*graphical.dungeon.zoom,
				getXViewFromI(mob.i),
				//10+(4+mob.j-model.player.dungeon.j)*graphical.dungeon.tiles.height*graphical.dungeon.zoom-model.player.dungeon.currentStep*model.player.dungeon.stepDy*model.player.dungeon.stepDj*graphical.dungeon.zoom,
				getYViewFromJ(mob.j),
				graphical.dungeon.tiles.width*graphical.dungeon.zoom,
				graphical.dungeon.tiles.height*graphical.dungeon.zoom
			);
		}
		//display smoke
	}
};


getXViewFromI = function(i){
	return 3+(8+i-model.player.dungeon.i)*graphical.dungeon.tiles.width*graphical.dungeon.zoom-model.player.dungeon.currentStep*model.player.dungeon.stepDx*model.player.dungeon.stepDi*graphical.dungeon.zoom;	
};

getYViewFromJ = function(j){
	return 10+(4+j-model.player.dungeon.j)*graphical.dungeon.tiles.height*graphical.dungeon.zoom-model.player.dungeon.currentStep*model.player.dungeon.stepDy*model.player.dungeon.stepDj*graphical.dungeon.zoom;
};

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


