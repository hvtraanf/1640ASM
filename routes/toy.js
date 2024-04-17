var express = require('express');
var ToysModel = require('../models/ToysModel');

var router = express.Router();

// Get all toys
router.get('/list', async (req, res) => {
   var toyList = await ToysModel.find({});
   res.render('toy/list', { toyList });
});

//Create Toys
router.get('/add', async(req, res) => {
   res.render('toy/add');
})

router.post('/add', async(req, res) => {
   var toy = req.body;
   await ToysModel.create(toy);
   res.redirect('/toy/list');
})

//Delete Toys
router.get('/delete/:id', async (req, res) => {
   let id = req.params.id;
   await ToysModel.findByIdAndDelete(id);
   res.redirect('/toy/list');
})

//Edit Toys
router.get('/edit/:id', async(req, res) => {
   let id = req.params.id;
   let toy = await ToysModel.findById(id);
   res.render('toy/edit', { toy });
})

router.post('/edit/:id', async(req, res) => {
   let id = req.params.id;
   let toy = req.body;
   await ToysModel.findByIdAndUpdate(id, toy);
   res.redirect('/toy/list');
})

//Details
router.get('/detail/:id', async(req, res)=>{
   let id = req.params.id;
   let toy = await ToysModel.findById(id);
   res.render('toy/detail', { toy });
})

module.exports = router;