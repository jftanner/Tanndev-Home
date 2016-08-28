/*
 * Copyright (c) 2016 James Tanner
 */

var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res) {
    res.render('index', {title: 'Tanner Developments', message: "Coming soon!"});
});

module.exports = router;
