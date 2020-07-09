var express = require('express');
var router = express.Router();
var index = require('./controller/index');
var userInfo = require('./controller/user_info');
var books = require('./controller/books');

/* GET users listing. */
router.all('/', index.demo);
router.get('/get_user_name', userInfo.getUserName).post(userInfo.postUserName);
router.get('/users/:userId/books/:bookIde', books.getBook);      // 访问：http://localhost:3000/users/34/books/8989
router.get('/users/books/from/:from-:to', books.fromTo);         // http://localhost:3000/books/from/LAX-SFO
router.get('/users/books/genus/:genus.:species', books.genus);   // http://localhost:3000/books/genus/Prunus.persica
router.get('/users/books/age/:ages(\d+)', books.age);            // http://localhost:3000/books/age/42

module.exports = router;
