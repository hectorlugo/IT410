var express = require('express');
var router = express.Router();
var passport = require('passport');
var db = require('../database/db');

var userinfo;
router.get('/', function(req, res) {
    res.render('index', {
        isAuthenticated: req.isAuthenticated(),
        user: req.user
    });
});

router.get('/login', function(req, res) {
    res.render('login');
});

router.post('/login', passport.authenticate('local'), function(req, res){
        userinfo = req.user.username;
        //res.cookie('userinfo', req.user.username);
        res.redirect('/');
    }
);



router.get('/register', function(req, res) {
    res.render('register');
});

router.post('/register', function(req, res){
    var username = req.body.username;
    var password = req.body.password;
    db.createUser(username, password).then(function(value){
        console.log('New User Created');
        res.redirect('/login');
    }).catch(
        function(error){
            console.log('Error: ' + error);
        }
    )
});

router.get('/logout', function(req, res){
    userinfo = '';
    req.logout();
    res.redirect('/');
});

router.get('/guardianlist', function(req, res){
    console.log('database searched');
    var username = userinfo;
    console.log('the cookie is: ' +username);
    db.getGuardians(username).then(function(result){
        //console.log('Retrieved Guardian List');
        res.json(result);
    });
    //console.log('testing');
});

router.post('/addGuardian', function(req, res){
    console.log('adding guardian');
    var GuardianID = req.body.GuardianID;
    var username = userinfo;
    var gClass = req.body.class;
    var gender = req.body.gender;
    var race = req.body.race;
    var level = req.body.level;
    db.addGuardian(GuardianID, username, gClass, gender, race, level).then(function(result){
        res.send(result);
    }).catch(function(error){
        res.send(error);
    })
});

router.post('/addWeapon', function(req, res){
    console.log('adding Weapon');
    var username = userinfo;
    var WeaponID = req.body.WeaponID;
    var WeaponName = req.body.WeaponName;
    var Type = req.body.Type;
    var Subtype = req.body.Subtype;
    var Attack = req.body.Attack;
    db.addWeapon(username, WeaponID, WeaponName, Type, Subtype, Attack).then(function(result){
        res.send(result);
    }).catch(function(error){
        res.send(error);
    })
});

router.post('/addArmor', function(req, res){
    console.log('adding Armor');
    var username = userinfo;
    var ArmorID = req.body.ArmorID;
    var ArmorName = req.body.ArmorName;
    var Type = req.body.Type;
    var Defense = req.body.Defense;
    var intellect = req.body.intellect;
    var discipline = req.body.discipline;
    var strength = req.body.strength;
    db.addArmor(username, ArmorID, ArmorName, Type, Defense, intellect, discipline, strength).then(function(result){
        res.send(result);
    }).catch(function(error){
        res.send(error);
    })
});

router.post('/equip', function(req, res){
    console.log('equipping Armor');
    var username = userinfo;
    var GuardianID = req.body.GuardianID;
    var wPrimary = req.body.wPrimary;
    var wSpecial = req.body.wSpecial;
    var wHeavy = req.body.wHeavy;
    var Helmet = req.body.Helmet;
    var Gauntlets = req.body.Gauntlets;
    var Chest = req.body.Chest;
    var Legs = req.body.Legs;
    var ClassArmor = req.body.ClassArmor;
    var Artifacts = req.body.Artifacts;
    var Ghost = req.body.Ghost;
    db.equip(username, GuardianID, wPrimary, wSpecial, wHeavy, Helmet, Gauntlets, Chest, Legs, ClassArmor, Artifacts, Ghost).then(function(result){
        res.send(result);
    }).catch(function(error){
        res.send(error);
    })
});

module.exports = router;



/*
app.post('/login', passport.authenticate('local', {
    successRedirect: '/loggedin',
    failureRedirect: '/login', // see text
    failureFlash: true // optional, see text as well
});*/

/*router.post('/login', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/'
}), function(req, res) {
    res.cookie('userinfo', req.user.username);
    console.log('setting the cookie');
});*/
