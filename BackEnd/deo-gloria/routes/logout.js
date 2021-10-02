var express = require('express');
var router = express.Router();

router.post('/', function(req, res) {
  req.session.regenerate(function(){
    req.session.user = null;
    res.json({'authenticated': false});
  });
});

module.exports = router;