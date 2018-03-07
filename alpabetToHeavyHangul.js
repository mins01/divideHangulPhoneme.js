/**
 * depend on divideHangulPhoneme
 * @return {[type]} [description]
 */
var alpabetToHeavyHangul = function(){
	return {
		"arr_1st":['ㄱ','ㄲ','ㄴ','ㄷ','ㄸ','ㄹ','ㅁ','ㅂ','ㅃ','ㅅ','ㅆ','ㅇ','ㅈ','ㅉ','ㅊ','ㅋ','ㅌ','ㅍ','ㅎ'], //초성 19개
		"arr_2nd":['ㅏ','ㅐ','ㅑ','ㅒ','ㅓ','ㅔ','ㅕ','ㅖ','ㅗ','ㅘ','ㅙ','ㅚ','ㅛ','ㅜ','ㅝ','ㅞ','ㅟ','ㅠ','ㅡ','ㅢ','ㅣ'],//중성 21개
		"arr_3th":['','ㄱ','ㄲ','ㄳ','ㄴ','ㄵ','ㄶ','ㄷ','ㄹ','ㄺ','ㄻ','ㄼ','ㄽ','ㄾ','ㄿ','ㅀ',
								'ㅁ','ㅂ','ㅄ','ㅅ','ㅆ','ㅇ','ㅈ','ㅊ','ㅋ','ㅌ','ㅍ','ㅎ'],//종성 28개
		"char_st":44032, //'가'의 유니코드 넘버(10진수)
		"char_ed":55203, //'힝'의 유니코드 넘버(10진수)
		
		"toHeavyHangul":function(str){
			var strs = []
			for(var i=0,m=str.length;i<m;i++){
				strs.push(divideHangulPhoneme.combinePhonemeArray(this.toPhonemeArray(str.charAt(i))))
			}
			
			return strs.join('');
		},
		"fromHeavyHangul":function(str){
			var strs = []
			for(var i=0,m=str.length;i<m;i++){
				strs.push(String.fromCharCode(this.posAtHangul(str.charAt(i))))
			}
			
			return strs.join('');
		},
		"toPhonemeArray":function(char){
			var posArr = this.posAtAlphabet(char);
			// console.log(posArr,char)
			return [divideHangulPhoneme.arr_1st[posArr[0]],divideHangulPhoneme.arr_2nd[posArr[1]],divideHangulPhoneme.arr_3th[posArr[2]]]
		},
		"posAtAlphabet":function(char){
			var num = char.charCodeAt(0);
			var pos_1st = Math.floor(Math.random()*19);
			var pos_2nd = Math.floor(Math.random()*10)*2;
			if(num>=65 && num<=90){ //대문자인 경우
				var pos_3th = (num-65)%28;
			}else if(num>=97 && num<=122){ //소문자인 경우
				pos_2nd +=1;
				var pos_3th = (num-97)%28;
			}
			pos_3th+=1;
			
			return [pos_1st,pos_2nd,pos_3th]
		},
		"posAtHangul":function(char){
			var posArr = divideHangulPhoneme.divideCharToPos(char);
			// console.log(posArr,char)

			var pos_alpha = posArr[2];
			pos_alpha-=1;
			if(posArr[1]%2==1){ //소문자
				pos_alpha+=97
			}else{
				pos_alpha+=65
			}
			return pos_alpha;
			// console.log(pos_alpha,String.fromCharCode(pos_alpha))
		},
	}

}();

try{
	module.exports = alpabetToHeavyHangul;
}catch(e){}