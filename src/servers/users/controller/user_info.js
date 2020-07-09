var userInfo = {
  "getUserName":async function(req, res, next){
    res.render('index', { title: 'User name is yohann' });
  },
  "postUserName":async function(req, res, next){
    res.render('index', { title: 'User name is yohann' });
  }
}

module.exports = userInfo;
