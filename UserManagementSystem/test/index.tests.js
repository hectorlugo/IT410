//IT410
//Hector Lugo
"user strict";
var expect = require('chai').expect;
var Promise = require('bluebird');
var db = require('../index.js');

describe('User Functions', function(){
    it('Creats the User', function(){
        return db.createUser('wildheck', 'Lugo', 'Hector', 'myPass', 29)
            .then(function(result){
                expect(result).to.be.equal(true);
            });
    });

    it('Create same User again', function(){
        return db.createUser('wildheck', 'Lugo', 'David', 'thePass', 30)
            .then(function(result){
                expect(result).to.be.equal(false);
            });
    });

    it('User Changes Password', function(){
        return db.updatePassword('wildheck', 'myPass', 'myPass2')
            .then(function(result){
                expect(result).to.be.equal(true);
            });
    });
});

describe('User Authentication', function(){
    it('Authentication Pass', function(){
       return db.authenticate('wildheck', 'myPass2')
           .then(function(result){
              expect(result).to.be.equal(true);
           });
    });

    it('Authentication Fail Password', function(){
        return db.authenticate('wildheck', 'wrongPass')
            .then(function(result){
                expect(result).to.be.equal(false);
            });
    });
    it('Authentication Fail userName', function(){
        return db.authenticate('wronguser', 'myPass')
            .catch(function(result){
                expect(result).to.be.equal("user dont exist");
            });
    });
    it('Delete User', function(){
        return db.removeUser('wildheck', 'myPass2')
            .then(function(result){
                expect(result).to.be.equal(true);
            });
    });

});