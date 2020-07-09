/**
 * modify-time: 2020-06-22
 * autor: yohann
 * 
 * new:
 * 	具体实现；
 * 	自定义日志记录;
 * 	用于记录脚本中打印的logs，以文件形式，按照日前存储起来；
 * 	便于系统运行时，快速定位问题。
 * 
 * modify:
 * 	none
 * 
 * @params file_name -- string
 * @params content -- array 
*/
var express = require('express');
var logger = require('morgan');//日志模块
var fs = require('fs');//文件模块
var app = express();

var SelfLogs = function(){
	return {
		"writeLogs":function(file_name,content){
			let accessLogStream = fs.createWriteStream('./log/'+file_name+'.log',{flags:'a'});
			let _content="";
			if(typeof content !== "object"){
				return;
			};
			content.map((item)=>{
				_content===""?_content=item+"\n" : _content=_content+item+"\n"
			});
			accessLogStream.write(_content);
			app.use(logger('combined',{stream:accessLogStream}));
		}
	}
}

module.exports = new SelfLogs()