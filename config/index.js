var BASE = require('./base');
var DEV = require('./dev');
var PROD = require('./prod');
var _isProd = false;

var APPCONFIG = _isProd?Object.assign({},BASE,PROD):Object.assign({},BASE,DEV);

module.exports = APPCONFIG;
