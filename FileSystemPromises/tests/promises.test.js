//Hector Lugo
//IT410
"use strict";
var expect = require('chai').expect;
var promises = require('../promises');
var Promise = require('bluebird');

describe('getPathType', function(){
    it('Returns a Promise', function(){
       expect(promises.getPathType('../../FileSystemPromises')).to.be.instanceof(Promise);
    });

    it('Returns File', function(){
        return promises.getPathType('../file.txt')
            .then(function(result){
                expect(result).to.be.equal('file')
            })
    })

    it('Returs Directory', function(){
        return promises.getPathType('../node_modules')
            .then(function(result){
                expect(result).to.be.equal('directory')
            })
    })

    it('Returns Nothing', function(){
        return promises.getPathType('doesNotExist')
            .then(function(result){
                expect(result).to.be.equal('nothing')
            })
    })

    it('Rejects Not a String', function(){
       return promises.getPathType(1)
           .catch(function(result){
               expect(result).to.be.equal('not a string')
           });
    });
});

/*This promise is rejected if:
The path is not a string +
The depth is not a number +
The filter is not a function +
The path does not point to a directory that can be read +
Any other error occurs*/
describe('getDirectoryTypes', function(){
    it('Returns not string', function(){
        return promises.getDirectoryTypes(12345)
            .catch(function(result){
                expect(result).to.be.equal('not a string')
            })
    })

    it('Returns not a directory', function(){
        return promises.getDirectoryTypes('promises.js')
            .catch(function(result){
            expect(result).to.be.equal('not a directory')
        })
    })

    it('Returns not a function', function(){
        return promises.getDirectoryTypes('tests', 1, 'nonFunction')
            .catch(function(result){
            expect(result).to.be.equal('not a function')
        })
    })

    it('Returns not a Number', function(){
        return promises.getDirectoryTypes('tests', 'Number', 'nonFunction')
            .catch(function(result){
                expect(result).to.be.equal('not a number')
            })
    })

    it('Returns not a function', function(){
        return promises.getDirectoryTypes('tests', 1, 'nonFunction')
            .catch(function(result){
                expect(result).to.be.equal('not a function')
            })
    })

    it('Returns ObjMap of PathsToTypes only in one directory', function (){
        return promises.getDirectoryTypes('../../FileSystemPromises', 0)
            .then(function(result){
                expect(result).to.have.property('C:\\Users\\HectorD\\IT410\\FileSystemPromises\\promises.js', 'file')
                expect(result).to.have.property('C:\\Users\\HectorD\\IT410\\FileSystemPromises\\node_modules', 'directory')
                expect(result).to.have.property('C:\\Users\\HectorD\\IT410\\FileSystemPromises\\file.txt', 'file')
                expect(result).to.have.property('C:\\Users\\HectorD\\IT410\\FileSystemPromises\\tests', 'directory')
        })
            .catch(function(result){
                expect(result).to.have.property('C:\\Users\\HectorD\\IT410\\FileSystemPromises\\node_modules\\bluebird', 'directory')
            })
    })
    it('Returns ObjMap of PathsToTypes including sub directories', function (){
        return promises.getDirectoryTypes('../../FileSystemPromises', 2)
            .then(function(result){
                expect(result).to.have.property('C:\\Users\\HectorD\\IT410\\FileSystemPromises\\promises.js', 'file')
                expect(result).to.have.property('C:\\Users\\HectorD\\IT410\\FileSystemPromises\\node_modules', 'directory')
                expect(result).to.have.property('C:\\Users\\HectorD\\IT410\\FileSystemPromises\\node_modules\\chai', 'directory')
                expect(result).to.have.property('C:\\Users\\HectorD\\IT410\\FileSystemPromises\\tests', 'directory')
                expect(result).to.have.property('C:\\Users\\HectorD\\IT410\\FileSystemPromises\\node_modules\\bluebird\\README.md', 'file')
            })
    })
});

describe('Exists', function (){
    it('Directory Found', function(){
        return promises.exists('../node_modules')
            .then(function(result){
            expect(result).to.be.equal(true)
        })
    })
    it('File Found', function(){
            return promises.exists('../promises.js')
                .then(function(result){
                    expect(result).to.be.equal(true)
                })
        })
    it('Item Not Found', function(){
        return promises.exists('Directory')
            .then(function(result){
            expect(result).to.be.equal(false)
        })
    })
});

describe('getFilePaths', function (){
    it('Returns array of file names', function (){
        var folder = 'C:\\Users\\HectorD\\IT410\\FileSystemPromises'
        return promises.getFilePaths(folder, 0)
            .then(function(result){
                var should = [folder + '\\promises.js', folder + '\\file.txt', folder + '\\aFile.js', folder + '\\aFile2.txt']
                expect(result).to.have.members(should)
            })
    })
    it('Returns not a string', function(){
        return promises.getFilePaths(12345, 0)
            .catch(function(result){
            expect(result).to.equal('not a string')
        })
    })
    it('Returns not a directory', function(){
        return promises.getFilePaths('directory', 0)
            .catch(function(result){
                expect(result).to.equal('not a directory')
            })
    })
});

describe('readFile', function (){
    it('Returns File Contents', function (){
        return promises.readFile('../file.txt')
            .then(function(result){
            expect(result).to.be.equal('testing\r\nthis \r\nwhat')
        })
    })
    it('Returns not a string', function(){
        return promises.readFile(12345)
            .catch(function(result){
            expect(result).to.be.equal('not a string')
        })
    })
    it('Returns not a file', function(){
        return promises.readFile('../node_modules')
            .catch(function(result){
            expect(result).to.be.equal('not a file')
        })
    })
})

describe('readFiles', function (){
    it('Returns arrays of file contents', function (){
        return promises.readFiles(['../aFile.js', '../aFile2.txt', '../file.txt'])
            .then(function (result){
            expect(result).to.have.property('../aFile.js', "'you can read me'")
            expect(result).to.have.property('../aFile2.txt', 'wow you can see me too?')
            expect(result).to.have.property('../file.txt', 'testing\r\nthis \r\nwhat')
        })
    })
    it('Returns not a string', function(){
        return promises.readFiles([12345])
            .catch(function(result){
            expect(result).to.be.equal('not a string')
        })
    })
    it('Returns not a file', function(){
        return promises.readFiles(['../node_modules'])
            .catch(function(result){
            expect(result).to.be.equal('not a file')
        })
    })
})

