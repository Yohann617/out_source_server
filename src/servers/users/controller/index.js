var index = {
  "demo":function(req, res, next) {
    res.render('index', { title: 'User index' });
  }
}

module.exports = index;
