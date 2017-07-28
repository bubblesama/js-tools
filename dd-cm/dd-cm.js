var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");

const worldHeightByTile = 11;
const worldWidthByTile = 19;
const worldTileHeight = 8;
const worldTileWidth = 8;
const worldZoom = 4;

var worldSpritesCoordinatesByName = {
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
};

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

var mapFileName = "";
var worldSprites;

var game = {};
game.draw = function(){
	console.log("game.draw IN");
	for (var i=0;i<worldWidthByTile;i++){
		for (var j=0;j<worldHeightByTile;j++){
			var character = worldMapData.tiles.charAt(j*19+i);
			//console.log("start: char=\""+character+"\"");
			var worldTileName = worldTileByLetter[""+character];
			//console.log("start: char=\""+character+"\" worldTileName="+worldTileName);
			var spriteToShowCoordinates = worldSpritesCoordinatesByName[""+worldTileName];
			//console.log("start: char=\""+character+"\" worldTileName="+worldTileName+" spriteToShowCoordinates="+spriteToShowCoordinates[0]+","+spriteToShowCoordinates[1]);
			context.drawImage(
				worldSprites,
				spriteToShowCoordinates[0]*worldTileWidth,
				spriteToShowCoordinates[1]*worldTileHeight,
				worldTileWidth,
				worldTileHeight,
				5+i*worldTileWidth*worldZoom,
				74+j*worldTileHeight*worldZoom,
				worldZoom*worldTileWidth,
				worldTileHeight*worldZoom
			);
		}
	}
}

function start(){
	//graphical context
	context.fillStyle = "rgb(117,204,128)";
	context.imageSmoothingEnabled = false;
	context.fillRect(0,0,618,490);
	worldSprites = new Image();
	worldSprites.src = "dd-world.png";

	worldSprites.onload = function(){
		game.draw();
	};
};





