/**
 * modify-time: 2020-06-22
 * autor: yohann
 * 
 * new:
 * 	本地数据
 * 
 * modify:
 * 	none
*/

var getUsers = function(){
	return new Promise(function(resolve,reject){
		var _list = [
			{
				"name":"yohann_1",
				"age":"29",
				"account":"yohann617",
				"six":"man"
			},
			{
				"name":"yohann_2",
				"age":"29",
				"account":"yohann617",
				"six":"man"
			},
			{
				"name":"yohann_3",
				"age":"29",
				"account":"yohann617",
				"six":"man"
			}
		];
		resolve(_list)
	})
}

var Users = {
	"getUsers":getUsers
}
module.exports = Users
