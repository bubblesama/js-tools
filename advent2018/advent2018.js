
// day1 part2
/*
var input = [-7,-19,+18,+19,-10,-12,-19,-9,-15,-4,-2,+9,-1,-3,+15,+18,-5,-19,+3,-13,+14,-7,-10,-17,+14,-4,+1,-16,-1,-2,+15,-9,+4,-9,-3,-2,-8,-3,-10,+19,-18,-4,+5,-11,+15,-14,-20,-14,-8,+2,-6,-10,-13,+9,-13,-12,+17,+7,+18,-7,+13,+2,+2,-5,-6,-15,+11,-18,-9,+13,-8,-17,-5,+16,-10,+7,+7,+7,-15,-9,+5,+10,-9,-18,-16,+17,-19,-13,+17,-1,-19,-5,+10,-13,+9,-14,-6,+13,-10,-4,-2,-17,+14,+2,-4,+9,+16,+9,+5,+19,+1,-11,+17,-16,+3,-2,+3,+1,-19,+2,-1,+20,+13,-18,+17,+4,+19,+13,+6,+13,+10,-2,-10,+16,+4,-6,-9,+10,+18,-5,-4,-11,+13,-15,+12,+12,+17,+11,-19,-5,+14,-21,-15,+5,+7,+7,-2,-9,+5,-11,+12,+14,-3,-15,+33,+5,+16,+9,-5,-16,+9,-11,+12,+12,+10,+12,+16,-15,-3,-6,-18,+1,-17,+23,+23,+5,+16,+15,+3,+16,+19,-6,+10,-6,+8,-18,+14,+14,+8,+16,-11,-15,-2,+16,-13,-10,+14,-2,+16,+16,+4,-11,+2,+12,+18,+18,+3,-10,-16,-2,+13,-10,+16,-14,+18,-11,+12,+17,+19,+9,-19,-3,-10,+2,-7,+16,+16,-12,+10,-1,+10,+11,+1,-11,-6,+13,+6,-10,-7,+12,-2,+12,-6,+15,+17,-4,-3,-12,+7,-11,+22,-9,+14,-2,-5,-6,-15,+3,-7,-1,+11,+4,-8,+20,+5,+17,-7,-19,-5,-4,+7,+20,+5,-3,+1,+20,+14,+14,+1,+16,+10,-7,+24,+11,+4,-14,-5,+18,+7,+12,-8,-2,+23,-19,+48,+10,+13,+5,-10,+2,-1,+26,+12,+13,+25,-12,+13,+3,-2,+13,+4,+5,+13,-6,-4,-16,+19,+8,+19,+4,-7,+1,-14,+8,-7,-20,-9,+19,+1,+17,+18,+16,-19,+4,+20,+5,+24,+18,-1,+23,+16,+8,+8,-21,-14,-16,-8,+11,+5,+4,-18,-20,-10,+18,-15,-1,+5,-11,-7,+5,-18,+2,+4,+3,-21,+4,+12,-7,+17,+16,+15,-8,-8,-12,+8,+8,+10,+1,+11,-17,+3,-1,-24,-5,-24,-22,+4,+3,+2,-18,-19,-8,+13,+13,+13,-7,+19,-14,-2,+37,+21,+14,+11,+3,+17,+8,+2,-4,+15,-4,+18,+7,-12,+2,-8,+9,-11,-9,+2,-16,-4,+54,-12,+28,+10,+7,-3,+11,+13,-3,+16,-3,+4,+24,-3,+18,+6,+19,+3,+15,+32,+2,+24,-31,-90,-17,+23,-21,+14,+16,+9,-32,+5,+16,-44,+26,-20,-9,+22,+23,-33,-13,-31,-15,+13,-8,-22,+15,-19,+18,-6,+10,-62,+31,-6,-5,+82,+8,+30,+48,+10,-3,+87,+17,+10,-17,-4,+83,+1,-2,+5,+9,-19,-10,+33,+19,-17,-21,-51,+24,+26,+17,+2,+19,+50,-125,-152,+72082,-9,-15,+19,-16,+2,+15,-11,-16,+19,+10,-4,+12,-13,+19,+16,+8,-10,-4,-13,+18,-7,+10,-17,+1,+11,-8,-6,+5,+16,+21,-9,-6,+19,-6,-6,-2,-8,+19,-8,+16,+5,-19,+18,+13,-16,+13,+8,-16,+9,+15,+9,-19,+16,-18,+19,+15,+10,-17,-2,+13,+4,-5,+17,+2,+6,+9,-5,-3,+18,-11,-17,+7,+9,+18,+1,-16,-11,+14,+10,-5,+2,+13,+9,-5,+9,-3,-19,-9,-4,-14,-9,-9,+6,-4,+22,+18,-7,+17,+14,+16,-17,-3,-5,-4,-4,-11,+13,-1,+18,+10,-6,-11,+13,-15,+18,+12,+3,-1,+7,-18,+8,-4,+3,+15,-19,-12,-2,+12,+14,+11,+19,+1,-6,-1,-18,-16,+1,-7,-19,-17,-20,+10,+23,+19,-2,-18,+15,+20,+6,+7,+12,+14,+6,-11,-1,-12,-7,+10,-17,+11,+4,+9,+10,+9,-7,+18,-6,+14,+9,-19,-12,+16,+21,-10,-7,+14,-9,+10,-17,+11,-18,-12,+6,-12,-14,+12,-19,+4,-19,+5,+6,+12,+35,+17,+7,+18,+18,-13,-17,+1,-6,+4,-18,-19,+12,+5,+17,+10,+13,+14,+11,+16,-12,+19,-5,+14,-3,+6,-11,+16,+18,+16,-14,+12,+3,+3,+17,+2,-11,-9,+7,+3,+15,+14,-9,-8,+15,-5,+11,-14,-1,+12,+6,-1,-14,+10,+11,-19,-17,-14,-12,+18,-2,-21,-10,-8,-18,-20,+1,-12,+18,-10,+11,+17,+6,+9,-4,+12,+12,+7,-8,-18,-13,+7,-14,+11,-2,+9,+5,+11,-12,-1,+22,-6,+17,+19,-8,-1,-3,+1,+15,-3,+2,-9,-4,-19,-8,+5,-9,-2,-6,-30,-16,-7,+11,+3,+7,-9,+10,-19,+10,-17,+3,-5,-14,-18,-2,+16,-13,+6,-3,+15,-10,-10,-15,+21,-11,+17,+19,-7,+2,-13,+4,+15,-7,-14,-17,-4,-15,-17,-16,+14,+9,+15,-7,-4,-8,-12,+5,-1,-16,-15,+11,+29,+20,+6,+16,+19,-5,+11,-1,+12,+9,+9,+13,+13,-4,+14,+3,+20,-21,-27,-13,+7,+3,+8,+63,+15,+23,-3,-6,-12,-1,+16,-1,+14,-8,-18,+17,+4,-10,+17,+1,+9,-11,-3,-9,+5,+19,-17,+12,+14,+5,-17,+22,-18,-7,+28,-19,+22,+25,-2,-8,+6,+5,+21,+18,+18,-2,+17,+13,+18,-8,-16,-11,-6,+4,+9,+2,-18,-7,+18,-10,+18,+8,+5,-17,+2,-23,+10,+31,+20,-13,-19,-26,-5,-11,-18,+15,-19,-2,+19,+12,+14,+8,-25,-18,-23,-19,-11,-6,-11,+13,-4,+20,-4,+9,+15,+2,+18,+6,+10,-3,-14,+6,-15,-2,-7,+21,+22,+5,+43,-5,+6,+65,+24,+106,-14,+30,-3,-12,-75,-115,+20,-11,+84,-17,+135,+67,+13,+37,+62,-73422];
console.log("input length="+input.length);

var currentFrequency = 0;
var reachedFrequencies = [];
var found = false;
var cycleCount = 0;
while (!found){
	input.forEach((shift)=>{
		if (!found && reachedFrequencies.includes(currentFrequency)){
			console.log("ding! double frequency="+currentFrequency);
			found = true;
		}else{
			reachedFrequencies.push(currentFrequency);
			currentFrequency += shift;
		}
	});
	console.log("cycleCount="+(++cycleCount));
}



//day 2
var input = ["rvefnvyxzbodgpnpkumawhijsc","rvefqtyxzsddglnppumawhijsc","rvefqtywzbodglnkkubawhijsc","rvefqpyxzbozglnpkumawhiqsc","rvefqtyxzbotgenpkuyawhijsc","rvefqtyxzbodglnlkumtphijsc","rwefqtykzbodglnpkumawhijss","rvynqtyxzbodglnpkumawrijsc","rvefqtyxlbodgcnpkumawhijec","rvefqtyxzbodmlnpnumawhijsx","rvefqtyxzbqdbdnpkumawhijsc","rvefqtyxzlodblnpkuiawhijsc","rvefqtyizrodelnpkumawhijsc","rveffjyxzgodglnpkumawhijsc","rvefqjyxzbodalnpkumadhijsc","rvefqtidzbodglnpkumawhdjsc","hvefqtygzbodglnpkumawhijfc","rzefqtyxzbodglfhkumawhijsc","rmefqtyxzbolglnpkumaehijsc","rnefqqyxzbodglnhkumawhijsc","rvwfqvyxzbodglnpcumawhijsc","rvefqtyxzbokgltpkumavhijsc","rvefciyxzbodglnmkumawhijsc","rvefptyxzbodglnpkuhashijsc","rvefqtyxzrodglnpkxmawhiqsc","rvefqtyxzbotglnpkumawriwsc","rvufqtyxzbodglnplumawhijvc","rvefutykzbodglnpkumaahijsc","rvefqtyxqbodgllprumawhijsc","rvegqttxzbodgllpkumawhijsc","dvefqtyxzsodglnpkumawdijsc","rvefqtyxkbodglnfkumawhijsj","rvefqtyxzbodnlnpcumawhijnc","rvefqtyxzbodglfpkuocwhijsc","rvecqtyxzbbdganpkumawhijsc","rvefytyxzbodglnpkubgwhijsc","rvefxtyazbomglnpkumawhijsc","rvefqgyxzbodglnpkumawyiksc","avefqtyxzbodglnfkummwhijsc","fvefqtyxzbbdglnpkumswhijsc","rvefqtyxzxodglnpkumuuhijsc","rvezqtyxzbydclnpkumawhijsc","rvefqtyxzbohglnpkumawdijjc","rvejqtyxzbodrlnpkumawhijsd","rvefitzxzbxdglnpkumawhijsc","rvefutyxzbvdglnikumawhijsc","rvefqtyazbodgqnbkumawhijsc","rvefqtyxzbolglnpkwmajhijsc","rvefqtyxzjodglnpgwmawhijsc","rvefhtyxzbodglbpaumawhijsc","mvexqtyxzbodglnpkumawrijsc","rvefqtyxwbodglnpkumawhbxsc","rvefqtyxzbodgsnpkudawsijsc","rvwfqtyxzbonglnwkumawhijsc","rvefqtyxzjodglnpkfmawhwjsc","rvefqtyxzbodglntkumughijsc","rvefctyxzbodglnpkumawhiwsx","avefqtyvzbodglnpkumawhijsb","rfefqtyxzlodglnphumawhijsc","rvefqtyxzfowglnpkumaehijsc","rvhfvtyxzbodgqnpkumawhijsc","rfefqtyxzbodglapkumuwhijsc","rvefqclxzbodglnzkumawhijsc","qvefqtyxzbodglnckumcwhijsc","rvefqtyxzkodglnpkymawgijsc","rvefqtyxzbodgfnpkumafhizsc","rvefqtyxzbodglnxkumavhijsf","rvevqtyxzbodgpnpkurawhijsc","rvefqtyxziodglnpkubawhijss","rrefqtpxzyodglnpkumawhijsc","rvefqfyxzbodglcpkxmawhijsc","rvefdtyxzbodglnpkumvwhijsn","rverqtyxzbodglnpkwmawhijuc","rvecjtyxzboxglnpkumawhijsc","rvefqtyxzbodglnpkqmaxhifsc","rtnfqtyxzbodglnpkumawhijmc","lvefqtyxzbodelnpkumawhijsz","dvefqtyxzbbdgvnpkumawhijsc","rvefqlyhzbodglnpkumtwhijsc","roefqtyxlbodglnpkumawhyjsc","rvefqsydzjodglnpkumawhijsc","rveybtyxzbodglnpkumawhijsn","rvefqtyhzbodgvnpmumawhijsc","rvefqxyazboddlnpkumawhijsc","vvefqtyxzbohglqpkumawhijsc","reefhtyxzbodglnpkkmawhijsc","rvefqtyxzbodglnpkulowhijrc","rveqqtyxzbodgknpkumawhijsk","jvefqtqxzbodglnpkumawiijsc","rvefqtyxzboxglnpvuqawhijsc","rvefquyxzbodglwwkumawhijsc","rvefqtyxzbodnlnpkumawhgjbc","rvdfqthxdbodglnpkumawhijsc","rvefqtyxzbodllnpkumawhujsb","evefqtyxzboyglnpkumowhijsc","rvefktyxzbomglnpzumawhijsc","rvefqtyxzbodhlnnkrmawhijsc","rvefqtyxrbodglnpkujaehijsc","rvefqtyzzbodglnpkumrwhijsb","evefqtyxzpodglfpkumawhijsc","rvefqtyxibodglkpyumawhijsc","rrefqtyxzbodglnpkudawhajsc","rvifqtyxzbodglxpkumawhijlc","rxefqtyxzbedglnpkumawhijsp","rvnfqtyxzbopglnpkuqawhijsc","rvefqtyxkbodglnpoumawoijsc","dvefwtyxzbodglnpksmawhijsc","rvkfqtyxzbodglnpkdmawhijsa","rcefytyxzzodglnpkumawhijsc","rvefqtkxzbodglnpktqawhijsc","nvezqhyxzbodglnpkumawhijsc","rrefqtyxzbodgunpkumpwhijsc","rvefqtaxzbodgknpkumawhijic","pvefqtyxzbodglnpkuxawsijsc","rvefqtyxzbodglkpvumawhjjsc","wvefqtyxzkodglnpkumawhhjsc","rzefqtyxzbotglnpkumawhxjsc","rvefqtxpzbodglnpkumawzijsc","bgefqtyxzbodglnpkrmawhijsc","rvefqlyxzbodglnpkumilhijsc","cbefqtyxzbodglnpkumawhiesc","rvefqtyxzbydelnpkumahhijsc","rvefntyxzbodglnpkumaehijsw","rverqtyxztodglopkumawhijsc","rvefqtyxzdodgwrpkumawhijsc","rvefqtyxibodglnikumawhtjsc","qvafqtyxzbodglnpkurawhijsc","rvefqtyxwbodglnpaumawoijsc","rvefqtyxzoodglndknmawhijsc","rvdfqtlxzyodglnpkumawhijsc","rvefqtyxzbodglngfumawhinsc","rsefqtyxzbodglnpkumawhijek","rvoestyxzbodglnpkumawhijsc","svefqtyxzboaglnprumawhijsc","rvefqtybzbodgwnpkumawwijsc","rvefqtyxzdwdglnpkvmawhijsc","rvlfqtyxzbodglnpkrmawhixsc","rvefqtyxwbodglepkumawhijsd","rvefqtbxzbodglnqkumawhijmc","rvefqtzxzbodglnpkumuzhijsc","rvefqtyxzbodglnpkumawzwnsc","rvwfqtyxzboiglnpkumawhijsg","rtehotyxzbodglnpkudawhijsc","rvegqtyxzbodglnpyumawhijsl","rvecqtyxzbsdglnpkumawhojsc","rvefqtyxzbodmlnpkumaghijfc","rvefqtyxzxodglnpkumanvijsc","rvefqtyxzbodglnbiugawhijsc","lvefqtlxzbodglnplumawhijsc","rvefqtyxvbodglnpkumaldijsc","rmefqtyxzbodgvnpkuuawhijsc","rvefqtyxzbodglnpkymeuhijsc","rvefqtyxzuodganpsumawhijsc","rxefqtyxzbodglnpkumgwhijwc","rvefgtyxzbodglnpkudawxijsc","ahefqtyxzbodglnpkumawhejsc","rfefqtyxzbzdglnpkusawhijsc","rvefqtyszqodgljpkumawhijsc","rvefqtylzboiglnpkumrwhijsc","rvefqtyxzltdglnpkumawhijsu","rbefqtyxzbodglnpqumawhijsi","rvefqtyozpodglnpkumawhijsa","zvefqtyxzpopglnpkumawhijsc","rvefqtyxzbodglnfkqmawhijsp","rvefqtyxzbodgliakumawhijsf","rvefqtymzrodgfnpkumawhijsc","ivejqtyxzbodglnpkumawhijuc","rvefqtyxzbodflnpkxwawhijsc","dvrfqtyxzbodglnpkumashijsc","rqefqtyxzbwdglnpkumawvijsc","tvefqtkxzbodgltpkumawhijsc","rvefdtyxzbodguxpkumawhijsc","rveqqtyxvbodglnykumawhijsc","rvefqtypzcovglnpkumawhijsc","rvefqnyxzbosglnpkumdwhijsc","rvefstjxzbodslnpkumawhijsc","rvefqzyxzpodglnpkummwhijsc","rvefqkyxzbodglnhgumawhijsc","rvufqvyxzbodklnpkumawhijsc","rvefotyxzhodglnpkumawhijsk","rvefqtyxzbokglnpkumawvcjsc","lvefqtyxzbolglnpkumawoijsc","rvefqtywzoodglfpkumawhijsc","rvehqtqxzbodglnpkumawhcjsc","rqefqtyxzbodolnpkumjwhijsc","rvefqtyxzbodglrpkunawgijsc","rvefqtyxzbodglamkumawdijsc","rvefvtyzzbodllnpkumawhijsc","rvefqtyxzbldglnpfcmawhijsc","rvefppyxzbodglnpkucawhijsc","rvefquyuzbodglnpkumkwhijsc","rvefqtyxzbodgqxpkumawhivsc","rtefotyxzbodglnpkudawhijsc","rvefqtyxzbodgbnmkuzawhijsc","ivefqtyxzbodgsnpkumzwhijsc","rvhfqtyxzbodolnpkumawhijsz","rvefvtyxzbodwlnpkusawhijsc","riemqtyxzbodglnpkumawhiasc","rvtfqtyxzbqdglnpkumawuijsc","raesqtyxzbodglnpkumawhijsj","rvefqtyxzbodalmpkumawhihsc","rvefqtlxzbodgznpkkmawhijsc","rvefqbyxzbodglgpkubawhijsc","rvefqtyxnbodgxnpkumswhijsc","rvefqtyxzkodvlnukumawhijsc","rvefqtyzzbocglnpkumafhijsc","rvhfqtyxzbodglmpkumgwhijsc","rvsfrtyxzbodnlnpkumawhijsc","rvefqtyxzbxdglnpkujcwhijsc","rvefqtyvzrodglnphumawhijsc","reetatyxzbodglnpkumawhijsc","rvefqtyxzbodglnpzumaoqijsc","ovefqtyyzbodglnvkumawhijsc","rvefqbyxzbodnlnpkumawhijsi","xvefqtyxzbodgrnpkumawrijsc","rvebqtyxzbodglnpkumazhiasc","rqeretyxzbodglnpkumawhijsc","rvefqtyxzyodglapkumvwhijsc","rvesqxyxzbodglnpvumawhijsc","rvefqtyxeborglnpkufawhijsc","rvecqtyxzbodflnpkumawnijsc","rvefdpyxtbodglnpkumawhijsc","rvefqtyfzbodclnpkymawhijsc","rvefqtywzbodglnpxumawhiusc","rvefqtyxzbodglnpkumawzbjwc","rvewqtyxdbodglnpxumawhijsc","rvefqtyxzgocglnpkgmawhijsc","rvufqtyxzbodggnpkuzawhijsc","rvefqtynzlodgllpkumawhijsc","rvedqtyxzbodghnpkumawhujsc","rvefqtyxlbodgnnpkpmawhijsc","rvefqtyxzboqglnpkzmawhijec","rvefqtyxzbodglnpkfmwwyijsc","rwefqtkxzbodzlnpkumawhijsc","rvefqtyxvbodglnpkufawhyjsc","rvefqtyxzbodgltpkumawhqmsc","rvefctyxzbodglfpkumathijsc","rvefqtyxzbodgfnpkuuawhijfc","rvefqttxzbodglnpmumawhijwc","rvefqtyxzbodglnpkqmawhihsj","rvefqtyxzbsdglcnkumawhijsc","rvbiqtyxzbodglnpkumawhijlc","rnefqtylzvodglnpkumawhijsc","mvefqtyxzbddglnpkumcwhijsc","rvefwtyxzbodglnpkgmawhijxc","rvefqtyxljodglnpkumxwhijsc","rvefqtyxzbodglnpkuprwhijsd","rcxfqtyxzbldglnpkumawhijsc","rvetqtyxzbojglnpkumewhijsc","rvxfqtyxzbtdglnpkbmawhijsc"];
//part 1
var with2OccurencesBoxCount = 0;
var with3OccurencesBoxCount = 0;

input.forEach((boxId)=>{
	//computing number of letters
	//console.log("boxId="+boxId);
	var letterCount = new Map();
	[...boxId].forEach((character) => {
		if (letterCount.get(character) === undefined){
			letterCount.set(character,1);
		}else{
			letterCount.set(character,letterCount.get(character)+1);
		}
	});
	//checking letters with 2 or three occurences
	var with2Occ = false;
	var with3Occ = false;
	letterCount.forEach((occurence,letter)=>{
		//console.log("boxId="+boxId+" letter="+letter+" occurence="+occurence);
		if (occurence == 2){
			with2Occ = true;
		}else if (occurence == 3){
			with3Occ = true;
		}
	});
	//adding to the checkSum
	if (with2Occ){with2OccurencesBoxCount++;}
	if (with3Occ){with3OccurencesBoxCount++;}
});

console.log("checksum="+(with2OccurencesBoxCount*with3OccurencesBoxCount));

//part 2


var tries = 0;
for (var i in input){
	var boxId = input[i];
	for (var j=i;j<input.length;j++){
		tries++;
		var otherBoxId = input[j];
		var commonLetters = "";
		var differentLettersCount = 0;
		var finished = false;
		var currentIndex = 0;
		while (!finished){
			var boxIdLetter = boxId.charAt(currentIndex);
			var otherBoxIdLetter = otherBoxId.charAt(currentIndex);
			if  (boxIdLetter == otherBoxIdLetter){
				commonLetters += boxIdLetter;
			}else{
				differentLettersCount++;
			}	
			currentIndex++;
			if (currentIndex >= boxId.length){
				finished = true;
			}
		}
		//console.log("boxId="+boxId+" otherBoxId="+otherBoxId+" commonLetters="+commonLetters+" differentLettersCount="+differentLettersCount);
		if (differentLettersCount == 1){
			console.log("ding! commonLetters="+commonLetters);
		}
	}
	//console.log("end tries="+tries);
}



//day 3

//part1
var size = 1000;
console.log("init fabric");
//create fabric
var fabric = new Array(size);
for (var i=0;i<size;i++){
	fabric[i] = new Array(size);
	for (var j=0;j<size;j++){
		fabric[i][j] = 0;
	}
}
console.log("analysing patches");
//#1358 @ 218,557: 13x17
var patchFileRegexp = /#(\d+) @ (\d+),(\d+): (\d+)x(\d+)/;
processFile(
	"day3-input.txt",
	(line)=>{
		//console.log("processFile patch: raw="+line);
		var patchParsingResult = patchFileRegexp.exec(line);
		var patchId = +patchParsingResult[1];
		var patchX = +patchParsingResult[2];
		var patchY = +patchParsingResult[3];
		var patchW = +patchParsingResult[4];
		var patchH = +patchParsingResult[5];
		//console.log("processFile patch: patchId="+patchId+" patchX="+patchX+" patchY="+patchY+" patchW="+patchW+" patchH="+patchH);
		for (var i=patchX;i<(patchX+patchW);i++){
			for (var j=patchY;j<(patchY+patchH);j++){
				fabric[i][j]++;
			}
		}
	},
	(line)=>{
		console.log("counting overlaps");
		var overlapCount = 0;
		for (var i=0;i<size;i++){
			for (var j=0;j<size;j++){
				if (fabric[i][j]>1){overlapCount++;}
			}
		}
		console.log("overlaps="+overlapCount);
	}
);

//part2
var size = 1000;
console.log("init fabric with claim ids");
//create fabric
var fabric = new Array(size);
for (var i=0;i<size;i++){
	fabric[i] = new Array(size);
	for (var j=0;j<size;j++){
		fabric[i][j] = {"overlaps": 0, "claims":[]};
	}
}
console.log("analysing claims");
//#1358 @ 218,557: 13x17
var patchFileRegexp = /#(\d+) @ (\d+),(\d+): (\d+)x(\d+)/;
var claims = new Array();
processFile(
	"day3-input.txt",
	(line)=>{
		//console.log("processFile patch: raw="+line);
		var patchParsingResult = patchFileRegexp.exec(line);
		var patchId = +patchParsingResult[1];
		var patchX = +patchParsingResult[2];
		var patchY = +patchParsingResult[3];
		var patchW = +patchParsingResult[4];
		var patchH = +patchParsingResult[5];
		claims.push({"id": patchId, "x": patchX, "y": patchY, "w": patchW, "h": patchH});
		//console.log("processFile patch: patchId="+patchId+" patchX="+patchX+" patchY="+patchY+" patchW="+patchW+" patchH="+patchH);
		for (var i=patchX;i<(patchX+patchW);i++){
			for (var j=patchY;j<(patchY+patchH);j++){
				fabric[i][j].overlaps++;
				fabric[i][j].claims.push(patchId);
			}
		}
	},
	(line)=>{
		console.log("looking for solo claim");
		claims.forEach((claim)=>{
			var atLeastOneOverlap = false;
			//console.log("claim: id="+claim.id);
			for (var i=claim.x;i<(claim.x+claim.w);i++){
				for (var j=claim.y;j<(claim.y+claim.h);j++){
					if (fabric[i][j].overlaps > 1){
						atLeastOneOverlap = true;
					}
				}
			}
			if (!atLeastOneOverlap){
				console.log("ding! no overlap for #"+claim.id);
			}
		});
	}
);

//day 4

//[1518-03-06 00:03] Guard #2843 begins shift
//[1518-03-06 00:18] falls asleep
//[1518-03-06 00:24] wakes up

//var guardActivityRegexp = /\[(\d{4})-(\d{2})-(\d{4}) (\d{2}):(\d{2})\] (falls asleep|wakes up|Guard #\d+ begins shift)/;
var guardActivityRegexp = /(\d{2})\] (falls asleep|wakes up|Guard #\d+ begins shift)/;
var guardIdRegexp = /Guard #(\d+) begins shift/;
var guards = new Map();
//state stack
var currentGuardId = -1;
var isSleeping = false;
var startSleepMinute = -1
var totalSleepForTheNight = 0;
var lines = 0;
console.log("parsing activities");
processFile(
	"day4-sorted.txt",
	(line)=>{
		lines++;
		//console.log(line)
		var guardActivityParsingResult = guardActivityRegexp.exec(line);
		var currentMinute = Number.parseInt(guardActivityParsingResult[1],10);
		var activity = guardActivityParsingResult[2];
		//console.log("currentMinute="+currentMinute+" activity="+activity);
		if (activity.startsWith("Guard")){
			var guardId = +(guardIdRegexp.exec(activity)[1]);
			//console.log("guardId="+guardId);
			currentGuardId = guardId;
			isSleeping = false;
			if (!guards.has(currentGuardId)){
				var nightSleep = new Array(60);
				for (var i=0;i<60;i++){
					nightSleep[i] = 0;
				}
				guards.set(currentGuardId,{"sleepTotal":0,"sleepSchedule":nightSleep});
			}
		}else if (activity.startsWith("falls")){	
			startSleepMinute = currentMinute;
			isSleeping = true;
		}else if (activity.startsWith("wakes")){
			//var sleepDuration = currentMinute - startSleepMinute;
			guards.get(currentGuardId).sleepTotal += (currentMinute-startSleepMinute);
			for (var k=startSleepMinute;k<currentMinute;k++){
				guards.get(currentGuardId).sleepSchedule[k]++;
			}
			isSleeping = false;
		}else{
			console.log("WARNING! uncatched activity");
		}
	},
	(line)=>{
		console.log("activites parsed: "+lines+", starting sleeping analysis");
		//part 1
		//finding the most sleepy guard
		var mostSleepyGuard = -1;
		var mostMinutesSlept = 0;
		guards.forEach((sleepActivity,guardId)=>{
			//console.log("guards.forEach guardId="+guardId);
			if (mostMinutesSlept < sleepActivity.sleepTotal){
				mostSleepyGuard = guardId;
				mostMinutesSlept = sleepActivity.sleepTotal;
				console.log("current biggest sleeper: "+guardId+" with total sleep of "+mostMinutesSlept);
			}
		});
		//console.log("biggest sleeper found: "+mostSleepyGuard+", searching for sleepiest minute");
		var sleepiestGuardActivity = guards.get(mostSleepyGuard);
		var sleepiestMinute = -1;
		var mostSleptOverlap = 0;
		for (var i=0;i<60;i++){
			if (mostSleptOverlap < sleepiestGuardActivity.sleepSchedule[i]){
				sleepiestMinute = i;
				mostSleptOverlap = sleepiestGuardActivity.sleepSchedule[i];
				//console.log("current most sleep overlapt minute: "+sleepiestMinute+" with an overlap of "+mostSleptOverlap);
			}
		}
		//console.log("sleepiest minute of the sleepiest guard found: "+sleepiestMinute);
		var result = mostSleepyGuard * sleepiestMinute;
		//console.log("ding: result="+result);
		// part2
		var mostOverlappedMinute = -1;
		var biggestOverlap = 0;
		var linkedGuardId = -1;
		guards.forEach((sleepActivity,guardId)=>{
			for (var i=0;i<60;i++){
				if (biggestOverlap < sleepActivity.sleepSchedule[i]){
					biggestOverlap = sleepActivity.sleepSchedule[i];
					mostOverlappedMinute = i;
					linkedGuardId = guardId;
				}
			}
		});
		var result = linkedGuardId * mostOverlappedMinute;
		console.log("ding: result="+result);
		
	}
);

//day 5
var polymer = "VRrQqmPoOpMdAaDMQqmDZwWzfFdJjGmMgtTyYMmVkKgGvOOooLixXIlpPqfFFfFfciICBbRrJjGgQchHIiKkTtCSspPVlLJPpGgSsSsYyjSsqwWTsqQStjOkyYKiHhwWIoIfFHhOYgGJjyOoFfvVAaopVtTYyNitTIdvVkKgGYyWwDZwWNnlLwWzZYFfyDdyYVvLlgGUuhHMmzfFmMQqtaNnATDUuWwMjJRrdDmdyYkKkKCjzZJpzZPnEephHPNuUBbgGNncbBXZzxSsnAaVvNnqQvWPpwoOusSRrPpUvVCcwWStTSssHsSTzZtbBhAahHfFrgIhHibuUBCcGkKUucPpnNgGKfFkHhkKCGgRrCcwWhzZhHWNnwHEefFsRraNnASRSsKeEkkKUhHpPuoOEeRLxNnXUuEelEemXxMAxXanGgTtYyNNNnnryYtToOHhFftTcxXCPVvvVMmFfYyxXyYCcGqQgGgmMQrRqfFaAdhHDpPKkpyYPXxDcCduUILljIiBbMmJiZcCvVSsziHIiqQeEIikKhVnNvSDdcCImduUCcDMiJjeKkESrRPkKeEpsoTDdtOnNTtbBWIXxFYZzyfgGDDRrddlQYyZzqLcCQvVdDDdqVvabBAzZhHWwgoOiQqIlLGmMlLUuPpiSHhJjgGsuUIDSsgGuUmJBbjVvfFMmdDJjTtMNSsGgVvklLlLxIiXypPaGgAcCoOJDdWwfVveEFeAaElLZzIMmYyijYtcCTKvDHhdJjLJjxhHXlVNnzsSxXrRZfFEelnNQqUnNvVtWwTuqGgQRrCAKHhnNkZzpPCcjJjJbspPSBrVqQvkKRWrRwhHcCXxaPIqQAaFfyYipjJRQqrZzxZPpCAkKVvyYaDdmMgxXGSsLlnNjpPsSxeEXJcFfUuCjJwQqWwsSWcNHhnuRrtTUyYRQnNqYIpPiyKCRkKuUwWlLMmxXgGDxXdQqLMmlFfTuUtdvVDrNnckgGusSUOormyFfNcCnoAamxdVvDXMeTtEbBZICcimMsSkKyGgYIiStTsFlLJjyYfmMjJyKkofHhEeWwJLlkKfFBbnSjJsSOoMmsSyYwIiWsHhKbcCBSscsSTFNngnfIiFNkKAarRUuMmAXxasDvVdbBSjJYyfOjJoTtFFHLlAaBbnNhfwjxZzXUuJOoBboOEZzeLDRrdyYlWkKjgGJGEegGGPCkaAKcpyYglLfFfEeoORrNnqQJjJjxxRrXXerEeoOgGRZznNEEexFfRrXnNFdiIpPDpuUEeFNnRBbrKkfNqEQqevVdDQGgyYHwWhSHhclLldDLCcCcCpPvCchHVDljJLiInoONefqQFEkKcNnHhCwDdiIoOWdaADdkkbBKPpiIHnNXLlxfFaARrheDdOoEAadDhHWwjSSszZSszDdZfFsdDGgiquUQIoOWkUuKhVYynNmDdgGfFBbMvhHVvnNpPuUNkFfnQqjJNnNXpPxKnQiIqHEeguUGxBiIbXiIWeoOEfFkkKjJKaIiAHhngEeGbBNMmHhOorgGeXxFvVxXfjrRQZzqJeEAdDaEBaAOobRJcHhghHaAKkEeIwWiGCjwIirAacUuBbZRCcrzCkKMmQWwMmqrRoZYtTyQqBHAahboBbOVvgGcCAaTtbBlLPwWmMsIiueEgGZzLlUTtzZvuUVnqQNeERrMdwWDqVvgGQBNKknhHbIivRrVHlLhROMmjmMJPpSVvJjZmMztTyYBbOoJjsZyYyHhWwYvVDQqduUxXshHdBbdbsSBpPDwWDupPUMOomSdDDdAxXkKdDazffWeEwFwWlhHLjRrJmMFdDifKkFGrfFRzikKIZZzoOTNnLeElAaFfXxtWSskKWwcCoGMmEegbfFZzBKkRrEetTLlddDEeuUkrRJkKKksSrRQqFfYFYyfyzqQhHcCZubBKcCKvVckFfUuKCktTNeAaEnXxkUOyYxXTtRreGgdbBDmMLlETcCiIvVtYyobNnBeEaAabRrSsBmMAoOWeEwGgSsYqnNQuUviIVCiaVvEeAIRmMYyWwyYyYymoOZzMMlXxLDfFWwJTtqQauUAjTXxpPtlLNtTBgGhHbwWsSQnNkKVvqtiINnBfFqvVQbPAapRgGotTQqjJOXxrspPSdDIiymMPDdpYxXTVvneEUuNyYHGgwWsSaAjJhmMnwWecCytTzZYHiIoOpPiIhcCTqQtEgpPwMmrSsRwWvVvNxXwvVyBbDdQBbqbBnNFfLlIiwRmMLllLrWYMmuXxUXCcxUAadDDfFrRUudoAaOTtuUQqmDqQHhdzsuUSZPpZrRVvLlcNnxobaABOCcXgGfSsFCoEeOcKkiRrdDxdDbbpsSnJjNnBbFfZZzzlLHOobCcBSPpsjXxJIHhiBKkwWbbBPpmLlcbBeIiECudxXnNizZIwWbMuUmMLlKkdDoOsSOAXxrRJjtTZzakKLpPlNnoldDqQMmWwsHheEGgSSsMBjJbmAayYtJLcCljdDaAnNTtkKDdPpvVJoOgGeEGglLrKJAajkKkiIPpBbRrzjtThkKHkKBbJaFfocOoCOLlgXzZxGBbOIiJjnNoSNnwtWMmwTOAmMKkoOaiIAaNnRrHhBEebkKtTkKiIjJgYyGLwWlxXlLPEepOoAaVzZvpPrBbrRRoiRrlbBLIbylLYBJjUCcgGHhCcMYsqQBbSvmMpiIPWFfwVQqyYTjJxyYXUulLaABbmMfForlLRoKhhHHuUEekBVvhlLHbieEIGgVbdfFDxXwWBWEHhewXxgGviIaiQqotTOHtThEeIzZAsSQDdIxPpXSzHaAhzXpiYAamMyAaHVqQGgxXtTvqQQqhPistkKTSImMpbAaBIPDBbcXxCfogGSsOlLUuFHhPLlrRxLoOlXEXxZzJjxAoOaWwXUupPbBDdZzNnSshHVvKwtTgGdDWFfUukeERrhHzZNniIXZzxiIbVvhNngGSuWwUYysAYNnjUNnuJyfdTtJjBbHrRhdBbDYyQqDSsmoOrRfIiFYyOoSmMsSaAYyFfsunNWhHwgGlLqQWwLlUZzUumMMHhWwzWrRwZGGgyRREeLFflkDdKrrpPRSsBbrHlLhSsYupPBbNnUyYDaAdgTWwoOIDdJjxXFfyYYyimMQqRKAakDxXaAdrwWnPpYyZzWVvwHzZhkhHQqmMZbBzSsDdKNkKoOaEeAhSstzZTAauUfNeWwErRzZKcCkFfbBRrAOJjTtLPplthLLllKEevVklLHJXOoxjTRrgcqQCnNCgGcGoIhHicCTeHiOTtaAsSTtJjBbGPmZzMpDUuSsxXZzzQqwnNxXvVcoOZuUtTzCWZkKYNDzlLZAAaamPpFfogfFODdoUuEenNnGgakKaXxAAqQtDYycCEFfOAaoedAnNasSwWGazZAFfgTNPpbBHhyiIGzZrROogFfjUuBrRuUbEeEeQIiWhHwnNKhHIikLltqQdoODYyiIOoBgGbjJcCbZHLlhzeEHhBiglLGOoOozWwBbzZNnZIeEMmDdyYiWBboOwnNIUuAaOoTgMcClLmeEtLTtiQqtTUdDuvVPpYNvVnyksgGSHXxhImMiaQqAtTBbzgGZWwpPRlLriMmIVvKUukVkKvUfFuxXPpOolzZLrRKbMeXxEmZMmJtTeZzGWwsSgbBEWyYhJjHuxXUYeEOoxXHhSLlfJjFCCccLyYiInNIFfimMVLlvlIiCnCcNUguUGuYyxyYYydDuUOWrRNnwlLNnsSruURoOoXjJkvryYRVYyWwiTtgGiIWwIKnNkHhyeEYnNZfFgGUuDuUGgiRrIBuUdDKzZkIZyYzQqrKkwWRGgpPMmkKJjpWtbBTwPGKkgeEifuUjJNnFyYkKtqAaQHrRhHhAaTlLFuUdDKkjJYXxMmXxhEergGRNcbBuUCAAaMYymlLcCoOadDyjsSJBVvbwWbBHiIlLhXuTjJJkKZzyYjtUDdJiIjjAaNpPoumMUOtnvVNGqQgZzYhaAQqIrRiHOoBYybHlLmQqjJlUuLoOvVBaAbAaMUuaaAAuUteCcCcSzZsBvaAVbEmMyYTlUrtjJQWwqlLVLlRYKkXxEezWPpdkKDfBFfbXyYALcCOoqIiQrcCRltTQqpqZzQPaiIMNnzZSZzfFJjTtsmUXzZJfFjxYPufFUFsSNnflLpfiIDdZzFQhHqidDdDtKZdDNYynzOokTWwAOoaxXIaAPYLlnYVvyNyuRrUOtTEeLOoAalogKrRkMmXxGpDQMzZibiIARrSsagGoObBWwBRrRrIlNnZzLuUzZPUuPsSpBbyWLJcPpCjlqQKkgGEemMbBpYyqQPZzxXTqQQAaiIXxOoqAannbmhHQVvEekKqMGQqgjJcsSPpCtEeTLwWlhkKWJEejfFmMzZRrwItuUkKAiIWwfFaFfKkuuEeUOolLEOoeUOoPgaAGIipJjcCCnNcdDqpPQDCAacdMwWVvEkKemaheTMmtVvECcvXxVnTLldDYeEyTttjJUuaDdbBOgGSsoWwWwAeEOoPpMQZvVzJjqmLoyqoOQYfgGFZzGqQYygWwbBxGPlLpLlgXzDdPAaSsrRVCcoOvsSrjFfJZPpiIGgzRmZeEGgzNndDdiIVvYXxyJjaADMRNXxmWwMmMoOnoOuUyAaVOovcCQqYaAaAwWnNxXRrGgpIiPzlhHCcPNneEplLfFvVFfLOiIonwWNOoPSoOsFtdDaAIiFAaYLlWwyLtTfCcFlPyYyYpTtfaAmMiImMUubRrnNfFAXxTCcfFYwqiIuUrRzZQyYWIijJTAavVUutNnxeEDdXiIOowTIitMmPpfLlZzFuUJjKLAaPlLplkWoOZMKpPkUuHnNeycSeEsCXxYqfFRibBIiUuIiItToZGDdgBbZzAhHGgPbqQtTeExXmlLcxKkXCtTjEbUuBqQVoQqOrRSsoOyYaAdDwiIiIdDWUlSsNnLMmufFxtTwWoOXUFftSsTHhcCGqQgxJjmMZzGSJjsYFHRNnPzZVBuqQwWUbyYuUvpyYUurDiIOADOIiNeKklHtnNKuUjiIuUJkgixMmVvcKkCzZXeDddXxMmrRZZzKFjBXHhzZxYLlzaAZrjJHhOIzZiomMwWwpPeEeEWnNRyTOotbwuUvVWhHkcCdDKAaxXeiIEbBzZUuUugpPtQqPHSKkgGscCfFdDRwWEnNdDBUWyAZzeEoOLsSpLVvlPlQSNnsBbqRrldDAaLYcCySdRrAaQqmMttNJjJjVvnFMmfhHDbBdhfpcCIiEePnNrRqFDMmgyYKkGmMJaAbLQlLQpLlPqrRxXbBYZltTkOooOMmnNJjSsNnNnNnkKGYyglLGHjJhYygZzgGxCcXxeEwLlWYEeyfuUdDakKyYFfpPBbAlLUuQqGAakcCsQCcjJXxmgGMpPpQhHmMeqLSsxXbbxVvbBXuUBkKhHXqnNRrbGgBzsSZWjJoOeEwQyWwlHhLmMGgYDdsSMmmWwqQMxViIZzhjkmMKXxJjJvVAaUuvpPqjJQVwWjZriIREOQJjMmqoeLqQpPlcCCWIiUuCfbeEBsnNSpPFUuSPpgEiIfFzZeGsfmFBbfMfFFuUfFMnNwOoWmPpDmMNnayYAZzdrSNkKnaAhHsRqnNtkKrKiQnNqghHGfFIZztTQKkzGMmgEphHFfPEeeOdAaDvtbBTVvVMmPpgZzfwWWwoOEeFfFYgGkejJinNIEvgGVVvLlKVvrCTwWtYyoJjOcvVMnNmaATwWtrqtYyTrRIiAaQHhsSRkKbBIZziTeEtNSseNnvVVmMYywWvvVMNWOoMmzZxfFLRpPTtWjnNJbBuUZzwykPuUJjpFmjJMfoLLllOWwqiIdDQJjbBBIPXxRLdkKMmDhDdnNvVHlZWwJjOoPpXxgGzaeEcAgGaCDdGEehHYUuiIolLOPuxXKliWwILEexoOXCZuUaAJjuUPHhpzCYVvxwWXyKSsMzzQsSqmMIizZiIcMmFfFfwWCZbBYycBaAbCXhxoOGgXHcHIzZbWUcCNwlLGgzZOeEwZdDzWiVvwWXEexkKDdrRepYyVXVQkKqTtLlxXzQqZxHhhHaIifFOoaOXxosuzZUuuxYynNXDdmMOKkKkGXyYjJUHhCcLnpPgCtpPTcPpPpEHhYyedDdfFaADbBSsmMaAlQjJjYySYysPCcGgSCxlSsfZGVAaFEefqQuUIiDdRrOrRoEecpYyBlgGLDhHPIicCxmAaMXUuaAuPeECcvVpUgGRmMrLOBbmDsSYyyyzaAPpUTtTtirRkRrryYpPRDEScCnNsebBdDKFfkdKpPOogGivVIIdDuWkKwbBZizzQQqEeqoOLlPYOoaIiiGbBgAahvVpDgGiIcCMmoOmMLliIYqQEeykWwKHjJhytTbBYBqQwSpXiImgGPHhIYZBCcwWtzZLdpPCcRiIACcaRrQucLlCioOIUXBbViIvnpQQydDYhHhHqbBEeqPNKQqKkYykmMtTsmGgMrRkKTaARrcpPbaAjJZCczBkfFKXsSxIidarRAtkzZKTDJNncCjJjCuHjJzZhVcCvjGgsEeSHZmMZeEzzSYdDGgrRORrovVbSGgTtcChQCcMmvVIKkiiIALlrRVvtTasSBfFbEwWeylLlLxXKkpSAwWIiVvaeaxWwXAEYyuUsSPpnNoOsRYyrMmBbhHhHhrHhOoRrRHwiIWHoqQOXlLqQIoOiyYxZqVvhykVvKEeuUhfFHTWxXvVAavmMVSjJqQspPwdUuDhSsqRrFfLldqQDFMmwWqDeEeEVvdSIibBWwsjJQEeqcCQwWpRvCcVrHhNuUkvFqQJjurRUAaaAihHwLEelcLSsPplChcCXxVvTtHjJWIyYfKuFfHLlhGgFfUeEkHhBbKFfktrRWTtwZzgGTXxwWlNnLUuArRamMFftlLTqfFQKzMjJOoaAmZzwWVvaAjbfBRrbfFcYyCsSWwKkKUukoIiOgGOKkRryvWwhHKkVYSsEeouUSmWwYfFgDdGhhHHoCdDNKkOpPoMmCcMIiZzMPpUummTtyYclhHlYyAahFfLKklbBcClzZLHiOQqozZklLyQzZqYaRvgGlLVZsSRNweEeEqTtQrRWrbEeBtkneENJxxXXjdEwWaAfLlEeFLQTtkKhJjyHhYHqSsSxXslqsDdQqSQTtuISRoYIibGgdDnKkxKkmMXfFaKeEkyCWwcYcsjcjJQfFSsKkSYyHHhHGghvTtVhgGXxyYZztOAaoCcHYaAILtTlglLGLmMcCBXxUubYybygGgaAGPEewlLWdzZhHYZzwIiaAUuDJjiRrzZZdAoAaTtUvYnNMaAvVmyTylLYMJjgnNKkiIMNnmKgGkaKSvVssSeEAamMLljJRrpPuVvgGUkMeEnngvVWwGBHWwPNnAaOlLouUhdDcCZPJjpzHvLlVwCcWpHhPpXfFdGgDVvWAOovVLpcCgGAkKtTabBZbBzfFQLPpPNnqQpTtlKkJjquUEeoQqOuUfYyRGgrFAaVqBbzZfHrRtQMRCcrJjxHtdwWkxXPpKDSsRrSsYyTVvJjtTYXxyItQiJMmjAOoJQqKkjzlTZuUztLdEKkeoOREZzerDrRRrZbBROnmMbvVkKMMmmwWQVsSBbKoOJnNyKkaATtFXxfEeRrhHoOFfBbrIoOXLltVvnCcnNNTOobLlQtTOAlLFmTJjkKJaAjVvaACkKmMeEkKnUAUDduXxbBdVZfdDFgGDmMCJCcjmMpPjJYyccCdbBwPppgqGgQYyOjwWaSiIsuUuUMwWcCiLlWwDnjJaAAaXxNHmMFfhcCZztcbbxXjmMAalfFIizGeEViOCcoITtzwWZveEkAavVGHhgRrUEedDUuuIcCFfrRJjimWwMfFJjuUDJjdRrmUUrBbHhHjJhbfMmOomMFBbSsBYhihHIHysShHSsHhbucCgGvcJjBbCcCVanNAbBcRrCMmpPsMLOiIoKuUTtkLllSskKHhmSKksjIiHNnHhhmMeEoOJRcCrhAaKkHfDPpdxDdXzjYymMJZzZFdyYyYoAtTxXXxaOWwOmKkMxahHAKVvksSgeXIRrxxXpPDVSsvyYAbBGIXxomjPPqgGMmLCcISsqQYyfFJYyjLvVvNnADPpFfSsFvDdDdVzYiIJjVvpCcPyYyYsSTpzpdDPZFqQfkTcCiIEJjetTtYvdDXxVKkwUuWXxMmyyYBbDdysSYOoDZnNzDddhwWYyVverRxXnICDdclrOoYxXHOzZoSAGgaycFfCUUuGpslLgtTDdGtTtmMTSHbBlkaTtwWNnCcvVAmFzMQnNrgGRmMqDdWUuwmzGgQjJDdLlqZFfCyYuUqOooOYycCuEeUtfYfFWxXKSsvBbVzjOkKbjfFJThHtkmvVMEaAeeURxXMVDdvmFGsSgfBRrbaSslLPUupXxfFAueEiIGgYFOoDSTFUufQLhzTtLnNnNEebBBblyUuYSzVvWwFfZRdDrMmCRreEcsbeEMmmMmfFoOtLbBLlpLlPIBboeEIidDYyjgCtUuSsTLGgkNnKFMmfwIAaUuTbBtgGiWDqdDrRNrMmRYpdDPrzZtTMNnCrrhcdtTDYyCXxTRCrUuOIXjCcJxiwWgGorRdDrTGgFfKkhHmMPpMesSEKkNnmnNHhtcChHzLlOowWUBwDdWlLJwWgGjoOtTCmHhFrRTtvYyfFAaPpVfOoWwsYySGgLKVvgGbBzZuEHhGgWweSTSoGjJDUvVWwQqwYFaAQHhkxXWUuFfcCeEZcPptlIicoOCGtEeoOuUChHcTgGgzaAZmsMZzmSMUueEiLlVFdDwMmWbJOojrRUAXmMIuUixauOoZzDIOoYfvrRCcEesSbBrovVeDFfbXsSUuKkJcCjxjfastiIwbgGBvVWnDdwHvmMuUaEeAfFVhmMqiImXxMMwdedDEScsSlLKkyBbYCsDQqDvVdmMDdhHJpPfJjrvVKkWwPpRqQdEeDOoqQWwqXxKpPkCcqXxVvQoOtThZwfoJsSnzZlLNjDdqQKkhIxXmMNnlvVwRrWGgLUuWwmMntTYGnNyYgDdyyALlKEeyOoSsgGYSQqskUuFfaAIaOoAQypPYjJCcqpmuUMvPpBoObSPjJjJpNnzZsQwWmMgGMmqNNVviIUudfFCcDOBbETtbzjJlLlQqLTmmMuUMWwtFoOfWuUwzVvZxXkKhyYHYHhchHsSFfRCcrzZZlLmMkgcCGqQKNGdDZAmMaUXxpWwoOPWzZAawusSTgnpPtGgKkjVIivGRlLYrRxCccqQZzqTtQCXgAWPbUuBFsSTrRtKNnkfNHfFHhhsrWweNnyalLAbBmwCqQrRcvOoVWFfPwCFfcWsSYypZZzziIrRczZCioOYYRTFZzCeEcHOohfkmMKDdvVuUEeXgGxEoWtiITbGEaAeEezjUsSNnGDPpddDiIQqpjJzZRrTtTxdDxXsQqSGgGglMmLRrJjLltmMTEevmVUHwWpORcCGvVPFHhfpgrzuUZEeOooPRdcCDoEecKkJXMeEbFJtCPpkKgoMOomUuOSsOoDZzdHyIDdjvVeEpPJRrKGgkpPXnWnNwjJgPRrcPpCcCLhLSslsIiGxZzXgSEdDyYeySTtJHpGgSfDdpJjTHiIhdDJHhHhJjZCcwWTLAavVfFQpbIiwDBDbBdzZbyGgCUTwjUubuUBJUubiIBdCrRBbBxXuUrSsFCyYlVvigGgGuUgXxtBXxNndwWgGfncCyNnUoOCsSMBcZzCsSbPpmBMvJjVmtUmMuvJjVaApPLlyaAWwYSvVsyOophcCimsSrIiRVvwWDdMlrRCqOAaFUYvqQFjJGgdLxXXmMJjtTxKklKkNnhHkBOGzpmCcxGgyUuYzPQqRWwaDwWCzZcbwjJIxnNXiWBnNnNadYyDAFfdYyKqiIQZXjJUQqjwWpQpvDaAeVFfvEdtOoRrFfdDfFenNEPAampfFPmODpqQPdoEebBbBmUuMaAIiTeuKTJjSsEoOeykKlLpPpPDdDdYdUYMmzZhHyyYukrumoOMxXycCYKYyCHhPpcerjJRaAEiIaEeaARaAOSspPokKebKkCiHJwCcWWySSwWpPPpgcCVWwPppPOfaAVvGgFjtTJovNnEbBpPtZzPpQwXxmMrRdDrLVoOzwsSLPpDdlXUvJecCTtxXsScCsIiBbSxXdDEgRAHuUhejJEarVgGvHhWtTzZnNeAadDKkdDEwHaAJjnlLNGgVYFXTPqQtJjTpzqQLlZAaeEtiIGgqLlQaAWKkwABbnNaFfdlKkHhzZLDdMmIiwWVvDHtBbiIoOWweEgGfFkjJKTMmxXGgtTMmaAvTtVpPhrWmMQqJIcLlCOoivUDdMmuSEezqJjQtpPCcpCOoSOMmbBosqNGgJpPjnchcOoeAaZmMpPzpPFfQrvVRqKkWUucfdfFGoUuYCeKXxksSUuKkzZNuUqQTtnEVveEYfLlGmAxdDXpUcCUoPcDdfzZhHFCQgGqjJQqkKpoLZzlOsrRsSOkKYEeDdxXMyYwfFHrRoeQqEHhkhpFlLtTfPHlrRSspPQqrCzqQZwWcCnNfGgcWwxXGlrqQRjJhRJUuYNnyuUixXjxUuXJmpMeEWXEesSXxaEOoVOiIomrVvAaRMUuDVnGiSsUusJjOoEZzeqQSVmMtmWEeZsSzwaAMHdDwWaDWwfVfFpPvfFliILNAeEeEJjYYhHyKkanNAGKxXLlhiyYixAapqQPXCmAalbBLLHhlCSqQqQzZscNnYHhSamjTtbBZzsIkwWKiSdDgFfRrciOxeMmOoFfEQqdVvbdDcCTqQtpPoklLfUusXxPpNaeqQyYAzuLQqtTqWwiCcIxXiwWzUuzqSsDFLjJTtrRzfWwzZFZlJuUYytTjJjpPRrSsrRNoUuGgqQWwuUlLxnNXPprJjybBmRrMYGgqQPOlXxDdmMDAaSaAYeFfphHPYluHhULlLjJMmXvCcmMlzZLhHuUBbfFjJCrRkKcYyxXLlUNnBEefFbDdhHumOoMlpPtjmnNNhHnPkLeEdDlfrRdPqQYyvVRbiBbVvdSOoYsSbBxXxkcCGMmmPtTpNnZwWyYaDdAhTtlHhAaODdoiILHMmzSGCKuUkPXxtDgGoLpcUuvPiRfPpcCFXdFfpkcCcCjJKLvVlrzZkKtdDHhcCKZJjzkkXQqxgGGglLLUGguWwALIihHKkKJuGkeErDuUdPpatTpPAATvVnNvVtaZhHzVGMmKKkeuTOotQqtHhbBgGKXxkTmaKQkWWwwGgHEeIiIkKiBAaYybBAkMmCdDTYyTtLlLlqQMIBUWXxgQRrqPpnAcCmxefFyeLlEuUAakwEebBVvOoWYyrgODnzmLJjEKNdEeDnNnbmZzMBbZzkyYKRrZknLkKXjTtqYgkmMKGtIcCifFTtBGgsSTtwHEekKiSFfagBHhLlbNWyYDwfFWYwWcCccKoOPvVrRHhkfuoOUbUNPpPpQqeEiILlnusfFSGgeEzZBPpFKpmsOoSuULlMKiIkgPkgRuCnOfFoGePpERrervxXVRJjsSTtCchTtHNlLnvkPpKVanSsXVlsSLvARrRrgGVvZUuztlKHhiIOokNnnNLLwaoJjOATtNOoPpTtbBXVvuUSsBwWYyrSSsxEYRIiIiSsrRslLxXVvoOSYsMlLmSbBCckgGpPEezmaaIilLAYyjJYCoOOLlnlLliqQJeEqQQqEeUvVuIvVdiIXOLrQqkKFwYySrTtRsbOaABfFboBRuUQfFhHWOKoOrRoyLldvSsVyCDvVdrRVvjGgGgJcNbBSsXnNhHczZCYPprXVKLlOohhbetTvVEqrRtTQSUuxXsJjSdDsLxXBbaoOmkKigJjGgbpPIKoOwQqWHhnNkaldDIBbhLCclHiXPHLlhRFUWxXZzteNnEtTpeAaTMmWSsSsgmMEmMGgZcXIjJBDBbkKjzZKIilLkJUuGWrRJqQKqCDSsdrXxRYyTdDmrnNRMgaAnNrjJRqeXyYSKQqkHhoOFfVvFxXftKZziYbByzwWSsZhCCIiPwxZzdsRhlrRmMLpIibFTtfegoOGEZorMmRFfMjJuUXxvRYyrVzZGgKkjDnbvVPpzZtTdDBbBxXixXRrkLCyYMREEegnSsPXxPpQqpWqEegGQUmMEdpRrNnsSPCcmMMmYyWUOojJjJujJIikKoCcgGOYorROxXboBpPbOFfeEcDeSqQpPLljJshHyzZGiTTtLAItJVvDVvtTtNnTZYWwCcyzlLdvXIibjJHhBtsSmMTUHaAhuCnNqsPZdDmMbQZzIiIRryivaAHxkvVIeqQYpPmyiILlKEekseESXxYZzMfQYyuWwFqQTypDdwWPMmsShHYtQSsqlLvVSsXAaxXYyOovVnUuNnnNNHULkvQqkmMXeEZgGrREnNeXxMmenNiIluwpWweExXIiPAaxXRrQqmMWwTpPleCcnNEefkejJctTQRbJsXKkFYyfBFfGVvWCUZbvVnNBFaqDmiIMnrRNQBbqgJLKLWWvVlxnNYlhHLfFpJjxeMmePpghHKkqQEeGFfEEXdDPJjCMmcKkuUjJNdrRfdDSsnNFHhutIyJmMEeBbLIilfKOlpPLlfKJjmMSspPjCcJHmoPpDdmwISOEGuUuvVYIiBSWwsRxXrbBbQeLcCCclSARMmrZUSsDvVEuUANLlntTaeRNnyyYMKcCoWwxXKMCGgKrCOoYyHtYyfFxRrXNnrRTRNnocCOLlbqWwZzVvJlufFRrAaaAIFseeEvVTjJTbAaBZWwLzZlzYAXxTqQtbBamgtTMmhHcCUTtqGgtCetXlwWDNkZznNSsoOKkbMHhAbzZxQqrqXYbBeEyxxzZXscXMhHksLlMmSKmKBbkdDxtTviIxXYazPpZASzZbIDPpdgqlLTKkteExXQIVvcCySudqQWTpeeKyzZTtiTtBbCciIAaDdxXJIiExXejNXxCZzkKqQEeddDDEetbBrRdiopPIGcbAjJaaABsnNKkfhGgATvOzKLlkgGkYEeGtTRrwWgQqEXuwKJWAawgmMceEwWqFftTmMfQqqQoOmMIiZzczArRtHhQjJgGqTmOoMnNPWQqhHdDwdDpYyYLlvVRCoOtTonNhEeHxqQgAaGXOZhHzZzJVvjUQquQPKkNDfFdRreaAtdzZaAQWXiPpIxwzPzZjJIKkXxVcmMHsSNnleELYyjCcCpPchNBOeCcEmBLlNHhnXfUmMkKCuUcIWZzwhHlQqjQTtTIdlLWujJbByacCAUurRrRtUykKeHhHhEYtaWwWZIiBDdzlLGgTuUGraAXxKgUuGiIxSmTtaWwPvVjJpwvkKZSjfFWTbBtUFbBfyEsMkIioODpajhOoHraAfLIluMmlWpfFPQqwWDdsxXmMtTSwLHyuUYPnNRrphUrfnkUeEGvUYXNWfFwvVMiImnnIidDfEJUujECQqYyLlQqxzldoOpPMmmnNPMmmMqQMtjVvJnNYUuyJCDdKkDBZzbuUdcLlzZtTTawQqjuHRrfBZDdFSMmORfFBbAalrRsnyYNwxwVUuZhwmMtcCUpuUPuQqTRGgnbWUuwBDdGgHPpjeTgGcCfwjWwTtcFfqQTsStMmUuZtTzuUMouUokKOssSSvSfdbrKsSnNhYXVvYywWeExyvVBZtYyUuTcCFfGgLlPbBYKqFfRxXOMmHhooOEIYxXyiMeWwCWwnZePjJpUuNnPXxsSKkprRRMmdpPcvjJrRPpKOoTtBHlLzZhUvVuFfvVpqVadVvCcPpdjJXxQqNntIiTDWHhtTlNnLljIAaRofFIPNKknvHhVMmxXpipyYsxxXXSXxFWwfPhHpwWfFPgfKkFrbBRXxGqQaAOkSWTlogGVQtTRHUoONnuALKkNEZAByYlLbzAaJnWwYyaEXxfFjJVTtFfbBGgtBknMmFfNKbBDdKJjxTdnPLBxXVOPJlUuLZPSiIspQNxRsiISfFxRrnkyYVYynvVDKkztkbUKZzoORwElLeqEeBbcCiIQWrAmEeBbtsFaACcVvQqrOoRrSgGsHhPJtTIijbYNnyYkvoOQqmOMmJLeEKBbcCSsUcCqTGEnGXfmxXIbYzZEeyBRIubHhqdnKNsSuSsFfaAtTgGypEetThHvgYVvyvVwGgWGRrvVpPOWoOwOoWHlQRxXVvBeFftTKkEeEYmMTtZzYyWdDrYyRjJwvQmGswWDrbHhptgGbBpQDOBJMmoyOqyYWwauYyjJhHdfdtFfMmLOtTgGXqQxdDzZOoxiIFVavVBboOdYyDCAacCnNqQTBaIiKkAbrLlZkKOoAUqQNCBxGyivVDTtNnmMRiIHvVhaAexZzXEiGgDCtqbByWfrdYvblCcxfEeFXTJggGTVvkuUIiMkSLppPMmoDdOMswldDSoaIBbpPraAdKhHRaAAaxXlLghHfFLCWwgGVRrlqhQqWLIibBbBlUupPHPpTMmthwHVjJctYaAoOiAaAmpDKFfUVhjFRrtTjJzZayYAfEerRpPFphHtrXkKGcOoBbEpPeVvCgxMzCQqcjrRCvoUEiIYyASAaZjJzevVEAHhOosSGsSBDNnqQnAUuUgxKoOQZzBlLbqiIbBkzZnNnNHZzQlLlpPkEDnNgmukKKActfnwWQqeSGgsbfoOgGyoEemqhEeALlAaDnDkqQqQxAapQqsSRrFKkfPfOgGpUuPDhyYuUHdAjPpJtTkKKqQkAwWMoOQYymKkQqvwYWwaAqeEqHhHYCcCOocCKkbsPoeDKkjRbFZjJzfjFfLlcgOoJjYiPWwJKtiITVeuUEvrzESEesOooKXSsxBbkKCcBDdvVxOomoOMXVvmMHhtTPktVfAaFQqCJjHhHImYyTtEeMJjfpPVvdWXBbxwDiIHNrLClLqXxmMmMMmjJQclnqQNbBmqBbyYpwWRdZUuhaAmMoOHzmPSzqruUaMvsSWwVZzuUWUuwvqBPpvrlLRVwjJNOSsZzUuonZxeAabBGXxbBgbBBbbBxXbkKBmMwvVsStTtLlTcCooOOaAgGXQXhHtrnawHfrXHXNamoOmqmLZCRWzZwTTBaAjJARpSsPrExXPTtvVzWwifPhoIoOicpPxLlXCZzyYwWhHfFOSaxVvlKAaZclLNnrRDuUddDqsjPwhHxXOrRodDGavVLCNnwWXxZzjMZzPpTyYRrzbWwHhWwGxakKAhhAXxVQovVPpcCOJPyYpvFVvfVcsHMPabBmOWxXxrAavVIIjJbUnNuIiBixXLmMHmMhHSEMKsAzZadDAadDXQnNSsnNeiMmjJIcHnldiCpPPpMVBASsDGgVvTPETJAamMkEkszNNnDvVrsmMSRdEKkeNfFxtgYYGRrxDgKHWwsKTXtmMTOPpvVRyKkMmboOodDORtJjTrAaqQQmYxlLRurRPBCcPpUJjuEjJKkWwCuXxlotNHeCcCcpiIPpfPHhpcRgEiIQtKkoOEeOojJbBedIfFvVEkiISxXmgGEeoOMDeEiIyYEeBeZzEMfKktAlCjDOHhrJcdbwSsZTebBEtAgmMdDvVgGdDGSsYyaLlIXQqZftTFzFfzCaATUuqiIAJrRjaQtmkiyNnPUupwiIWeEzXsSJhWwRRyxXMmYPpngGjsVKjUEeAajJXOoQqhorROEaCcAeyDpSXIitTfFeUuoJXjJwFAanNQqfGgFGcCiIpTtqKkDdVvFzZeZAazcCqQakKAQNeEAXzPpAYsSRDtFfTVvXjxSsIiEQqeETbBshHJjGgdDJxKYSswjJdpvVVvkKCZNMLrRjYJRdMmJrRjHhMFfPgZEZOoyfxzZXFUusSyYOrUnNuSbBnRrUullLLSfzYJIAaiCCciLloTNntdzSdHhOoCFBgGSPHRwWZzeErqQayzZYAyYWwzuoOUDSjUuOomfFfMmZWpPrItTVviqsDdQxXewsdDSRrxBmMbwWWXxnNoPIVzZRrJkPpKFfHhpAmOyYkKxXBCcbIvVioMxXPpeYMshHzZJjjJeDdIiuUtvtFnRnNCcrdCWGuuUwnNDuuCcUeanNhHuIUuIVvjJCcnzZNCZKoOnrFfcqBFfbBXxRUiIcCuhwhVjJvBetTEbeuUuRdDrUaqQAOehHccmCaAYhHyspPSYJjRLEeSsNnOsSOxQjJnUudPpTzZmMTtpbMmWwBMeDdCcKavBbBNVxXFfBfFbvUunbfsiehHbhHpPhMdDnzXoOgGCcwWPphHOpgvVHhvVHCJWDLlrRyEeUuEcfwtwWFkKxVveEDdAzZagGXWwqQFnTPptAawWrpUuBbUmsSeEookKQDdqwWOOVdXXxxDtzGgkCckKoUDrRdMmiMmfFmMgzZGoOPNnzMnNmZpgGIfOoeDRxXrKkDeEdNnNqQzOIFffXyVWKkJULqQrRKcCwWBbkNqnjkqMtohhHmMzZDdHwzCcavVUpuiIHkRzpPPqQpJjJmuUnPyYmMJQqjDCLxoMmOURqyYSQqUgUnRJBBqSsKkFxXoOvpPmMFCcSdDIisJWeaApKRcHhFFfphHPFKkfZfFKCSsJrDdEXkyEejeEJrRGmFjYyjJzZgGNnUuRrMUumzOoZBbWwqQVRrvEAQqDmbBEQqCdDbRaPpAPpUbqfFQqrDdDDdTDdwKQwPxXsZercCwSqQVyWwHxXhzpPZEeHNnCcHhLlHgGhzZbLlFhHpPurRGVcXxKkCqQvBlnNLPFfYyGgLlEPpaAaAJQoRrOqxXAajeXVRrvDwRrKQUuqWwkgHsjVvfMWxeVMUSsNnqQFfiIrRMYyXxxvVZuttTyYvdhHuWEepBAabyqjQNXhZzHODdoqaAKihHAaXJBWJJjjOoeKCxTiIrJSYTtgGpSrRIEwWyYeZlLzdDyUsSudHdDhNnOjpJjPqXaANXxngNnSsGJjAmuUMIUewiJaCcBFfZaTtAQRrqnNAmjJPpPJcCWwBEKNRAazZiYNnyJJqSCuRdbBWwsSwWZzNnFfwadGCcihPpuTNBbRrnbBORrTtLYJjDRhHeErRzQqZNniYyTyYtALWwlamMmMjQqJjRMFdlNDZsQKkZzAaMmsSzZCcITtTSwWtTseXlsSmVvjeyEtFRZmMVvlLesuNnFiISgGPwWpJHhvVYGgEeyOopIiHXpPxhaHhPJtrmiBbRvVrRpPwLpWnNZXzswbAaARraqUAaAqiIIqzKFzSaAsgGooLpZLlVvUqfFQsiTGVrAjIiDdJwCcnaAgGQGKkDdzcCeEZCrRhHMmcdvTtJUcNnagGdoOIpmYMmbfLLwOoevVEWOqeETdKkDtktDKeraABIirRkWwKKBXxbbBjJgGipPiIIkrzQKcQqetTmlLJjPpxXaAAbpPdWxnndAsSxGXxgfWwUfEMmePxpbPuUZjuUhnRjlcCLUKGuyPDDkkXQwwWShDkKdHslJCXxpmmXsxXMGOsvVqBsSZzjMmiIDdrRwNSCNYAEeLyYmoCyXgGJjxYeCjTPWAdXcCsjJJWwMFZzIjgWakKXxoVVvIiNDbBnFCtKkTvjRGiVkpPKocdDuQRdDqQBtxwWIivOoTARratVqCmqQmMMcyYfkZzSsdwWlnVvNKkwqLlaimFrRGgfeEcMDPXxKoWwNgGcMmAZzaaCyiOuUulDfFdCczZLrFffFhDorYyRrhPUeNnGjJJvikRJLnNnNPnXxXAnjwotzsHhrRJhNGgjrRMmJzBbsSoPOpPatdXxUmxvVXLmMlxXxaeEILZYxEJgBRrqaAStnHLohHYPpxAaRrVyEPpetijJyByYNOotToAanNMdDKgaATbBEoDEuUszZJjSzwgGBQWwyYZZcxbemMiIYyLHhIsSSaJYyjUuWXZzOoxaASsBjsScCyhHRFNFfnJKgOhHNvCcgSteebwonyPSGidDYTAalLPAaBiIiqwwWuUWwDCkKFDmMDdXZQqXlLXLlxMFwQqVlLEedDdMhjMtKvVqQXXxNnWWnjJsSSyYUZZaNTIbFCzptyZzVvyYcPpYdUeUuEuFfDnLwiInNWuxXYFfyOxXocClLkNnTODRCHQqprRPhcUfFHUuUQgGCoDdutGfFgnnUuhRIGwWpPgqvNnvToOQlExXeTIgGRrtiuGjcfYgVsjiInNykVvgLUUYbSsBsbHtTccXxZlcgbEemGgQqzDdPpyVxTtggjJWXxzZlVzPOcCoaEvVSsCGNRrZzPYqQWHeEhRrwpncUHbIitDdFfHhqQTdFfwTtsUvhHbPpcaAueLUJUbSNnIJZWwCcXeOoEkkKULPplXUDSsFMQLtPCLlgRrkKfAaXxtTFXxgmMgGgxXqcCuXxkNZTOwWolQqtTBbBJayXtJOOowWqQyhtTWOoOofFLcCzHhpBbvWwHhlhShHeORVerywWYVpYIBNnQSsdDYXEmMJtNnTJAcZnDbBisSPHMmhvWEtTePpcCoOKkuUKkuUslLNXLlpIEeiFgvqvVYyhuRrYyOtTgGQqIJlUpfdQlnNaKuoOaAEKkRZgoVpPOoeBboOAazDdZwJCgPWwvFfFciInUAaCcQqQqjXxXTWpGwWgPwtiJyzgGlLZEMmaAevhWQskKaySlWQqDObPZzpYUuyHnNOCcohDwWdYNomzjzZZjOWwwVWwxojJOXunNUvrUVvumMBbGRrnjHhJNwWIicUjmMKUuQIjJBnNhAaEVYbbXxpPBBLlQtTeKkESyxXoOFyWlcCZzkgSsNmzZMntAaKxSsPbBpeEXrRRWwrrzUuZlkKxXvVLcDYLlPIihHpYyyYAWTtDRrdDxlZVvZzTUIGHMFfBbmdDbBeEsrrpFfAaGunsIxdDJgLlPmBNnYyHLTwZPpuUigiMqQTttTmAahHJlLvVSZeGgvhAUwgGBDdNCfmMcCOoXDEePpIARraFkCxXcgGtTApuWwSBbosaAeEOojZzJFfmRbBZDDzgCcTCwEJomZzMONWLvkxeYmUHhGGghPwbFOohLzPpZeErLXqQxmSsTROzYpxiIXwrRpUewlBbLyfUuFBbjNYnNkPhmMfFZMmzYyvyLUtPuBYcbBCYmkKwOmMyYtToIHpPaAhiEebBOoIAmNpHsiYgRrkivxiNnRKfFPrvVFFjJjJffbrQqgGcLlYFaNDWwdOojJywWwjJxXvcCdDwHhbxODvAyYnqHYOowefFNLlnUUZuYaomMxxHGumMbuUoUuBkpPvuHCXxCcwWcjJhBvICaexjqQJiIlLMdDDnNdsSuUgGJkTKNlndDNeEZnRePoOpGLaAVJHvRjcCCGVvUNUOGKTlLsCytTYcLzZExFhHWesjJSshHvdyicCsVElTEYNzVEeytPpPpGrjWjKpPbBCGgGuEerzZzZRUfdDrRuoavztPJjNcCnsZiKDHhsLlKjJkjhLamrTtSLzwxqQRrXnpnNJgGjSXsSDdsSuULlxHhfFiMmqQqirabnnPFmMaAmMzZOonNdVqEFuUCAaAobBhdxXDaAtaARnNrXxTzbBZnnRKHgKktTGhcEeWshWpMmAaXEjCcJRriCuFIHhaDdjJeApPCdTwLybMmWYrRwpPWQIkXxOodZzDKcNnJXxjGgrXoOtyWwYftfTrRaVFNnZxXzaAcnjcCJWTtWoOwwmZGYyggRszZzmHUfsWIiSeERxTtSeqUuhXxMinjbONnSuLaAlQqkBRpBaOgnQprRPTtIeEtTbzaAnAafFJfFUcCuRlLueGgljQBBbByCaAcYLloOCdUAMmKsNCpPQXiIsiWwIHloOLRMmVtjJGiIgazaAZMLOowcELimMIhbBolFLXxliIHrAaRjcIHeQqUuMFfiIiLyZlXaAzZTkPpKTtyHHOOwbBNgBmMbGbKAoUOZzoxNOnvVPqQoOoOJntTZLYNSsnyjjiISdVSsvvVVVTgROorGuVvUHlKcSvGgxvkKVQgKkGEZFfcCGWTgGEmtTxXaxmMXtlLYyXxIcUAGgQVOobmeDSvDXxdXeQAPUuKkIvYwWIbPrRKkDdZTZztUupEegoVtKkASsoFQqFeQlXguUKjrmKoOkIaAiMmeLTtlUuVvWsSmJoOjXYJVVvLHhEYfXMgiDnONGLsSYCUucEsCrrzkuUAkxXRuUwtaVvmMAcCCVnzZKkKROKkoysxghHJBbuQqqQtDWOIiqFfviAPzZLfmKkMJjotPdDRrMuUmCMFGDdvfAKkPpqZjJzQIZiPpqqhHCiJvVWnNTgNnJjDdHvlLVbQveRrCcGMOoHZzBboxXBbBbOxquUQMVgdcvZFrRfYsyOopPBbpPYOCYNtAycmMoRrOSyYdYZxqtAeZBnIiHXxStaAgGpoOFvNlHSgznNKSsFfwedDRNnqcCZzZzEnNxXPpOPUTJiJcCoEeJkAaoOKjCYykKVNuAaWwuUweZUNTUiFfzZXxhHsSSZzNnbIiTEsSePplKzZkqQWwfqPpTuUtRBUMwaAPpQdDjJqEnhapFfRThHkKfkNlOoKksulHhOEzayYjuYyGJjebxNlGtHQqGaAmaAMbOzZjZzVvsSyYIcCigFtAoONkKHhXKkoOUFXjmvVcCydDvmMfFzFfMWffFFyYxJjEilrYyRcNnUvxzxNaAKtGggGlNnTLGgSkaAGmMdDgVrRMmcCUJjwGgovfgcoQbgeHhETCLjVvlLeGgGfFVvoHhNnKHktcCTKhAaYyDdGlJOVUuoOeEvZzoturRUnNjesSErRJXkyoLIizbBZYyHSmMaGaQmMiNlLlyJhhhHCcMlLDoOdejJCcRrNXxRmMBbnuWwmMUUufMveEDwWqwuMuUnNmUrRrWHhHhGZVjgSgKwneENWgGMePOWnzWjEGbBFALuUOpvVvGgKkQqgSQqsYHhuqfAzndHzZizfoTeBbWwyYEAjCJjjJcJZzCcTtOmRtgiFHyYlLcyMUyYuoIUKqwcuzZxsAQqiPdBwWoLkKZcCgvItTinqQSErmITafahHfoOFhIMdOnfFNQXxHEehqAuUKeVkKXxCDwsSorMqnNQcsSCHhrtToUuORuTdDeWraxZzXjqQTtXEexsSEeaAHBdBEebafryYOeEoEECceJrFmMLIillISeNNntWKQARohHfJFLlHhfjJjTwWLlLldLBVvllzZdDifQCLliKycCTtYknXBbGhHlnNLBbjKkIiFBbfRraAMrzqcLVEOPaCTgGqQDTvVLltcApMdLbBltTrDnFfUuNtfFSnPpjXxZzXrCexXdQLlMXxTPaAleiOoIKkMmkSsDcsaAHhhHxZvaAbGgsvQqQqtDdcCXHCVvrPpHYyuzZbBUhmMbuwNnzfFRPSsuFWwhogGOwAbmlSGgsiIOqfFQqpPQFGrRWdBxNJELuULlQnrtHPpdDhTRvNYqQqQzTfPZzYQqynNuUvJirbmaACcdhquzooIiREeyYqDvVsDdicCcCGgISdQrcCvMCchbBFfTDVJJXyYxRrUuxxttTVPpIintaVvaQqAZzZUuwWwVBQqyfRvcvVuXoKAMGsbQBQqNEQcFsMQRgoLLwOoQqIiIixXQXqmmMMyvRnbYifeKuURbBDEOdHEeWsTQSsVtTdyRIiBvdyYFkKXTQBbdZLlzaQqTtmMAqqWYyQvSwsuYQqSFLuiqzsnNSAavVtnkKHbBTtcCgGvVjgezZErRlLeqwbBcyYTxIhHijTtTtwWAhHFftUxgCHBDsSOseEYyTtSlXdVkqxBCcUgGdDKkPpNyYNuYhUeEhHfLdoODNnKqwWQSskVvZVvxgTkmUuMxDvYGgXxxPOPEQqiniNRrjJkKSsMaxDRKiIjJXDeESTndmgGdDCUyAaxXbBTtGnNZssSbJCGhdLlOojJYFtTaAGpCOomhpPdDXrRxHnFCpJjPZJVFfvrlLtZRrznTJZzjIxupYJjyPWtTQqwUuXxPYyshVEYcFOQDdZeEtanNGgmMEiIeAcdwJjWNShXUQqdtcpRgGOoAaTtrbKqQkCJoEeJjOwWtNMGPaATUQquwWAIiaPflGjzZJQuUPyXxYYWKHWXhmfFpPMHWmsuMmRrIadjJDGkePYExXFQqasFiIaAdiAQGCcgqaeAbTXkxxXvVJVvmqbBKdAVrZHAUuavVujXfpPFIZuWwaJpxNkKnEeXOovVPFfHZyYKazmsDbhHNAtUPuUpGhHXAatQYiIvOorijyYBbFfLtpyzyYZJebyUYUktTnQhHhHHhrhlLrRWyzVvZtTtfLVSYyVMnNDXnCMhrOoOocCRRbbBivJjVIWwoLvwaviIBZxCMPdLlNEMsgSXzOhxIHOoCRrchoDGgGTXxjJYTVOobBZsStWPqDiIWwCcKYRfRrgtJfFVviIYtQICfdaCcCFAawWIimMoGgHhuoFOnofIiSsrSdDsgzZloOsqYSRSMmXWwYQqysgGLMmfQGYyHVvhxDdzRFZzfpwXyYKBbdzJvFnXxoiZBZvVBdsSDbzRxDFMmpHlzZfFpPUudtTbrRlLWwYysOwtlRpPcJjCryGUuQeZyWDrYySXpseEnpVdbBSZzCFfCccxwQeEsYRNntTrFFNALXxAZzPyYtEyYdkKDhncCWXxwTtkwFVEiNQctWoZzvPMmfFNnFKmDMnAXxazXQqjecCwaAaIFfTWNqQmUNGfFbndgMYyeEblmFIaQqJjkKpkKobBbYRrWwnNesSpjJAYgcHrWUuwFZWwuBLEePHhHUWwGuBbDdMmUWwJMmuLRnNhxZHhxvVXFfzksKkNnwMCDDgGYyUGhHbBPpEDkptOmDHYyDdSsocCvVnNtAEEeMHtXxuUAGAdIXGgxXxnHhfWweGmMgXKjtQqLlTsSrgGKkdDXxtHhjRVooEeqLrcifzZKbiZADxgNDJWLHXMnmXxMdDyYgCsuUSJvinsSXuUSodvEiPpIebULltYyDdyYumUAaYmMnHaIBbAsSgXNJmMjnaArRHIVfFcLleECPthZDhAaGZHQtbEeHZHhMysSSaAsaAhHcKkVAaTepwWQqPhPWwuUDLbnYjIgqGgVsCvidlQpBaAepUFfbBuvihgGiiIrRQKqTpxQNnNzOaABbNJPziFdIqpgMQqyYyRrkkKtuiIoOthjJHTYBUusIiwpPKxvVzZoNZzBPpbPpCVvPdDASXDdCLVvtnNOoQqiygGYDhHKPdDpbBQqPKkbyYcjJKkAaZzAyNnymNOkKozpPaJRrAiRrBZzgEsSiCpCcWhgMzaAUSUiDGgcCgGnoaADIHhvySVbRHsAKhylLYRkeFGgVoNnPeEnNgclNnCcPXxvjuovsLjJdLKCcyYLyxXMmAasfFpPcCAgkdqKkQHhQeNFdDfyoHhOrItxhHUOoKxzBbTtbihCcBNIoJjOoOLChHEejSskQDSPqfWwGgKUaAIiDiGhGFQmMFfYyDhOTNntpPYySVLOHhsOTlESrRKksevVdIipPgtkQqgcCTUutuEeUsxtedDgFbZJwLKklrRsPRrPKTxuzluEeUHSLlPpRcmMwGxXgUlttMHCilhyCGuUtIiTGgCBbgGcbljFJriIuURjJJjtbSivVLsSrMmozyYyVvlOoGcQpeGniNNnNnOsGpPgIIVvaIAfigGIRsodDIwKkKFfpqQKkbnkKGgthcCHjJHTthxFmMnNfUtTYbkTtYXeKkyOUbxLdetTzZLtWwZzTlEecPpCiIYyivDdEeFKPpKkVXgkKmYAKCQQdgcWhAawWHYwWKkftgHqQhqslVCVrbZOBWGEoCzZvhqwBLDWwWBmzPpZJTHcCIeCPpjJcSpEAqQRFhCrnFNnOodtSsFlEeBYyUUaHhJKMmsSkbEsCcrszQqnceEknkbBNnkJdWwwPyYIiVQqwWUuBVvzalqvNgGnVMmotxytTQXOuyWLlmARJjZzkXVvPEuUesGlNVkderejHkPNDPofeEFOCcChZEQIIbGwWwegoSwFfTtFOoPTcCdDXoAUqQbTtBhWcIxXhHdyuhHOqeTtMmRrEQSsqtTMmImpmMiIZzEeIXhJjHhqQkKDFmiIMfwJjTChoEYGmJCcCXhAJCcEKvzFUAwWcWEzZzNnwpnNeEmQqUmTPCcpRLeTttlkqYlIlibFaAjJnNErzeuUBURrgSmyxbbieEHhVvYyosujKkdWBzPlIPpXinmxFfUTUtPpuUqSrRsZjUwWlGoOJjoOeoOVMEeDVjQqFIFljTJhdqkEeJdDPpKVjyoeFfgxNIiMXiixtiIGfFgPpfFfFozJjiUoOypcBXZKYIiXfFNpPnTuUtfbaHhDEoZxIICQJwXdgkqQhNceEDdWwgQTtQjngyYGSOGgTFByWUTzmmRWDIfCuUcAcFIidDhHfOoRRrSZejSIijJwIidfFDqQraAniVaLxMmalLwKujJUtVfECxjKiIPKWoFRrisXkvVPpiOAaonduQuuUFxDmMdXUDhLuFuGYNkKnAYqSCzZnkMZnSRjOibBdZoDdvVlzmxXeEytTzOGWOcwHrFfLwvZzrJeTnQGyoJnAXUqPGwEpPrRjkKJePpEfGgFeghhoUuOHUXLQmROsdHPeEpiBHWwhFfcCKkFXxifdQqiIMLlLbvntXxordOawCiqQnslkbjtTWTJiGOofOoBbiVgRKZHPphIietrZHkYuuPGgeydsqQrWlLARcONxflSGgsXuJiIjQqlaUmMdSLcSsClAaTtjbOFTBSmfgjJWhHhCcOoojGgrjJNgGUqQunDtTTvMeVTtvEmgGWXxAaryRrYQBcyfFmbBMMAamYEQjrDsDspPSkmMKdDkJjCFfAwgMPBebtMdDvKNmxlZEaZGgtEaZzAVvYYmMGgNnKytiuqcTtQWFmoYVgpPSswWHpYyaOMmtZzDNbBndjJHDuUwWkmabWwBmLJGfqQFTxCoPYsSMbrRTOMZcUeETyUHRGhiItDdTKalLAGIijJLlYyDVrRqOoQvgmMEeRhHPQnDvVdNfUjmEeJjzxROoqkFthJjgFfiIuQGrzZlyYqQLqQTsCcSwoAShHVvbvVRVqvgGNKENavliDzNncOoKNnQhxsYaRQqlkJyrOFfotsqQSZDIdxrwWwOZPBfFGasxilLCeUUdDqhlEIPfxXNgQNnqOsaASoGnFIZzipiEeeLHQuuEcIXSrRsSAgxXbpkKzFfoWRXbBNnDidzZmMzTRYjKLrAySXHqkOyYMPpmotufJTHhcSsCtYyjFUkKTCZdILDdVAneknVtTQvrBsaOWjJMmtGgRgqUGHTfKQrXZMJuFtTOAaoqpxXMmrGdOoHdDheEgkDdxXHgrPpJWwjhuYPRJjrptuCzuxXUmotBmypOcXtNRrzZuUngjlMsNNnnSAMTtKuUdhToAPhIiGGgEevyOMfwqCQUITLlYkyYyyCcIikKvVgGzbBKkqQZFFfGgfeWfFRrwTzAezLXMnkVLlmfhHZzlLFRrTBQqEbpmGWkKauUcpPKFfZzdSoOdRJqeCJjbqRwVtdRJOvVeECcHhFfdDHwGFwWtTMsbuUtqQfoBJsDuALVvQsYWwySqUxLFXSsnokKCrafzZFwRSDYEpUUyKhzRTENKkncCzVvkrGvIBMmdDXxlyYLbFaAgIjtwIkKiJBKLSNIrRcTQqtWnTtNACconNDPNnpROTNyYVBlmDFIIifyYbIhDSorMqlxuHGgMmGdDWNEengpQuxaWwNjOYgqNtEDIidSsjRVWlRrRhWCowgoZUuYMZLKkHhVvPpOJjzDlLIoXxJGgrxXsNzmKNcCcsQLlZzyaBbqQygUfeEUlHdtTuwNnWfUqpPUDNIUyYuKxOoLNnlSIfOwkdDpkEeJXIiceFvTkWAxCcXIrRytTYibGbcCBiIkPpKgBXlAvINRVvWJjszZEeJfFEzsrCaFiTtdwrMMjJZtFfuwYbftAfnNFaosNJqqGqQCnHKGuSjJsUuWwUDxWjqciiXsnNyYSzOedukKuUUHhABIiFxykzyeEYxbCPmMsSYuIZHhaAObBwUuWrRyYdDTrRXIIxmnXGEHhadDANIinOYJvZzkjKQJjFeSsETtfiQqIDHjtJLfihHpPQqzGKkghHZfJvCcdmvEbBgLfFuFfJzdDQIiHeEBbhVgGvTutuFPjJpfXMNIxiLpPpZbwDJqQUSAaOMzZkKmKkYydDHhWwIznNZBBXYMrRsGubSsSsNnEZRenNVvfBILiLyQHYyiIhKQqLTjJElrtMLMmluHhMUbBQquzZPWZewCaufGgZVcCkejaHxcIijMGgTtgyeWwOHctWvRrVdHfFxiyYPMiQiIoUYDqaxXHhAuUQhSsHiCwHuaOxtpfWoOsOCcGEnJjNWgBiisSqezHcbBlLopnNNnPOpdnpKxXhJERcCEDKvniILgSpeExKIiraUuNnMZzwYUDdoxBbqyYiIzzZZYXyZzSsYTOYyQLAZbuUEeQtTqvpWDjRrKKNKCNZSyYRSMmeBjVvAjJbAaBuOoubLfTDfNRcHfraecCPstYymMTEbBicCGghtenNHhEjXxcCMCcbwdfFtTTBbtlbWQKkHmMVQqcOeKkgwMmbNOonozKkBRvDdcCcvLSQGTFyMmwZzCGDqSsqckauUyMGwWWwOoxbBvwWkKkfVkKItxXTEDlXBuUEetTuosSYExyKByuFfXfFvVTGgNBPmMkWiOSrFfFadNnDiAVviiIiSoCcnOoINKkgvVgGEPqCgLYuUsSZORXxYyxXlwWIMmsBTJjCcjfoOEeJLBjJgcYnNHcCLIchmTUuTvVLuGgWyYezZETtCmMrAasUuhLZYyUXtkpuqQNnGgUpSWjzBGgGgfaAGuUETmMXSjJRrUuGHhRERrerFIifKTmMAaRrGbBDLtoSolvZzsPpoHdRMmriIYymMEeqfgHcCgjJIdgGukGgFQpsdqKJclineEbHILCclBZLlXkOouXvVTiRxXYSNnsnEqDKGaSirREezZAaIGgoOoOcCGgYlVvYykOeEolDbBlSVOmMUJVkKSspLCGpOvDdfEKrHkaSVvhraZzABvqQsFRqQrfYVKkidONCEecoOdIusJjuZmGHxxXXOonNRrwPtUuTcIeGbIajARrdjJFfDDdBbjJZnEeIiRrMIiYYYyaPpCBprRVvkiIdInNZzTFflcaAxsGNngapVaAvclLnoXxXxOOqsSvVQvVUuXkWSbyJDdjUTtTZkKzyYxXLlKYMmmGQqiIPQiDfIZpEejnTtoOoOouUZnqXPtKqQkQwWkqImMHYyLlJjIVPEbPqLDIVcSvQGilkKLJeDdGgEyNEeBldqQpHEthYXxyHvCZzKkYmtdDTzhBTqhzgEeHdzKkHtTTpcCwWvihxMmGakKiAhnsESseSYyNtTNDdVfFvynNuMcCUTuoOswWSnNEeBkNnNnKrRjtzwWaAZTkKJVDgGOsxNIVjcGwWGWwgNmcCxhlzZwjdnGXOodazIBgGqQkFICvUurRVRlQOOvrRrJaGgAbBjJgGfFTRjJJsSkxbBECbifXmMxFIBUucFNIiFfiDeEagaSsmMThmttIivVvVOoKkeETTeQqwWaTuqQUOhHhdLlMoOjJoTPKvVdeguddcmWJUuYyUujSKXHQqrlOoWwUZzjMBbmCcVTtvguhplbUzfNnDdwWRhCGyzZaPhHpPEGgyBOPAifMoOLwWBmGDNBYygnuMnwtiABbEeWEJxZUuVvLlVvNmdkKMcCkmMKkfpVOwTCqnpPMmjJIevfjNyfFYnJWGgKQqSsNSsHedDTpalagZqQzGuqQOoLlUYyffySqWEeXCWwcsDvPNSPxsRdwYzEqgYLuoAauUOUFfTWgGsnNSRroSBDTNntLhPMmfdXmMrbzIONfVjZNnDkxWMmPqeEQrZYyXlLgqFLlOoFflEegYyPpGSxrRXoOhwWHxdDsrsaOoAyGgQSLGRBbFqQwWONowWtTfOUGgOpPYyTtfIiHhcADFfFJjcIiiqLlWwTyjTGFroOeEjUuTtFfBbUuJjJykdQZzpwgqQGTXxzZzvtybBtgFfdOiXHoZxsvVGfFSmGgvVeqaAQkKMmnDprRFfmcXzbVvHhgCcGVzVvZAWIKkiXiIKkxVSsllLObBBrHmcVvNxdmvsLlslOoLSvlFTmMYwHRqNKHhuyuvVLPphHlHhYBEVgGvDOodjYPTlJIRVyqTxgujJVJjvTanBdSMZABbkKkzhYyIXxivVjAUpPzipPxJzZUmfFsSMhVvzRvaDkQMjOoXKxJjtBaEIDfSAOaAofHheypEKyYgAPpiUSMwxwMmFfhkQgGXxqwlLyppPzZUuqgLTWPpwtFAaptpgqQGgmMmnThHwWMoOmwWjcCzZcApPAaaBRrPCyOoYTZyYSszDTtuxHsnwWDdDlLCSsTzqoUufCNnyVvevHvVSpJjUvVXiGgtZzNTcgGCRjzcfNhHMXxcPgyYfywWcCDHgvnNVcbBCcjBSVjJvsSzgHhYvaCcAiIVBbCtIiAaTgGcuHhzZclLMMmDNtzoOZvVsdxkrdXCNncAKwWkmnIiMmINQqImMepopKkXkKyVdXmMKtGrBbRcfFCjJXpcCPTtzlFuHyUnVvnubXPpxXQKvgGDxLzzZZowWSswWzZwWdbhcGDdXuJjTiIaJXAalLtCWQEhHGJiMYgGymIruURmMhuUNTZQMCcmIUlVvfsyUSOZzoWsVqGgwQQDdKkTtsSPpDSsbBhIiHqVIwWivVvgGtxfOoDVbrYSsDVvvqKktSZzwhDaKkAoemzZyYMMmDddjJrkEFIyBNrVYQxqWllOXMmxGrLlqmfFbXxBSfCqeaAnbqBSgGgmKkpPakxXOjvVJxUeECRrVrBlLjJbFlLsSmMTtGgYbvWoOzNqQnATNhHkKIivLUKkuJjlTvcCVXXjjvdtbBHmhHVOoSsOOZlLUQHTtDMBRIUujlaNnALJjVpFbHhBtZeEynVNqfFRsSPprlBZzbeLDdljnXAxXabDfFwgfbBoLMBaWQqEeTtWwVvHMmXxNnfUprrRZIiWUVvhBbHBRchxTAakKQtFfdDCcTqVSBoOSsVzXGgSCdHhxXgwWGbBKELpgGLltmqDEcRxfFJNsTGrKkRVEevgdRkKlLDBEebmPwvVWZzTtaCdOuTtUeEotpPcACdDcZzpoevlCQZRmsSCTtcJfSsFgxNsSIcqFIHhLipPILvVUuPpDdgGblDtqQFOraHhqkeAaVvnNEwTnEsikKLlEebBLfHhRjtTeREelLFAtTDbKkpPBLlbhTtJARwEtUcCCcmMmQqROWdcAavEYykaQqoDmtTuUihHHAFAtirRMResYMmyWwNNnVaAKkcTtAQqaCUuGzlOUubDpIrRaSXUhHCBbWQkkKuiSVvsOgGmxXYChfIMmGuUTrcCNSsnaAhHMBboJjaePpEtfFpPOFZIRrhuUfFDNZRbBrFfaSsFCcQHhZzUyGAOtToaGgVPoNnlafbBgeJwvVFfZHhioOWwINZzwopEwWmaqQAKkjJctzZTCkGsjJGJvzHhHhWwgwhHRsSheEHMDdmmKkMAaWQPpdfFVmFNrIinVvVvedDEgGDdEmHrRHhuUHjYLnIGgSsuUqAXxgANnSsshrRzZlOYMmKxjeEJTIijLtTTtzZgkOgHhEodDOwrRWJGglGsSgcttTAaOoGiIBqOCmMGFVOEeNnEeVvWuvKhHslLlUubBtLCcTNnknBbXoeiIGgEONnLlGgZktdDTKpPXVGguCZzLIeXwhHvVmZVYMJxkjJKSSssfFgBbGfuNnxaAnWbBSswaTfGDdJoLlBgaWwAGgrRWwWVvwhTgLnXtxBbrRXTBEPpUuwWgtTUJAZUuDfRrYyFdQqeoLUkKSLgGlPKkpLnKFqQtrpPPAQqHLlNejJWmTtubrQaAFAvVaLnNnNtBshHmMIuUuUutnuzxXEWuUaAUnvPpcOjdDIYyTaAtZqQzjzTtKBbkZtzZxXupoeQqQrEWqQkZGjcCJsQqhLnVfjJKAakwWPHhTUusxXhNbmOoMzzZEabBTQXJjzyDOaAQqosCYaGgTgGnycoHHaTtAhhhEeHRKkrdDSyOoAazVCDGvmJjXoOhvVmGggdDhHEVGglLDdqBhAayYGtQBbqwBbjIJtTjcQQbBIziquUQHhahHGVvgFmsrRSMVTtbBUugYyfrRmcACNncaXxuUQqlLpHzZhTTtOOZzohHEcCXxeSnNsRrFWVvsxXSMmzZFfwlsSnNrRrRVvpaIVQoSsvVwEedTUjGXSuiIAaBbDdUYqiIQrkzZWwNvcmMTsSWMmrKaKZRwFHhfAaWjJRcSeaAEeYyylDdlLtTgiInoXxJjNdoOILlGmxFyMmeYylZzvjyxBbMwEMRJJDJjHhdjOofFQOoqkkKGxLMmqHhEEeffNntTOmXcCxMaKVvPpkTvSsSLlsOGPzDerGgpPiIREdpBixXyVipaqPxXpECcxcHhCVbBsoFfSsOVvoOUuPpeEdMmEMBvqvVauCiCctTTAMetHhwgaAzXxhHelWwLqYyXGgGgVIisCTtveEVkLhWoOwtpPvvDsJNnJlzNjpNoAPpanXcCCcuOakBuUlLJjnjJWoohIihYtsNnShHSsxLzYlImEyYhiCJhHhXxMEemfLOHzZleCWlmAYyTIivoOZzvVrhKkSxqcYyfTtFdDnpHhPQgGqSkagGTtuDcRrbbWsMmSwqJLIwWfMmFUEeudDiMmEMmUlLQiIqrUujNsSZBinNqNGBboAbPrbKUsoBJNISsmzZfFHQEsXrswSFuhMZSrUOouGzMWwNCfvvVALlvVrRtMmFYyTVxXXxvFmXxmMMcCnNTvGgVNnuUgGxRCCKkcSsiIiqoOoObBySsdDYHhywSyYsBYlWwkKWpjJPtDcaEAHhifUSsWwcIexkKPwvoOVHYNnySwCNnkYyrlVvxXLNNdDPpaAjJHVvOacfiGgIeQvDdDBdDbfpzZNNnNBARIQzuUZIBcCoObhHkKsPiINWZlzZsRVvMAJjbBVvlHJpPyYfFpPSPpeEUudkIgGzSpTZVdDAOUFgcXxkeEJwjJJRgGgTYvZzEeZnHhynNetLaARzZrYUuybBwNnWevgGSKkBbHhIYaADdDVSKkEACuUcXiIzZfoOFxwnNWawfXJjelStkBbZzgLlDdoQqGgZzuOonuEegcYDbBdyJrVBbhMmjvlgESsrTtNzLnktKjPpmgGXNndDEVvSsAcOoZTtzfFiVbzZUVPpKbOBbBUccCyYCHhgkKnNhKkXXOAyUjJzuuEWFfuUyCchWwQNoOamMVWwdoXBMmWdDVYyWYVmMvnArjJRfYyyRrCRBxXIisSRyYNnmMaAPppkrncCNNnIXVIfyYFhHKGyISsusSUSWwnrrRPpRIEeoOUuiNiIwWrkKRhPpeIiduUDxcCXEPnMtTaHhiCcWMIiyybUpTulYwWjJFfVHNnbBBboOhHpVvKynUuNnJYWEJjuPHJjhWQqPpPXxyZoeErtqRrQMlReEtHhRrTlaNnNnAHPbBpfJvVBbjAaBWpHgZzuMyVvEXEeKmMGEegVxXlKkKksSwJjpPpCZzcPzZNnnxXmLyYzVvZlMjizZIeWmMctIiGZdvViIBbdoOzuCcUrrRMSOsUKRrkPaYyqvVQpPKfHhTtxjJXiDddSsxFcirRInbWwWuaVvHCcIiVEzsjbBTtIGWwiyYqQhHIIzWqQtlBbBOoQqbhbMpGWnNwjtVZzvTXiEeiAaISNiSsIUDdgPRRShgiuZztzLXdgGOowrjJRaOoVYyvlLydEAaNnfFsSbBeCRkTKkGSsKLwYfYsquUyvejJvVHGgbiqkKXxeMmEkJtTuCgMmRVvWoEeJzaOoAJZnNMOMAamnyQqEyYiIeDfFJjdBodDwWvVvVdwLsgGYASqwdDOosSoOHVLlYjIxHhfFJQqUuuNCfPMmpVpGcjWhHEGgHhvOGmhHMGgBbzreUkNXbBqQxnvBlLDdEebVasSAPpUbBtTudDiIiIACjJcxXLqBbDFPuwWLZzjzZdDiwUuvVZzJjWUutTJEeUuFfjElLeoNnUHhHQVzZGfPxhHJjrRnSwYyVMNncIiCmdDpWwsSIpJaAjQqPxXgGJjTtsSdNzCAaaFsSoOfhHjjjJQqcCRreoOxyZIiGMmDvgGVdglHhLYyeiTtIoOERrrRzqzZbiNniIygGTtlLPLlvTtTtvVRyYEvrRroEsqQlLHLoOWwzZGgVPZlbBdDVCcvwHYdDojTxYAjFfbLtzmMnKMmUcCQGmMGfFMmGBbMmNnzZcGrRgpTlMPpqQmqqQmfduxAaAGgPnNpauvVKxzjigGVvsBRrujkKulEUxXEeODdbBoCXxBVuEepPSWDBhuCNPyqQQqpxUuLlzXxZXngGgceMmAJqQjpZvLsfFfFJjSwGGlLXvYZMEeBGcCCSsLzpPCChUuBSPpynNuulFfGKwWYUVUfFuPpvuJSZJjzvwWNnGyFQzZdDqCJgrRAaUIZzTiGCcgtUuLlLqtKkVVBbQirHRrbBImxXMiUuNaiIANTUEeOcquhuVvSspMmPrmsVvSMdbBotKUlVsSvNyEeCeEYTPZgGcfBGgitnAzzpPusyeLlwWEYNwwoONncCsSMbBmdDFfxkeNnExXTmJHmDvWffFmxzbBxTtdOoRrfcCcdWQIbptpLxXlPMhHmyIgspZzYNmMOdDWBcCELlQqlLlLoOEuUTsGoOVndDoGrsSfFRrRkcCjfrYNnJQqbwAsilEBXCcCzRrzqrRsSBbbwWWZSGMmgsedQqcCOetGkmOnbPpYjJIqQTEeYvXyObkKBLxXlljXLlxJhaiIANTsQiIbGNnjHhZzFfeFfXPpuUyzlidDAXMuJjgmdDDdMEeGDTAopOZnHjRkKrSZTeJjEOWXxJNaxNpljrKIVjmMAaJjcCgEupHYyRvnNVOMEemBbfyYJjJjFdHoSsDdORCcUMmQqolKkmMLNnIYVvcACndDOZIizkpUTtudmvgGzZVCMIiIAoORZzriIjJQWnNaZpPtTzAKkPpLDKFvvVVKkQZMmzvVoOXTWwbMBbmrqUNnCOvIgrJVcfNdnvOOoAwGJifmkKLljSxDaGgweYyEpmMtbEeBJcEUuyYmMWYOoywcOMlayncPZzpTkKDdKktsnWeEwWRrJbQSoPpgmSxMMPcjLzZWqxvVKKddpYUgKkkujJqcCQVvJrCfFcNqQHuUJzpXxCOnNocBgGPXpFuTtFQqzZXzZpPaDIiNSsNXwDMmBapPNFfYyeEnMUueEEpPCkqZRoOKkkClLcKbREkdTKQollFBIiZzyMPieEDEpPeQqAOoCuAaUujkKVlLDgqfFFiIfaAJjCcNWaRvgGVqQvMmgsSthjJHISuhuUHhHzPlPcCpwWSsOjJOZqQGgfdDkZkKJzuUZjvVQilLGgQqQiQAabBkKOoqQqXxoOGYygRrhHIauQKkBmMWSZxziIBbnNwPlWiIrIMRTOodDjpAPLbBljsfbaAUmMuBUSNnIiOoEzrfTeYEJMLxzTtZEttTiqEeYyvVSzdnMmfFLDfIimrJImRrMrdylWwSsotUsSMGnFfNgLlUumEeHInNgDxXAPJjpWDJjfFOorMmUcsQjjIrnGgkebjpMpPlLamMEezbdDAjIOomWEuiaXxxQNfFnnNKYyLlPpkJoDYDdiTLltbBsHhLlTtZKkRrzPysjRtIiMmXckEwWwbjxIilLIkesGglLSEjJQxTtSsJjnqJQYPOowUDCvVcVcCDdHhTUzXmCcBbFfuMmmvRrEXwmFrRaAhHJShGWdUubfFBxZzjJVvpbgvMeEmViIUdDBbVvfzOokKZBvhHVEeDOodQqhGdDJjgOoJjYPgGpvsWREzsSSPDdppfFMmGPpDdHhgWbBqkWtJjdPpRQrRBuuZzZzrRUuUyYrBbBcQqeMdnNaUuesXxSZzJfMgYKxeRwWjcyYuUkyYpPIisTtKkSzwWHhMmfCYyrkdDGwWgPEwjfVfQbfFbjrjJWwNuGusQGgrCWwcuZzbpPBXlxamMAXcdpbBNMjZSsrKhiqQqmaAMUuSscCQIUuUPuUyYuALlZWlLUcCuOTmQKFfJVvNQnQqaAlujwvUuYxFioZGWsfFSwgndfDdFVvEFuOQqKkMKkaAmKZTxNnXvsfFSejJEMuPRNRrfZzqsSQfdDTaAWFCeUupPbBEeBDdeEbKkYdwjcPphGPxXHhoOoxZnNNmHBZzEISSqQsFVTttTWwAvVkEtTlLmPNnEetbBDNqZzXByYbsSpPoCOoconNuUlrValyYLSsADPpzZdOovycDdMCCvVeEEoEHhHxQlLqXWiIHzVvvVoOVbwWBfFvzZUuZrbJjQyDdAaYCJvVjZzRkzciiUAEFfUdpPWwWUZjJzgwlLcDRrgGNlLiIfDdTVmMTqQxeEXESmLlypFfPuMmlLUEmMaPjvipOwrRcCwWXVfFvWwWEcCmMYyqOoSQWwlKTtknNLSsrRUuRwzwWFMJMmbBTAcCTtZzatGgsJvVjZzhvVExXeHDddZWwCchyYoqQOLljvVJpsbuUwWfcDsZDiIOUuIiIcdDjyOoZxXBbFsNsRocCfQqwtTWFYzezuUEeGOopnNtTmDoOsSrjyJlmntTzVvcPReErRrlLYyDBbQqvVzZMqvHhVQmWyksSXsSuUjGgSteBbNnSQqsXahHAvAaVJxQqdrNnyaZRrxanqhHTtNqQnEfQWwPDaAdwWgVvfWjJxjJjUuOXYyxQqPpEPpxsPdYZGSsgzhKkCFfReErcjJHHxtwWTunNLlJuUIiYyPpkvSJNrzZxXrWVKkjJvnlLNwEeHjxJjKkGgZNCHhcpPnOoUuYmMJjIuUKMTTtqkKQqQdDtqQcZQqjJxixXzSsnNtHhTWuUTtBDyYClLUujLxXlRoddDEXxeJtZzUOoumMSsTkhHKcLlbBLAaaTFmaAbaAdiIsKeIiiDtTElCcQqsSLTqXmMDdxeGrCFzZPtTxXEhnTSYysOLUnNZzOotTceUxXuNGrPpRgZzHhnbpUrXyMqqUuQBYrbBPGgpoxtkOoSLlhkGdTtQqCcHhXPpgRryLleEyGTXnnAaZSKeKfFwWRrYyVvrFfwWRDdZzzZjtecrRCXxptdabvmcIDdDLNhsOMmoSCEqxSkmeVvsLlhkKlzZiOoOoRXvVwoMASsWMmwpsSnNhiIHuUmnNhStTCwWjLFflqvayYHqQHXSsiInSsNgBZcCtmfFyYSsJclOoAgWtTuUcJjfFCSspJbGgBSIiAaQjcCJYHhVvyCzkLXFzZWwIiEefAsAIiPpaHpkKJuUPpjSBbswWFIZkKpPIiEepmMqQeGgvVOzZvVoaqaAQBwWbdDbtMmtgiIGNXxnrcYyzlMQMMAnxEeoOhIixRFhbBWAJjNRTxqjJxSsvOnNoVRkKrmEeMWAdDRrzZaGgDdbBEXzWbQUuGgVJjmAmMRQZsnsSTtbBNpqQIiaAbBMZDdejJPpEOlLoKkzDriIPQRrkKMLlRnhbEeBFiAaJjhDdJjaAtTcvTKOqQopOoEebkXxOemMOoZsSRkjZzpIyGCJxkKpPXBflLxXjJFrPpkGgKJdEJjqQOpSBKkcyhQQyWVMaAkKqtZzDdTmbBaaWweEnNoPpFXKdFtTDKcuUOoWwCLxXlkdfNcCdaHQMOkSsKRrYFBGZUugGgGzxQqXgENBbXxuUFTCaTtkUTtlLMGdeKcCmMnNkKLxXHhlwWLqXxhXWwsSWRmMrwGrRuaNdbwvVWgmMMmGDrRdgGPpgNnHhaKKkkHhqQKkGgsVvaeuOVcJZQqmRTzZdZZGgzzNnUumMDQqPfJsSDdHcCbBvuFYyfIkKiLlkdyYaAPMayHhYIJjvVoJjOyTgcCGCOoQqvQLvWFfwcYylVvGrkqQQqDlLQqmFfVvMRiAODdDdgGWPpjJwshHLuUCcrRBbXSsxWkKSTtmTIiaWwAtKkCcMeyYEpPrRmPxXlsKmLlKtDdAaGjOoJjtLBBxrTtRarRAbBmMloOLsSXhHgmMwWGWAGzZgNniwWIawWIidDhHOowbrRkKVEeyDRFwYwWXzZxQTcMmxXyYHvVLlPphdIdDPprQqdHTtfQqFJyYtTjhEeIYomMWwOgXbqQnNcWCeEiIcalLAwnuazrnNNnRRtPfFprRsYyScqQFfBbaaAAAEevfwWXosSlRrvlyYLVSsTmMnNqQMmrRDFfFDQYyrRfvVFqUAIiQoYvVOxXpPjbodqPTRrPEeBGgQqEeRBbXxdAaHhSgMVIivqVvnNVzZCcnNyDdbTkKXxtrqAaDdLnNhwsSoFfVOoiICcPYcCUnkNAaDQBmMUKkicCrfFiMSszZFxgNegJjtQukljMEemAhHWwalLyYVvQeFsSfEqSsgGvbBVPpoMVkVvKKyVvWwBcLlCrRKkpRfOoSTyqQYAjJaEyYaAeMaOokBbuBKTZaAdNZzFfvKNZzuUTrRPpPptOoXrgGXnzZqPpGdhHnNDgQAnNrRxgFfGjJXaqTtzjpMmbBRKdDkrAaovpPblZrRzpNDtXkdDcCLlhHbyYjJTvehqQHANjQqZZIDdizaMmTtziISseCcOjJhHiIlLonRrlaPphrqvOLtwsNnmMcCkjJKgGKsSriJkKLwRRrrRSsrpPCQqcrRJFfjDAvcCQDLlsSdPFfSslbBSmMhHszZsSjJjoOJUuLUuOeEoAabCcDdRrnNOokVVvCYyjJWLlwDdrRndDlPHoOhpLMmNIiDrEOoskGgKSzAcCaNCcOeEoAxXacEZzyYtsLIiqQlpPSTnRrNmerxXvVUuQmMYsyVkKvYSFfylLzZkypLynNYlzUcCubxXTFftuzZYyUsSJCcjCcFfFfHmMkRBDFsVdDOLlUuzZmOHhoCJmMWFtbBEJSshNrWPpHfSnTtNsFKkzvWXsSEeEIieWSLzZrHhosMmfzbIiFtTNZznuUTthNnUXRLlrxJWAqQQqFftaAjTfgGFmpwWMoOTtKksSDJDdjeELZXwBbWRrSscYyeejJFpZzPIiNxSsLlRryUuLlwWudDuUcCVGfFgguZzKNFRLHhdDilTtFyYRJpPaAwmMWAPGgLvSsVZzXxldKbBmSecCpPYFSsSMmnNyYiIsOofuwJiMmIsSszVBeEbWQlLqAMsXGXxggGkRxXgtZkKIihHboOxZFfzNnKkXXxzWwwATuTYkMmKhHUTtwDiVEedDJPpbBgjJGjGgvtqxaAXJPHOohpkKLiuFsSxdDbOqkKQoVvMobJjnHJhCDdPpvEerRipZqDTpPuZzUEYbBynpiNnIJjOoqVfFRrvvVuUcrFzZfLeElyaKIikYyZCFlLQCGjpPkmMWUxebByKAaZsSoVtQqafFHPprRFDdtTZzKIikSbBCyYcCJAakKjgiOgGIxNnLlfbBFXDTxyYXqQSscnsSIYkpPEZzFfCcaAfjJFzZlLyYEeKkEPtwJPpjPWwpfFEWwbBezZDwWUkKuUVvsYiUuGiBXcCxsyVCWwSQRXRrBaYkKymLlBpPKMmHhndLxTEcTQCKwWtTgYybBGFfIikTtcVvmMHwMmWhuGMiIyttRrSsRroOESHhUGguTtfkKMmiAagGUZzfFWwPpLsTtSdTtGgDybBYjZGFbtwWTBflKkvVLgFRrfXBbLlxzQkoOKBIBbirhOoczZnNRlLkkTtKcmkOEeWwkkKmXxYpPFfrduzmTOotRrMauRrUhaAHeqQEsEqmZzPpcCMyUgtfFzZpPSCcpPsWgGwTeQqmMosiJjWdDMOMhcCUuMOomxXTtSmMSsskFLoUuPpcCkUuFEeEejAaYiTUDnfFyzZmgdDWwAaAaGeEMXXIiMmxLwwlUFfgGbBuBbklVvwWfFjGdlOoLRrmtTMQAiIfzuoQqWwpPtTGuUgOXxDdwUuWcwgbKAakvVxSsScCjBrqpuUPCEKzmMZFdDmMTtstTAaSoOELGgtWULHhEybBYzxKzZcCSsVKoOlLluLlhJjxjQqJfUqFyPpbBECciKbBEeXhqQVIYiqBwWpPzXxpYyyYSQccCZgGzLlPhHnNpxVxXjThfFHuUnBbgGNialtxJjcCBbXIYCcygYEdzZCQqaABywpVvPDZzdDOoeQdDqSvVsmZzMuwNGeRrDdrWwmclZQbWwCcBqzKIrRxXbLlcVvCBbBNgGdEeJXxsdGvjJhDdHdDVgkvVKmMoODQqGcCgMmSmOzBPJjHroONPwWpnSDHhVvjIhHiBbLlEEeeYybBJjwWJCcBbXWpccrROoHBbFfQqIkTVvstTxcCEQtTYbByJjGlBFfbnNLtcQkjwgGZzgeEfmMKkFMmdbixCzRgGreGwtFfEPTIiwufrpjJxLAaYDdynNtHhiIsSKkTAtPpbdDBMmTiBGIiIVvMAbBlwWPmMaAkKpBoOHHJjFoOBbfOokwdDWvmMxwZzWRycZSszCWwKlLkhHxoIKBbkiDdkKOTtnFfYDRrBbFeEfYOkIiFfIiowqrhHWFffRRlLrlRXgGxroiIzZIiaAjJNnxDKkijILNocrRyaWuUTlYyEePptTLKkfFtwAAMkKZXxSsKoBbOyIwWdQqDFfcCxXirOFfTtoyeXsRwWCcbxwWPpnWlaeEAMmbaABTaxyYOoSIisQqrRNAoOWqQwIcCivrRrRVsSEJjPwWpeEHhgkjJKBPpMmbOoNhHNnIiSsIidDhKklLHcUrGKhgGHpAjJaRXxrGZzkmMCCWwyGglLbdDGgBdwpPqQnGCcDuUWwjJdmHhEeEeMrBbyYHnNzZheEnuUNIibBpPRAsIIrqQgGGgMmRwdDWRrcCgGRrwWixXnNhiIWtTzZbWwTZzVvyWTtwQJvVxlNKzfFBtTrRkKkelMZNTBbUuKkiIPpKaBBbbcCFbBxgGXFfyYSsfAkrZzSsRtxAaXJJjjdoGgGSsRKYEXMaNGfrRRrFNrjJRnpPwubPpiwWmcCtcLlnNKamMbdDhKsSZzqkASsMUEkRrgvVvRKgOoJjdDUfFjksSlanAGgazZaANQbBSsmMSsqyYIilJjKZzoOkAaFfKKkpPkKRTtDJFfjwWjIiJRbBrdqQpPYgGySsyYmMrTRTtGgkKPlztEeTZPprRLDxrIUupkYyKVCPlquUQOTJjtdJjTpcgsMDdaAgKXZzMmdDysuUDIBrhoOHDdvVpVaApWwYyPvTtcCDeEjJFCcSsKpMJTLSsiIuUVywWXxEysBbdsSvVLfFoppPtZjJzIiTRaAyxXYOOoVvnoOfTtdQZZJjaAGgIQZzpPVvlnJjNUoOGgOohIiHiIvVXAaxLlZakMCccCgGmKwWUsSuEAnTYythHSFKdDPpOBdkKDDXiIoXxkKICGmMecCEJrRXbBxKkDdMAeEsyMLjJlcdDIOnvVNoMmFfIHHhPpkKkgyRranrFfRXxFdUeEuAhYyYyTYyCcWwUuvcyYCaAyhHYITVvtgRrNvdPpveuDdUAszZSqlLEevjJuUVQqOoQVQPpuhHUfFqHOoEehQqaASsvtTPUupxTtIihRrXxHwmPzZMwWIjrHSsCcLDdgzZCDdFpPGgczPpZqJjQaAPIipCVvsqQScRdJYyxXjbBDLnNVvyYKOoOhTtnoONWmyoSWwOuuPXxaqQMEepPvVxXowWGgJjOkKGgRrgFyeLKkHhlPpuGgUskKSEcyYLlyOkKtTUugCaAcDFsSAagGwWmMCUehHEuxXwyYgGdCcDECdDdDHhHvwQqWVCQTttIiTeeEAajJEKkhHPpsStnNTIiwvVWcCUdDIzZioOFaAfucSPpcCshHPptTPTzClRrLcZPZzJjpuUZrREzWwZtTpPegGWwsDJjdmMlLVTtEmMeWeEwjwRzZWwPgRrGpEVvexgGfxXyvxnFAafNXqJjWAavVvVUuNnwAVvadDQZzhDPoOpdclRrRrLYypPNnxkKvVXCWwBYhjJHygGYybPKkpHhGjVrRrHheERZjJzDduyYxMmlLWZvoOlaIWwixYAaysSXJjZzATtVvRWwWqCcIHnNhYyiTsSezZzZCcwWGsgDdGJjsYwYyjAahqQIbBYyZcDdlLMmCzeSsKkEcUnNtgGTJjuzZzZwnkKaANkKWMmMmsSmMAOoaBEAalqQFfTtqQPYywcLluUCBeErRfFbCcrReEWGgvnNVVnVvNvhHrRpLrAkEeURPoOTtpKcYYycCkKRXxrpPyGgCGgDAawWTtyDdYyYZztXxkUEtyYUSsuQqxXMPcCpbBwWMpHhTGgEewWVNnPLMmlqPtTJuxXLlxzvVBWoOwbuUhHrRkArbxXBjJGgxaAQmMquOZzofFUXpoOXxHhZrsSTaAtRgGeEXMcCPZgyYohHbKDGgmMxXfVyuaAfoAaZzQcLIHkKCcYAgGayPYfoOfFaPpGgAtTpPyrRRrXxYnNFTYybZzwzZGgWNntTOocuYBkKbNFDbTGIcCyYqQLcaAfRJjjJhHHhAabKCcsSLlkJTtjIOoRrVvicXHhxDWfuUFIjJityYucYdWBPLlqltzjtcCkKhHYyPFtTXxsIifSsFPyYhjsKkYyLlYHllLpAWDdwSsanNGMmNBrFfReEbQqxuUQscCSBbwSsPpyYWqiYhGcKkhTtOoHTPpjfwWBmxbBVvjPpCOdFfIQqhHZzigTtGDreEDdhJjuvzZMVYyRrmMXtiIwWwoOWPguNJjnRrJdDZGggBVvzZOoSsEeNnwOJjsOoSNxXEedDnSRrXxqQuQqUVvsBbHhFFkKDdffPpLHhleDdtrydDznNRrcqQCXxZYyyInNNnhuUHMVvUuYXxkKRrqQErRRVvTteoOESOzZonWZzCVvcCcwpwWweEkKajsQqcCwsSWcCvVEeSJtTGyzZrgJTLlNYyXxmMnWwDdheHhEHNGbBtvaNnqQbBAVUutTeEOoDdzQqgMmFgGzGgZzZyYjJfFfnzCxsSeHvVeEaAEuUeHhuUheYyhHhHEEeEBUubfFywWAaZBbBnhHvVNejJonPpnVaAtTGgPiaDdYjhOoHJYvAaVoOvVPpdDyRLlrNFfIxXwWXxibMviIVFfqQmBxXicCHgtTVvGZziICbBcWwcCJjYysfFKkNMmnSMmOAaFWISssyYSirRdDzNngGSsHlLQFjEvVEePpuUZzygGYeZXxzNnWmQUuoOzIiZQqWHoOhNTPpkVvKdDSsSACYvYyVEeOoyrIiRdDcFLlJBAapFfZzpOGTtgosfFSPgAUuaGiIPdDdEppPPORgGuUVFyidIcQqCiEewWaABuUfyYIirRRrvILTCzwoJjMmOAabBCfFvVcKqfyQqWunNdgpPOZzstsUckKCzbBhHZklIMmxXicYGgywWCMTtfbPpjJBQqFcubBUPpGgbuZtTlLEeeQqAagBeEXxaAWwgGbSJjIwWnNisGEhHWwRSRrsIiRrRxPpXcbBGgrHhtHRRcmRDdyIfFinTtQPpKkdDdlcGJOGgqSsQhHiVyYvZzsqQSDdlTRrMsSBZZxXzHQqcClqPrCcgwWHhGRwVvWpQHhqMJjeEAamtIisCZzcRrdfpPyUBNrRfFsSnmPpKkuUtTokKOQqiIOoMbBkKDxXdOoTSXVNnvUuxstbuUEejJFfmMyYXxEIieFPpbBKkfIfmMFFfiruMmMEemEgGaFfAKBFfozbBZhHJZkwyaAcCFZXxzAaQeEqSsTQcpPqQMGCiIceErRNPpncLaAlCkKPpgmnNrpPRZRrfsSMCcrLVgGvlRDduRJjrxXnlLNUACcatTKjJLKkhkxxXcBbCdMmDcCXKPXEexfFuUQqBbRrYsAQqaSyuUpyoOFfYkOoUeEuKlrRLqQvVQxXXxPKkpozZOqPKkByYGgbgWwzZvVujJYshHhpYyPdgGDbNnByNnuUkKAFfYyaRLJeDduUEjHuUhUuBvVdDbTtBIiQqvVGNngbPpFyYvVYyfuUcCiIRriNEgGHLlmMPppPKLlMcvVQQqqBbfFCmPtuUwWycCZfiIFfdKMmkHLlhaPpVlitTlsSQdDppIAainkHhKNJMOiHhfFyiIIgGiYgfFvbBViIaZzdXtfFVrRnbBnNZzRrNvdDkdSjJsQgGoRrjJOhHAavSsVKhHnNdDkqFfIiDOoxXKTFfZzixEGLlWKkwQqIiDdXoDZzSPpUBCcHCcQqhRbBuuMoOOoKZzgjqQJZZzgGLSsJBIiBdDCsSPpTjJoGFfgdDOqBbQbcPpCnNhHBdRfFrIcnNYaQqkKAyCmQqNHhnAZqQzJoGPWzOovDBbaWwNRrnufnNFtTkVvKlLNczZtMhRrHfzZUuteETyYaovVqiILTwWtlqpPQQqBDdIitSsnNTVvCcxjJMmoOiarRARSLlnNhHAasPpYqQnCcBbjJNsSjTtAakYmMyTthHQqyqQYvqQqTtBbBlLNonuUNGgnNTaAtdDrxZzXfFzZaIFJjftTqTihsSXmqFfTyYhrRnNpPpPvVYyXxGRryYgFQfFdDvbiwWIYyXRrxGgnNBPliIaSGgPfFpsHiIhwxhrRVuUvDdiIWzZwbNNmAYyGmtSsaACcVuOafFDUuuUMmHhHBZzDnNdKkbhpbBPnWwaANjJhHoODduUzxXVvIiUupPIqQCcnNbkiIKBdnNrkKpPRWKVbBvZaiIAzBbzZfFkTtyiIDpsSTtaAYBVvPpVvgGFfmAFfaMmwWMWwGHhgDdtTfxXFliyhWwTKLlvefFEVuUMmCMmhHckTtuUsqoOIiFfkFfSnNUuUuuwWUsKCRbBrJNnShqQHDdCAXXjJxxNhHiICFfcfFsSByYykKfFOJiIjgGrsSHhsiUkKeDKqhHdDsSQBbUuGjJvVgTRbrRlLBnNlEeLdDtRrjJTnKkrIizrRrnNAhHaAiIIiKBYyINnivVcSsCOzZbBZzobZzIRlLrOonNdDoOLoOxXdAbBoOarRzZDLCnYycWgGwOUuyMqnNQsFnNBXxJnNZtTklLVKsSpPMmnTIiRTtrtzZtTuUDdPfHhQHiINJBbNpPniIYTtXxyjQqSsJZdDzMmjZoOpPzhHntEeBbYHqQQzSsHhhoOPYqHXUZoOAavVMmzuCcxqQgGCccerRECYyqiIQdcCBbwWCcDsBysJMmwWmMfFyYjhEVvecCQqrRGBfFbtTgcCJYwWyUtSKkbYiIBEebybBIiIiJmMjBHhPpVVvHhIrRmMivZzLlkKxHhmnNMqrfFDUunNlLOooOIGgiEeYyEelUiIuTtTbHhOzZtTnEeNozyipMabBAxPszZSYysKkTteEGVvgCcWSRrsbfQqFdKkPHAaAadDvVxqQXXxqNnxXQuUITtMmAypZZKkkKCEecjTiItJBbOoiIykKgGYQqIYcCQqbxXBYdfVvFEvVeMolTuUtpdboOPJjcCtTilcCLJjIHhYyXoOxvVCEexXRrnNkKKkTtskkKKvrRVSfNnPWwpFyYWwvKkrRrRDdrjJReEGgnUuNnNgUuwWzZDHhERreBbdvVzFLmxXMFfuUXxXcspNFfkKnKkJqHhfFMxXmLUumMcfFCGEeNHYyhlbBumMuUxRrgoQvVqfuZsSzUZzQqiISfYyFsCgBbPpGkKWKaAAaBwWwWbzZVeEdDqQvhHkcCWHhwfFaAnNwcjjJJFkJjjJKUgGudDODdoXxzZdDbBUUSfFvVLsSloOwMmWAAprnZzNYIiqQyxzZXRPQquUIiXvOoaAxrRXxvyAaYpPPhHEwWIiIoBbtTBbAacCWnrRYyMmuggGocCKkjJLlOGsSiOoOoIOahHAoMmwrRgGhTtHKkhHBaAioiIeEOhlLCfFRrkZzKxpKiIkPZBbKkSswnNMmJjzZWTtSdbBDmMzZsmLlEepPFfDdxZzqQXliILmMNnkZzRrYJjvVPpOodDFfiIVvNnzZxXRLlrlLybBbBUHhucYybBnxXPpNqSsofFOQcywAawjyYJWWYrRkkZzImMiLlUuKUDiIdnNEhHMmCcdDNAanephHWwQqbBrRXVDdKXxkNlLnvxVvUSsuaWwAUPqQkKAaEepuRryPYfFypJKkoOXhHxbBjqQhHYNnynNgVvbBEeLloGgOACcEertTpiblLEeKfFfFdDKkYKkGgrGglXhWwHlLweERzkKZrnmabBArRUbBmMNPlLlLpTtwWvVnsSuWwaAEnRFfVvmMyGogZzGuUZeEqJjQqkHAacCtTjJkKDdKksSzZFfhxXdDXbBxTeGgEVvtXPpxRXxyYTbjJCtTcVvQqBwWYyQRrKTyYMmtTtkTqQTttGgfGobBOHwjJWhlnNrRLgKWtTwdDkEedDyYFDdkzZKcVbBnNvwnxXNcMmhOosSVBbBLlDkKdaAbvuBbUouUTtOfQqEeFLlKrRkHFfSsTtdDGgzhHpEePMfFmwWJHsSvHjJhBlaADdwYyWwWQEIinNBbqlLwWDdhVvHjJHhWwaABwpPapPAYyWxXOolLjyYwyYWQqaATPptJtOoOoTbPqoOSbBSTtsKsSxXxXgFfqZwWcJjCzQkTdDtYyHhKFQoOqjJCcwOJjoEDdeYyGLlyYoOgWXRYyBbcCmHhJjMeErqrRlLNqQZzncQqCQKoOLhHVLlKkvdDzTtylPpNnLoEeOqCcvVfFJjZzKkUAaubBcCxXWwYyvPIipVlnNBYNnxXeErRmIiMFKkfHhFftqQTyjcCWwaAdOoLlfQzZHhcCCcKVvPgGNNnDdnpkMmFxXOobBHnNgGrRFKkfLxZzwWXlnNTtTIiTtTDJjsZzKkHhXPpxqQOoNJjLlnQhuaTtAUHBjJbSsqrvVDdRuqQUaKkUuYwubDderXYyxHQqhgGhhHpTLlGFEDderRZzYyOoeEfWoOwJfkmMzDElLAGDdgeKkhHzQqmMrRZTtEqxXQlLagnNTTttGInNvVnNCcZbBIizsfFSGTjJQqXxAbBahjJkRrKfFLeYbBiIzZyIJkoLlOKEfpSrRyYsPFejidDfFLgGlWPpwqQEEiInRXxrYysjJSodqQaodhMmAaQqPpYyZWwzlLfdivVTtCFESseAafcwWdDqQIrLNMmjJnlRxXmMObBaAoRrZzkKMpPmPpDygNFHsTtSheEfnXlttTTCcLTttTuJjtTvejYyxXFjJfIiJrhHBbRcCzZSsfFOoJuvVUmMMBYyMmpvJjnNkuUKVBbAavJjZzqQzZaAoOVJBbjJjEuUWwYyeaOHhofFKkaAzBSszGgZOobolLstTHhXxSSsObBOcVvVvpAaPmSsoOGBbgBbMdDtTKkgGrRkKKksSDdtTeCcwlLWECTttTkKBtVvmMTHuUhHbBqQhGgbrQPpAajoOGgJDdIWwiENnjJhgGmRrKkwpPWwWnNzwYDdXxysSlLoZzwWOMRcCoOcUuqgGQUDdjJuRrUIiuBYybCrmmpjpPJPQqLlMOogGhHtTWBAMmUuaqQbjEeyYJcCoOLNnlJjyEepQqPQHhqQqrkKIiIHhikKzZRtaFfWbBwSsXxBVBbvTfnNpZEgGwWejJyJjYoOaAgGzZkRJjLpPlrZzKiXxIEeoOeNnEVvUucAaCizZIrRcZTTttzPjODdofFRhHoOpdDsGgSgGPrQqTtJgGvVpCzbBZrMmCcqQpyYdDPpZOfFIfFiHhvLljJjJWRrwVPBjjJJbXxjJRrtwWDdYKkvzZVyGgyYQqTZoOzplnbBNnNAswWSpPLldDauqQUNVvKOokHAHWwhHVvhZYyzZzvVOGgoXxQqaEeEegGATDIiTPkfFKpoOzcCZtjJNndiCcqYyaAQIiMuUPpGRrgLlAamHBNnBbvsSVdDHpPVvhkKAaEFsSfaAZzedDqRrQFfXQuUqxfFNNtwwWjJYTtBbdDTmxXMtNIinjJYypoZzLlwWOqQSsqvVdDKkaAEeJjdyucgbBQqdDGCfSsFxdMmDgGiISsFQkKqyYwlLhHEeQqBbHhGgZybBrvZNnTtzZfFzcCTRuWwHmMhKkRURruZNnzskKSIOoiiBbYyTUutIrLFfpdDFfOoPVMQqDdzZgGQqmFfvYyzZAasKtTkKkSUuhOoWwvVxXXxmMmvXxVqQWwDLpoOPlpPdJeTtEjCcCcMqlLxlrRLXhHCcQSsFfOaAAaoOoyJLQdDqGgljRoOrTnVvwxXWEeDdJxKkJjYnIZjJziHyxXfbXDfFdBbwWxPXMBbmkKeEnNxplLLldzlYyRrGgLGBbpPqQAGiJOojNnpPISsgTMmoOmMRrmMtGgoGgolWwEeODdoLOAabBDtGgDdTVvbByjJmMSQqJHhjsYmMdOaNnzmMZuUnFfkKNCcxXPpuPpUiIErRqQeHhgmMVvKCcCcVvRnNgGrcpVvalLAJNnqFfQMmjPpRrPsnNysSYCcbBygHhXEexGxZzHhhwdDWoOHSsXKkjjJeEJwjzwWoOohuUHJaAJjjMmIiOJjNnoGgFfxLpPlXOsSBXxwWwNnWPwWpIYymMlLYybBleVvgGETFfGAoOzZaqJyYuUISsuUyYiYQVvqCcTvVtxXsSHhuUBiIcCXxIipPpWNIinlLwPSsbwWzZPOogYyGpGefFEeECcfmMFDSsdOcCexXEMYykKEexXDdHhdNiInfFnBbyuUyeEYnNSOoszZaAvVVQqQLlqdIioOXxaADvSfmMgGFrRBaAvVbEFnNZzjqQAaJEekKfeaKTtkAoOfFUduUqQDTyYoOtuiIsdqQhUuAaEeHxXWwhSsHWwgCcyAaYRhHroslWwLjjqQJBbNnpPJdDSfUuFIhMmCckuUKuTBbtUnNKkhHrSsRvVEtbhHBJHhjkKaAJBbjcMmCmMIiwNBbnLlWaaAnpPNnFeEvmMVnNHeLZzdDxXuUZzmMrRlEtcNsSagGFfDkKdMJjOomKkmMATPptVvHhnLQDdqHhTtlqQkKVvLQwWqWwlcIhHUwWDdutEYyeTsSiJTtjjJCOobBAaIUuPpiCqiIQEexBbdDXXxOoaATtFNkJjMmbBiIuUKeEnixXIaaAKqQkHYyBefFlNKknLKwWKkxXDTtdhYyqQHvVkpjTtjJSsuUJeSsEdkAsStRrTJZzvrRVjPpaFYrRyfFfKDdxNwWnoOgbBGYvVypGgPaAmtTOfFKEekWwTttdDmMwWToMZZvVaAroOwWRjJsiJYyjjJsSNnqOEeOAatvNnbBiIxXQqAaVMcUuCfFaAmFdDKGgPpkfFfSsyGQqLlMdDmgQLTtlcCwWqJSsLlPuULMmDdlpZzZzVvjWVvRgQqGrcCwIiQqqqQFfvVQhHUuIixfFXulLUMmUGguZCFfczmAQGgqqsSQafFwWgGsSrhueENnUHmMBnNcCboOBNnbRKkxXYyTXxtuCNncdDWoOzZYiIyNAaYyaFfAvVkKndDEerRzZJjsJjgGAZsSmbBMRiIjFpPCcXAatTxfxfTtFvVXrReEjJTWwbBZFfzZzuUbBTGgxXxBmMbXOoqQtwWLmWwPpjJrRYyZnnNNbwWBzrUuRtTBhHrRKkTtwUuQqMmiVvIsSBbvVmMEebBORrooORzZCcryXxYJzZpPNnmQXxbBqMmDdMVvhYyHNxdDrRXaAnBbcRrCIiYyoOjvYyKkVIKHhkJjiCqQEecifFIqYyQfFybBqQrZzRgGdmMDiIjJeEqTtQrRYGgiISshHHhUuoOeEMauUAeEmiISsWPpmMFUxXufzZDYPpHNnSsaGsStTgAyYhlzZyZzYLyfFUiIMmbBIvVTtigGPpQquRyYrLldDYyoOCjJcUIiKDqvVQdCKkckmMrZztTRWwMhNgGKCOCcockdDLlPbBMjJmllLLhHoOMmmyYMWwByYaAmMBGgoOxXzSsAasSDBbLlOoBJjAaBbbkKdZXICLlceEVvCaAxXzMaSsAuEiIZmOozZDmMdMzeWpPOoHhsSnNOoQqgGnDdcCjwYyumMrRpPUWJNYyzZnmXxXxMSseNnyYEAaBbCvVcFfgcoOCgGGoOiIVnBbwWvVNyGgYwWbVrRvBCIirWwRcWGOovVTtmMsIiShHCcNndkxXtTKpiIPKkmdDzZyQmMqYezZEFfqQDdYbBdDzZUksSfFKsTIitBbJLsSrRlBbjOoJSxXfFsjAasVvZzjJSStnNTdDcCwWWwzZsSsSFOiIoVvfRIirurZzQDdqkAaKJjXQqxWsuUUuSYxXyOowWzfaAFXxlLZnIiNZzBbwNnSBbYqJkKjzZddDFNnfDQAaMzZmJVvRrSsjllZzLLHhQqGWwcCgyrNnkKRPErRepsgNiINnqQnGcKfFUuIiHhkOoyjKDGgsbBbBdlXvVNnxNnmMbBLRrDSVvBbOcCuUxXwFfGgeEgTtIocHTthCIbKkdDBiLlSsDdOoSxCcdDwWXsHhqQRTtpPScCsKkcCrwWKkhnNHaSsAGgsnNKkCDdctTyYhXCcxBbHSeEHhTtoOojJVWwIipPvOoOrfFmSKkyYJOoiIjNnmMhHvOJjWwoDUuIjJicCnyYNbBQpPqbBZzdWweEVgGDdCMmKkezZEZzcaAyYaApzEeMUumOAaRWFfhFfHTtYywwDdTtNnJQqKQlLTtqVvQCcHhqZpPpoOdDPzdDsNnIqQbWwBicCnPfDddyYsSyYALlaxjJYyXcCsCRrFfcSDPyKkYNBbnptZeEEezAaKkXTtxCcdDaALlKWwkAaMmdDCKgMWwMmmLleELleoOEfFqJjSsQEeUPpKkuEeMmuUZqMmSsQzxDdXXxIiGwWPprRkvVkKvVIiWOSsoJjUMmAauGgmMUuwQqoOcVvsKkSCtTmCceEMAQqsUQquSaNHhWwnUukMmPpNjxXFGmMmPpMGgwWzZdfFDAagVvXUuJjKkxQqVvfJgGjFpHMmwWfFhcCDsSdPRrOYwWdxXDznNOOYdDyoAatTZEesSzkKkRrUuxdDoFfOXlmXxJjMJjaAwWpPhHQqjjJJDdOolLCcvVLKgOobBvVaAedeEdDrRNnDPvCcVpEUNVvcCxXnugGcNncimmMMgGItTCegGExXCLKkEbBeVvlkKZzGBVfFhHzZvbMqQhHmbOVWwvPpuyYUoBidDkAaKiIwWCcIBEeJjWwbvEeEeZzSsVIiaAQdDIiqHhgGvyYVxPpfFTJjtXAaNnYeEDuIiUluvVZzUSsBbQqmMLAMmafFdZzvVXxGgaAVVvQFfuUtTHCchmnpPRrAavRrVNBbMwWXxqxXvMfFhHXxSzZKkVmjJAaMvbBmiIMCuUhHcNnWwRrNzZfHhFDnNdnBMmBMmbxPpXxXhHbwFaXxAfWeiCctTIELlsoONnSkNKkRrnKtXRrxTstaATzVEeAnNeEavrccCXKkZZdDzzxzZwiyYIWexXEkoOKeEGcCgCRGgBbaKkTtXxABbbhHBTaAUuVvsSOsSoqQxyaAYyYcCLlJjoOXtyhHkKsSYUucNnCHhcPpOPpoCtcCsSLlPvnNVUuFfBbplLqQTtToOaZzAXmQqrRfFMpnzZNzhZzXITtiPpHtTBbhxhHKkPCOocZztTpHjbBJZZzPWJjjfFyYXhHxJBbQqwtPpqJoOUujAaQnNVvTcNnMmLXxnkTtKNndOSsoVaAlnNLvavGgVKKIihHkksSaAoNSsnOAaxXspPCcSrRGgOoeeEEHhAiwMxXmfNnyUuYrwWwWYyBbRTtAaTtFfxXWbrRBuUwBbFpPYZzyAacLlmrRMCRrbVvfFHhTtBsruBbOoUzZKVvkRHvilLIgQqGoOVaAJjAaRqQrhYyFfJeEKUcCukMmKkKAaqQklLtXxTrRYLYyeElyNnpBkKbPIiQvfRGiIgblLBrJjMmnNjJKkSNaAkKaAnWaAcChHwOoyYWvhHVbBwIisFfxXFiITtrnXxMmvViVvlLvVIiINjJOoXxRZuUzbBehMmHhHwbBWEuWwwWwWLlUhHgGnNeEncCNJjdDdDTVAaJjRrLlAoOaOnNnNmMPprRHhvhHLlVovVvIirhHRtPphHtThrRwWgGPpkruKkUMxXmRKzZNnrRaAxIiXdeELTtlyssSlxXjJTtmMLYBmmMZzyYJjsbBSMbySxPQqkKhIiHTtpYyoPpyYTtOXOomyPpYMYmMHhDKkeESnSsNgGsHeMmZRroOWaAwzEJVvjv";
var fullSize = polymer.length;

//part 1
var currentChain = polymer;
var currentSize = currentChain.length;
var retry = true;
console.log("starting polymer reaction");
while (retry){
	var newChain = "";
	for (var i=0;i<currentSize-1;i++){
		var analyzedUnit = currentChain.charAt(i);
		var nextUnit = currentChain.charAt(i+1);
		if (analyzedUnit.toUpperCase() == nextUnit.toUpperCase() && analyzedUnit != nextUnit){
			i++;
			//console.log("reacting "+analyzedUnit+" and "+nextUnit);
		}else{
			newChain = newChain+""+analyzedUnit;
		}
	}
	//adding last character
	newChain += currentChain[currentSize-1];
	
	if (currentSize == newChain.length){
		retry = false;
	}
	currentSize = newChain.length;
	currentChain = newChain;
	if (currentSize<10){
		console.log("end of reaction, only "+currentSize+" units left for "+newChain);
	}
	
}
console.log("ding! full reaction complete, keeping only "+currentChain.length+" units");

//part 2
var units = new Array();
console.log("finding units");
for (var i=0;i<fullSize-1;i++){
	var analyzedUnit = polymer.charAt(i).toLowerCase();
	if (!units.includes(analyzedUnit)){
		units.push(analyzedUnit)
	}
};
console.log("units found: "+units.length+", reactions starting");
var minSize = polymer.length;
units.forEach((unit)=>{
	// remove unit
	var lowUnit = unit.toLowerCase();
	var upUnit = unit.toUpperCase();
	var unitRemoverRegexp = new RegExp(""+lowUnit,"gi");
	//console.log("test="+unitRemoverRegexp.test(polymer));
	var currentChain = polymer.replace(unitRemoverRegexp,"");
	console.log("purging polymer for "+lowUnit+", length="+currentChain.length);
	// fully react
	var currentSize = currentChain.length;
	var retry = true;
	while (retry){
		var newChain = "";
		for (var i=0;i<currentSize-1;i++){
			var analyzedUnit = currentChain.charAt(i);
			var nextUnit = currentChain.charAt(i+1);
			if (analyzedUnit.toUpperCase() == nextUnit.toUpperCase() && analyzedUnit != nextUnit){
				i++;
			}else{
				newChain = newChain+""+analyzedUnit;
			}
		}
		//adding last character
		newChain += currentChain[currentSize-1];
		if (currentSize == newChain.length){
			retry = false;
		}
		currentSize = newChain.length;
		currentChain = newChain;
	}
	if (currentSize < minSize){
		minSize = currentSize;
		console.log("new low size: "+minSize);
	}
});
console.log("ding! best purged polymer size: "+minSize);

//day 6

//part 1
var minX = 1000,maxX = 0 ,minY = 1000,maxY = 0;
var coordinatesRegexp = /(\d+), (\d+)/;
var coordinates = new Map();
var currentCharCode = 64;
console.log("parsing coordinates, finding borders");
processFile(
	"day6-input.txt",
	(line)=>{
		//console.log("line="+line);
		var coordinatesParsingResult = coordinatesRegexp.exec(line);
		var x = +(coordinatesParsingResult[1]);
		var y = +(coordinatesParsingResult[2]);
		var chosenChar = ""+String.fromCharCode(currentCharCode);
		currentCharCode++;
		coordinates.set(line, {"x":x,"y":y,"area":0,"code":chosenChar,"fringe":false});
		//console.log("coordinates: x="+x+" y="+y);
		if (x<minX){minX=x;}//console.log("new minX="+minX);}
		if (x>maxX){maxX=x;}//console.log("new maxX="+maxX);}
		if (y<minY){minY=y;}//console.log("new minY="+minY);}
		if (y>maxY){maxY=y;}//console.log("new maxY="+maxY);}
	},
	(line)=>{
		console.log("borders: left="+minX+" right="+maxX+" up="+minY+" down="+maxY);
		//biggest board to account for the fringe
		var boardWidth = (maxX - minX)+40;
		var boardHeight = (maxY - minY)+40;
		console.log("populating the board: size="+boardWidth+"x"+boardHeight);
		//init board
		var board = new Array(boardWidth);
		for (var i=0;i<boardWidth;i++){
			board[i] = new Array(boardHeight);
			for (var j=0;j<boardHeight;j++){
				board[i][j] = {"neighbour":"none", "distance": ((boardWidth*boardHeight)*10), "x":(minX+i-10), "y": (minY+j-10)};
			}
		}
		coordinates.forEach((point,name)=>{
			for (var i=0;i<boardWidth;i++){
				for (var j=0;j<boardHeight;j++){
					var cell = board[i][j];
					var currentDistance = manhattan(point.x,point.y,cell.x,cell.y);
					var isClosest = false;
					//console.log(" distance for "+name+" from "+cell.x+", "+cell.y+": "+currentDistance+"(now: "+cell.distance+")");
					if (cell.neighbour == "none"){
						//no neighbour
						isClosest = true;
						//console.log("only");
					}else if (cell.distance == currentDistance && cell.neighbour != point){
						//console.log("contested on "+cell.x+","+cell.y+" between "+cell.neighbour+" and "+name);
						//two nearest neighbours
						cell.neighbour = "contested";
						cell.distance = currentDistance;
					}else if (cell.distance > currentDistance){
						isClosest = true;
						//console.log("new neighbour");
					}else{
						//console.log("too far");
					}
					if (isClosest){
						//console.log("isClosest!");
						cell.neighbour = name;
						cell.distance = currentDistance;
					}
					board[i][j] = cell;
				}
			}
		});
		//counting area per coordinates
		console.log("board populated, counting areas and exclusing fringes");
		for (var j=0;j<boardHeight;j++){
			var currentLine = "";
			for (var i=0;i<boardWidth;i++){
				//console.log("board["+i+"]["+j+"] "+board[i][j].neighbour+" d="+board[i][j].distance);
				if (board[i][j].neighbour != "contested"){
					coordinates.get(board[i][j].neighbour).area++;
					if (board[i][j].x<minX || board[i][j].x>maxX || board[i][j].y<minY || board[i][j].y>maxY){
						//marke on the fringe
						coordinates.get(board[i][j].neighbour).fringe = true;
					}
					if (board[i][j].distance == 0){
						currentLine += coordinates.get(board[i][j].neighbour).code.toUpperCase();
					}else{
						currentLine += coordinates.get(board[i][j].neighbour).code.toLowerCase();
					}
				}else{
					currentLine+=".";
				}
			}
			//console.log(currentLine);
		}
		console.log("area calculated and fringes excluded, calculating biggest finite area");
		var biggestArea = 0;
		var safestPoint = "none"
		coordinates.forEach((point,name)=>{
			//console.log("area for "+name+": "+point.area);
			if (!point.fringe){
				if (point.area > biggestArea){
					biggestArea = point.area;
					safestPoint = name;
				}
			}else{
				//console.log("point "+name+" is on the fringe");
			}
		});
		console.log("ding! biggest area="+biggestArea);
	}
);

//part 2
//searching for combined distance smaller than 10000 with 50 points: mean distance of 200

var minX = 1000,maxX = 0 ,minY = 1000,maxY = 0;
var coordinatesRegexp = /(\d+), (\d+)/;
var coordinates = new Map();
console.log("parsing coordinates, finding borders");
processFile(
	"day6-input.txt",
	(line)=>{
		//console.log("line="+line);
		var coordinatesParsingResult = coordinatesRegexp.exec(line);
		var x = +(coordinatesParsingResult[1]);
		var y = +(coordinatesParsingResult[2]);
		coordinates.set(line, {"x":x,"y":y});
		//console.log("coordinates: x="+x+" y="+y);
		if (x<minX){minX=x;}
		if (x>maxX){maxX=x;}
		if (y<minY){minY=y;}
		if (y>maxY){maxY=y;}
	},
	(line)=>{
		console.log("borders: left="+minX+" right="+maxX+" up="+minY+" down="+maxY);
		//bigger board to account for the distance of 10000
		var boardWidth = (maxX - minX)+1000;
		var boardHeight = (maxY - minY)+1000;
		console.log("populating the board: size="+boardWidth+"x"+boardHeight);
		//init board
		var board = new Array(boardWidth);
		for (var i=0;i<boardWidth;i++){
			board[i] = new Array(boardHeight);
			for (var j=0;j<boardHeight;j++){
				board[i][j] = {"x":(minX+i-500), "y": (minY+j-500),"distance": 0};
			}
		}
		console.log("board populated, calculating combined distance");
		coordinates.forEach((point,name)=>{
			for (var i=0;i<boardWidth;i++){
				for (var j=0;j<boardHeight;j++){
					var cell = board[i][j];
					var singleDistance = manhattan(point.x,point.y,cell.x,cell.y);
					cell.distance += singleDistance;
				}
			}
		});
		//counting area per coordinates
		console.log("combined distances calculated, computing <10000 area");
		var area = 0;
		for (var j=0;j<boardHeight;j++){
			for (var i=0;i<boardWidth;i++){
				if (board[i][j].distance < 10000){
					area++;
				}
			}
		}
		console.log("ding! total area: "+area); 
	}
);

var manhattan = (xA,yA,xB,yB)=>{
	return (Math.abs(xA-xB)+Math.abs(yA-yB));
};
*/

