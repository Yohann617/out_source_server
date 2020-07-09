var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var APPCONFIG = require('./config/index');
var ROUTES = require('./config/routes');
var indexRouter = require('./index');

var app = express();
app.all('*',function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");  // 允许所有访问
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization, X-Requested-With, token");
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  res.header("Connection", "keep-alive"); //长链接
  res.header("Access-Control-Allow-Credentials", true); //可以带cookies
  res.header("X-Powered-By", '3.2.1')
  if (req.method == 'OPTIONS') {
    res.sendStatus(200);
  } else {
    next();
  }
});
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');  // 模板引擎为jade，可设置为html、pug等等

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// TODO -- 如何验证用户？
// 简单使用自定义中间件验证
// app.use(function (req, res, next) {
//   if (!req.headers['x-auth']) return res.status(500).send("Permission denied!")
//   next()
// })

app.use('/', indexRouter);  // 首页 -- 固定
// 循环配置其他路由
Object.keys(ROUTES).forEach(function(key){
  var _path = '/' + key; 
  app.use(_path,ROUTES[key]);
})

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  // next(createError(404));
  res.status(404).send("Sorry can't find that!")
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
