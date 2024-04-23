var express = require('express');
var BrandModel = require('../models/BrandModel');

var router = express.Router();

//Details
router.get('/detail/:id', async (req, res) => {
    let id = req.params.id;
    let brand = await BrandModel.findById(id);
    res.render('brand/detail', { brand, user: req.session.user });
 })

 //Create Toys
router.get('/add', async (req, res) => {
    if (req.session.user && req.session.user.role === 'admin') {
       res.render('brand/add', { user: req.session.user });
    } else {
       res.redirect('/toy/list');
    }
 });
 
 router.post('/add', async (req, res) => {
    var brand = req.body;
    await BrandModel.create(brand);
    res.redirect('/toy/list');
 })


module.exports = router;
