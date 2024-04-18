var express = require('express');
var bcrypt = require('bcrypt');
var UserModel = require('../models/UserModel');

var router = express.Router();

//signup feature
router.get('/register', async (req, res) => {
    res.render('register');
})

router.post('/register', async (req, res) => {
    var user = req.body;
    var existingUser = await UserModel.findOne({ username: req.body.username });

    if (existingUser) {
        res.send("User already existed, consider login or choose a different username");
    }
    else {
        var saltRounds = 10;
        var hashedPassword = await bcrypt.hash(req.body.password, saltRounds);

        req.body.password = hashedPassword;

        await UserModel.create(user);
        res.redirect('/');
    }
})

//login feature
router.get('/login', async (req, res) => {
    res.render('login');
})

router.post("/login", async (req, res) => {
    try {
        var check = await UserModel.findOne({ username: req.body.username });
        if (!check) {
            res.render('login', {message : req.flash('danger', 'User not found')})
        }
        // Compare the hashed password from the database with the plaintext password
        var isPasswordMatch = await bcrypt.compare(req.body.password, check.password);
        if (!isPasswordMatch) {
            res.render('login', {message : req.flash('danger', 'Wrong Password')})
        }
        else {
            req.session.user = check; //Create Session
            res.redirect('back');
        }
    }
    catch {
        res.render('login', {message : req.flash('danger','User not found')})
    }
});

//logout
router.get('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return console.log(err);
        }
        res.redirect('back');
    });
});

module.exports = router;
