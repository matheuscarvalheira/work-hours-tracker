var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('login', { title: 'Login' });
});

router.post('/', function(req, res, next) {
  const { username } = req.body;
  req.session.username = username;
  res.redirect('/');
});

module.exports = router;
