var express = require('express');
var hash = require('pbkdf2-password')();
var router = express.Router();

var db = require('../services/db');

router.post('/', function(req, res) {
  let username = req.body.username;
  db.getUser(username).then(existingUser => {
    if (existingUser) {
      res.json({ error: 'An account with that username already exists.' });
    } else {
      hash({ password: req.body.password }, function (err, pass, salt, hash) {
        if (err) {
          res.json({ error: err?.message })
        } else {
          db.addUser(username, salt, hash).then(newUser => {
            res.json({ user_added : true });
          })
        }
      })
    }
  })
});

module.exports = router;