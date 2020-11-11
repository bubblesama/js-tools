//times
const POTENTIAL_TIMES = ["midi","soir"];
var times = ["midi","soir"];

function toggleTime(time){
	if (times.includes(time)){
		times = times.filter(function(timeToFilter){return timeToFilter!=time});
	}else{
		times.push(time);
	}
	document.getElementById("input-times").value = times.join();
};
function clearTimes(){
	times = [];
	document.getElementById("input-times").value = "";
};
function toggleTimeMidi(){toggleTime("midi");};
function toggleTimeSoir(){toggleTime("soir");};
document.getElementById("button-toggle-time-midi").onclick = toggleTimeMidi;
document.getElementById("button-toggle-time-soir").onclick = toggleTimeSoir;
document.getElementById("button-clear-times").onclick = clearTimes;

//format control
var RECIPE_REGEX = /^([A-zÀ-ú]|\s)+?$/gi;
var NAME_REGEX = /^([A-zÀ-ú])+?$/gi;
document.getElementById("tip-meal").addEventListener('submit', function (event) {
	console.log("submit IN");
	var isTipFormValid = true;
	//control each field
	//name
	var nameRawValue = document.getElementById("input-name").value;
	if (nameRawValue == null || nameRawValue == "" || !nameRawValue.match(NAME_REGEX)){
		console.log("#formatControl invalid name:"+nameRawValue);
		isTipFormValid = false;
	}
	//times
	var timesRawValue = document.getElementById("input-times").value;
	var times = timesRawValue.split(',');
	for (var i=0;i<times.length;i++){
		if (!POTENTIAL_TIMES.includes(times[i])){
			console.log("#formatControl invalid time:"+times[i]);
			isTipFormValid = false;
		}
	}
	//recipe
	var recipeRawValue = document.getElementById("input-recipe").value;
	if (recipeRawValue == null || recipeRawValue == "" || !recipeRawValue.match(RECIPE_REGEX)){
		console.log("#formatControl invalid recipe:"+recipeRawValue);
		isTipFormValid = false;
	}

	if (!isTipFormValid){
		console.log("should prevent default");
		document.getElementById("input-tip-warning").style.display="block";
		event.preventDefault();
	}
});