//console.log("manhattan: "+manhattan(0,1,2,3));

//day8

var license = "8 11 6 3 4 3 3 5 1 7 0 6 1 2 4 4 3 3 1 3 1 3 3 3 2 1 5 0 11 1 2 8 2 6 5 9 1 1 2 3 1 1 2 1 1 1 7 0 10 4 5 8 2 2 2 5 7 9 1 3 1 3 2 1 2 1 1 1 4 2 5 3 5 1 9 0 10 3 5 1 9 6 9 4 1 3 8 2 2 1 2 1 2 1 2 1 1 9 0 7 8 6 2 1 1 8 9 2 2 3 1 3 1 3 3 3 1 8 0 6 1 9 8 4 3 8 3 2 1 2 2 1 1 3 4 1 5 1 3 3 5 1 9 0 10 6 8 1 1 8 8 7 8 2 9 1 3 3 3 2 2 3 1 3 1 6 0 8 3 8 4 9 1 5 8 5 1 2 1 1 3 3 1 7 0 6 3 7 4 2 1 1 1 1 2 1 2 3 1 1 1 3 5 5 3 4 1 6 0 11 2 6 2 4 1 3 5 4 3 4 5 2 2 2 1 2 1 1 8 0 7 8 8 7 7 1 1 4 1 3 2 3 2 1 1 1 1 9 0 8 7 7 4 8 1 6 8 4 1 3 1 2 2 3 3 3 3 5 1 2 2 1 3 3 4 5 3 6 1 6 0 9 8 2 1 4 4 9 7 6 5 1 2 3 2 1 2 1 6 0 11 4 1 6 6 7 5 7 3 8 2 5 1 2 1 2 1 1 1 7 0 10 7 4 9 2 1 3 3 9 1 1 1 1 1 1 3 2 2 2 4 3 5 2 2 3 6 1 9 0 6 5 9 4 9 1 9 1 2 3 2 3 1 1 2 2 1 6 0 6 5 1 8 3 4 4 1 1 3 2 1 2 1 6 0 11 2 4 7 5 1 7 6 4 6 5 8 3 3 1 2 1 3 4 3 1 2 4 3 3 4 1 8 0 10 6 6 3 3 8 1 6 7 9 8 2 3 1 2 1 1 2 3 1 5 0 8 6 2 7 1 6 4 3 1 1 2 3 2 1 1 6 0 9 7 9 1 5 5 2 3 5 7 3 3 3 1 1 2 2 5 3 3 3 5 1 8 0 8 4 8 2 8 6 7 1 6 3 3 1 3 2 2 2 1 1 7 0 6 8 3 1 9 3 5 1 1 2 1 2 2 2 1 6 0 7 3 5 1 1 5 8 7 3 1 1 2 3 1 1 2 5 2 5 4 1 1 4 1 5 3 3 4 1 6 0 9 5 7 1 4 1 5 6 1 1 3 1 1 3 1 2 1 6 0 9 1 3 1 3 8 7 1 6 8 2 2 1 1 3 1 1 9 0 11 1 1 3 2 2 6 9 6 4 4 3 1 1 3 3 1 1 3 1 2 1 4 3 3 3 7 1 7 0 9 1 9 2 4 8 1 5 5 4 2 1 1 3 1 2 2 1 9 0 11 9 7 9 1 6 1 4 8 6 8 3 1 1 3 3 3 2 2 3 1 1 5 0 7 3 9 1 8 6 8 1 1 1 2 2 2 2 4 5 2 1 2 2 3 7 1 5 0 9 2 1 5 7 3 8 2 9 1 2 1 2 2 1 1 9 0 6 2 9 6 6 6 1 1 1 3 3 2 2 1 2 1 1 9 0 11 1 4 1 8 7 5 1 5 6 5 9 1 3 3 2 1 1 3 1 2 3 3 4 1 2 3 2 3 6 1 8 0 11 4 5 9 8 4 1 4 4 2 2 3 2 1 2 2 2 2 1 1 1 5 0 7 3 1 2 8 5 2 2 2 3 3 2 1 1 9 0 10 2 4 9 5 1 2 1 7 4 1 3 1 1 1 2 2 1 1 1 5 2 5 2 5 1 3 5 1 6 0 6 1 6 3 2 9 1 1 2 1 2 1 3 1 7 0 8 2 8 1 3 7 4 4 3 1 2 1 3 3 1 3 1 8 0 10 1 2 7 7 8 4 5 4 5 4 2 3 1 1 1 3 1 3 3 1 4 4 1 3 6 5 5 4 3 4 1 6 0 8 3 5 3 7 1 5 8 1 3 2 1 1 2 1 1 9 0 8 1 3 1 2 1 1 5 3 3 1 3 2 2 2 1 3 1 1 8 0 6 6 5 6 1 9 9 2 2 3 2 2 1 2 1 3 3 4 1 3 6 1 6 0 8 3 8 2 7 7 6 6 1 1 2 3 2 2 1 1 6 0 6 1 9 4 5 4 1 2 2 1 1 2 2 1 5 0 8 9 5 3 1 6 2 5 3 1 3 3 3 2 3 4 2 4 4 2 3 5 1 5 0 9 6 2 8 1 1 4 7 6 6 1 2 2 1 2 1 6 0 10 1 6 6 7 1 7 9 2 6 2 3 3 3 1 1 1 1 5 0 8 6 2 1 2 5 1 5 8 3 1 3 1 2 1 2 3 3 3 3 6 1 7 0 11 1 1 3 9 3 5 3 3 1 8 4 1 3 2 2 2 3 2 1 7 0 6 1 9 9 4 1 1 2 1 1 2 1 3 1 1 9 0 10 5 1 5 5 4 3 1 8 2 9 2 1 2 1 1 1 1 2 1 4 5 2 5 1 1 3 7 1 8 0 11 1 7 6 3 1 5 9 3 3 5 3 3 1 3 1 1 3 3 1 1 6 0 11 5 1 6 7 3 7 1 4 5 2 7 3 2 3 3 1 3 1 7 0 9 1 3 3 1 9 7 2 9 8 2 2 3 1 2 2 1 5 1 2 4 4 1 1 1 5 7 1 5 3 3 5 1 8 0 8 1 1 4 7 6 5 6 3 1 1 2 2 2 1 1 1 1 6 0 9 4 5 6 8 7 7 1 1 5 3 3 1 2 1 1 1 6 0 9 5 5 1 1 5 2 3 1 6 1 2 2 3 2 3 4 2 4 2 2 3 7 1 9 0 11 8 7 5 5 3 9 1 9 7 6 8 1 2 2 1 3 2 3 3 2 1 9 0 6 1 3 4 4 5 6 1 1 3 3 1 1 3 2 1 1 5 0 6 6 2 9 4 6 1 1 1 2 3 3 3 4 3 3 2 1 1 3 6 1 9 0 11 7 6 3 2 1 1 7 1 8 8 3 1 1 1 2 2 3 3 3 2 1 7 0 7 8 1 1 5 5 7 7 3 1 3 1 2 1 3 1 6 0 7 1 7 8 3 9 1 6 3 2 1 1 1 1 5 2 3 3 3 4 3 4 1 7 0 6 1 6 9 1 8 1 1 1 2 1 2 1 2 1 5 0 6 8 2 8 1 9 8 3 3 1 2 3 1 6 0 6 1 5 5 6 1 5 1 1 3 2 1 3 3 5 3 1 3 7 1 8 0 10 9 2 1 1 7 8 5 2 6 1 3 1 2 3 3 1 1 1 1 6 0 9 6 2 5 1 7 1 3 5 4 2 1 1 1 3 2 1 5 0 6 5 1 7 5 5 5 1 2 3 1 1 1 5 2 2 5 1 3 4 7 7 5 4 3 5 1 9 0 7 8 2 2 4 1 9 1 2 2 2 2 2 3 2 2 1 1 7 0 9 1 8 3 9 8 2 3 3 3 1 3 3 3 3 2 3 1 6 0 11 8 7 2 5 1 2 9 3 2 1 4 3 2 1 1 3 3 2 3 5 1 1 3 5 1 7 0 11 8 7 6 2 6 1 8 1 7 6 2 1 3 1 3 3 2 1 1 7 0 7 2 2 5 1 3 1 3 1 3 3 3 1 1 1 1 6 0 9 5 6 2 5 5 1 3 4 7 3 2 1 1 2 3 2 1 2 2 4 3 7 1 8 0 7 1 6 7 5 5 8 1 1 2 1 3 1 3 3 2 1 9 0 10 8 4 2 1 3 2 3 5 5 8 1 3 2 2 3 1 2 3 3 1 5 0 10 3 3 1 8 7 2 4 4 5 3 3 2 1 3 2 3 3 2 1 5 2 2 3 7 1 6 0 10 1 9 2 6 8 8 8 6 6 1 1 3 2 3 3 2 1 8 0 8 8 8 1 7 5 1 9 5 2 1 3 3 2 1 1 2 1 8 0 9 5 4 6 3 1 4 6 1 6 3 3 2 1 1 3 2 3 2 3 1 2 3 1 3 3 5 1 5 0 11 2 7 1 9 1 1 1 7 1 2 5 3 2 1 1 3 1 5 0 10 4 9 4 7 9 7 7 1 8 1 1 3 3 3 3 1 7 0 6 4 1 9 6 1 2 3 2 2 1 3 1 2 1 1 2 2 2 4 3 6 5 3 5 5 7 3 4 5 3 4 1 7 0 9 1 8 4 6 4 9 3 4 1 3 1 2 3 3 2 1 1 6 0 9 4 5 6 4 5 1 4 5 3 1 1 2 2 1 1 1 8 0 7 8 1 9 5 9 5 5 2 2 3 1 2 1 2 1 5 1 2 3 3 7 1 5 0 9 8 2 6 1 4 1 5 3 4 3 3 1 1 3 1 9 0 6 4 2 1 4 8 2 1 2 3 2 1 2 3 1 3 1 7 0 7 3 9 1 7 5 1 2 3 3 1 2 1 3 3 1 2 4 3 5 4 1 3 7 1 5 0 7 4 9 4 9 9 7 1 3 1 3 3 1 1 5 0 10 1 6 6 9 7 1 9 1 5 8 1 3 3 1 1 1 7 0 6 1 9 8 3 4 6 1 1 3 3 1 1 1 5 3 1 2 3 1 5 3 6 1 5 0 10 7 8 3 4 6 6 4 7 6 1 1 1 2 2 2 1 8 0 9 7 9 6 1 1 5 6 3 6 3 2 1 1 2 2 3 3 1 5 0 11 5 1 7 9 1 5 3 1 8 3 1 2 1 1 1 1 5 1 3 2 3 1 4 3 2 4 2 4 5 3 7 1 8 0 8 3 8 6 4 1 2 4 8 2 3 1 3 3 3 3 1 1 8 0 10 5 7 8 6 4 8 7 1 1 3 1 1 2 2 3 1 1 2 1 9 0 8 8 6 9 2 1 3 7 1 1 3 3 2 1 1 2 1 3 4 1 2 1 3 3 1 3 7 1 7 0 7 2 3 8 8 8 5 1 2 2 3 1 1 3 2 1 8 0 8 1 3 9 4 2 3 2 1 1 1 1 1 2 2 3 3 1 7 0 7 1 8 1 3 8 4 9 2 1 3 2 1 1 1 2 4 1 3 2 4 1 3 6 1 9 0 8 1 8 9 6 7 8 6 1 1 2 2 1 1 2 3 1 1 1 5 0 9 5 3 3 7 1 6 4 1 3 2 1 3 2 1 1 9 0 8 5 3 2 2 1 7 3 9 3 3 2 3 1 3 1 3 3 2 2 2 4 3 3 3 7 1 5 0 8 7 4 1 8 6 7 1 6 1 1 3 3 2 1 6 0 11 4 7 6 8 5 7 1 3 6 5 2 2 2 3 1 1 1 1 9 0 6 3 1 4 5 6 1 2 1 3 2 1 3 2 1 3 3 3 2 2 4 2 1 6 5 2 2 1 4 5 3 6 1 6 0 9 6 9 4 4 8 1 2 9 7 3 1 2 1 1 1 1 9 0 10 3 4 5 4 2 1 4 9 1 4 3 2 3 3 3 3 1 3 2 1 9 0 9 9 7 4 6 4 8 7 6 1 1 1 2 1 3 1 3 2 3 3 1 3 4 2 1 3 5 1 9 0 9 4 9 9 8 1 6 4 7 6 3 1 2 2 3 1 1 3 1 1 5 0 7 8 1 9 8 8 1 6 2 2 3 1 2 1 8 0 6 1 7 3 3 2 1 1 2 1 3 1 2 2 3 2 2 3 5 2 3 5 1 7 0 11 9 2 9 4 6 7 5 1 2 3 5 1 2 3 3 2 3 1 1 8 0 9 1 1 5 8 1 7 3 5 8 1 3 3 2 2 1 2 1 1 9 0 9 9 4 7 9 4 2 5 6 1 1 2 2 2 1 2 3 1 1 3 2 1 5 4 3 6 1 8 0 8 7 8 8 1 4 6 5 1 2 2 3 2 2 3 2 1 1 6 0 11 8 9 4 1 1 4 9 2 6 4 9 2 1 3 1 1 2 1 7 0 7 5 9 8 6 9 1 1 1 1 2 2 2 1 1 1 5 2 3 3 1 1 6 2 4 4 5 4 3 5 1 5 0 7 8 7 1 9 2 5 6 3 2 1 3 1 1 9 0 9 2 8 8 1 3 2 5 2 1 3 2 3 1 3 1 3 2 3 1 7 0 10 5 4 2 5 1 2 1 8 1 8 3 2 1 1 3 1 1 3 3 5 3 1 3 5 1 5 0 8 4 1 1 7 1 9 5 9 1 1 3 2 3 1 6 0 11 8 4 1 8 6 1 1 4 9 6 3 1 2 1 2 2 3 1 6 0 11 9 1 3 7 2 9 7 8 7 3 3 1 2 1 1 2 3 5 3 5 2 1 3 7 1 5 0 7 1 9 3 5 8 5 4 2 1 2 2 2 1 9 0 10 1 9 9 1 6 6 9 4 1 1 1 3 3 1 2 1 2 3 1 1 9 0 11 3 5 3 1 4 7 7 4 8 7 8 2 2 1 2 1 1 3 2 3 5 5 1 2 2 4 3 3 5 1 8 0 8 4 4 1 9 5 7 5 1 3 2 2 2 1 1 1 1 1 8 0 11 2 9 4 5 5 6 5 8 1 1 6 1 1 1 3 3 2 1 2 1 5 0 10 9 2 7 6 5 7 1 3 1 8 1 1 1 1 2 3 1 2 1 3 3 7 1 5 0 8 1 9 5 6 7 9 2 7 3 3 1 2 1 1 7 0 6 1 1 6 1 2 4 2 1 3 1 3 2 1 1 7 0 9 8 4 2 1 6 1 6 3 7 1 3 1 1 3 3 1 3 5 1 5 1 4 2 7 1 2 5 4 3 3 5 1 7 0 7 1 4 8 5 5 7 4 3 1 1 2 3 2 2 1 6 0 10 3 4 5 1 2 1 1 8 7 6 3 2 3 3 1 2 1 7 0 7 9 2 3 6 1 3 3 2 2 1 2 2 1 2 4 5 3 3 3 3 5 1 7 0 11 1 6 9 2 5 9 4 1 2 2 1 3 2 1 1 2 1 3 1 6 0 6 5 2 1 3 9 1 1 3 2 1 3 2 1 6 0 10 1 7 1 9 8 8 3 6 5 6 1 3 2 3 1 2 1 3 5 5 3 3 5 1 5 0 11 1 8 2 9 4 9 2 7 5 4 5 1 3 2 1 2 1 9 0 8 7 1 1 1 5 6 9 8 2 1 2 3 2 2 1 1 1 1 7 0 6 1 2 4 2 6 1 3 2 3 3 2 1 1 3 1 1 3 4 3 4 1 9 0 11 9 7 3 1 1 4 8 3 6 1 3 2 3 2 3 3 2 1 3 1 1 6 0 7 3 1 3 6 1 5 1 3 1 1 3 1 3 1 5 0 8 6 7 1 6 7 1 5 6 1 1 2 1 2 1 1 4 4 5 3 3 4 4 3 6 1 6 0 9 9 3 9 4 1 1 2 3 5 2 3 3 1 1 1 1 9 0 6 1 2 7 3 4 4 1 1 2 3 3 1 1 1 1 1 6 0 8 5 7 1 2 3 6 8 9 1 2 1 2 3 1 1 1 2 3 2 3 3 7 1 8 0 8 6 5 4 5 2 2 2 1 3 2 2 2 2 1 1 1 1 9 0 11 5 8 7 5 3 9 5 9 1 8 1 1 2 1 1 3 2 1 2 3 1 8 0 10 7 3 3 2 1 7 3 4 6 1 1 3 2 2 3 1 1 3 5 2 3 2 3 2 2 3 5 1 9 0 10 8 6 7 8 5 7 1 8 6 5 1 1 1 1 2 2 3 1 3 1 9 0 10 2 3 9 1 8 2 1 4 8 1 1 2 2 1 3 3 1 2 1 1 9 0 6 1 1 1 2 5 7 3 2 1 3 1 1 1 1 1 2 3 3 1 2 3 7 1 6 0 11 8 3 3 1 9 1 4 4 4 1 6 2 1 3 3 3 2 1 6 0 11 9 1 3 1 6 8 2 5 7 2 3 1 2 1 2 3 3 1 5 0 8 2 4 9 6 1 4 8 5 2 1 3 2 3 3 2 3 1 2 2 1 1 3 4 1 4 3 3 5 1 9 0 11 9 6 4 4 6 1 7 3 9 3 4 3 3 1 1 3 3 1 1 2 1 7 0 9 9 3 5 9 1 8 2 2 7 3 1 2 2 1 2 2 1 5 0 7 1 2 9 7 4 2 5 3 1 3 2 3 2 3 2 1 1 3 4 1 8 0 6 7 1 3 4 3 3 3 1 1 3 1 3 2 1 1 5 0 11 8 1 3 3 4 3 2 4 2 5 8 1 3 1 1 2 1 7 0 9 2 1 5 8 6 7 3 7 9 3 3 2 1 2 3 1 2 4 1 1 3 7 1 7 0 10 7 1 9 2 4 9 7 4 3 9 3 1 2 3 3 3 3 1 9 0 11 6 3 9 4 2 8 3 9 9 1 1 2 2 2 2 1 1 1 1 1 1 9 0 10 2 4 5 1 5 9 2 8 8 8 3 1 2 1 1 1 1 1 3 5 3 4 4 5 4 1 3 6 1 7 0 9 2 8 1 6 4 1 2 8 3 3 2 1 3 3 3 1 1 7 0 10 2 1 1 2 6 3 2 5 2 6 3 1 1 3 2 2 2 1 5 0 9 1 6 7 6 4 2 1 3 1 2 3 1 1 2 1 2 5 2 5 5 1 4 3 8 7 4 6 3 5 3 3 7 1 5 0 11 2 1 7 5 9 6 3 6 3 3 4 2 2 1 2 1 1 5 0 11 5 1 1 4 4 3 1 3 9 6 9 2 2 1 1 3 1 7 0 6 1 9 3 3 8 1 1 2 1 2 3 1 2 1 3 1 5 3 2 1 3 4 1 6 0 11 5 8 3 4 2 2 5 8 9 1 4 1 1 3 3 1 1 1 8 0 6 3 1 4 6 1 7 2 2 2 3 1 3 1 3 1 5 0 9 5 1 5 1 4 1 9 1 7 2 3 2 3 1 1 4 3 1 3 6 1 7 0 9 1 3 1 5 7 5 1 6 6 2 3 1 3 2 3 3 1 8 0 11 9 5 1 3 8 9 3 3 4 4 1 3 3 2 3 2 1 2 3 1 9 0 10 6 5 5 1 2 3 4 2 1 1 1 1 3 3 2 3 3 1 1 3 2 1 5 4 3 3 5 1 7 0 8 9 3 7 1 7 3 1 3 3 1 2 1 2 3 1 1 8 0 8 1 7 3 1 3 3 2 6 2 1 3 2 2 1 2 3 1 9 0 6 8 6 9 9 1 7 1 2 2 3 3 2 1 2 1 4 5 5 4 1 3 4 1 5 0 9 7 8 6 1 7 8 1 6 3 3 1 1 2 2 1 8 0 7 1 4 4 6 4 7 1 1 1 2 1 3 2 1 2 1 9 0 7 8 9 1 2 8 8 4 3 2 2 1 1 1 1 2 3 5 3 2 1 3 6 7 5 3 3 5 1 7 0 11 2 2 3 1 7 2 6 1 4 1 5 3 3 2 2 1 3 2 1 5 0 11 9 5 4 2 9 1 8 9 5 2 1 3 1 2 1 1 1 8 0 7 2 4 3 6 6 1 3 3 1 1 2 3 2 2 1 1 3 2 2 1 3 6 1 7 0 11 6 9 8 1 7 7 1 8 9 4 2 3 1 1 1 1 2 3 1 6 0 9 5 2 6 2 4 1 3 1 4 1 1 1 3 3 2 1 6 0 10 9 5 6 3 1 2 2 6 5 2 2 1 1 2 3 3 1 3 2 4 2 2 3 5 1 8 0 7 1 1 2 9 8 9 3 1 3 1 3 3 1 2 2 1 7 0 10 9 8 2 7 9 2 6 9 1 2 1 1 3 3 3 3 1 1 9 0 10 4 3 8 4 7 7 5 3 1 5 3 1 1 3 2 3 3 3 1 1 2 5 3 1 3 5 1 8 0 9 1 2 4 4 7 2 2 7 7 1 1 1 2 2 1 1 2 1 6 0 6 3 4 5 5 7 1 1 2 1 2 1 3 1 8 0 8 1 6 1 1 1 2 1 8 3 3 1 2 3 3 3 1 2 1 2 3 3 3 4 1 8 0 7 7 1 3 6 4 3 6 3 1 1 3 2 3 1 3 1 9 0 11 1 8 2 1 4 1 8 7 4 8 9 2 1 3 1 1 3 1 1 3 1 6 0 7 5 1 6 2 7 7 8 2 2 2 3 1 3 5 4 1 3 3 1 3 5 5 3 6 1 5 0 9 2 8 1 5 7 1 7 7 4 1 1 3 1 1 1 9 0 6 8 3 9 8 7 1 2 1 3 2 2 2 1 1 1 1 9 0 6 5 4 6 4 7 1 3 3 3 3 2 1 3 2 2 5 3 1 3 3 4 3 4 1 9 0 7 1 5 5 7 1 6 4 3 1 3 1 2 3 3 1 3 1 5 0 6 9 9 3 5 3 1 2 3 1 2 1 1 5 0 11 9 3 6 3 1 5 1 3 1 8 4 1 1 2 3 2 2 3 2 5 3 7 1 9 0 11 8 7 1 1 7 1 5 6 1 2 8 3 3 1 3 2 2 2 2 2 1 5 0 10 7 3 3 8 8 5 5 3 1 1 3 1 3 1 1 1 5 0 8 4 8 9 1 8 1 5 2 2 2 1 3 1 3 4 3 2 4 4 5 3 6 1 5 0 8 7 9 7 1 1 3 9 2 2 1 3 2 1 1 8 0 7 9 4 1 4 7 5 4 2 2 1 3 3 2 3 3 1 6 0 11 9 1 9 8 8 9 2 5 4 1 4 2 1 3 1 3 3 2 1 1 5 5 4 3 6 1 6 0 10 3 5 2 1 6 1 5 3 8 4 1 2 2 2 1 1 1 7 0 6 2 2 5 9 1 7 2 3 1 2 1 1 3 1 6 0 6 9 4 1 8 1 1 2 1 2 2 1 1 4 2 5 1 4 3 6 3 5 2 4 5 4 3 6 1 8 0 11 6 1 7 1 8 1 2 6 7 6 7 1 1 3 1 2 2 1 2 1 7 0 6 3 3 1 8 2 3 2 3 1 2 1 2 1 1 9 0 6 1 3 9 6 4 8 1 2 3 1 3 2 1 2 1 4 5 2 5 4 4 3 7 1 8 0 7 1 3 7 6 1 4 1 3 1 2 3 2 1 1 2 1 9 0 9 5 2 9 5 2 4 1 8 6 1 3 2 1 2 1 3 2 1 1 6 0 8 1 7 2 1 7 9 2 8 2 3 1 2 1 3 3 3 4 1 3 4 1 3 6 1 8 0 6 6 5 7 1 1 8 3 2 1 1 2 1 1 2 1 7 0 7 1 1 1 2 6 5 6 2 1 1 3 3 2 2 1 5 0 7 1 2 4 9 2 3 5 1 3 1 1 1 4 4 4 5 1 5 3 4 1 6 0 9 1 7 7 2 8 4 1 9 9 1 2 3 2 1 1 1 6 0 11 1 4 5 9 9 3 2 1 4 1 5 1 2 3 2 1 1 1 8 0 7 6 1 6 4 2 7 4 3 2 3 2 3 1 1 1 1 2 2 1 3 4 1 5 0 9 5 5 9 1 1 9 4 3 9 2 1 1 1 1 1 9 0 6 1 1 1 8 6 6 1 3 3 3 3 2 3 3 1 1 6 0 11 1 1 9 1 9 4 3 2 1 7 7 2 3 2 1 1 1 5 5 2 2 4 3 5 1 4 4 3 6 1 6 0 10 8 6 5 7 4 1 7 4 2 1 3 2 1 3 2 2 1 7 0 7 3 3 5 5 1 1 8 3 1 2 3 1 2 1 1 7 0 10 4 1 3 4 6 1 7 5 3 7 3 1 1 3 2 1 3 4 2 3 4 3 2 3 4 1 9 0 11 6 2 4 1 2 7 3 4 2 4 9 3 3 1 1 1 3 3 3 3 1 7 0 8 5 2 2 8 1 2 1 1 2 3 1 1 3 1 1 1 9 0 8 4 1 2 2 5 9 8 8 2 2 1 1 3 2 1 1 1 1 3 2 1 3 5 1 5 0 10 5 4 7 4 2 1 1 3 5 4 2 1 2 2 1 1 9 0 8 2 7 7 3 1 8 5 7 3 1 2 3 2 3 2 2 1 1 5 0 10 9 8 1 2 5 5 7 1 5 9 3 3 3 1 3 5 2 2 1 1 3 6 1 5 0 10 3 5 1 1 9 5 7 1 1 6 2 1 1 1 1 1 6 0 7 2 5 1 4 5 7 5 1 3 3 1 1 3 1 5 0 10 9 9 1 1 5 8 3 5 4 1 3 1 1 3 2 1 5 2 1 2 4 4 2 2 3 5 3 3 7 1 6 0 11 7 5 6 2 7 2 1 5 2 7 1 2 1 2 3 2 1 1 5 0 9 8 3 8 4 2 4 6 1 1 2 2 2 3 1 1 6 0 6 1 5 5 6 6 2 1 1 1 1 3 3 2 1 1 1 5 4 3 3 4 1 9 0 8 6 5 2 1 9 5 4 1 1 2 2 1 1 2 1 1 1 1 9 0 7 1 1 1 4 7 9 7 1 2 2 1 1 1 1 1 2 1 9 0 7 1 3 1 3 2 3 7 3 3 1 2 1 3 1 3 1 3 4 1 5 3 4 1 5 0 10 1 7 9 2 2 2 2 2 8 8 3 1 2 2 2 1 9 0 7 9 2 3 1 3 1 1 2 2 1 3 3 1 2 1 3 1 7 0 7 1 5 2 9 1 5 6 2 1 1 3 2 1 1 2 5 4 5 3 6 1 7 0 7 2 5 1 5 2 1 9 2 1 3 1 1 2 1 1 8 0 7 2 1 6 1 3 8 2 2 3 1 1 3 1 1 1 1 6 0 6 6 4 5 8 1 9 1 1 1 2 3 1 5 1 2 1 3 2 3 6 1 9 0 6 1 2 3 8 7 8 2 1 2 1 3 2 3 1 1 1 8 0 10 4 3 5 7 5 5 6 3 1 4 2 1 3 2 1 2 2 3 1 6 0 10 1 3 9 8 9 2 3 7 3 6 1 2 1 1 1 1 4 2 2 5 3 2 5 2 5 1 5 6 6 2 5 5 3 6 1 7 0 6 6 2 1 7 1 4 1 3 3 1 3 3 2 1 9 0 10 6 5 8 6 2 3 9 6 1 4 2 3 3 1 2 3 2 1 1 1 7 0 11 4 7 2 5 3 2 1 1 4 4 3 2 3 3 3 1 3 2 4 3 1 5 3 3 3 4 1 6 0 9 4 3 5 8 1 5 2 3 1 1 3 2 3 1 1 1 6 0 6 9 8 1 3 8 9 2 1 1 1 3 3 1 6 0 8 6 2 1 5 7 1 1 6 2 1 1 2 2 3 4 2 2 5 3 4 1 8 0 9 8 1 6 5 1 8 9 2 5 2 1 2 2 1 1 2 2 1 7 0 6 4 1 3 4 7 1 1 1 1 1 1 1 1 1 7 0 10 5 4 9 1 2 6 6 2 6 5 1 3 2 3 2 2 2 5 2 4 1 3 7 1 9 0 8 8 6 4 5 4 4 9 1 3 1 1 2 1 1 3 3 3 1 6 0 9 6 6 4 3 9 2 9 5 1 3 1 2 3 1 1 1 6 0 9 6 7 4 5 6 7 5 1 5 1 2 3 1 3 1 3 5 2 5 1 3 3 3 6 1 7 0 11 5 8 3 7 1 8 5 3 5 3 6 3 2 2 3 1 2 1 1 7 0 7 7 6 3 1 3 2 8 3 2 2 1 1 3 3 1 6 0 10 1 5 9 4 4 7 9 2 2 1 3 2 3 1 3 3 1 3 5 5 4 2 3 3 2 2 5 4 4 3 5 1 5 0 6 9 9 3 1 7 8 2 1 1 1 2 1 9 0 7 1 5 9 9 5 1 1 2 2 1 2 3 1 2 1 2 1 6 0 7 7 4 7 8 4 1 1 1 3 2 2 2 1 3 4 3 5 5 3 4 1 9 0 10 3 4 6 1 1 3 3 8 8 7 3 1 2 1 2 3 1 2 3 1 5 0 7 8 5 8 3 5 4 1 1 2 1 1 3 1 5 0 10 1 6 4 9 1 2 2 4 3 7 1 3 3 2 1 2 4 1 1 3 6 1 5 0 11 4 3 2 3 3 6 9 6 1 5 6 3 1 3 1 2 1 9 0 7 8 6 9 4 2 1 4 1 3 2 1 3 1 1 3 1 1 6 0 11 6 1 7 1 1 5 7 4 1 5 5 1 3 1 3 1 1 2 4 5 3 2 2 3 4 1 7 0 9 1 4 4 4 4 4 5 1 1 3 1 2 1 2 3 1 1 8 0 10 5 8 9 3 5 6 1 4 9 1 3 3 2 3 1 1 3 1 1 6 0 10 2 9 9 7 1 2 1 9 1 1 3 2 2 3 1 1 4 5 1 3 4 2 2 6 4 4 3 5 1 8 0 10 1 9 3 1 8 3 1 3 4 4 1 2 2 2 3 3 2 2 1 5 0 8 7 1 7 8 7 2 9 4 2 2 1 1 2 1 7 0 9 8 1 5 5 9 2 9 1 5 3 2 2 1 2 1 2 3 4 1 2 4 3 4 1 5 0 10 4 4 4 1 9 7 8 8 1 8 1 1 3 3 2 1 6 0 11 4 4 6 8 6 3 8 6 1 9 1 1 1 1 1 1 2 1 8 0 11 4 1 8 2 8 4 5 1 3 3 6 3 3 1 3 2 2 3 1 2 1 1 5 3 6 1 9 0 8 1 3 9 9 8 2 9 7 2 1 3 1 3 2 1 3 1 1 8 0 7 1 6 6 1 8 5 1 1 2 3 2 1 2 3 2 1 6 0 9 5 5 5 2 8 1 1 8 8 3 1 1 1 1 1 5 1 5 1 3 5 3 4 1 9 0 8 6 1 5 7 5 5 3 5 1 3 1 1 2 3 1 2 2 1 7 0 8 9 4 7 9 1 5 7 6 1 2 1 1 1 3 3 1 6 0 10 4 8 4 8 8 6 1 5 6 6 1 2 1 3 3 2 3 1 4 2 1 2 3 1 4 3 3 4 1 8 0 6 2 8 2 8 1 9 3 1 1 2 2 1 1 2 1 5 0 10 7 3 1 9 6 3 1 5 7 2 2 1 1 3 1 1 5 0 9 7 9 1 3 1 1 4 3 5 1 1 3 1 1 2 3 3 2 3 6 1 9 0 6 3 9 8 1 3 3 2 2 3 3 3 1 2 3 2 1 7 0 10 9 1 8 5 3 1 5 3 1 4 2 2 1 1 2 2 2 1 6 0 11 4 5 3 7 4 1 1 9 5 3 3 1 1 3 3 3 3 1 1 1 4 2 3 3 5 1 8 0 9 7 1 7 6 2 2 9 1 6 1 1 1 1 2 1 2 1 1 7 0 7 8 8 6 1 6 7 5 2 2 2 2 1 2 2 1 7 0 8 3 6 4 3 8 1 3 7 2 3 1 2 2 1 2 3 4 2 4 1 3 4 1 6 0 7 1 8 9 3 2 6 8 3 1 3 2 2 1 1 6 0 10 1 5 8 4 6 2 7 9 7 7 3 1 2 2 1 3 1 6 0 8 1 7 9 8 4 3 1 7 1 2 2 1 2 1 5 1 2 1 5 6 3 5 5 3 7 1 9 0 6 5 1 8 4 1 5 3 1 1 1 2 3 1 2 1 1 7 0 11 9 1 2 3 8 4 3 1 9 9 9 1 3 3 3 1 3 2 1 6 0 10 7 7 1 4 4 9 6 1 7 6 1 1 2 1 2 3 3 4 3 3 4 1 4 3 6 1 7 0 6 8 9 6 3 1 1 2 2 1 1 3 1 1 1 6 0 11 2 3 1 3 9 3 1 6 1 6 2 1 2 3 1 2 1 1 6 0 9 2 3 5 1 8 7 2 6 5 3 3 2 2 1 3 3 1 2 4 1 4 3 7 1 5 0 10 7 2 3 8 7 1 4 7 8 1 3 1 2 3 2 1 7 0 8 1 7 4 1 4 9 1 4 2 2 1 3 1 1 3 1 7 0 11 4 7 8 4 2 1 2 3 9 7 8 1 3 2 1 3 2 1 5 2 5 3 4 2 2 3 6 1 6 0 7 3 4 1 7 8 9 8 2 2 1 3 2 1 1 8 0 11 6 4 2 7 2 1 5 1 4 5 7 3 2 3 2 2 2 1 3 1 6 0 11 2 7 2 7 9 1 3 9 6 6 5 3 1 3 1 3 2 5 1 4 3 2 2 3 4 1 5 0 11 7 8 3 3 8 4 4 1 3 2 7 2 3 1 2 1 1 6 0 11 1 1 1 4 9 2 7 9 6 3 4 1 3 3 3 1 3 1 8 0 10 5 1 7 1 1 3 6 1 7 7 3 3 1 3 2 2 2 1 1 1 3 3 4 5 1 3 2 4 5 3 5 1 7 0 7 2 2 2 9 6 9 1 2 2 1 3 2 2 1 1 9 0 10 2 3 4 1 9 5 5 8 9 5 2 1 2 1 1 2 1 1 1 1 5 0 10 5 2 4 7 8 7 1 6 8 8 1 2 1 2 3 1 3 3 3 2 3 6 1 7 0 11 9 9 4 5 4 8 1 5 1 2 3 2 3 3 1 1 1 1 1 5 0 8 7 8 9 1 6 2 3 8 1 2 2 3 2 1 7 0 7 4 9 6 7 6 6 1 3 1 3 3 1 2 1 4 5 1 2 1 1 3 6 1 6 0 9 9 1 5 1 8 5 8 3 5 3 1 1 3 3 2 1 7 0 9 8 5 6 6 8 5 1 3 4 3 2 2 3 1 2 1 1 9 0 7 3 8 6 9 1 3 4 1 1 2 3 1 3 2 1 3 3 4 2 3 1 1 3 4 1 6 0 7 1 6 6 6 1 1 5 1 1 3 1 2 1 1 8 0 9 4 8 7 7 1 3 2 5 5 2 3 2 1 2 3 2 1 1 5 0 9 3 4 4 7 4 8 5 8 1 1 3 3 1 1 1 4 4 1 6 6 4 2 1 3 5 6 2 5 5 3 5 1 9 0 8 7 1 2 3 1 3 3 3 1 3 1 2 3 1 1 3 1 1 8 0 10 2 3 9 1 7 1 4 7 6 9 3 1 1 2 1 3 2 1 1 9 0 9 8 7 8 1 1 6 2 3 5 1 1 3 2 1 2 1 1 2 5 5 2 1 1 3 4 1 7 0 7 2 1 8 2 1 7 3 3 1 3 1 2 3 1 1 8 0 11 1 7 6 5 2 9 5 4 9 9 3 2 3 1 2 3 2 2 3 1 9 0 9 5 8 9 8 5 8 1 7 1 1 3 1 1 1 2 1 1 3 5 1 5 2 3 6 1 6 0 10 3 6 4 7 4 1 1 8 8 3 1 2 3 1 3 2 1 7 0 6 7 3 5 1 5 1 1 2 1 1 1 2 1 1 8 0 8 9 1 9 2 7 3 3 7 1 1 1 2 3 1 2 1 1 5 3 5 3 3 3 7 1 8 0 11 7 1 5 9 3 2 1 9 3 9 6 1 1 2 3 2 2 3 1 1 8 0 7 1 9 8 1 8 6 4 2 1 3 2 2 3 2 1 1 7 0 11 1 5 7 8 9 1 7 5 3 1 7 2 1 3 1 1 1 1 5 5 3 4 2 1 2 3 5 1 8 0 10 2 3 9 5 6 3 3 2 8 1 2 2 3 1 3 1 1 1 1 7 0 9 1 5 9 2 1 1 4 6 7 1 3 1 3 3 1 1 1 5 0 9 1 6 5 1 5 8 3 4 2 1 3 3 1 1 4 5 1 1 4 5 1 7 1 4 5 5 3 4 1 5 0 11 1 9 6 5 2 4 5 8 5 7 7 1 1 2 3 3 1 9 0 10 9 5 9 1 8 2 3 7 6 4 1 2 1 2 3 1 3 3 3 1 7 0 6 1 6 2 6 9 1 2 3 3 1 2 1 3 3 2 3 3 3 6 1 9 0 11 1 8 1 6 4 9 6 4 9 6 1 1 1 3 2 2 2 2 1 3 1 9 0 10 1 2 6 1 3 8 7 4 6 9 1 1 2 3 2 1 3 2 3 1 6 0 11 1 7 6 7 5 9 8 8 6 7 6 1 2 3 1 1 1 3 5 5 2 4 3 3 4 1 5 0 9 9 1 7 1 2 8 4 2 2 1 3 2 3 2 1 8 0 6 1 9 4 1 2 1 3 1 2 3 1 2 1 3 1 5 0 7 7 8 6 9 8 4 1 2 1 1 2 1 1 4 4 1 3 6 1 7 0 8 5 1 5 7 6 6 2 1 3 2 2 1 2 2 1 1 6 0 10 7 2 7 9 2 5 5 1 4 2 1 3 1 1 1 3 1 9 0 9 5 3 5 6 3 1 9 2 2 1 1 1 1 2 3 3 1 1 4 2 3 2 2 1 3 6 1 9 0 10 1 8 8 2 7 1 5 9 2 6 3 3 1 2 2 2 1 1 1 1 9 0 7 9 8 9 7 8 1 1 2 1 2 1 1 1 2 3 1 1 8 0 6 2 1 2 8 8 8 1 3 1 3 2 2 2 3 4 3 4 1 5 5 6 4 1 2 2 5 5 3 6 1 9 0 8 2 3 1 1 1 1 6 1 1 2 2 2 2 3 3 1 1 1 8 0 11 7 8 9 5 4 4 3 3 1 9 3 1 1 1 1 1 1 3 2 1 6 0 10 2 9 1 1 3 5 6 5 5 8 2 3 1 1 3 1 1 1 5 5 5 2 3 5 1 7 0 8 9 8 1 1 3 6 8 7 1 2 1 2 3 3 3 1 6 0 9 3 8 6 7 5 3 7 1 7 2 2 2 1 1 1 1 5 0 7 3 2 4 8 8 1 2 1 1 3 2 1 5 4 5 2 4 3 6 1 9 0 7 1 1 1 2 9 9 5 3 3 1 2 3 3 2 2 1 1 7 0 10 6 1 7 5 5 3 4 8 4 9 2 3 1 2 1 1 1 1 7 0 11 7 1 4 3 1 1 3 2 3 5 1 1 1 3 2 3 3 1 1 5 5 1 2 2 3 5 1 7 0 7 3 1 9 2 1 8 1 3 1 3 2 3 3 2 1 9 0 11 7 5 1 8 1 9 9 2 4 4 6 2 1 2 2 3 3 1 2 1 1 8 0 6 2 1 9 9 9 7 1 3 2 3 3 2 3 3 3 1 2 4 4 3 4 1 9 0 11 3 5 1 9 5 3 6 1 4 1 8 1 1 2 1 1 3 2 2 1 1 6 0 9 6 1 5 2 6 1 6 8 4 1 2 3 1 3 2 1 9 0 7 7 6 5 1 1 1 5 2 3 1 1 2 2 1 2 2 4 2 2 1 5 3 6 1 4 5 4 3 7 1 5 0 10 8 7 3 8 1 6 3 8 3 2 1 3 2 2 1 1 6 0 11 5 4 8 1 8 1 1 4 1 1 1 3 1 2 3 3 3 1 9 0 8 1 9 4 5 6 4 6 4 3 2 1 1 1 1 3 1 2 3 5 4 2 3 5 5 3 4 1 8 0 8 1 5 6 1 7 8 8 4 1 1 1 2 2 3 1 1 1 5 0 6 4 3 4 1 8 5 3 2 3 1 2 1 8 0 11 7 4 3 1 6 7 4 1 8 3 5 1 3 1 3 1 1 3 2 2 3 5 2 3 7 1 6 0 8 4 5 9 1 3 8 7 6 1 2 3 3 1 1 1 7 0 11 3 1 4 4 5 1 5 4 3 7 6 1 1 1 2 3 2 1 1 8 0 10 5 5 6 1 9 6 9 2 1 2 3 1 3 1 1 2 3 2 5 2 4 2 1 3 2 3 5 1 7 0 6 6 2 4 1 7 7 1 2 3 3 1 1 1 1 7 0 11 9 3 6 3 1 1 8 3 9 7 5 2 3 3 1 3 2 1 1 6 0 6 1 3 9 2 6 1 3 1 1 3 1 1 1 3 5 3 4 3 5 1 9 0 9 2 7 1 6 1 2 4 7 7 3 1 3 1 1 3 3 2 3 1 6 0 7 1 7 3 3 1 1 5 1 3 1 3 2 1 1 6 0 8 1 1 4 2 3 2 7 1 1 1 3 1 2 2 1 5 5 2 4 6 4 2 1 5 3 3 5 1 5 0 11 9 4 7 3 6 1 7 6 6 7 5 1 2 1 3 2 1 5 0 10 1 8 1 4 2 5 9 3 3 8 1 1 1 2 3 1 5 0 8 5 1 4 6 8 4 6 6 2 1 1 1 3 2 5 2 3 2 3 7 1 7 0 8 7 8 1 5 1 7 8 4 1 1 2 3 3 3 2 1 5 0 11 9 2 3 1 7 4 3 8 1 3 6 1 2 1 1 3 1 5 0 7 6 1 8 1 1 8 4 1 2 3 1 1 4 2 4 5 1 5 2 3 6 1 8 0 6 5 1 9 5 1 1 2 2 3 1 1 1 1 1 1 9 0 9 2 2 3 8 9 4 9 3 1 1 1 3 1 1 2 1 2 2 1 8 0 6 2 3 1 6 1 8 3 1 1 2 1 1 1 3 1 2 3 2 2 2 3 5 1 7 0 6 5 2 1 1 8 3 3 2 3 3 2 1 1 1 6 0 8 1 5 5 5 6 2 1 9 2 1 1 3 1 1 1 6 0 7 8 3 3 9 1 1 5 3 2 3 3 2 1 4 4 1 4 3 3 4 1 9 0 10 8 7 7 7 4 5 6 7 1 7 3 3 1 3 1 2 1 1 3 1 5 0 10 4 1 5 3 8 2 8 4 4 9 3 1 2 3 2 1 6 0 6 1 1 7 2 4 7 1 1 1 2 3 2 1 2 1 2 4 7 3 4 4 3 6 1 5 0 6 6 5 1 2 1 1 1 2 1 1 2 1 8 0 6 2 4 3 1 7 5 1 1 2 3 2 1 1 1 1 9 0 10 5 1 1 3 2 4 9 1 5 5 3 1 3 2 1 1 2 2 3 3 2 1 4 1 3 3 5 1 7 0 10 4 4 1 9 4 5 8 3 5 2 1 2 3 1 1 2 1 1 7 0 6 8 2 2 3 1 6 2 1 2 2 3 2 1 1 8 0 9 4 2 6 7 2 3 1 4 2 3 3 3 1 1 1 1 3 1 3 5 4 4 3 6 1 7 0 6 6 1 9 1 1 1 2 3 1 1 2 3 1 1 9 0 9 7 1 1 3 4 1 8 4 7 1 2 3 2 3 2 1 1 2 1 8 0 8 1 1 5 6 9 7 9 6 1 1 1 3 1 2 2 1 5 1 3 3 3 2 3 7 1 7 0 6 1 2 8 6 9 5 1 2 3 2 1 3 3 1 6 0 6 1 3 5 9 4 8 2 1 2 1 1 1 1 8 0 6 1 3 9 6 8 8 2 1 2 1 1 3 2 2 5 4 2 5 2 1 2 5 4 5 2 8 6 7 2 5 3 3 6 1 9 0 9 5 9 3 4 1 4 8 1 1 3 2 3 1 2 1 1 2 2 1 6 0 8 1 8 2 7 2 4 4 8 1 1 1 1 1 1 1 7 0 9 6 1 1 1 3 9 2 2 9 2 3 3 2 1 2 1 4 5 2 4 3 4 3 4 1 8 0 10 1 6 3 1 3 2 2 5 9 8 1 3 3 3 2 3 3 2 1 6 0 9 5 3 3 3 1 5 5 2 2 1 2 1 1 3 2 1 7 0 8 7 9 6 4 4 2 7 1 2 2 1 2 2 2 2 1 2 3 1 3 5 1 6 0 10 6 3 7 4 9 1 4 7 1 4 2 3 1 1 2 3 1 8 0 7 4 4 1 8 1 2 7 1 2 2 1 3 1 1 1 1 5 0 8 7 5 3 2 8 1 3 2 1 2 1 3 2 2 5 4 4 2 3 4 1 9 0 8 4 1 1 1 5 3 7 4 2 1 1 2 2 3 2 3 3 1 6 0 8 6 5 6 7 1 4 6 8 2 2 3 2 3 1 1 8 0 8 6 4 7 3 2 3 1 7 2 2 1 2 1 1 3 3 3 4 1 4 3 5 1 5 0 10 6 1 5 2 9 5 1 6 6 6 1 2 1 2 3 1 5 0 6 1 3 5 7 1 3 1 1 1 3 3 1 6 0 11 5 8 3 7 1 7 5 8 5 7 1 1 1 2 1 1 1 5 4 5 3 2 2 3 3 4 3 3 4 1 5 0 9 1 1 4 4 8 5 6 3 5 2 3 2 1 3 1 5 0 6 1 8 4 2 9 3 2 1 2 1 2 1 8 0 11 2 1 8 9 5 1 1 4 1 8 8 2 2 2 1 1 1 2 3 3 4 3 1 3 5 1 7 0 10 8 8 5 8 1 2 8 7 4 8 2 1 1 2 1 3 3 1 6 0 6 7 6 1 4 4 9 3 1 2 3 1 3 1 6 0 6 7 5 4 7 7 1 3 1 3 1 1 1 1 5 3 3 2 3 5 1 8 0 8 8 6 1 1 3 5 5 1 1 2 1 1 3 2 2 3 1 5 0 8 5 5 5 2 6 5 1 9 2 1 1 3 1 1 9 0 11 1 8 7 1 3 1 3 6 7 8 4 3 3 3 1 3 1 1 1 1 1 3 3 4 2 3 7 1 9 0 10 7 9 1 5 4 8 1 4 9 5 1 2 3 2 2 3 3 1 1 1 7 0 7 3 2 1 3 9 2 8 1 1 3 1 1 2 2 1 7 0 11 6 1 1 6 1 7 5 8 1 8 7 1 1 3 2 2 1 3 3 5 4 1 3 2 1 3 3 3 5 4 3 7 1 8 0 8 9 6 5 9 1 1 2 1 3 2 3 3 1 1 1 1 1 6 0 7 2 9 1 7 7 4 9 2 1 1 1 1 2 1 7 0 9 2 3 1 9 6 8 8 4 5 3 1 1 1 3 2 3 5 5 3 3 3 1 4 3 4 1 5 0 10 1 8 5 2 5 9 8 3 4 1 1 1 3 3 1 1 6 0 6 1 6 2 7 7 2 3 1 1 2 1 1 1 7 0 8 5 7 7 5 9 6 2 1 1 2 3 3 1 3 2 5 1 1 4 3 4 1 8 0 9 6 3 8 7 6 5 1 1 1 3 2 2 3 2 1 1 1 1 7 0 10 1 3 7 3 9 5 6 6 9 1 3 3 2 1 1 3 2 1 7 0 7 7 9 5 8 6 1 6 3 2 1 3 2 1 1 3 1 4 1 3 7 1 5 0 8 7 1 7 4 5 4 6 7 2 1 1 1 1 1 6 0 11 1 5 1 2 8 4 2 7 4 1 8 3 1 1 1 3 1 1 6 0 11 2 2 1 1 6 2 2 4 7 3 4 1 2 1 1 1 2 2 1 5 2 3 2 4 3 4 1 8 0 11 5 8 1 7 8 2 9 6 1 5 4 3 3 1 2 3 2 1 1 1 8 0 9 5 1 5 2 1 8 6 2 4 1 1 2 1 2 2 2 1 1 7 0 10 1 7 7 5 7 3 5 8 5 5 1 2 2 1 3 2 3 5 1 2 1 1 7 1 3 5 4 3 7 1 8 0 7 4 2 1 1 6 8 3 3 2 3 3 3 3 1 2 1 6 0 10 2 1 4 3 3 1 2 8 3 1 3 1 1 2 1 3 1 8 0 6 2 1 2 1 6 4 1 3 3 1 1 2 3 3 1 4 4 5 1 2 3 3 5 1 7 0 9 1 2 5 4 1 7 1 1 3 2 2 3 3 2 1 1 1 9 0 10 8 3 8 6 8 3 1 5 9 1 1 1 3 3 1 3 1 1 2 1 9 0 6 1 7 7 7 5 9 1 3 1 1 3 3 3 1 2 2 2 4 5 3 3 4 1 9 0 6 1 8 8 5 3 1 1 2 1 1 1 1 1 1 2 1 9 0 6 8 8 4 1 2 8 2 1 1 1 3 2 3 1 3 1 9 0 8 2 4 9 8 8 8 9 1 3 3 1 3 3 2 1 3 1 4 3 3 3 3 5 1 8 0 6 1 3 4 5 5 1 2 1 1 3 3 2 2 3 1 7 0 11 3 1 7 3 9 3 6 8 9 9 4 1 3 3 2 2 3 3 1 5 0 11 8 3 7 8 6 3 3 1 9 5 9 1 2 2 2 2 3 3 3 5 1 3 5 1 9 0 9 7 8 5 7 9 9 1 1 9 2 2 3 3 1 2 2 2 3 1 6 0 7 7 1 9 7 5 2 6 1 3 1 3 3 2 1 7 0 11 9 5 6 8 4 1 1 3 8 7 8 3 3 3 1 1 3 3 5 4 2 3 3 4 7 4 2 4 3 3 6 1 6 0 10 9 4 1 3 6 4 7 9 8 4 1 1 3 1 3 1 1 6 0 10 6 3 5 9 4 7 1 9 2 7 3 2 1 1 3 3 1 9 0 10 1 4 2 1 3 8 5 1 6 8 1 2 3 2 2 2 1 1 3 1 2 2 1 5 3 3 5 1 9 0 8 1 6 4 1 7 4 5 7 3 3 1 2 2 2 3 1 3 1 9 0 6 1 9 4 5 2 2 3 2 3 2 1 2 1 3 1 1 8 0 6 1 2 9 3 3 4 1 3 3 3 3 1 2 3 5 3 2 5 4 3 4 1 5 0 11 1 7 1 1 2 1 7 3 2 3 8 2 1 3 3 2 1 7 0 10 3 2 1 1 2 6 5 9 6 3 1 1 1 2 2 3 1 1 9 0 11 5 1 8 5 3 4 7 4 8 3 4 2 1 1 2 1 2 2 1 3 2 2 3 4 3 7 1 7 0 6 5 8 3 1 7 1 2 3 2 2 2 1 1 1 7 0 6 3 2 1 1 4 5 3 2 1 2 3 2 3 1 6 0 7 2 2 8 1 1 1 7 1 2 3 3 3 1 4 3 5 4 3 3 2 6 1 2 4 4 3 7 1 7 0 6 1 2 5 6 2 4 3 1 1 1 2 3 1 1 8 0 7 2 8 1 1 1 5 5 1 1 3 1 1 1 2 1 1 6 0 9 4 7 1 2 9 1 7 1 2 3 2 1 1 2 3 3 2 3 2 4 5 1 3 4 1 7 0 8 3 4 1 6 3 2 4 5 3 1 1 1 3 3 3 1 6 0 6 9 9 9 1 3 8 3 1 2 1 2 3 1 5 0 7 6 1 4 1 1 7 9 2 1 1 1 2 3 1 4 2 3 7 1 9 0 10 4 8 6 8 3 9 9 1 9 4 3 2 1 3 3 1 3 1 2 1 6 0 9 1 3 5 8 6 4 7 4 8 1 1 1 1 2 1 1 8 0 8 1 2 5 5 9 3 9 6 3 2 1 1 1 2 1 1 1 2 3 2 1 5 1 3 5 1 8 0 11 2 1 1 6 4 9 2 8 5 1 4 1 3 2 2 2 1 3 3 1 5 0 6 6 1 3 5 4 8 1 2 1 3 1 1 5 0 10 6 9 6 2 1 4 1 8 1 4 1 3 1 2 2 3 3 4 4 1 3 1 4 3 5 5 3 5 1 7 0 11 1 3 7 3 2 4 9 9 8 1 3 2 1 1 3 1 2 3 1 9 0 11 2 4 4 4 8 5 1 8 5 1 8 1 1 3 3 3 1 3 2 1 1 5 0 7 4 4 1 9 4 4 1 2 3 1 2 1 2 1 1 4 5 3 4 1 9 0 8 3 7 2 1 1 5 9 2 2 2 1 3 2 1 1 2 2 1 9 0 7 4 7 1 3 1 1 1 2 3 3 1 1 1 3 3 2 1 7 0 9 7 5 7 9 3 7 3 1 5 3 2 1 1 1 3 1 2 2 1 2 3 5 1 5 0 9 8 5 4 7 4 8 2 5 1 2 2 1 2 3 1 9 0 7 1 5 4 3 9 1 7 3 1 3 2 3 1 1 3 3 1 6 0 7 9 1 1 2 5 8 6 2 3 1 1 2 3 1 5 2 5 2 3 6 1 8 0 11 5 1 4 8 8 8 1 2 1 4 9 1 2 2 2 2 1 2 3 1 6 0 6 7 4 9 1 1 7 2 2 1 1 2 1 1 6 0 6 1 8 8 1 5 8 3 3 1 1 1 1 5 3 4 2 1 3 3 4 1 5 0 11 3 4 1 1 3 4 2 9 6 4 3 1 1 3 1 2 1 9 0 6 2 1 9 1 9 1 3 2 3 3 3 3 3 3 1 1 5 0 9 5 1 4 4 5 9 2 7 3 3 3 2 1 3 3 4 1 5 7 4 1 3 7 4 2 7 2 4 3 3 7 1 5 0 7 9 6 2 1 6 6 1 1 2 1 1 2 1 6 0 9 4 9 1 1 7 2 6 8 2 2 1 1 2 1 1 1 6 0 8 7 1 2 8 1 1 9 3 1 1 2 1 2 3 4 5 2 4 3 1 5 3 7 1 9 0 11 7 1 1 3 9 5 3 2 5 5 4 2 3 3 1 2 1 1 2 1 1 6 0 10 3 1 4 6 7 6 9 8 8 2 2 2 1 2 1 3 1 7 0 10 1 3 9 1 5 8 2 9 3 9 3 3 1 2 3 3 2 3 4 1 3 3 1 5 3 4 1 7 0 11 6 9 6 7 3 6 3 3 1 9 7 3 1 1 1 2 2 3 1 5 0 9 1 4 8 1 2 5 2 1 4 1 1 3 1 2 1 5 0 6 6 2 1 2 9 6 1 2 1 1 2 3 3 3 1 3 6 1 8 0 9 3 1 2 9 5 3 7 7 7 1 1 2 1 3 2 1 2 1 6 0 6 6 3 3 7 8 1 1 2 1 1 2 1 1 5 0 9 1 6 5 9 6 1 7 6 1 1 2 1 3 3 4 4 1 1 3 5 1 2 4 4 5 3 5 1 9 0 10 2 2 6 1 7 9 3 6 7 9 3 1 1 2 3 2 1 1 1 1 8 0 6 1 1 2 1 6 4 3 1 2 3 2 3 3 1 1 9 0 7 2 5 8 4 1 5 5 1 1 3 2 3 1 3 1 2 1 4 4 3 5 3 6 1 6 0 6 4 9 3 7 1 6 1 2 1 1 1 3 1 6 0 11 9 4 1 1 9 9 2 3 1 3 1 3 1 1 3 3 1 1 8 0 7 2 5 6 3 5 6 1 2 1 2 1 1 1 2 1 3 5 3 3 3 4 3 5 1 6 0 6 9 2 1 9 7 5 1 1 2 1 1 3 1 7 0 6 5 6 2 7 1 1 2 1 2 1 2 2 2 1 6 0 7 2 4 6 8 6 1 1 3 1 1 1 2 3 2 2 5 1 3 3 6 1 8 0 6 2 8 7 6 1 5 2 3 3 1 2 3 1 3 1 6 0 9 5 9 1 9 4 9 8 1 7 3 1 1 1 1 3 1 7 0 6 8 3 8 1 2 1 1 2 2 3 2 3 3 5 4 5 3 1 2 4 3 2 4 5 4 5 3 6 1 5 0 7 2 7 6 6 3 9 1 2 2 1 1 3 1 6 0 8 4 1 9 3 5 1 8 1 1 1 1 1 2 2 1 7 0 7 8 2 4 7 6 4 1 2 2 3 2 1 1 1 4 4 2 3 2 1 3 7 1 5 0 11 1 5 9 9 5 3 8 8 4 8 1 3 3 1 1 2 1 7 0 9 8 9 3 8 1 5 3 2 8 3 1 2 3 1 2 3 1 8 0 8 5 3 1 3 5 7 1 5 2 1 2 1 2 2 1 3 1 2 1 2 5 4 2 3 4 1 5 0 9 3 3 1 2 9 1 8 1 2 1 1 3 2 3 1 6 0 10 4 5 3 2 3 9 6 4 8 1 1 1 1 3 1 3 1 6 0 8 4 5 8 8 2 1 6 5 2 3 2 1 2 2 5 2 3 1 3 6 1 7 0 7 1 8 3 7 1 3 5 1 3 1 1 2 3 3 1 7 0 7 2 1 4 5 7 4 9 1 1 3 3 1 1 3 1 9 0 10 1 6 6 8 3 9 9 3 8 4 3 1 2 1 1 1 1 2 3 3 2 3 1 5 2 3 2 1 4 4 4 5 3 7 1 7 0 10 8 5 2 9 1 2 6 6 4 2 3 3 3 3 1 1 3 1 7 0 9 2 1 3 2 7 3 1 3 7 2 1 1 2 1 3 3 1 8 0 7 2 4 3 1 9 5 4 1 1 3 3 1 3 1 3 1 5 4 1 2 1 5 3 5 1 5 0 8 1 3 1 2 9 6 8 7 2 1 2 2 3 1 5 0 11 1 1 7 1 5 6 3 9 9 9 2 1 3 2 1 1 1 5 0 9 8 8 6 1 3 3 7 5 6 2 2 3 3 1 2 2 2 3 3 3 6 1 6 0 9 1 2 1 7 4 9 8 1 5 1 3 3 2 3 1 1 7 0 10 5 3 3 8 2 1 7 9 8 3 1 3 3 3 2 1 1 1 5 0 6 1 2 4 1 7 5 1 1 1 1 3 5 5 3 1 4 1 3 5 1 5 0 9 5 4 5 8 3 4 1 1 6 1 1 3 2 3 1 5 0 7 4 5 5 1 6 1 1 2 1 2 3 3 1 8 0 9 2 9 1 2 6 4 4 2 1 1 1 1 1 2 2 3 3 2 4 2 2 3 1 2 1 2 1 5 3 3 5 1 5 0 7 1 5 4 9 3 9 5 2 3 1 1 2 1 8 0 7 4 1 5 9 6 6 6 3 2 3 1 1 3 1 3 1 6 0 6 1 4 5 3 9 7 1 2 1 3 3 1 4 3 1 3 3 3 7 1 8 0 10 6 1 7 2 1 4 5 5 1 2 3 2 1 2 1 1 1 1 1 8 0 8 8 8 2 5 8 5 1 3 1 1 2 3 1 2 2 1 1 6 0 9 1 6 8 2 4 5 5 9 5 2 2 3 3 1 2 3 2 2 2 5 1 5 3 6 1 9 0 10 6 4 5 1 9 8 8 9 2 1 3 1 3 2 3 1 3 3 2 1 5 0 10 4 1 5 1 9 8 5 6 2 1 2 1 2 2 3 1 7 0 11 1 8 7 6 4 5 2 1 8 2 9 3 3 3 1 1 2 1 2 2 2 1 2 4 3 6 1 7 0 8 1 2 7 5 8 7 8 2 1 1 1 3 2 1 3 1 7 0 11 6 6 1 4 1 9 9 3 9 1 7 3 1 3 1 3 1 2 1 7 0 9 7 5 7 4 9 1 5 1 3 1 3 3 3 2 1 1 2 2 2 4 3 4 3 4 1 9 0 8 4 9 1 2 8 2 6 8 1 2 2 1 3 3 2 2 2 1 5 0 11 6 5 2 2 2 4 3 1 3 7 5 2 1 2 2 1 1 8 0 8 5 2 5 1 9 8 5 9 3 3 3 2 2 1 1 3 2 1 1 4 4 2 1 4 5 3 4 1 6 0 7 5 7 1 3 3 6 8 1 1 3 1 2 3 1 5 0 11 7 5 9 6 5 1 5 5 8 8 9 2 3 1 1 1 1 7 0 7 4 1 4 2 3 5 9 1 1 3 2 2 3 3 2 2 4 1 3 5 1 8 0 6 4 4 5 1 6 5 3 1 2 1 1 1 3 2 1 7 0 11 1 2 1 3 4 9 1 3 9 7 3 3 1 2 1 1 2 1 1 8 0 8 5 6 7 3 7 9 1 5 3 2 3 1 3 2 3 2 1 5 5 1 3 3 5 1 6 0 10 9 6 8 3 6 1 6 1 3 2 1 3 1 3 3 2 1 9 0 6 5 7 2 8 6 1 2 3 2 1 1 3 3 1 2 1 6 0 6 1 1 8 9 4 3 1 1 2 3 2 2 2 4 3 4 5 3 4 1 5 0 8 1 7 4 4 8 8 7 2 2 3 2 1 3 1 8 0 11 3 7 1 6 5 7 6 1 7 1 3 2 2 1 1 3 3 1 3 1 5 0 10 2 1 4 2 5 6 1 9 4 7 1 3 1 3 1 3 1 4 3 1 1 2 2 1 4 3 3 6 1 7 0 10 5 5 4 8 1 7 6 4 5 6 1 2 2 1 1 1 3 1 7 0 9 4 8 1 5 3 7 8 2 8 3 1 3 1 2 1 3 1 7 0 9 1 3 6 5 9 5 1 8 1 2 3 1 1 1 2 1 5 2 4 3 3 4 3 5 1 9 0 9 2 1 8 6 6 6 5 9 1 1 1 3 1 3 2 3 3 2 1 6 0 6 2 6 4 8 2 1 2 3 3 1 2 3 1 5 0 9 2 1 5 2 1 1 9 7 6 1 1 3 2 1 4 3 1 3 5 3 4 1 7 0 10 1 1 1 5 5 6 8 4 3 4 3 1 3 3 1 2 3 1 7 0 7 3 1 3 1 3 2 2 1 2 1 2 2 1 1 1 5 0 11 1 4 2 4 2 7 1 2 1 3 1 3 2 3 1 3 2 3 3 3 3 5 1 5 0 6 9 3 1 5 1 3 1 3 1 2 1 1 8 0 10 1 1 8 7 3 9 2 6 7 5 1 3 1 3 3 1 2 1 1 6 0 7 8 7 1 8 1 5 3 2 2 1 3 1 1 2 3 4 5 2 2 4 2 5 3 7 2 5 5 3 5 1 8 0 8 4 8 1 7 9 1 6 7 1 1 3 2 3 3 3 2 1 8 0 8 1 4 2 9 4 9 5 4 1 3 2 1 3 2 3 1 1 9 0 6 8 1 1 8 3 7 1 1 1 2 2 2 1 2 3 2 3 3 2 1 3 7 1 5 0 10 9 2 8 7 2 6 1 1 2 7 1 2 3 2 3 1 6 0 10 8 5 4 7 3 1 4 7 9 3 1 3 1 3 3 3 1 8 0 9 3 9 1 2 3 4 1 2 2 1 1 1 2 3 3 1 3 4 2 4 2 3 1 4 3 4 1 6 0 11 7 5 2 1 6 3 9 5 1 1 2 2 1 1 2 1 3 1 5 0 7 9 9 7 1 5 6 9 3 1 3 3 1 1 7 0 10 7 1 5 8 4 1 3 7 5 4 1 1 2 1 2 1 2 4 2 3 2 3 6 1 5 0 7 3 2 6 6 4 2 1 3 1 2 1 1 1 8 0 11 1 2 5 8 5 4 4 2 7 2 9 1 3 1 3 1 1 1 1 1 5 0 8 7 1 2 1 2 6 1 1 2 1 3 3 2 1 3 2 4 3 5 3 4 1 5 0 10 2 1 4 2 2 1 8 5 9 2 2 2 2 1 3 1 9 0 8 7 6 7 6 1 4 1 1 3 1 1 1 2 3 1 3 1 1 8 0 11 2 7 7 7 9 2 4 6 3 2 1 3 1 2 2 3 1 1 2 1 2 1 1 3 2 5 4 6 5 4 3 7 1 9 0 10 1 7 6 4 4 2 2 6 6 1 2 1 3 1 1 1 1 1 2 1 9 0 9 1 7 2 6 1 6 7 7 8 1 2 3 2 1 3 1 2 2 1 7 0 8 2 2 3 3 3 9 6 1 2 1 2 1 3 1 3 1 1 4 2 3 1 4 3 4 1 6 0 9 1 2 6 9 5 5 3 6 7 1 2 2 1 3 1 1 5 0 8 6 3 8 1 1 5 5 1 1 2 1 1 3 1 6 0 11 1 9 8 2 1 9 8 8 1 5 5 1 1 3 3 3 1 2 2 4 2 3 4 1 9 0 9 6 7 9 1 7 2 9 3 2 3 2 2 1 2 2 1 2 2 1 6 0 6 9 5 9 7 8 1 1 1 2 1 2 1 1 9 0 7 1 1 8 8 9 2 8 2 2 1 2 3 1 3 1 1 4 1 3 4 3 6 1 6 0 6 1 3 8 5 1 9 1 2 2 2 2 3 1 9 0 6 3 6 1 6 5 8 1 1 2 2 3 2 1 3 2 1 5 0 10 6 9 1 1 7 6 6 6 6 7 1 2 3 3 2 2 2 2 4 5 4 3 7 1 5 0 9 1 4 1 6 5 8 5 7 9 1 1 3 2 3 1 7 0 9 9 6 7 5 3 1 8 4 8 3 2 3 3 1 3 1 1 8 0 10 7 7 7 5 9 8 6 4 2 1 3 1 3 3 3 1 2 1 3 4 1 1 5 1 1 5 4 2 2 4 5 3 4 1 6 0 8 2 5 8 5 1 3 3 9 2 1 1 1 3 3 1 7 0 8 3 6 1 3 6 6 1 4 3 1 3 3 1 1 1 1 6 0 11 8 1 1 1 3 5 8 3 4 3 8 1 1 3 1 2 2 1 1 5 3 3 6 1 5 0 8 4 8 7 8 7 2 1 1 2 2 2 3 1 1 6 0 6 4 2 6 6 1 3 2 3 1 2 3 2 1 7 0 8 7 1 7 3 9 2 1 8 3 3 1 2 3 3 2 1 5 1 1 5 2 3 6 1 9 0 10 8 5 1 1 8 3 5 2 1 4 2 1 1 1 3 2 2 1 3 1 7 0 11 1 3 4 1 1 1 7 3 9 3 4 1 3 2 1 2 1 2 1 7 0 10 2 1 6 1 3 7 8 6 5 3 1 2 3 3 1 3 3 1 5 3 5 3 1 3 4 1 7 0 10 3 8 1 8 9 9 7 4 1 8 1 1 1 1 2 1 1 1 6 0 11 3 7 1 2 9 2 4 5 9 3 7 1 1 2 1 1 2 1 9 0 7 6 1 2 9 1 7 2 3 1 2 1 3 1 3 1 1 2 1 3 5 4 1 4 1 4 4 3 3 7 1 8 0 8 3 7 3 7 5 1 3 7 1 1 2 3 3 2 3 1 1 5 0 10 1 3 8 8 7 1 1 7 6 4 3 2 1 1 2 1 7 0 7 1 3 6 1 3 2 5 1 2 3 3 1 2 1 2 3 5 2 1 3 4 3 4 1 9 0 9 6 5 4 7 2 1 4 7 1 2 2 1 1 2 3 3 3 2 1 8 0 9 5 6 1 5 4 6 3 5 1 1 2 3 3 2 1 2 1 1 7 0 11 7 1 8 8 2 1 2 6 7 5 8 1 1 2 2 2 3 3 3 4 3 1 3 7 1 5 0 6 6 2 2 1 4 9 1 2 1 2 1 1 8 0 11 7 2 7 9 6 1 1 1 1 2 1 3 2 1 2 3 3 3 2 1 7 0 11 8 2 4 1 9 9 6 7 1 4 3 2 2 1 3 1 1 1 5 2 3 2 4 5 1 3 7 1 9 0 10 9 7 1 1 1 3 9 9 1 2 2 1 2 1 2 2 1 1 3 1 7 0 8 6 2 4 5 2 2 7 1 1 3 2 2 1 3 2 1 8 0 10 9 2 4 1 1 5 1 3 4 2 3 1 1 1 2 1 1 2 3 1 4 1 5 1 2 2 1 5 4 3 3 4 1 9 0 8 2 7 8 9 5 8 8 1 3 1 3 1 2 3 3 1 1 1 9 0 6 4 1 9 1 8 5 1 1 3 1 1 1 1 3 3 1 5 0 11 9 4 7 8 2 9 1 9 9 1 2 2 1 2 3 3 1 5 3 1 3 4 1 8 0 10 9 3 1 6 4 6 3 5 1 1 1 2 2 1 1 2 2 2 1 7 0 11 5 4 6 7 6 5 1 7 6 1 5 3 2 1 1 2 1 1 1 9 0 6 7 4 2 3 1 4 3 2 2 2 1 1 2 2 3 2 2 1 5 3 4 1 6 0 7 6 6 9 9 1 1 9 1 1 3 3 3 1 1 8 0 9 6 2 3 8 7 2 7 1 9 1 3 2 1 2 3 3 1 1 7 0 10 4 3 6 2 3 2 5 1 8 2 3 1 1 2 3 1 2 3 1 3 2 3 7 1 8 0 9 8 5 4 9 8 4 1 6 7 2 1 3 2 1 1 1 2 1 6 0 11 7 1 1 5 7 9 1 4 2 3 6 2 1 1 3 3 3 1 7 0 11 4 6 2 8 8 4 9 2 1 5 2 3 3 3 2 1 1 2 4 1 3 3 1 5 1 3 2 3 4 4 3 4 1 5 0 7 9 1 3 6 8 5 7 1 2 1 2 3 1 6 0 11 8 4 8 2 4 3 5 1 1 9 2 2 1 2 1 2 3 1 9 0 11 2 9 9 6 5 8 9 7 1 5 3 1 1 3 2 1 3 2 2 3 1 5 2 4 3 6 1 7 0 8 6 1 6 1 2 8 4 4 3 3 1 1 2 3 1 1 7 0 7 6 4 9 8 7 1 5 1 1 2 3 3 3 2 1 5 0 9 8 5 3 1 5 9 7 5 1 2 3 1 1 1 2 2 1 3 3 3 3 7 1 9 0 7 8 1 8 8 4 8 7 1 2 3 3 2 3 3 1 1 1 6 0 7 8 1 7 3 5 8 1 2 2 1 1 1 1 1 5 0 9 9 3 1 5 3 7 1 2 1 1 3 1 2 2 5 3 4 1 4 3 5 3 6 1 8 0 6 1 9 4 9 2 2 1 2 1 1 1 1 1 3 1 6 0 8 5 5 6 8 3 4 9 1 3 1 3 1 3 2 1 8 0 6 2 4 6 4 6 1 2 3 1 2 1 3 3 3 2 2 3 5 2 2 6 2 5 3 4 3 3 6 1 7 0 11 7 9 9 7 1 1 5 7 1 3 5 3 3 3 3 1 2 1 1 6 0 8 1 8 7 2 5 6 2 6 1 3 3 2 2 3 1 9 0 8 3 3 9 5 7 1 1 5 1 1 2 2 1 1 3 2 2 5 2 1 4 3 3 3 4 1 6 0 11 3 9 5 5 5 1 6 4 2 4 5 1 2 1 1 3 1 1 8 0 9 3 3 1 6 4 6 4 3 8 2 1 3 3 2 3 1 2 1 9 0 10 7 6 1 3 3 8 9 1 1 1 1 2 2 3 3 2 2 2 2 1 2 3 1 3 4 1 9 0 11 1 4 4 9 9 1 8 8 5 8 2 3 3 2 3 1 3 2 2 2 1 9 0 7 9 6 9 1 2 8 6 3 3 1 3 2 1 3 3 3 1 5 0 10 1 1 5 8 5 4 4 7 2 2 2 3 2 1 1 2 2 4 2 3 7 1 8 0 10 1 8 1 6 8 5 3 8 9 3 2 3 3 3 3 1 1 1 1 5 0 6 1 1 1 7 6 6 3 2 3 2 1 1 5 0 10 2 8 6 9 9 7 8 5 5 1 1 1 1 1 2 3 3 4 3 4 3 4 4 6 1 1 5 2 4 4 1 8 6 6 5 1 2 6";
//recursive is the key
//var simpleLicense = "1 2 0 3 0 0 12 2 1";
var simpleLicense1 = "2 1 0 3 0 0 12 0 1 1 2";
var simpleLicense2 = "3 1 0 3 0 0 12 0 1 1 0 1 3 2";
var complexLicense = "2 1 "+simpleLicense1+" "+simpleLicense1+" 1";
/*
// node: array of numbers with one or more node, but starting with one
// return: remaining part of the nodes, accumulative metadata calculated
var parseNode = function(nodes){
	var subNodeCount = +(nodes[0]);
	var metadataCount = +(nodes[1]);
	var total = 0;
	if (subNodeCount == 0){
		//consuming the metadata and rendering the remaining nodes description
		for (var i=0;i<metadataCount;i++){
			total+= +(nodes[2+i]);
		}
		var result = {"metadata":total,"remaining": (nodes.slice(2+metadataCount))};
		//console.log("simple metadata: "+result.metadata);
		return result;
	}else{
		//subnodes to account for
		var remaining = nodes.slice(2);
		for (var i=0;i<subNodeCount;i++){
			var partialResult = parseNode(remaining);
			total += 0 + partialResult.metadata;
			remaining = partialResult.remaining;
		}
		//reading the metadata
		for (var i=0;i<metadataCount;i++){
			total+= +(remaining[i]);
		}
		var result = {"metadata":total,"remaining": remaining.slice(metadataCount)};
		//console.log("arcing metadata (subnodes: "+subNodeCount+"): "+result.metadata);
		return result;
	}
};
console.log("ding! total metadata: "+parseNode(simpleLicense1.split(' ')).metadata);
console.log("ding! total metadata: "+parseNode(simpleLicense2.split(' ')).metadata);
console.log("ding! total metadata: "+parseNode(complexLicense.split(' ')).metadata);
console.log("ding! total metadata: "+parseNode(license.split(' ')).metadata);

//day8 part2
var parseNode = function(nodes){
	var subNodeCount = +(nodes[0]);
	var metadataCount = +(nodes[1]);
	var value = 0;
	if (subNodeCount == 0){
		//consuming the metadata and rendering the remaining nodes description
		for (var i=0;i<metadataCount;i++){
			value+= +(nodes[2+i]);
		}
		var result = {"value":value,"remaining": (nodes.slice(2+metadataCount))};
		//console.log("simple metadata: "+result.metadata);
		return result;
	}else{
		//subnodes to account for
		var subNodes = new Array();
		var remaining = nodes.slice(2);
		for (var i=0;i<subNodeCount;i++){
			var partialResult = parseNode(remaining);
			remaining = partialResult.remaining;
			subNodes.push(partialResult.value);
		}
		//reading the metadata
		for (var i=0;i<metadataCount;i++){
			var metadata= +(remaining[i]);
			if (metadata > 0 && metadata <= subNodeCount){
				value += subNodes[metadata-1];
			}
		}
		var result = {"value":value,"remaining": remaining.slice(metadataCount)};
		//console.log("arcing metadata (subnodes: "+subNodeCount+"): "+result.metadata);
		return result;
	}
};
console.log("ding! value: "+parseNode(simpleLicense1.split(' ')).value);
console.log("ding! value: "+parseNode(simpleLicense2.split(' ')).value);
console.log("ding! value: "+parseNode(complexLicense.split(' ')).value);
console.log("ding! value: "+parseNode(license.split(' ')).value);

*/

