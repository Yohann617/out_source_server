/**
 * modify-time: 2020-06-22
 * autor: yohann
 * 
 * new:
 * 	具体实现；
 * 	https模块接口实现；
 * 
 * modify:
 * 	none
 * 
 * return:
 * 	Promise对象
*/
'use strict';

var https = require('https');
var request = require('request');

var HandleHttps = function(){
	return {
		"getSend":function(url){
			try{
				return new Promise((resolve,reject) => {
					https.get(url, function (req, response) {
						let html = '';
						req.on('data', function (data) {
							if (data) {
								html += data;
								html = JSON.parse(html);
							};
						});
						req.on('error', function (e) {
							console.log('problem with request: ' + e.message);
							reject();
						});
						req.on('end', function () {
							resolve(html);
						});
					});
				});
			}
			catch(e){
				// TODO: 统一处理错误
			}
		},
		"postSend":function(url,params){
			try{
				return new Promise((resolve,reject) => {
					https.post(url,params,function(req,res){  
						let html='';
						req.on('data',function(data){
							if(data){
								html+=data;
								// html = JSON.parse(html);
							};
						}); 
						req.on('error', function (e) {
							console.log('problem with request: ' + e.message);
							reject();
						}); 
						req.on('end',function(){
							resolve(html);	
						});  
					});
				});
			}
			catch(e){
				// TODO: 统一处理错误
			}
		},
		"commonSend":function(options){
			// 通用配置发送请求
			// options = {
			// 	hostname:"api.qpay.qq.com",
			// 	path:"/cgi-bin/hongbao/qpay_hb_mch_send.cgi?"+contents,
			// 	method:"POST",
			// 	port: 443,
			// 	key:fs.readFileSync('./ssl/apiclient_key.pem'),  -- 带证书接口
			// 	cert:fs.readFileSync('./ssl/apiclient_cert.pem'),
			// 	ca:[fs.readFileSync('./ssl/rootca.pem')],
			// 	agent:false,
			// 	rejectUnauthorized: false,
			// 	headers: {
			// 		'Content-Type': 'Application/json'
			// 	}
			// };
			try{
				return new Promise((resolve,reject) => {
					if(!options.agent){
						options.agent = false;
					}
					options.agent = new https.Agent(options);
					var req = https.request(options,function(res){
						res.setEncoding('utf-8');
						res.on("data",function(data){
							console.log("success==>");
							let result = '';
							try{
								result = JSON.parse(data);
								resolve(result);
							}catch(e){
								resolve(result);
							}
						})
					});
					req.end();
					req.on("error",function(e){
						reject(e);
					});
				});
			}
			catch(e){
				// TODO: 统一处理错误
			}
		},
		"postSendRequest":function(url,params){ // 发送post请求 -- 另一种方式
			try{
				return new Promise((resolve,reject) => {
					request({
						url: url,
						method: "POST",
						headers: {
							'Content-Type':'application/json',
							'Content-Length':params.length
						},
						body: params
					}, function(error, response, data) {
						let responseData = {
							status: 1,
							sign: '',
							orderNo:'',
							type: 'create_order_info_success',
							message: "订单创建成功！",
						};
						data = JSON.parse(data);
						if (!error && data.code === "200") {
							responseData.orderNo = data.data.orderNo;
							let _paySignTimestamp = new Date().getTime();
							let _paySign = __oppoSdkSign(
								{
									"appKey":String("cuc8M7XtBdsk8sgcWO4SSs4sg"),
									"orderNo":String(data.data.orderNo),
									"timestamp":String(_paySignTimestamp)
								}
							);
							responseData.timestamp = String(_paySignTimestamp);
							responseData.sign = _paySign;
						}else{
							responseData.status = 0;
							responseData.type = 'create_order_info_error';
							responseData.message = data.msg;
						};
						_res.json(responseData);
					});
				});
			}
			catch(e){
				// TODO: 统一处理错误
			}
		}
	}
}

module.exports = new HandleHttps()