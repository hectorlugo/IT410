const express = require('express')
const router = express.Router()
const passport = require('passport')
const users = require('../src/users')

//return username of logged in user
router.get('/services/user', function(req, res){
    if(req.user) res.send(req.user.username)
    else res.send('No User logged in')
})

//create a new user as long as username doesn't already exist
router.post('/services/user', function(req, res){
    var username = req.body.username
    var password = req.body.password
    users.createUser(username, password)
        .then(function(val){
            res.send('New User Created')
        })
        .catch(function(error){
            res.send('Error: ' + error);
        })
})

//updates user password if user is logged in and exists. If doesn't exist, creates new user
router.put('/services/user', function(req, res){
    var username = req.body.username
    var password = req.body.password
    users.createUser(username, password)
        .then(function(val){
            res.send('New User created')
        })
        .catch(function(error){
            if(req.user && req.user.username === username){
                users.updateUser(username, password)
                    .then(function(val){
                        res.send('User password updated')
                    })
                    .catch(function(error){
                        res.send(error)
                    })
            }
            else res.send('User not logged in')
        })
})

//loges in user by username and password
router.put('/services/login', passport.authenticate('local'), function(req,res, next){
    res.send('You are logged in, ' + req.user.username)
})

//loges out the user that is logged in
router.put('/services/logout', function(req, res){
    req.logout()
    res.send('User logged out')
})

module.exports = router