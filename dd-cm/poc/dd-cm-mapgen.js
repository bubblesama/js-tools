var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");
context.imageSmoothingEnabled = false;

var maze = {
	bits: {
		width: 3,
		height: 3,
		list: {
			top: {
				i: 1,
				available: {
					right: ["right","down","top"],
					down: ["right","left","down"],
					top: ["down"],
					left: ["left","down","top"]
				}
			},
			down: {
				i: 3,
				available: {
					right: ["right","down","top"],
					down: ["top"],
					top: ["left","right","top"],
					left: ["left","down","top"]
				}
			},
			left: {
				i: 2,
				available: {
					right: ["right","down","top"],
					down: ["right","left","down"],
					top: ["right","left","top"],
					left: ["right"]
				}
			},
			right: {
				i: 0,
				available: {
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
	}
};

var neighbours = [
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
]; 




var graphical = {
	zoom: 6
};


function generateMaze(){

	var tries = 0;
	for (test=6;test<7;test++){
		var width = test;
		var height = test;
		
		var valid = false;
		tries = 0;
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
								if (maze.bits.list[neighbourTile].available[sideOfNeighbourToCheck].indexOf(potential) > -1){
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
		console.log("generateMaze done test: "+test+" valid="+valid+" tries="+tries+" in "+delay+"ms");
	}

	
	//affichage
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

var tileSprites;
function start(){
	//ressources loading
	tileSprites = new Image();
	tileSprites.src = "open.png";
	tileSprites.onload = function(){
		generateMaze();
	};
};
