
function getTodayString(){
	// https://stackoverflow.com/questions/1531093/how-do-i-get-the-current-date-in-javascript
	var today = new Date();
	var dd = String(today.getDate()).padStart(2, '0');
	var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
	var yyyy = today.getFullYear();
	var todayAsString = yyyy+"-"+mm+"-"+dd;
	return todayAsString;
};
//date
function setTodayAsDate(){
	document.getElementById("input-date").value=getTodayString();
};
document.getElementById("button-set-date").onclick = setTodayAsDate;
document.getElementById("input-date").value = getTodayString();

//meal
function setTime(timeName){document.getElementById("input-time").value=timeName;};
function setTimeAsMidi(){setTime("midi");};
function setTimeAsSoir(){setTime("soir");};
document.getElementById("button-set-time-midi").onclick = setTimeAsMidi;
document.getElementById("button-set-time-soir").onclick = setTimeAsSoir;

//cook
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
