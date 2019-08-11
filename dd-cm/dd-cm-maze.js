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