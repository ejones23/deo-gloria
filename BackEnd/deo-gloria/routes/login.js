var express = require('express');
var hash = require('pbkdf2-password')();
var router = express.Router();

var db = require('../services/db');

function authenticate(name, pass, fn) {
  db.getUser(name).then(user => {
    if (!user) return fn(new Error('cannot find user'));
    hash({ password: pass, salt: user.salt }, function (err, pass, salt, hash) {
      if (err) return fn(err);
      if (hash === user.hash) return fn(null, user)
      fn(new Error('invalid password'));
    })
  });
}

router.post('/', function(req, res) {
  authenticate(req.body.username, req.body.password, function(err, user){
    if (user) {
      req.session.regenerate(function(){
        // Store the user's primary key
        // in the session store to be retrieved,
        // or in this case the entire user object
        req.session.user = user;
        res.json({'authenticated': true});
      });
    } else {
      res.json({'error': err?.message });
    }
  });
});

module.exports = router;
