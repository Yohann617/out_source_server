/**
 * modify-time: 2020-06-22
 * autor: yohann
 * 
 * new:
 * 	具体实现；
 * 	http模块接口实现；
 * 
 * modify:
 * 	none
 * 
 * return:
 * 	Promise对象
*/
var request = require('request');

var HandleHttp = function(){
	return {
		"postSend":function(url,params){
			try{
				return new Promise((resolve,reject) => {
					request({
						url: url,
						method: "POST",
						headers: {
							'Content-Type':'application/json',
							'Content-Length':params.length
						},
						body: params
					}, function(error, response, data) {
						data = JSON.parse(data);
						resolve(data);
					});
				});
			}
			catch(e){
				// TODO: 统一处理错误
			}
		}
	}
}

module.exports = new HandleHttp()