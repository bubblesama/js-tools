delta = function (a,b,mod){
	var positiveDistance = ((b-a)+mod)%mod;
	var negativeDistance = ((a-b)+mod)%mod;
	return positiveDistance<negativeDistance?positiveDistance:-negativeDistance;
};

var mazeGeneratorConfiguration = {
	
	size: 6,
	bits: {
		tiles :{
			width: 9, //number of tiles in a bit
			height: 9
		},
		/* maze bits patterns:
		/	type: side closed
		/	map: string representing tile types
		*/
		patterns: [
			{
				type: "left",
				map: 	"111101111"+
						"111101111"+
						"111502111"+
						"111000111"+
						"111000000"+
						"111000111"+
						"111403111"+
						"111101111"+
						"111101111"
			},
			{
				type: "down",
				map: 	"111101111"+
						"111000111"+
						"115000211"+
						"100000001"+
						"000000000"+
						"100000001"+
						"114000311"+
						"111111111"+
						"111111111"
			},
			{
				type: "left",
				map: 	"111101111"+
						"111101111"+
						"111101111"+
						"111502111"+
						"111000000"+
						"111403111"+
						"111101111"+
						"111101111"+
						"111101111"
			},
			{
				type: "left",
				map: 	"111101111"+
						"111101111"+
						"111101111"+
						"111502111"+
						"100000000"+
						"101403111"+
						"102111111"+
						"140021111"+
						"111401111"
			},
			{
				type: "down",
				map: 	"111101111"+
						"115001111"+
						"110311111"+
						"150250211"+
						"000000000"+
						"140340311"+
						"110250111"+
						"114003111"+
						"111111111"
			}
		],
		// for each type of maze bit by closed side, the list of available bit on each side (ex: for top-closed maze bit, available bits on the left side are left-closed, down-closed or top-closed bits)
		list: {
			top: {
				i: 1,
				availables: {
					right: ["right","down","top"],
					down: ["right","left","down"],
					top: ["down"],
					left: ["left","down","top"]
				}
			},
			down: {
				i: 3,
				availables: {
					right: ["right","down","top"],
					down: ["top"],
					top: ["left","right","top"],
					left: ["left","down","top"]
				}
			},
			left: {
				i: 2,
				availables: {
					right: ["right","down","top"],
					down: ["right","left","down"],
					top: ["right","left","top"],
					left: ["right"]
				}
			},
			right: {
				i: 0,
				availables: {
					right: ["left"],
					down: ["right","left","down"],
					top: ["right","left","top"],
					left: ["left","down","top"]
				}
			},
			todo: {
				i: 4
			}
		}
	},
	//setup for a tile's neighbour: delta i and j from the tile, and side to check on the tile to match the neighbour (ex: the third available neighbour if on +1 for i and +0 for j and should be checked on the left side: opened-opened or closed-closed
	neighbours: [
		{
			i: -1,
			j: 0,
			check: "right"
		},
		{
			i: 0,
			j: -1,
			check: "down"
		},
		{
			i: 1,
			j: 0,
			check: "left"
		},
			{
			i: 0,
			j: 1,
			check: "top"
		}
	]
};





