/**
 * > node test4nodejs.js 
 * 
test divideHangulPhoneme

input :  가나다한       글뷁힣 똠방깎핳힣 ABC韓?134%#

result :
 '가' => ['ㄱ' , 'ㅏ' , '']
'나' => ['ㄴ' , 'ㅏ' , '']
'다' => ['ㄷ' , 'ㅏ' , '']
'한' => ['ㅎ' , 'ㅏ' , 'ㄴ']
' ' => ' '
' ' => ' '
'       ' => '  '
'글' => ['ㄱ' , 'ㅡ' , 'ㄹ']
'뷁' => ['ㅂ' , 'ㅞ' , 'ㄺ']
'힣' => ['ㅎ' , 'ㅣ' , 'ㅎ']
' ' => ' '
'똠' => ['ㄸ' , 'ㅗ' , 'ㅁ']
'방' => ['ㅂ' , 'ㅏ' , 'ㅇ']
'깎' => ['ㄲ' , 'ㅏ' , 'ㄲ']
'핳' => ['ㅎ' , 'ㅏ' , 'ㅎ']
'힣' => ['ㅎ' , 'ㅣ' , 'ㅎ']
' ' => ' '
'A' => 'A'
'B' => 'B'
'C' => 'C'
'韓' => '韓'
'?' => '?'
'1' => '1'
'3' => '3'
'4' => '4'
'%' => '%'
'#' => '#'
END result
 */

var divideHangulPhoneme = require('./divideHangulPhoneme.js');


function convert(str){
	var r = divideHangulPhoneme.divide(str);
	var msgs = [],msg = "";
	for(var i=0,m=str.length;i<m;i++){
		char = str.charAt(i);
		if(r[i].length==3){
			msg = "'"+char+"' => ['"+r[i].join("' , '")+"']";
		}else{
			msg = "'"+char+"' => '"+r[i]+"'";
		}
		 msgs.push(msg);
	}
	return msgs;
}

var str = "가나다한  	글뷁힣 똠방깎핳힣 ABC韓?134%#";
var r = convert(str);
console.log("test divideHangulPhoneme\n")
console.log("input : ",str,"\n");
console.log("result : \n",r.join("\n"),'\nEND result')