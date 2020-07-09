/**
 * modify-time: 2020-06-22
 * autor: yohann
 * 
 * new:
 * 	抽象接口；
 * 	本地数据;
 * 
 * modify:
 * 	none
*/

var Users = require('./users');

const Mock = {
	"userInfo":Users.getUsers
}

module.exports = Mock
