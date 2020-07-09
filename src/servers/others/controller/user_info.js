
var dataSource = require('../../../../dataSource/dataSourceInterface');

var userInfo = {
  "getUserName":async function(req, res, next){
    var _userList = await dataSource.getUserInfo();
    res.render('index', { title: JSON.stringify(_userList) });
  },
  "postUserName":async function(req, res, next){
    res.render('index', { title: 'User name is yohann' });
  }
}

module.exports = userInfo;
