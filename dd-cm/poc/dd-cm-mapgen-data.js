var maze = {
	bits: {
		width: 3,
		height: 3,
		tiles :{
			width: 9, //number of tiles in a bit
			height: 9
		},
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
	tiles: {
		width: 9,
		height: 13
	}
};
/*
	setup for a tile's neighbour: delta i and j from the tile, and side to check on the tile to match the neighbour
*/
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







