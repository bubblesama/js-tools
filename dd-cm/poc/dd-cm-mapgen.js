var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");
context.imageSmoothingEnabled = false;

var graphical = {
	zoom: 2
};

function generateMaze(){
	var size = 6;
	var tries = 0;
	var width = size;
	var height = size;
	var valid = false;
	var firstTry = Date.now();
	while ((tries == 0 || !valid) && (tries < 10000)){
		valid = true;
		tries = tries+1;
		//init result
		var result = new Array(width);
		for (var i=0;i<width;i++){
			result[i]=new Array(height);
			for (var j=0;j<height;j++){
				result[i][j] = "todo";
			}
		}
		for (var j=0;j<height;j++){
			for (var i=0;i<width;i++){
				var potentials = ["top","down","left","right"];
				for (var k=0;k<neighbours.length;k++){
					var checkI = (i+neighbours[k].i+width)%width;
					var checkJ = (j+neighbours[k].j+height)%height;
					var neighbourTile = result[checkI][checkJ];
					var sideOfNeighbourToCheck = neighbours[k].check;
					if (neighbourTile != "todo"){
						//console.log("DBG generateMaze: "+i+","+j+" checkI="+checkI+" checkJ="+checkJ+" is "+neighbourTile+" and should check availility for "+sideOfNeighbourToCheck);
						var  sieved = [];
						for (var p in potentials){
							var potential = potentials[p];
							if (maze.bits.list[neighbourTile].availables[sideOfNeighbourToCheck].indexOf(potential) > -1){
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
					result[i][j] = shuffle(potentials)[0];
					//console.log("DBG generateMaze: tile for "+i+","+j+" ="+result[i][j]);
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
	var fullWidth = width * maze.bits.tiles.width;
	var fullHeight = height * maze.bits.tiles.height;
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
			var patternMap = availablePatternsMap[""+result[i][j]][Math.floor(Math.random() * availablePatternsMap[""+result[i][j]].length)];
			//var bit = maze.bits.list[""+result[i][j]];
			//var pattern = bit.patterns[0];
			//console.log("generateMaze pattern OK for i="+i+" and j="+j);
			for (var m=0;m<maze.bits.tiles.width;m++){
				for (var n=0;n<maze.bits.tiles.height;n++){
					fullMaze[i*maze.bits.tiles.width+m][j*maze.bits.tiles.height+n]=patternMap[m+n*maze.bits.tiles.width];
				}
			}
		}
	}
	//display for full maze
	for (var i=0;i<fullWidth;i++){
		for (var j=0;j<fullHeight;j++){
			context.drawImage(
				mazeSprites,
				fullMaze[i][j]*maze.tiles.width,
				0,
				maze.tiles.width,
				maze.tiles.height,
				i*maze.tiles.width*graphical.zoom,
				j*maze.tiles.height*graphical.zoom,
				maze.tiles.width*graphical.zoom,
				maze.tiles.height*graphical.zoom
			);
		}
	}
	//display for bits
	for (var i=0;i<width;i++){
		for (var j=0;j<height;j++){
			context.drawImage(
				tileSprites,
				maze.bits.list[result[i][j]].i*maze.bits.width,
				0,
				maze.bits.width,
				maze.bits.height,
				i*maze.bits.width*graphical.zoom,
				j*maze.bits.height*graphical.zoom,
				maze.bits.width*graphical.zoom,
				maze.bits.height*graphical.zoom
			);
		}
	}
	context.fillText("Tries: "+tries,300,300);
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

function generateRotatedPatterns(){
	maze.bits.patterns.forEach(function(pattern) {
		availablePatternsMap[""+pattern.type].push(pattern.map);
		var currentPatternMap = pattern.map;
		var currentType	 = pattern.type;
		for (var k=0; k<3;k++){
			currentPatternMap = rotateMinus90(currentPatternMap,maze.bits.tiles.width);
			currentType = rotationChange[""+currentType];
			availablePatternsMap[""+currentType].push(currentPatternMap);
		}
	});

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

function test_rotateMinus90(){
	var matrixSize = 9;
	var matrixString =  "111101111"+
						"111011111"+
						"110111111"+
						"100111111"+
						"111111111"+
						"111111111"+
						"111111111"+
						"111111111"+
						"111111111";
	var newMatrix = rotateMinus90(matrixString,matrixSize);
	console.log("test_rotatePlus90");
	for (var j=0;j<matrixSize;j++){
		console.log(newMatrix.substring(j*matrixSize,(j+1)*matrixSize));
	}

}


// END - maze manipulations, bits flipping and rotation

var tileSprites;
var mazeSprites;
function start(){
	generateRotatedPatterns();
	//test_rotateMinus90();
	//ressources loading
	tileSprites = new Image();
	tileSprites.src = "open.png";
	tileSprites.onload = function(){
		mazeSprites = new Image();
		mazeSprites.src = "maze.png";
		mazeSprites.onload = function(){
			generateMaze();
		}
	};
};





