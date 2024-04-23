var express = require('express');
var ToysModel = require('../models/ToysModel');
var BrandModel = require('../models/BrandModel');

var router = express.Router();

// Get all toys
router.get('/list', async (req, res) => {
   var isAdmin = (req.session.user && req.session.user.role === 'admin');
   // if(req.session.user && req.session.user.role === 'admin'){
   //    isAdmin = true;
   // }
   var toyList = await ToysModel.find({}).where('quantity').gt(0).populate('brand');
   res.render('toy/list', { toyList, user: req.session.user, isAdmin: (req.session.user && req.session.user.role === 'admin') });
   console.log(isAdmin);
});

//Create Toys
router.get('/add', async (req, res) => {
   if (req.session.user && req.session.user.role === 'admin') {
      var brand = await BrandModel.find({});
      res.render('toy/add', { user: req.session.user, brand });
   } else {
      res.redirect('/toy/list');
   }
});

router.post('/add', async (req, res) => {
   var toy = req.body;
   await ToysModel.create(toy);
   res.redirect('/toy/list');
})

//Delete Toys
router.get('/delete/:id', async (req, res) => {
   if (req.session.user && req.session.user.role === 'admin') {

      let id = req.params.id;
      await ToysModel.findByIdAndDelete(id);
      res.redirect('/toy/list');
   }
   else {
      res.redirect('/toy/list');
   }
})

//Edit Toys
router.get('/edit/:id', async (req, res) => {
   if (req.session.user && req.session.user.role === 'admin') {
      let id = req.params.id;
      var brand = await BrandModel.find({});
      let toy = await ToysModel.findById(id);
      res.render('toy/edit', { toy, brand, user: req.session.user });
   }
   else {

      res.redirect('/toy/list');
   }
})

router.post('/edit/:id', async (req, res) => {
   let id = req.params.id;
   let toy = req.body;
   await ToysModel.findByIdAndUpdate(id, toy);
   res.redirect('/toy/list');
})

//Details
router.get('/detail/:id', async (req, res) => {
   let id = req.params.id;
   let toy = await ToysModel.findById(id);
   res.render('toy/detail', { toy, user: req.session.user });
})

//Add toy to cart
router.get('/addToCart/:id', async (req, res) => {
   let id = req.params.id;
   let toy = await ToysModel.findById(id);
   toy.quantity = toy.quantity - 1;
   toy.save();
   res.redirect('/toy/list');

})

module.exports = router;