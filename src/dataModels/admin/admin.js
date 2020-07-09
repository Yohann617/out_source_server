/**
 * modify-time: 2020-06-22
 * autor: yohann
 * 
 * new:
 * 	数据模型；
 * 	再此定义系统中用到的数据格式；
 * 	不要再依赖数据库中查出的结构；
 * 	与数据库解耦合；
 * 
 * modify:
 * 	none
*/
var admin = function(){
	return {
		"name":"",
		"age":"",
		"account":"",
		"six":""
	}
}

module.exports = new admin()
