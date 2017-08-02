var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");
context.imageSmoothingEnabled = false;

var maze = {
	bits: {
		width: 3,
		height: 3,
		list: [
			{
				closed: "top",
				i: 1
			},
			{
				closed: "bottom",
				i: 3
			},
			{
				closed: "left",
				i: 2
			},
			{
				closed: "right",
				i: 0
			}
		]
	}
};


var graphical ={
	zoom: 4
};



