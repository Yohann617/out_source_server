/**
 * modify-time: 2020-06-22
 * autor: yohann
 * 
 * new:
 * 	具体实现;
 *  简单工具的集合；
 * 
 * modify:
 * 	none
 * 
*/
'use strict';
var crypto = require("crypto");

var SimpleTools = function(){
	return {
		"checkParams":function(keys,params){
			/**
			 * 验证传入参数是否存在：
			 * @params params -- arr
			 * @params errorMsg -- arr
			 */
			let tempObj = {
				"status":0,
				"type":"",
				"message":""
			}
			if(params instanceof Array){
				let index = 0;
				for(let i of params){
					if(!i){
						tempObj.status = 0;
						tempObj.type = "params_null";
						tempObj.message = keys[index];
						return tempObj;
					}
					index ++;
				};
				tempObj.status = 1;
				tempObj.type = "params_correct";
				tempObj.message = "参数都存在！";
				return tempObj;
			}else{
				tempObj.status = 2
				tempObj.message = "传入参数必须为数组!"
				return tempObj;
			}
		},
		"sortCharter":function(a,b){
			/**
			 * 字母排序：
			 * 	按照A-Z顺序排列输出
			 */
			if (a.toString().toUpperCase() > b.toString().toUpperCase()) {
				return 1;
			} else if (a.toString().toUpperCase() == b.toString().toUpperCase()) {
				return 0;
			} else {
				return -1;
			}
		},
		"objKeySort":function(obj){
			/**
			 * 对象重新排序：
			 * 	按照key顺序
			 */
			var newkey = Object.keys(obj).sort(this.sortCharter);
			var newObj = {};
			for (var i = 0; i < newkey.length; i++) {
				newObj[newkey[i]] = obj[newkey[i]];
			}
			return newObj;
		},
		"serializeParams":function(obj){
			/**
			 * 对象序列化：
			 * 	序列化成get参数格式
			 */
			let paramsString;
			for(let key of Object.keys(obj)){
				if (!paramsString) {
					paramsString = key + "=" + obj[key] + "&";
				} else {
					paramsString += key + "=" + obj[key] + "&";
				}
			};
			paramsString = paramsString.substring(0, paramsString.lastIndexOf('&'));
			return paramsString;
		},
		"signRSASHA25":function(secret_key,paramsString){
			/**
			 * RSA-SHA256加密：
			 * 	公、私钥
			 * @params secret_key：私钥字符串
			 * @params paramsString: 加密字符串
			 */
			let insertStr = function(str, insertStr, sn) {
				var newstr = '';
				for (var i = 0; i < str.length; i += sn) {
					var tmp = str.substring(i, i + sn);
					newstr += tmp + insertStr;
				}
				return newstr;
			};
			const getPrivateKey = function(key) {
				const result = insertStr(key, '\n', 64);
				return '-----BEGIN PRIVATE KEY-----\n' + result + '-----END PRIVATE KEY-----';
			};
			let privateKey = getPrivateKey(secret_key);
			var _sign = crypto.createSign('RSA-SHA256');
			_sign.update(paramsString);
			var sig = _sign.sign(privateKey, 'base64');
			return sig;
		},
		"startDayTime":function(startTime='',endTime=''){
			/**
			 * 返回给定时间的当日，00:00、23:59时间戳：
			 */
			let getStartTime = new Date(startTime);
			let getEndTime = new Date(endTime);
			let data = {
				"start":(new Date(getStartTime.toLocaleDateString()).getTime())/1000,
				"end":parseInt((new Date(getEndTime.toLocaleDateString()).getTime() + 24 * 60 * 60 * 1000 - 1)/1000)
			}
			return data;
		},
		"startDayForwardTime":function(startTime='',endTime=''){
			/**
			 * 返回给定时间的往后退时日（次日、3日、7日、14日、30日...），00:00、23:59时间戳：
			 */
			let getStartTime = new Date(startTime);
			let ToDay = getStartTime;  // 当天 00:00
			let NextDay = new Date(ToDay.setDate(ToDay.getDate() + day));
			let data = {
				"start":(new Date(NextDay.toLocaleDateString()).getTime())/1000,
				"end":parseInt((new Date(NextDay.toLocaleDateString()).getTime() + 24 * 60 * 60 * 1000 - 1)/1000)
			}
			return data;
		},
		"formatDateTime":function(date){
			/**
			 * 日期格式转换 
			 * 	@param 2017%2D03%2D07+13%3A52%3A14
			 * 	转为 2019-04-19 00:00:00
			 */
			let y = date.getFullYear();  
			let m = date.getMonth() + 1;  
				m = m < 10 ? ('0' + m) : m;  
			let d = date.getDate();  
				d = d < 10 ? ('0' + d) : d;  
			let h = date.getHours();  
				h=h < 10 ? ('0' + h) : h;  
			let minute = date.getMinutes();  
				minute = minute < 10 ? ('0' + minute) : minute;  
			let second=date.getSeconds();  
				second=second < 10 ? ('0' + second) : second; 
	
			return y + '-' + m + '-' + d+' '+h+':'+minute+':'+second;
		},
		"getArrayCount":function(arr){
			/**
			 * 记录Array中重复的元素，以及出现的次数
			 */
			let obj = {}
			let k, arr1 = [];
			for(let i = 0, len = arr.length; i < len; i++) {
				k = arr[i];
				if(obj[k])
					obj[k]++;
				else
					obj[k] = 1;
			}
			for(let o in obj) {
				arr1.push({
					x: o,
					y: obj[o]
				});
			}
			return arr1; 
		},
	}
}

module.exports = new SimpleTools()