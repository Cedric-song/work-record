var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/signup', function(req, res, next) {
  res.render('signup', {
    title: '注册',
    layout: 'nologin-layout'
  });
});

router.get('/login', function(req, res, next) {
  res.render('login', {
    title: '登录',
    layout: 'nologin-layout'
  });
});

router.get('/record', function(req, res, next) {
  res.render('record', {
    title: '考勤记录'
  });
});

module.exports = router;
