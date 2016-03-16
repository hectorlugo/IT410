const db = require('../config/db');
const Promise = require('bluebird');

exports.createUser = function(user, pass){
    return db.createUser(user, pass);
};

exports.updateUser = function(user, pass){
    return db.updateUser(user, pass);
};

exports.authUser = function(user, pass){
    return db.authUser(user, pass);
};

exports.findUser = function(user){
    return db.findUser(user);
};
