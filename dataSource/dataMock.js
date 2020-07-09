/**
 * modify-time: 2020-06-22
 * autor: yohann
 * 
 * new:
 * 	从本地 Mock 中，获取数据
 * 
 * modify:
 * 	none
*/
var Mock = require('../mock/mockInterface');

const dataMock = {
	"getUserInfo":Mock.userInfo
}

module.exports = dataMock
