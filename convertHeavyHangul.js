var convertHeavyHangul = function(){
	return {
		"convertTo":function(str){
			str = this.base64_encode(str);
			return this.toHeavyHangul(this.toPos(str));
		},
		"toPos":function(str){
			var arr = [],hex=null;
			for(var i=0,m=str.length;i<m;i++){
				hex = str[i].charCodeAt(0).toString(16);
				// console.log('to',hex)
				for(var i2=0,m2=hex.length;i2<m2;i2++){
					arr.push(parseInt(hex[i2],16))
				}
			}
			var rarr = [],t=[];
			var num1,num2,num3;
			for(var i=0,m=arr.length;i<m;i+=2){
				num1 = Math.floor(Math.random()*19);
				num2 = arr[i];
				num2 = (num2+num1)%21
				num3 = arr[i+1];
				num3 = (num3+num1)%28
				rarr.push([num1,num2,num3]);
			}
			return rarr;
		},
		"toHeavyHangul":function(arr_toPos){
			var rarr = [];
			for(var i=0,m=arr_toPos.length;i<m;i++){
				var r = String.fromCharCode(divideHangulPhoneme.charCodeFromPosArray(arr_toPos[i]))
				rarr.push(r);
			}
			return rarr.join('');
		},
		"heavyHangulToHex":function(char){
			var pos_arr = divideHangulPhoneme.divideCharToPos(char);
			var num1,num2,num3;
			num1 = pos_arr[0]
			num2 = pos_arr[1]
			num2 = (21+num2-num1)%21
			num3 = pos_arr[2]
			num3 = (28+num3-num1)%28
			
			return num2.toString(16)+num3.toString(16);
		},
		"convertFrom":function(heavyHangul){
			var bytes  = [];
			
			for(var i=0,m=heavyHangul.length;i<m;i++){
				var hex = this.heavyHangulToHex(heavyHangul[i])
				var num = parseInt(hex,16)
				var bin = num.toString(2);
				bytes.push(num);
			}
			// console.log(bytes);
			var str = String.fromCharCode.apply(String, bytes);
			return this.base64_decode(str);
			
		},
		"base64_encode":function(str){
			return btoa(unescape(encodeURIComponent(str)));
		},
		"base64_decode":function(str){
			return decodeURIComponent(escape(atob(str)));;
		}
		
	}
}()