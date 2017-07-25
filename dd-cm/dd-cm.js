


var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");


const worldHeightByTile = 11;
const worldWidthByTile = 19;
const worldTileHeight = 8;
const worldTileWidth = 8;

const worldZoom = 4;

function start(){
	console.log("start - IN");
	context.fillStyle = "rgb(38,127,0)";
	context.imageSmoothingEnabled = false;
	context.fillRect(0,0,800,600);
	//new Color(117, 204, 128);
	var worldSprites = new Image();
	worldSprites.src = "dd-world.png";
	
	for (var i=0;i<worldWidthByTile;i++){
		for (var j=0;j<worldHeightByTile;j++){
			context.drawImage(worldSprites,8,16,worldTileWidth,worldTileHeight,30+i*worldTileWidth*worldZoom,60+j*worldTileHeight*worldZoom,worldZoom*worldTileWidth,worldTileHeight*worldZoom);
		}
	}
};