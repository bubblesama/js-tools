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

