/**
 * modify-time: 2020-06-22
 * autor: yohann
 * 
 * new:
 * 	抽象接口；
 * 	数据来源；
 * 	系统与数据库解耦的地方；
 * 
 * modify:
 * 	none
*/

var dataMock = require('./dataMock');

var _DATA = dataMock;  // 无论从哪里获取数据，只要改动 _DATA 的指向，即可。
const dataSource = {
	"getUserInfo":_DATA.getUserInfo
}

module.exports = dataSource
