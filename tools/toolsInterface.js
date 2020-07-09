/**
 * modify-time: 2020-06-22
 * autor: yohann
 * 
 * new:
 * 	抽象接口类；
 * 	定义工具类抽象接口；
 * 
 * modify:
 * 	none
*/
'use strict';
var selfLogs = require('./localLog/selfLogs');          // 本地日志日志
var simpleTools = require('./simpleTools/simpleTools'); // 简单工具的集合
var autoTask = require('./autoTask/autoTask');          // 自动运行的任务
var HandleHttps = require('./https/https');             // https服务
var HandleHttp = require('./http/http');                // http服务
var crypto = require('./crypto/crypto');                // 加解密

const toolsInterface = {
	"Log_Write":selfLogs.writeLogs,
	"STools_CheckParams":simpleTools.checkParams,
	"STools_ObjKeySort":simpleTools.objKeySort,
	"ATools_RecordData":autoTask.recordData,
	"Https_get":HandleHttps.getSend,
	"Crypto_md5":crypto.Md5,
	"Http_post":HandleHttp.postSend,
}
model.exports = toolsInterface;