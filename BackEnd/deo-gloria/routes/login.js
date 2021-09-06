var express = require('express');
var hash = require('pbkdf2-password')();
var router = express.Router();

/* TODO remove */
var users = {
  tj: { name: 'tj' }
};

/* TODO remove */
hash({ password: 'foobar' }, function (err, pass, salt, hash) {
  if (err) throw err;
  // store the salt & hash in the "db"
  users.tj.salt = salt;
  users.tj.hash = hash;
});

function authenticate(name, pass, fn) {
  var user = users[name];
  if (!user) return fn(new Error('cannot find user'));
  hash({ password: pass, salt: user.salt }, function (err, pass, salt, hash) {
    if (err) return fn(err);
    if (hash === user.hash) return fn(null, user)
    fn(new Error('invalid password'));
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
        res.json({});
      });
    } else {
      res.json({'error': 'Invalid username/password'});
    }
  });
});

module.exports = router;
