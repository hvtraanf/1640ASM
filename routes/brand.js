var express = require('express');
var BrandModel = require('../models/BrandModel');

var router = express.Router();

//Details
router.get('/detail', async (req, res) => {
    router.get('/detail/:id', async (req, res) => {
        let id = req.params.id;
        let brand = await BrandModel.findById(id);
        res.render('brand/detail', { brand, user: req.session.user });
     })
 })

module.exports = router;
