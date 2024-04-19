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
        res.redirect('/user/');
    }
})

//login feature
router.get('/login', async (req, res) => {
    res.render('login');
})

router.post("/login", async (req, res) => {
    try {
        var check = await UserModel.findOne({ username: req.body.username });
        let message = "";
        if (!check) {
            message = "Error: User not found"
            res.render('login', { message })
            console.log(message)
        }
        // Compare the hashed password from the database with the plaintext password
        var isPasswordMatch = await bcrypt.compare(req.body.password, check.password);
        if (!isPasswordMatch) {
            message = "Wrong Password"
            res.render('login', { message })
        }
        else {
            req.session.user = check; //Create Session
            res.redirect('/user/login');
        }
    }
    catch {
        res.render('login', { message: req.flash('danger', 'User not found') })
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
