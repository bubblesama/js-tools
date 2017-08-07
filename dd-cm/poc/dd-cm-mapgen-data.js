var maze = {
	bits: {
		width: 3,
		height: 3,
		tiles :{
			width: 9,
			height: 9
		},
		list: {
			top: {
				i: 1,
				availables: {
					right: ["right","down","top"],
					down: ["right","left","down"],
					top: ["down"],
					left: ["left","down","top"]
				},
				patterns: [
					{
						map: 	"111101111"+
								"111000111"+
								"111000111"+
								"100000011"+
								"000000011"+
								"100000011"+
								"111000111"+
								"111000111"+
								"111101111"
					}
				
				]
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

