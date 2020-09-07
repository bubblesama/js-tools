document.getElementById("meals-dump-check-button").onclick = checkDump;
document.getElementById("meals-dump").oninput = resetCheck;

function checkDump(){
	var rawDump = document.getElementById("meals-dump").value;
	var dumpLines = rawDump.replace(/\r\n/g,"\n").split("\n");
	var ok = true;
	for (var i=0;i<dumpLines.length;i++){
		if (dumpLines[i]){
			ok = ok && /^202[0-9]-[0-1][0-9]-[0-3][0-9] (midi|soir) (A|L|M|P|,)+? (A|L|M|P|X) (.+?)$/.test(dumpLines[i]);
			//ok = ok && /^202/.test(dumpLines[i]);
			console.log(dumpLines[i]+" so still ok? "+ok);
		}
	}
	if (ok){
		setCheckOk();
	}else{
		setCheckKo();
	}
};

function setDumpCheck(html){
	document.getElementById("meals-dump-check-status").innerHTML = html;
};
function setCheckOk(){setDumpCheck("ok!");};
function setCheckKo(){setDumpCheck("ko!");};
function resetCheck(){setDumpCheck("no check");};

