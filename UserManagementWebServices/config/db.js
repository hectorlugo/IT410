var mysql = require('mysql');
const Promise = require('bluebird');
const assert = require('assert');

//connect to database
var con = mysql.createConnection({
    host        : 'localhost',
    user        : 'theUser',
    password    : 'password123@',
    database    : 'umws'
});
con.connect();

//create user
exports.createUser = function(username, password){
    return new Promise(function(resolve,reject){
        var post = {username:username, password:password};
        con.query("INSERT INTO users SET ?", post, function(err, result){
            if(!err) resolve("New user created");
            else reject("User already exists")
        })
    });
}

//update password
exports.updateUser = function(username, password){
    return new Promise(function(resolve, reject){
        con.query("UPDATE users SET password = '" + password + "' WHERE username = '" + username + "'", function(err, result){
            if(err){
                reject("Unable to update password");
            }
            resolve("Updated password");
        });
    });
}

//Authenticate
exports.authUser = function(username, password){
    return new Promise(function(resolve, reject){
        con.query("SELECT * FROM users WHERE username='"+ username +"'", function(err, rows){
            rows.forEach(function(value){
                if(value.username === username && value.password === password) resolve(value);
            })
            reject("Incorrect username or password");
        });
    });
}

//Finds User
exports.findUser = function(username){
    return new Promise(function(resolve, reject){
        con.query('SELECT username FROM users WHERE username="'+ username +'"', function(err, rows){
            rows.forEach(function(value){
                if(value.username === username) resolve(value);
            })
            reject("User does not exist");
        });
    });
}


