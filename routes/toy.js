var express = require('express');
var ToysModel = require('../models/ToysModel');

var router = express.Router();

// Get all toys
router.get('/list', async (req, res) => {
   var toyList = await ToysModel.find({});
   res.render('toy/list', { toyList });
});

module.exports = router;