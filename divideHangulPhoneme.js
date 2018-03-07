var divideHangulPhoneme = function(){
	return {
		"arr_1st":['ㄱ','ㄲ','ㄴ','ㄷ','ㄸ','ㄹ','ㅁ','ㅂ','ㅃ','ㅅ','ㅆ','ㅇ','ㅈ','ㅉ','ㅊ','ㅋ','ㅌ','ㅍ','ㅎ'], //초성 19개
		"arr_2nd":['ㅏ','ㅐ','ㅑ','ㅒ','ㅓ','ㅔ','ㅕ','ㅖ','ㅗ','ㅘ','ㅙ','ㅚ','ㅛ','ㅜ','ㅝ','ㅞ','ㅟ','ㅠ','ㅡ','ㅢ','ㅣ'],//중성 21개
		"arr_3th":['','ㄱ','ㄲ','ㄳ','ㄴ','ㄵ','ㄶ','ㄷ','ㄹ','ㄺ','ㄻ','ㄼ','ㄽ','ㄾ','ㄿ','ㅀ',
								'ㅁ','ㅂ','ㅄ','ㅅ','ㅆ','ㅇ','ㅈ','ㅊ','ㅋ','ㅌ','ㅍ','ㅎ'],//종성 28개
		"char_st":44032, //'가'의 유니코드 넘버(10진수)
		"char_ed":55203, //'힝'의 유니코드 넘버(10진수)
		/**
		 * 문자열을 음소로 나눈 배열로 변환
		 * @param  {[type]} str [description]
		 * @return {[type]}        [description]
		 */
		"divide":function(str){
			var r = null,char=null;
			var res = []
			for(var i=0,m=str.length;i<m;i++){
				char = str.charAt(i);
				r = this.divideCharToPhoneme(char);
				res.push(r);
			}
			return res;
		},
		/**
		 * 문자에서 음소 알아내기
		 * @param  {[type]} char [description]
		 * @return {[type]}      [description]
		 */
		"divideCharToPhoneme":function(char){
			var poses = this.divideCharToPos(char);
			if(!poses){
				return char;
			}
			return [this.arr_1st[poses[0]],this.arr_2nd[poses[1]],this.arr_3th[poses[2]]];
		},
		/**
		 * 문자에서 음소 위치 알아내기
		 * @param  {[type]} char [description]
		 * @return {[type]}      [description]
		 */
		"divideCharToPos":function(char){
			if(char.length>2){char=char.charAt(0);}
			var uniNum = char.charCodeAt(0);
			if(uniNum < this.char_st || uniNum > this.char_ed) return false;//한글이 아니다
			var uniNum2 = uniNum-this.char_st;
			var arr_1st_pos = Math.floor(uniNum2/588);
			uniNum2 = uniNum2%588;
			var arr_2nd_pos = (Math.floor(uniNum2/28));
			uniNum2 = (uniNum2%28);
			var arr_3th_pos = uniNum2;
			return [arr_1st_pos,arr_2nd_pos,arr_3th_pos];		
		}
		/**
		 * 음소배열 묶음으로 문자열 만들기
		 * @param  {[type]} charArrayArray [description]
		 * @return {[type]}                [description]
		 */
		,"combine":function(charArrayArray){
			var strs = []
			for(var i=0,m=charArrayArray.length;i<m;i++){
				strs.push(this.combinePhonemeArray(charArrayArray[i]))
			}
			return strs.join('');
		}
		,"combinePhonemeArray":function(charArray){
			if(charArray.length != 3){return charArray;}
			var num_1st = this.arr_1st.indexOf(charArray[0])
			var num_2nd = this.arr_2nd.indexOf(charArray[1])
			var num_3th = this.arr_3th.indexOf(charArray[2])
			if(num_1st < 0 || num_2nd < 0 || num_3th < 0){
				return null;
			}
			var arr_num = [num_1st,num_2nd,num_3th];
			var num_uni = this.charCodeFromPosArray(arr_num);
			return String.fromCharCode(num_uni);
		}
		,"charCodeFromPosArray":function(posArray){
			if(posArray.length != 3){return -1;}
			return posArray[2]+28*posArray[1]+588*posArray[0]+this.char_st;
		}
	}

}();

try{
	module.exports = divideHangulPhoneme;
}catch(e){}