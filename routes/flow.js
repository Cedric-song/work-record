var express = require('express');
var router = express.Router();

var models = require('./../models/user');
var User = models.User;

/* GET users listing. */
router.post('/register', function(req, res, next) {
  var user = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password
  })

  user.save()

  res.json({
    "code": 200,
    "status": "success",
    "result": {
      "name": req.body.name,
      "email": req.body.email
    }
  });
});


router.post('/login', function(req, res, next) {
  var user = {
    username: 'admin',
    password: '123456'
  }
  if (req.body.username === user.username && req.body.password === user.password) {
    res.json({
      "code": 200,
      "status": "success"
    });
  }

  res.json({
    "code": 500,
    "status": "failed"
  });
});
module.exports = router;
