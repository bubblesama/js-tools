


var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");

function start(){
	console.log("start - IN");
	context.fillStyle = "rgb(38,127,0)";
	context.imageSmoothingEnabled = false;
	context.fillRect(0,0,800,600);
	//new Color(117, 204, 128);
	var worldSprites = new Image();
	worldSprites.src = "dd-world.png";
	context.drawImage(worldSprites,8,16,8,8,30,60,32,32);

};