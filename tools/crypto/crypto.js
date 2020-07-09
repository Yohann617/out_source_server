/**
 * modify-time: 2020-06-22
 * autor: yohann
 * 
 * new:
 * 	具体实现；
 * 	加解密接口集合；
 * 
 * modify:
 * 	none
 * 
 * return:
 * 	Promise对象
*/
var _crypto = require('crypto');

var Crypto = function(){
	return {
		"Md5":function(password){
			var md5 = _crypto.createHash('md5');
			return md5.update(password).digest('hex');
		},
		"Sha256":function(content,secretKey){
			const sha256 = crypto.createHmac('sha256',secretKey);
			return sha256.update(content).digest('hex');
		},
		"Sha1":function(password){
			const sha1 = crypto.createHash('sha1');
			return sha1.update(password).digest('hex');
		}
	}
}
module.exports =  new Crypto();