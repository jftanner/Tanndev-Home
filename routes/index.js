/*
 * Copyright (c) 2016 James Tanner
 */

var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Tanndev' });
});

module.exports = router;