//day 9
//491 players; last marble is worth 71058 points
var playersAmount = 491;
var maxMarble = 71058;
//var playersAmount = 10;
//var maxMarble = 1618;


//[8]  0 (8) 4  2  5  1  6  3  7
var scores = new Array(playersAmount);
for (var i=0;i<playersAmount;i++){
	scores[i] = 0;
}
var circle = [0,8,4,2,5,1,6,3,7];
var currentMarble = 8;
var player = 9;
var marble = 9;
//next step
console.log("playing the game!");
while (marble<=maxMarble){
	var currentMarbleIndex = circle.indexOf(currentMarble);
	var multipleOf23 = ((marble %23) == 0);
	if (multipleOf23){
		//score for marble to place
		scores[player-1] += marble;
		//removing the special marble
		var removedMarble = circle.splice((currentMarbleIndex-7+circle.length)%circle.length,1)[0];
		scores[player-1] += removedMarble;
		//console.log("score: player="+player+" removedMarble="+removedMarble+" marble="+marble);
		currentMarble = circle[(currentMarbleIndex-7+circle.length)%circle.length];
		//console.log("new circle: "+circle.join());
	}else{
		//console.log("currentMarbleIndex="+currentMarbleIndex);
		var insertionIndex = (currentMarbleIndex + 2 + circle.length) %  circle.length;
		circle.splice(insertionIndex,0,marble);
		currentMarble = marble;
		
		//console.log("new circle: "+circle.join());
	}
	player++;
	if (player > playersAmount){
		player = 1;
	}
	marble++;
}
//
console.log("game played, counting scores");
var maxScore = 0;
var maxPlayer = -1;
for (var i=0;i<playersAmount;i++){
	if (scores[i]>maxScore){
		maxScore=scores[i];
		maxPlayer = i+1;
	}
}
console.log("ding! "+maxPlayer+" maxed at "+maxScore);

var test = (5-7+12*2)%12;
console.log(test);


/**************** UTILS *****************/
function processFile(inputFile,lineReaderFunction,endFileFunction) {
    var fs = require('fs'),
        readline = require('readline'),
        instream = fs.createReadStream(inputFile),
        outstream = new (require('stream'))(),
        lineReader = readline.createInterface(instream, outstream);
     
    lineReader.on('line', function (line) {
		//console.log("processFile#on IN");
        lineReaderFunction(line);
		//console.log("processFile#on OUT");
    });
	
	lineReader.on('close', function (line) {
        endFileFunction(line);
    });
};

