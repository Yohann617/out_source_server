/**
 * modify-time: 2020-06-22
 * autor: yohann
 * 
 * new:
 * 	从mysql数据库获取
 * 
 * modify:
 * 	none
*/
'use strict';
var dataModel = require('../dataModels/dataModelInterface');

const dataMysql = {
	"DataBase":DataBase,
	"getUserInfo":(params)=>{
		let _fromDataBase = this.DataBase.getUserInfo(params);  // 数据来源
		let _dataModel = dataModel.admin;  // 系统定义的数据类型

		_dataModel = _fromDataBase; // ToCheck -- 对象解构赋值；
		return _dataModel;
	}
}

module.exports = dataMysql
