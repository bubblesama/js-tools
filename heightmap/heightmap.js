

// x = horizontal screen cordinate from left
// y = vertical screen cordinate from top
// I (1,0,0) geo vector
// J (0,1,0) geo vector
// K (0,0,1) geo vector
// M is (i,j,k) in geo and (x,y) in screen

//base constants for screen projection
var x0 = 0;
var y0 = 200;
var xI = 30;
var yI = 20;
var xJ = 30;
var yJ = -20;
var xK = 0;
var yK = -10;

var oddFillColor = "lightblue";
var evenFillColor = "red";



//matrix of k index for heightmap: k of M(i,j,k)= kIndex[i][j]

var kIndex = [
	[0, 0, 0, 1, 1, 0],
	[0, 0, 2, 2, 2, 1],
	[0, 1, 2, 5, 2, 1],
	[0, 1, 2, 2, 2, 1],
	[0, 0, 1, 1, 1, 0],
	[0, 0, 0, 0, 0, 0]
];



function launchCanvas(){
	var canvas = document.getElementById("mainCanvas");
	var context = canvas.getContext("2d");
	context.strokeStyle = "black"; 
	context.lineWidth = 0; 
	for (var i=0;i<5;i++){
		for (var j=5;j>=0;j--){
		
			//'rgb(240, 240, 0)'
		
			var colorR = ((i+j)%2)== 0?'250':'0';
			//var colorGVal = i*100;
			var colorGVal = 100;
			var colorG = ''+colorGVal;
			var colorB = ((i+j)%2)== 0?'0':'250';
			context.fillStyle = 'rgb('+colorR+', '+colorG+', '+colorB+')';
			context.beginPath();
			context.moveTo(x0+(i+0)*xI+(j+0)*xJ+kIndex[i+0][j+0]*xK,y0+(i+0)*yI+(j+0)*yJ+kIndex[i+0][j+0]*yK);   
			context.lineTo(x0+(i+1)*xI+(j+0)*xJ+kIndex[i+1][j+0]*xK,y0+(i+1)*yI+(j+0)*yJ+kIndex[i+1][j+0]*yK);   
			context.lineTo(x0+(i+1)*xI+(j+1)*xJ+kIndex[i+1][j+1]*xK,y0+(i+1)*yI+(j+1)*yJ+kIndex[i+1][j+1]*yK);   
			context.lineTo(x0+(i+0)*xI+(j+1)*xJ+kIndex[i+0][j+1]*xK,y0+(i+0)*yI+(j+1)*yJ+kIndex[i+0][j+1]*yK);   
			context.closePath();
			context.fill();
			//context.stroke();
		}
	}
	
	

	
	
	
	
};

