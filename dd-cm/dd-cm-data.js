var worldMapData= {
	width: 19,
	height: 11,
	start: {i:0, j:5},
	bossTopLeft: {i:16,j:4},
	tiles :
" pllltv  y       ff"+
" loltvlo w  nq  fff"+
"  lnrlfl y llfffff "+
"  ltv pllqpll  fff "+
"  lrnlronffoll     "+
"h lr lsulf lnnl    "+
"   l llrff  llln   "+
"    lnqsuff  lnlxzz"+
"  nlll tvfff  ll   "+
"  lo ltvffff   lll "+
" llpl rfff      l  "
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

const MOB = {
	rat: "rat",
	snake: "snake",
	troll: "troll",
	ooze: "ooze",
	dragon: "dragon",
	spider: "spider"
};

const ITEM = {
	ladder: "ladder",
	quiver: "quiver",
	boat: "boat",
	axe: "axe",
	key: "key"
};

const LAND = {
	MOUNTAIN_GREY: "MOUNTAIN_GREY",
	MOUNTAIN_BLUE: "MOUNTAIN_BLUE", 
	MOUNTAIN_RED: "MOUNTAIN_RED",
	MOUNTAIN_PURPLE: "MOUNTAIN_PURPLE",
	MOUNTAIN_BLACK: "MOUNTAIN_BLACK",
	MOUNTAIN_BLANK: "MOUNTAIN_BLANK",
	EMPTY: "EMPTY",
	HOUSE: "HOUSE",
	RIVER_UP_DOWN: "RIVER_UP_DOWN",
	RIVER_UP_RIGHT: "RIVER_UP_RIGHT",
	RIVER_RIGHT_DOWN: "RIVER_RIGHT_DOWN",
	RIVER_DOWN_LEFT: "RIVER_DOWN_LEFT",
	RIVER_LEFT_UP: "RIVER_LEFT_UP",
	FOREST: "FOREST",
	WALL_DOOR_UP_DOWN: "WALL_DOOR_UP_DOWN",
	WALL_DOOR_LEFT_RIGHT: "WALL_DOOR_LEFT_RIGHT",
	WALL_UP_DOWN: "WALL_UP_DOWN",
	WALL_LEFT_RIGHT: "WALL_LEFT_RIGHT"
};






