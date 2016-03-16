const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const cookieParser = require('cookie-parser');
const users = require('./src/users');
const session = require('express-session');

var app = express()

var port = process.env.PORT || 3000

//tell passport to use a local strategy and tell it how to validate a usernama and password
passport.use(new LocalStrategy(function(username, password, done) {
    //console.log('Testing');
    users.authUser(username, password)
        .then(function(value){
            return done(null, value)
        })
        .catch(function(error){
            return done(null, false)
        })
}));

//tell passport how to serialize user data to store in the session
passport.serializeUser(function(user, done) {
    done(null, user.username)
});

//tell passport how to deserialize the data back to the user
passport.deserializeUser(function(username, done){
    users.findUser(username)
        .then(function(user){
            done(null, user)
        })
});

//tell the express app what middleware to use
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(session({ secret: 'secret key', resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

app.use('/', require('./routes/user-management'));

app.listen(port, function(){
    console.log('Server started on port ' + port);
});