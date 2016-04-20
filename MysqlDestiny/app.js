var express = require('express');
var path = require('path'); //added this
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var expressSession = require('express-session');
var passport = require('passport');
var passportLocal = require('passport-local');
var db = require('./database/db');


var app = express();

//Set view engine
app.set('views', path.join(__dirname, 'views'));    //added this
app.set('view engine', 'ejs');

//Passport Configuration
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '/views')));    //added this
app.use(expressSession({
    secret: 'Super Sekret',
    resave: false,
    saveUninitialized: false
}));

//Start Passport, should go after configuration
app.use(passport.initialize());
app.use(passport.session());

passport.use(new passportLocal.Strategy(function(username, password, done){
    //database stuff will go here
    db.authenticateUser(username, password).then(function(value){
        return done(null, value);
    }).catch(function(){
        return done(null, false);
    })
    //temporary authentication
    /*if(username === password){
        done(null, { id: username, name: username }); //gets this from database
    } else {
        done(null, false, { message: 'Invalid username or password' });//validation failed
    }*/
}));

//tells passport how to serialize user data
passport.serializeUser(function(user, done){
    done(null, user.username);
});

passport.deserializeUser(function(user, done){
    //query database or cache here!
    db.findUser(user).then(function(user){
        done(null, user);
    })
});

/*done(null, { id: id, name: id});*/

var port = process.env.PORT || 8000;

app.use('/', require('./router/routes'));

app.listen(port, function() {
    console.log('Server started on port: ' + port);
});