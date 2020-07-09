/**
 * modify-time: 2020-06-22
 * autor: yohann
 * 
 * new:
 * 	抽象接口类；
 * 	定义app所有数据类型；
 * 
 * modify:
 * 	none
*/
var admin = require('./admin/admin');
var servers = require('./servers/servers');

var dataModel = {
	"admin":admin,
	"servers":servers
}

module.exports = dataModel;