var worldMapData= {
	width: 19,
	height: 11,
	start: {i:0, j:5},
	bossTopLeft: {i:16,j:4},
	tiles :
" nllltv  y       ff"+
" lnltvlo w  nq  fff"+
"  lnrlfl y llfffff "+
"  ltv pllqpll  fff "+
"  lrnlronffoll     "+
"h lr lsulf lnnl    "+
"   l llrff  llln   "+
"    lnqsuff  lnlxzz"+
"  nlll tvfff  ll   "+
"  ln ltvffff   lll "+
" llnl rfff      l  "
};

var dungeonTilesCornerMoves = {
	TOP_RIGHT: {
		index: 2,
		moves: [
			{
				inDi: 1, inDj:0,  outDi: 1, outDj: 1
			},
			{
				inDi: 0, inDj:-1,  outDi: -1, outDj: -1
			}
		]
	},
	DOWN_RIGHT: {
		index: 3,
		moves: [
			{
				inDi: 1, inDj:0,  outDi: 1, outDj: -1
			},
			{
				inDi: 0, inDj:1,  outDi: -1, outDj: 1
			}
		]
	},
	DOWN_LEFT: {
		index: 4,
		moves: [
			{
				inDi: 0, inDj:1,  outDi: 1, outDj: 1
			},
			{
				inDi: -1, inDj:0,  outDi: -1, outDj: -1
			}
		]
	},
	TOP_LEFT: {
		index: 5,
		moves: [
			{
				inDi: 0, inDj:-1,  outDi: 1, outDj: -1
			},
			{
				inDi: -1, inDj:0,  outDi: -1, outDj: 1
			}
		]	
	},

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








