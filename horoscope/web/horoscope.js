//var rootPath="http://localhost:8088/horoscope/";
var rootPath="";
var apiPath = "api"

var calledForSigns = false;
var currentSign = "none";
var currentDate = "none";
var currentQuizz = "none";
var currentContext = {
	"date": null,
	"sign": null,
	"quizz": null,
	"isStats": false
};

var i18n = { 
	"aquarius": "Verseau",
	"leo": "Lion",
	"libra": "Balance",
	"scorpius": "Scorpion",
	"taurus": "Taureau",
	"virgo": "Vierge",
	"gemini": "Gémeaux",
	"cancer": "Cancer",
	"capricorn": "Capricorne",
	"aries": "Bélier",
	"pisces": "Poisson",
	"sagittarius": "Sagittaire",
	
	"messages": {
		"welcome": "Sélectionnez votre signe et devinez ce que vous réserve votre horoscope."
	}
	
};

function startup(){
	//_updateFromPath();
	var shouldGetDate = _updateFromHash();
	$("#mainContent").html("calling server for signs...");
	if (!calledForSigns){
		calledForSigns = true;
		$.get(
			apiPath+"/signs/", 
			function(data) {
				var htmlSignsList = "";
				var signs = JSON.parse(data).signs;
				if (shouldGetDate){
					_setDate(JSON.parse(data).date);
				}
				//$("#quickLinks").append("signs ")
				for (var i = 0; i < signs.length; i++) {
					if ($("#sign_"+signs[i])){
						$("#signsLinks").append("<a class='quickLink' href='#/date/"+currentDate+"/sign/"+signs[i]+"' id='sign_"+signs[i]+"' >"+i18n[""+signs[i]]+"</a>");
						if (signs[i] == currentSign){
							$("#sign_"+currentSign).addClass("chosenSign");
						}
					}
				}
			}
		);
		$("#homeLink").click(function(){_refreshPage(currentDate,false);});
		$("#goPrediction").click(function(){_getPrediction();});
		$("#testPost").click(function(){_testPost();});
		$(window).on('hashchange', function() {_updateFromHash();});
	}

};

function _updateFromHash(){
	console.log("_updateFromHash IN hash="+window.location.hash);
	var shouldGetDate = true;
	if (window.location.hash){
		var hash = window.location.hash;
		//console.log("startup: hash="+hash);
		if (hash.indexOf("date") >= 0){
			shouldGetDate = false;
			var date = hash.split("/")[2];
			if (hash.indexOf("sign") >= 0){
				var sign = hash.split("/")[4];
				if (hash.indexOf("quizz") >= 0){
					var quizzId = hash.split("/")[6];
					_refreshPage(date, false, sign, quizzId)
				}else{
					_refreshPage(date, false, sign);
				}
			}else{
				// est-ce les stats?
				if (hash.indexOf("stats") >= 0){
					_refreshPage(date, true);
				}else{
					_refreshPage(date, false);
				}
			}
		}
	}else{
		$("#welcome").show();
	}
	return shouldGetDate;
};


// replace hash method of routing
function _updateFromPath(){
	console.debug("_updateFromPath IN pathname="+window.location.pathname);
	var urlPath = window.location.pathname;
	//check format https://lpr01.ddns.net/horoscope/date/20190201/sign/taurus/quizz/5c54639f8b6d7904f7faa485
	var shouldGetDate = true;
	if (urlPath.indexOf("date") >= 0){
		var rawDate = urlPath.split("/")[2];
		console.debug("_updateFromPath date parameter found: rawDate="+rawDate);
		var isDateCorrectlyFormated = /^201\d[0-2]\d[0-1]\d$/.test(rawDate);
		if (isDateCorrectlyFormated){
			var date = rawDate;
			shouldGetDate = false;
			if (urlPath.indexOf("sign") >= 0){
				var rawSign = urlPath.split("/")[4];
				console.debug("_updateFromPath sign parameter found: rawSign="+rawSign);
				//TODO contrôle format signe
				var isSignCorrectlyFormated = true;
				if (isSignCorrectlyFormated){
					var sign = rawSign;
					if (urlPath.indexOf("quizz") >= 0){
						var rawQuizz = urlPath.split("/")[6];
						console.debug("_updateFromPath quizz parameter found: rawQuizz="+rawQuizz);
						//TODO contrôle format quizz
						var isQuizzCorrectlyFormated = true;
						if (isQuizzCorrectlyFormated){
							var quizz = rawQuizz; 
							_refreshPage(date, false, sign, quizz);
						}else{
							// TODO gestion des formats de quizz pourris
						}
					}else{
						_refreshPage(date, false, sign);
					}
				}else{
					//TODO gestion des formats de signe pourris
				}			
			}else{
				// est-ce les stats?
				if (urlPath.indexOf("stats") >= 0){
					_refreshPage(date, true);
				}else{
					_refreshPage(date, false);
				}
			}
		}else{
			//TODO gestion des formats de date pourris
		}
	}
	return shouldGetDate;
};