//********************************** MAZE GENERATOR **********************************************
function generateMaze(mountainType){
	generateRotatedPatternsIfNeeded();
	//map generation
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
	var light = new Array(fullWidth);
	for (var i=0;i<fullWidth;i++){
		fullMaze[i]=new Array(fullHeight);
		light[i]=new Array(fullHeight);
		for (var j=0;j<fullHeight;j++){
			fullMaze[i][j] = "todo";
			light[i][j] = false;
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
	//items
	var items = [];
	var itemSpots = [];
	//fill itemSpots
	for (var i=0; i< mazeGeneratorConfiguration.size; i++){
		for (var j=0; j< mazeGeneratorConfiguration.size; j++){
			if (i != 4 && j != 4){
				itemSpots.push({i:i,j:j});
			}
		}
	}
	itemSpots = shuffle(itemSpots);
	// TODO add all items before placing them
	items.push({type: "ladder"});
	items.push({type: "quiver"});
	if (mountainType != null){
		console.log("#generateMaze mountainType="+mountainType);
		if (mountainType == "MOUNTAIN_GREY"){
			items.push({type: "quiver"});
		}else if (mountainType == "MOUNTAIN_BLUE"){
			items.push({type: "boat"});
		}else if(mountainType == "MOUNTAIN_RED"){
			items.push({type: "axe"});
		}else if(mountainType == "MOUNTAIN_PURPLE"){
			items.push({type: "key"});
		}
	}else{
		items.push({type: "axe"});
		items.push({type: "boat"});
		items.push({type: "key"});
	}
	console.log("#generateMaze items to place: "+items.length);
	//placing
	for (var i=0; i<items.length; i++){
		items[i].i = itemSpots[i].i*mazeGeneratorConfiguration.bits.tiles.width+Math.floor(mazeGeneratorConfiguration.bits.tiles.width/2);
		items[i].j = itemSpots[i].j*mazeGeneratorConfiguration.bits.tiles.height+Math.floor(mazeGeneratorConfiguration.bits.tiles.height/2);
		console.log("#generateMaze item placed: "+items[i].type+" "+items[i].i+" "+items[i].j);
	}
	var result = {
		fullWidth: fullWidth,
		fullHeight: fullHeight,
		map: fullMaze,
		light: light,
		start: {i: 4, j: 4},
		items: items,
		getManatthan: function(Ai, Aj, Bi, Bj){
			return Math.abs(delta(Ai,Bi,fullWidth))+Math.abs(delta(Aj,Bj,fullHeight));
		},
		getTileType: function(i,j){
			return fullMaze[(i+fullWidth+fullWidth)%fullWidth][(j+fullHeight+fullHeight)%fullHeight];
		},
		getItem: function(i, j){
			console.log("maze#getItem IN i="+i+" j="+j);
			var result = null;
			for (var k=0;k<items.length; k++){
				if (i == items[k].i && j == items[k].j){
					result = items[k];
				}
			}
			return result;
		},
		removeItem: function(i, j){
			var foundIndex = -1;
			for (var k=0;k<items.length; k++){
				if (i == items[k].i && j == items[k].j){
					foundIndex = k;
				}
			}
			if (foundIndex != -1){
				items.splice(foundIndex,1);
			}
		},
		//TODO: get list of coords to go from a tile another, passing by walkable tiles, with a customized A* algorithm
		getPath: function (fromI, fromJ, toI, toJ, maxSteps){
			console.log("#A* DBG IN: "+fromI+" "+fromJ+" "+toI+" "+toJ);
			var getManatthan = function(nodeA, nodeB){
				return Math.abs(delta(nodeA.i,nodeB.i,fullWidth))+Math.abs(delta(nodeA.j,nodeB.j,fullHeight));
			};
			var isSameNode = function (nodeA, nodeB){
				return (nodeA.i == nodeB.i && nodeA.j == nodeB.j);
			};
			var neighbourDeltas = [
				{di: -1, dj:  0},
				{di:  0, dj: -1},
				{di:  1, dj:  0},
				{di:  0, dj:  1},

				{di: -1, dj: -1},
				{di:  1, dj: -1},
				{di:  1, dj:  1},
				{di: -1, dj:  1}
			];
			//init special nodes and nodes list
			var endNode = {i:toI, j:toJ};
			var startNode = {i:  fromI, j: fromJ, cost: 0};
			startNode.guess = getManatthan(startNode,endNode);
			var openList = new Array();
			openList.push(startNode);
			var closedList = [];
			var finished = false;
			var pathFound = false;
			var step = 0;
			while (!finished && step <maxSteps){
				step++;
				//find next "best" node by sorting the openlist and shifting the node
				openList.sort(function (nodeA, nodeB){
					return (((nodeA.cost + nodeA.guess)<(nodeB.cost + nodeB.guess))?-1:(((nodeA.cost + nodeA.guess)>(nodeB.cost + nodeB.guess))?1:0));
				});
				var nextNode = openList.shift();
				//console.log("A* DBG: nextNode: "+nextNode.i +" "+nextNode.j);
				//end node reached
				if (isSameNode(nextNode, endNode)){
					finished = true;
					pathFound = true;
				}else{
					//TODO: list of neighbours
					var rawNeighbours = [];
					for (var k=0;k<neighbourDeltas.length;k++){
						var rawNewNeighbourI = (nextNode.i+neighbourDeltas[k].di+fullWidth)%fullWidth;
						var rawNewNeighbourJ = (nextNode.j+neighbourDeltas[k].dj+fullHeight)%fullHeight;
						//TODO: managing corner move to determine "true" movements
						var rawNeighbourType = this.map[rawNewNeighbourI][rawNewNeighbourJ]
						var realDi = neighbourDeltas[k].di;
						var realDj = neighbourDeltas[k].dj;
						//TODO check if tile is corner
						for (var a=0;a<dungeonTilesCornerMoves.length;a++){
							if (dungeonTilesCornerMoves[a].index == rawNeighbourType){
								//tile type found, switching di and dj
								for (var b=0;b<dungeonTilesCornerMoves[a].moves.length;b++){
									if (dungeonTilesCornerMoves[a].moves[b].inDi == neighbourDeltas[k].di && dungeonTilesCornerMoves[a].moves[b].inDj == neighbourDeltas[k].dj){
										realDi = dungeonTilesCornerMoves[a].moves[b].outDi;
										realDj = dungeonTilesCornerMoves[a].moves[b].outDj;
									}
								}
							}
						}
						var newNeighbourI = (nextNode.i+realDi+fullWidth)%fullWidth;
						var newNeighbourJ = (nextNode.j+realDj+fullHeight)%fullHeight;
						//console.log("A* DBG: newNeighbour: "+newNeighbourI+" "+newNeighbourJ);
						if (this.map[newNeighbourI][newNeighbourJ] == 0){
							var newNeighbourNode = {i: newNeighbourI, j: newNeighbourJ, father: nextNode, cost: nextNode.cost+1};
							newNeighbourNode.guess = getManatthan(newNeighbourNode,endNode);
							rawNeighbours.push(newNeighbourNode);
						}else{
							//not walkable tile
						}		
					}
					for (var i=0;i<rawNeighbours.length;i++){
						//refresh closedList
						var foundInClosedList = false;
						for (var j=0;j<closedList.length;j++){
							if (isSameNode(rawNeighbours[i],closedList[j])){
								foundInClosedList = true;
								//console.log("A* DBG: neighbour in closed list: "+rawNeighbours[i].i+" "+rawNeighbours[i].j);
								if (rawNeighbours[i].cost < closedList[j].cost){
									closedList[j].cost = rawNeighbours[i].cost;
									closedList[j].father = nextNode;
								}
							}
						}
						if (!foundInClosedList){
							openList.push(rawNeighbours[i]);
						}
					}
				}
				closedList.push(nextNode);
				//TODO: finished condition
				if (openList.length == 0){
					finished = true;
				}
			}
			//console.log("A* DBG: steps: "+step);
			//result construction from fathers
			if (pathFound){
				var pathNodes = [];
				var currentNode = null;
				//find end node
				for (var i=0;i<closedList.length;i++){
					if (isSameNode(closedList[i],endNode)){
						currentNode = closedList[i];
					}
				}
				if (currentNode != null){
					//todo: iterate on fathers
					var pathCreationFinished = false;
					var pathCount = 0;
					while (!pathCreationFinished && pathCount<500){
						pathNodes.unshift(currentNode);
						currentNode = currentNode.father;
						if (currentNode == null){
							pathCreationFinished = true;
						}
						pathCount++;
					}
					if (!(isSameNode(pathNodes[0],startNode))){
						//console.log("A* error while constructing path: startNode is not the first path node");
					}else{
						return pathNodes;
					}
				}else{
					//console.log("A* error while constructing path, endNode not found in closed list");
				}
			}else{
				console.log("A* no path found between ("+fromI+","+fromJ+") and ("+toI+","+toJ+")");
			}
		}
	};
	return result;
};






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
};

// BEGIN - maze manipulations, bits flipping and rotation

// pattern list for bits, generated from generateRotatedPatternsIfNeeded
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

function generateRotatedPatternsIfNeeded(){
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