
function getTodayString(){
	//moment.js
	var todayAsString = moment().format("YYYY-MM-DD");      
	return todayAsString;
};
//date
function setTodayAsDate(){
	document.getElementById("input-date").value=getTodayString();
};
document.getElementById("button-set-date").onclick = setTodayAsDate;
if (!document.getElementById("input-date").value){
	document.getElementById("input-date").value = getTodayString();
}

//meal
function setTime(timeName){document.getElementById("input-time").value=timeName;};
function setTimeAsMidi(){setTime("midi");};
function setTimeAsSoir(){setTime("soir");};
document.getElementById("button-set-time-midi").onclick = setTimeAsMidi;
document.getElementById("button-set-time-soir").onclick = setTimeAsSoir;

//cook
const POTENTIAL_COOKS = ["A","L","M","P","X"];
function setCook(cookLetter){document.getElementById("input-cook").value=cookLetter;};
function setCookAsLise(){setCook("L");};
function setCookAsMaman(){setCook("M");};
function setCookAsPaul(){setCook("P");};
function setCookAsAmelie(){setCook("A")};
function setCookAsX(){setCook("X")};
document.getElementById("button-set-cook-lise").onclick = setCookAsLise;
document.getElementById("button-set-cook-maman").onclick = setCookAsMaman;
document.getElementById("button-set-cook-paul").onclick = setCookAsPaul;
document.getElementById("button-set-cook-amelie").onclick = setCookAsAmelie;
document.getElementById("button-set-cook-x").onclick = setCookAsX;


//eaters
const POTENTIAL_EATERS = ["A","L","M","P"];
var eaters = ["A","L","M","P"];
function toggleEater(eaterLetter){
	if (eaters.includes(eaterLetter)){
		eaters = eaters.filter(function(eater){return eater!=eaterLetter});
	}else{
		eaters.push(eaterLetter);
	}
	document.getElementById("input-eaters").value = eaters.join();
};
function clearEaters(){
	eaters = [];
	document.getElementById("input-eaters").value = "";
};
function toggleEaterAmelie(){toggleEater("A");};
function toggleEaterLise(){toggleEater("L");};
function toggleEaterMaman(){toggleEater("M");};
function toggleEaterPaul(){toggleEater("P");};
document.getElementById("button-set-eater-lise").onclick = toggleEaterLise;
document.getElementById("button-set-eater-maman").onclick = toggleEaterMaman;
document.getElementById("button-set-eater-paul").onclick = toggleEaterPaul;
document.getElementById("button-set-eater-amelie").onclick = toggleEaterAmelie;
document.getElementById("button-clear-eaters").onclick = clearEaters;

//format control
var FOOD_REGEX = /^([A-zÀ-ú]|\s)+?$/gi;
document.getElementById("form-meal").addEventListener('submit', function (event) {
	var isMealFormValid = true;
	//control each field
	//date
	var dateRawValue = document.getElementById("input-date").value;
	var parsedDate = moment(dateRawValue,"YYYY-MM-DD",true);
	if (!parsedDate.isValid()){
		console.log("#formatControl invalid date:"+dateRawValue);
		isMealFormValid = false;
	}
	//meal
	var mealRawValue = document.getElementById("input-time").value;
	if (mealRawValue != "midi" && mealRawValue != "soir"){
		console.log("#formatControl invalid meal:"+mealRawValue);
		isMealFormValid = false;
	}
	//cook
	var cookRawValue = document.getElementById("input-cook").value;
	if (!POTENTIAL_COOKS.includes(cookRawValue)){
		console.log("#formatControl invalid cook:"+cookRawValue);
		isMealFormValid = false;
	}
	//eaters
	var eatersRawValue = document.getElementById("input-eaters").value;
	var eaters = eatersRawValue.split(',');
	for (var i=0;i<eaters.length;i++){
		if (!POTENTIAL_EATERS.includes(eaters[i])){
			console.log("#formatControl invalid eater:"+eaters[i]);
			isMealFormValid = false;
		}
	}
	//food
	var foodRawValue = document.getElementById("input-food").value;
	if (foodRawValue == null || foodRawValue == "" || !foodRawValue.match(FOOD_REGEX)){
		console.log("#formatControl invalid food:"+foodRawValue);
		isMealFormValid = false;
	}

	if (!isMealFormValid){
		document.getElementById("input-meal-warning").style.display="block";
		event.preventDefault();
	}
});

