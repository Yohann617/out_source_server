/**
 * modify-time: 2020-06-22
 * autor: yohann
 * 
 * new:
 * 	具体实现；
 * 	自动运行的任务；
 * 
 * modify:
 * 	none
 * 
*/
/**
 * 写入: write()
 * @params url : ./mergeFile/generate/
 * @params fileName : mergeSql
 * @params type : sql
 * 
 * */
/**
 * 追加内容: append()
 * @params url : ./mergeFile/generate/
 * @params fileName : mergeSql
 * @params type : sql
 * @params content : String
 * 
 * */
/**
 * 另一种写入方式:writeFile()
 * @params url : ./mergeFile/generate/
 * @params fileName : mergeSql
 * @params type : sql
 * @params content : String
 * 
 * */
/**
 * 清除文件夹: clear()
 * 并重新创建一个相同的文件夹；
 * */


var fs = require('fs');//文件模块
var multer  = require('multer');

var Files = function(){
	return {
		"write":function(url,fileName,type){
			try{
				let _url = url + fileName + '.' + type;
				fs.writeFile(_url,'','utf8',function(error){
					if(error){
						console.log(error);
						return false;
					}
					console.log('写入成功');
				});
			}catch(e){
				console.log(e);
			}
		},
		"append":function(url,fileName,type,content){
			try{
				let _url = url + fileName + '.' + type;
				fs.appendFileSync(_url,content,function(error){  // 追加内容
					if(error){
						console.log(error);
						return false;
					};
					console.log('追加成功');
				});
			}catch(e){
				console.log(e);
			}
		},
		"writeFile":function(url,fileName,type,content){
			try{
				let _url = url + fileName + '.' + type;
				fs.appendFileSync(_url,content,function(error){  // 追加内容
					if(error){
						console.log(error);
						return false;
					};
					console.log('追加成功');
				});
			}catch(e){
				console.log(e);
			}
		},
		"clearFile":function(paths){
			try{
				let delDir = function(path){
					let files = [];
					if(fs.existsSync(path)){
						files = fs.readdirSync(path);
						files.forEach((file, index) => {
							let curPath = path + "/" + file;
							if(fs.statSync(curPath).isDirectory()){
								delDir(curPath); //递归删除文件夹
							} else {
								fs.unlinkSync(curPath); //删除文件
							}
						});
						fs.rmdirSync(path);
					}
				}
				delDir(paths); //删除文件夹
				fs.mkdirSync(paths,'0755'); //创建当前文件夹
				return true;
			}catch(e){
				console.log(e);
			}
		},
		"uploadFile":function(dest,path,type){
			try{
				let upload = multer({dest: dest}).any();
				upload(req, res, function (err) {
					if (err) {
						console.log(err);
						return;
					}; 
					req.file = req.files[0];
					let tmp_path = req.file.path;
					let target_path = path + "." + type;
	
					if (!fs.existsSync(target_path)) {
						fs.mkdirSync(target_path);
					}
	
					let src = fs.createReadStream(tmp_path);
					let dest = fs.createWriteStream(target_path);
					src.pipe(dest);
					src.on('end', function() {
						return true
					});
					src.on('error', function(err) { 
						return false
					});
				});
			}catch(e){
				console.log(e);
			}
		}
	}
}
module.exports = new Files()