
// x = horizontal screen cordinate from left
// y = vertical screen cordinate from top
// I (1,0,0) geo vector
// J (0,1,0) geo vector
// K (0,0,1) geo vector
// M is (i,j,k) in geo and (x,y) in screen

//base constants for screen projection
var x0 = 60;
var y0 = 300;
var xI = 30;
var yI = 20;
var xJ = 30;
var yJ = -20;
var xK = 0;
var yK = -10;

var sqNormScreenI = xI*xI+yI*yI;
var sqNormScreenJ = xJ*xJ+yJ*yJ;

var oddFillColor = "lightblue";
var evenFillColor = "red";

//conf
//grid color (true or false)
var isColorLess = true;
//grid visible (true or false)
var isGridVisible = true;
//auto rotating (true or false)
var isAutoRotating = false;

//matrix of k index for heightmap: k of M(i,j,k)= kIndex[i][j]

var kIndex = [
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 1, 3, 1, 0, 1, 1, 0, 0, 0, 0, 0],
	[0, 0, 1, 0, 1, 2, 2, 1, 0, 0, 0, 0],
	[0, 0, 0, 1, 2, 4, 4, 2, 1, 0, 0, 0],
	[0, 0, 1, 2, 4,-2,-2, 4, 2, 1, 0, 0],
	[0, 0, 1, 2, 4,-2,-2, 4, 2, 1, 0, 0],
	[0, 0, 0, 1, 2, 4, 4, 2, 1, 0, 0, 0],
	[0, 0, 0, 0, 1, 2, 2, 1, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
];

var maxI = kIndex.length;
var maxJ = kIndex[0].length;

var xMiddle = 400;
var yMiddle = 300;

/*
function calculateMiddle(){
	xMiddle = Math.floor((maxI*xI+maxJ*xJ-x0)/2);
	yMiddle = Math.floor((maxI*yI+maxJ*yJ-y0)/2);
	document.getElementById("middleX").innerHTML = xMiddle;
	document.getElementById("middleY").innerHTML = yMiddle;
}
*/

var canvas = document.getElementById("mainCanvas");
var context = canvas.getContext("2d");

window.addEventListener('mouseclick', getMousePos, false);

function launchCanvas(){
	context.fillStyle = "lightblue";
	context.fillRect(0,0,800,600);
	context.strokeStyle = "black"; 
	context.lineWidth = 1; 
	//heightmap
	for (var i=0;i<maxI-1;i++){
		for (var j=maxJ-1;j>=0;j--){
			
			//color
			var colorR = ((i+j)%2)== 0?'250':'0';
			var colorGVal = 100;
			var colorG = ''+colorGVal;
			var colorB = ((i+j)%2)== 0?'0':'250';
			//tag for "origin square"
			if ((i==0 && j==0)|| isColorLess ){
			
				var colorR = 100;
				var colorG = 100;
				var colorB = 100;
			}
			
			
			//trace
			context.fillStyle = 'rgb('+colorR+', '+colorG+', '+colorB+')';
			context.beginPath();
			context.moveTo(x0+(i+0)*xI+(j+0)*xJ+kIndex[i+0][j+0]*xK,y0+(i+0)*yI+(j+0)*yJ+kIndex[i+0][j+0]*yK);   
			context.lineTo(x0+(i+1)*xI+(j+0)*xJ+kIndex[i+1][j+0]*xK,y0+(i+1)*yI+(j+0)*yJ+kIndex[i+1][j+0]*yK);   
			context.lineTo(x0+(i+1)*xI+(j+1)*xJ+kIndex[i+1][j+1]*xK,y0+(i+1)*yI+(j+1)*yJ+kIndex[i+1][j+1]*yK);   
			context.lineTo(x0+(i+0)*xI+(j+1)*xJ+kIndex[i+0][j+1]*xK,y0+(i+0)*yI+(j+1)*yJ+kIndex[i+0][j+1]*yK);   
			context.closePath();
			context.fill();
			if (isGridVisible){
				context.stroke();
			}
			
		}
	}
};

canvas.addEventListener(
	'mousemove',
	function(evt) {
        var mousePos = getMousePos(canvas, evt);
		document.getElementById("mouseX").innerHTML = Math.floor(mousePos.x);
		document.getElementById("mouseY").innerHTML = Math.floor(mousePos.y);
		var xM = Math.floor(mousePos.x-x0);
		var yM = Math.floor(mousePos.y-y0);
		var iM = Math.floor(((xI*xM)+(yI*yM)) /sqNormScreenI);
		var jM = Math.floor(((xJ*xM)+(yJ*yM)) /sqNormScreenJ);
		//console.log("click: xM="+xM+" yM="+yM+" iM="+iM);
		document.getElementById("mouseI").innerHTML = iM;
		document.getElementById("mouseJ").innerHTML = jM;
		
		/*
		if (iM >=0 && iM<maxI && jM >= 0 && jM < maxJ){
			kIndex[iM+0][jM+0]--;
			kIndex[iM+1][jM+0]--;
			kIndex[iM+0][jM+1]--;
			kIndex[iM+1][jM+1]--;
			launchCanvas();
		}
		*/
		
		
	}
);

function getMousePos(canvas, evt){
	var rect = canvas.getBoundingClientRect();
	var x = (evt.clientX - rect.left) / (rect.right - rect.left) * canvas.width;
	var y = (evt.clientY - rect.top) / (rect.bottom - rect.top) * canvas.height;
	return {"x": x, "y":y}
};

function rotate(){
	var theta = 0.2;
	var newI = rotation(xI,yI,-theta);
	var newJ = rotation(xJ,yJ,-theta);
	var new0 = rotation(x0-xMiddle,y0-yMiddle,-theta);
	xI = newI.x;
	yI = newI.y;
	xJ = newJ.x;
	yJ = newJ.y;
	x0 = new0.x + xMiddle;
	y0 = new0.y + yMiddle;
	
	//calculateMiddle();
	
	launchCanvas();
}

//https://fr.wikipedia.org/wiki/Matrice_de_rotation#Les_matrices_de_base
//A'.x = A.x * cos(θ) - A.y * sin(θ)
//A'.y = A.x * sin(θ) + A.y * cos(θ)
function rotation(x,y,theta){
	var newX = Math.floor(x* Math.cos(theta) - y * Math.sin(theta));
	var newY = Math.floor(x* Math.sin(theta) + y * Math.cos(theta));
	return {"x": newX, "y": newY};
}


function autorotate(){
	/*
	if (xMiddle <0){
		calculateMiddle();
	}
	*/
	
	if (isAutoRotating){
		rotate();
		setTimeout(function(){ autorotate() }, 100);
	}else{
		launchCanvas();
	}
	
};