function _refreshPage(date, isStats, sign, quizz){
	// nettoyage des infos
	$("#welcome").hide();
	$("#infos").hide();
	$("#warning").hide();
	$("#quickLinks a").removeClass("chosenSign");
	$("#predictions div").removeClass("false");
	console.debug("_refreshPage IN date="+date+ " sign="+sign+" quizz="+quizz);
	if (date){
		_setDate(date);
		if (sign){
			_setSign(sign);
			if (quizz){
				_setQuizzId(quizz);
				_getQuizzPredictions(quizz);
			}else{
				_clearQuizz();
				_createQuizz();
			}
		}else{
			$("#currentSignInfo").hide();
			currentSign = "none";
			_clearQuizz();
			if (isStats){
				var statOutput = "stats for "+date+": ";
				//gestion des stats
				$.get(
					apiPath+"/date/"+date+"/stats/", 
					function(result) {
						var rightRatio = "?";
						if (result.total != 0 && result.tries != 0){
							rightRatio = Math.floor(100*(result.right+0.0)/(result.tries+0.0))+"%";
						}
						statOutput += "generated="+result.total+" tries="+result.tries+" right="+result.right+" ratio="+rightRatio;
						console.log("_refreshPage stats: tries="+result.tries+" rightRatio="+rightRatio);
						$("#warning").html(statOutput);
						$("#warning").show();	
					}
				);
			}else{
				// pas de signe, pas de stats: infos sur le choix des signes
				$("#welcome").show();
			}
		}
	}else{
		// pas de signe: infos sur le choix des signes
		$("#welcome").show();
	}
};

var monthNames = ["janvier", "février", "mars","avril", "mai", "juin", "juillet","août", "septembre", "octobre","novembre", "décembre"];

function _setDate(rawDate){
	//TODO formatage de la date
	if (rawDate.length==8){
		var rawYear = rawDate.substring(0,4);
		var rawMonth = rawDate.substring(4,6);
		var rawDay = rawDate.substring(6,8);
		//console.log("_setDate: rawYear="+rawYear+" rawMonth="+rawMonth+" rawDay="+rawDay);
		var date = new Date(rawYear,rawMonth-1,rawDay);
		$("#currentDate").html(date.getDate()+" "+monthNames[date.getMonth()]+" "+date.getFullYear());
	}
	currentDate = rawDate;
	currentContext.date = rawDate;
	$("#statsLink").attr("href", "#/date/"+currentDate+"/stats/");
};

function _setSign(sign){
	console.log("_setSign IN sign="+sign);
	currentSign = sign;
	currentContext.sign = sign;
	$("#sign_"+sign).addClass("chosenSign");
	$("#currentSignInfo").show();
};

function _createQuizz(){
	console.log("_createQuizz IN");
	$.post( 
		apiPath+"/date/"+currentDate+"/sign/"+currentSign+"/quizz/",
		function(data) {
			//console.log("_createQuizz: quizz created "+data);
			var quizzId = data.quizzId;
			_setQuizzId(quizzId);
		}
	);
};

function _setQuizzId(quizz){
	currentQuizz = quizz;
	currentContext.quizz = quizz;
	$("#quizzId").html(quizz);
	$("#quizzLink").attr("href","#/date/"+currentDate+"/sign/"+currentSign+"/quizz/"+quizz);
	$("#quizzLink").show();
};

function _getQuizzPredictions(quizzId){
	console.log("_getQuizzPredictions IN quizzId="+quizzId);
	var fullQuizzPath = apiPath+"/date/"+currentDate+"/sign/"+currentSign+"/quizz/"+quizzId;
	var hash = "#/date/"+currentDate+"/sign/"+currentSign+"/quizz/"+quizzId;
	$.get(
		fullQuizzPath,
		function(quizzData) {
			console.debug("_getQuizzPredictions recuperation du quizz: "+quizzData+" fullQuizzPath="+fullQuizzPath);
			var result = "";
			if (quizzData.code == "OK"){
				for (var i=0;i<quizzData.predictions.length;i++){
					$("#prediction_0"+i).html("<a href='"+hash+"'>"+quizzData.predictions[i]+"</a>");
					$("#prediction_0"+i+" a").off();
					$("#prediction_0"+i+" a").click({quizzId: quizzId, guess: i},function(event){_sendGuess(event.data.quizzId,event.data.guess);});	
				}
				$("#predictions").show();
				$("#predictionsHelp").show();
				$("#quizzLink").hide();
			}else{
				if (quizzData.code == "DONE"){
					_clearQuizz();
					$("#warning").html(quizzData.message);
					$("#warning").show();
				}
				//TODO gestion des erreurs de récupération des quizz
			}
		}
	);
};

function _clearQuizz(){
	$("#quizzLink").hide();
	currentQuizz = "none";
	$("#predictions").hide();
	$("#prediction_00").html("none");
	$("#prediction_01").html("none");
	$("#prediction_02").html("none");
};

function _sendGuess(quizzId,guess){
	console.debug("_sendGuess IN quizzId = "+quizzId+" guess="+guess);
	var fullAnswerPath = apiPath+"/date/"+currentDate+"/sign/"+currentSign+"/quizz/"+quizzId+"/guess/"+guess;
	$.get(
		fullAnswerPath,
		function(response) {
			console.debug("_sendGuess recuperation du resultat: "+response);
			if (response.code != "OK"){
				console.debug("_sendGuess KO: "+response.message);
				if (response.code == "DONE"){
					_clearQuizz();
					$("#warning").html(response.message);
					$("#warning").show();
				}
			}else{
				console.debug("_sendGuess OK");
				for (var i=0;i<response.details.length;i++){
					if (response.details[i] != currentSign){
						$("#prediction_0"+i).addClass("false");
						console.debug("_sendGuess adding false class to #prediction_0"+i);
					}
				}
			}
		}
	);
};

function _getPrediction(){
	console.debug("_getPrediction IN currentDate = "+currentDate);
	if(currentSign != "none"){
		var path = apiPath+"/date/"+currentDate+"/sign/"+currentSign+"/";
		//console.log(path);
		$.get(
			path,
			function(data){
				console.debug("_getPrediction: "+data);
			}
		);
	}else{
		console.debug("_getPrediction no sign!");
	}
	console.debug("_getPrediction OUT");
};

function _testPost(){
	$.post( 
		apiPath+"/date/"+currentDate+"/test/",
		function(data) {
			console.debug("_testPost: "+data);
		}
	);
};
