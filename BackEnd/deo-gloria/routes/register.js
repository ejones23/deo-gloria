var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
    res.json({'content': 'Registration content...'});
});

module.exports = router;