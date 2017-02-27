//var rootPath="http://localhost:8088/horoscope/";

rootPath="";

var calledForSigns = false;
var currentSign = "none";
var currentDate = "none";
var currentQuizz = "none";

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
	"sagittarius": "Sagittaire"
};

function startup(){
	var shouldGetDate = _updateFromHash();
	$("#mainContent").html("calling server for signs...");
	if (!calledForSigns){
		calledForSigns = true;
		$.get(
			rootPath+"signs/", 
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
				$("#mainContent").html("signs loaded");
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
	}
	return shouldGetDate;
}

function _refreshPage(date, isStats, sign, quizzId){
	// nettoyage des infos
	$("#warning").hide();
	$("#quickLinks a").removeClass("chosenSign");
	$("#predictions div").removeClass("false");
	//console.log("_refreshPage IN date="+date+ " sign="+sign+" quizzId="+quizzId);
	if (date){
		_chooseDate(date);
		if (sign){
			_setSign(sign);
			if (quizzId){
				_setQuizzId(quizzId);
				_getQuizzPredictions(quizzId);
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
				//TODO gestion des stats
				$.get(
					rootPath+"date/"+date+"/stats/", 
					function(data) {
						var result = JSON.parse(data);
						var rightRatio = 0;
						if (result.total != 0){
							var rightRatio = (result.right+0.0)/(result.tries+0.0);
						}
						statOutput += "generated="+result.total+" tries="+result.tries+" right="+result.right+" ratio="+rightRatio;
						console.log("_refreshPage stats: tries="+result.tries+" rightRatio="+rightRatio);
						$("#warning").html(statOutput);
						$("#warning").show();	
					}
				);				
			}
		}
	}else{
		
	}
}

function _chooseDate(date){
	//console.log("_chooseDate IN date="+date);
	_setDate(date);
}

function _setDate(date){
	currentDate = date;
	$("#currentDate").html(currentDate);
	$("#statsLink").attr("href", "#/date/"+currentDate+"/stats/");
}

function _setSign(sign){
	console.log("_setSign IN sign="+sign);
	currentSign = sign;
	$("#sign_"+sign).addClass("chosenSign");
	//$("#currentSign").html(currentSign);
	$("#currentSignInfo").show();
}

function _createQuizz(){
	console.log("_createQuizz IN");
	$.post( 
		rootPath+"date/"+currentDate+"/sign/"+currentSign+"/quizz/",
		function(data) {
			//console.log("_createQuizz: quizz created "+data);
			var quizzId = JSON.parse(data).quizzId;
			_setQuizzId(quizzId);
		}
	);
};

function _setQuizzId(quizzId){
	currentQuizz = quizzId;
	$("#quizzId").html(quizzId);
	$("#quizzLink").attr("href","#/date/"+currentDate+"/sign/"+currentSign+"/quizz/"+quizzId);
	/*
	$("#quizzLink").off();
	$("#quizzLink").click({quizzId: quizzId}, function(event){_getQuizzPredictions(event.data.quizzId)});
	*/
	$("#quizzLink").show();
}

function _getQuizzPredictions(quizzId){
	console.log("_getQuizzPredictions IN quizzId="+quizzId);
	var fullQuizzPath = rootPath+"date/"+currentDate+"/sign/"+currentSign+"/quizz/"+quizzId;
	var hash = "#/date/"+currentDate+"/sign/"+currentSign+"/quizz/"+quizzId;
	$.get(
		fullQuizzPath,
		function(data) {
			//console.log("_getQuizzPredictions recuperation du quizz: "+data+" fullQuizzPath="+fullQuizzPath);
			var quizzData = JSON.parse(data);
			var result = "";
			if (quizzData.code == "OK"){
				for (var i=0;i<quizzData.predictions.length;i++){
					$("#prediction_0"+i).html("<a href='"+hash+"'>"+quizzData.predictions[i]+"</a>");
					$("#prediction_0"+i+" a").off();
					$("#prediction_0"+i+" a").click({quizzId: quizzId, guess: i},function(event){_sendGuess(event.data.quizzId,event.data.guess);});	
				}
				$("#predictions").show();
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
}

function _sendGuess(quizzId,guess){
	console.log("_sendAnswer IN quizzId = "+quizzId+" guess="+guess);
	var fullAnswerPath = rootPath+"date/"+currentDate+"/sign/"+currentSign+"/quizz/"+quizzId+"/guess/"+guess;
	$.get(
		fullAnswerPath,
		function(data) {
			console.log("_sendAnswer recuperation du resultat: "+data);
			var response = JSON.parse(data);
			if (response.code != "OK"){
				console.log("_sendAnwser KO: "+response.message);
				if (response.code == "DONE"){
					_clearQuizz();
					$("#warning").html(response.message);
					$("#warning").show();
				}
			}else{
				console.log("_sendAnswer OK");
				for (var i=0;i<response.details.length;i++){
					if (response.details[i] != currentSign){
						$("#prediction_0"+i).addClass("false");
						console.log("_sendAnswer adding false class to #prediction_0"+i);
					}
				}
			}
		}
	);
}

function _getPrediction(){
	//console.log("_getPrediction IN currentDate = "+currentDate);
	if(currentSign != "none"){
		var path = rootPath+"date/"+currentDate+"/sign/"+currentSign+"/";
		//console.log(path);
		$.get(
			path,
			function(data){
				console.log("_getPrediction: "+data);
			}
		);
	}else{
		console.log("_getPrediction no sign!");
	}
	console.log("_getPrediction OUT");
};

function _testPost(){
	$.post( 
		rootPath+"date/"+currentDate+"/test/",
		function(data) {
			console.log("_testPost: "+data);
		}
	);
};
