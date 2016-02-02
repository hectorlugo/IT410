//Hector Lugo
//IT410
"use strict";
const fs = require('fs');
var Path = require('path');
const Promise = require('bluebird');
/*
Promise : getPathType ( path : String )
Determine if the path points to a file, a directory, nothing, or other. This is done using fs.stat*/
//var getPathType;
exports.getPathType = function(path) {
    return new Promise(function(resolve, reject){
        //check if path is valid
        if(typeof path !== 'string'){
            return reject('not a string');
        }
        fs.stat(path, function(err, stats){
            //returns what the path type is
            if(err || !stats){
                return resolve('nothing');
            } else if(stats.isFile()){
                return resolve('file');
            } else if(stats.isDirectory()){
                return resolve('directory');
            } else {
                return resolve('other');
            }
        })
    })
};

/*Promise : getDirectoryTypes ( path : String [, depth : Number = -1 ] [, filter : Function = function(path, type) { return true; } )
Read a directory and get the path types, using fs.readdir and getPathType, for each file path in the directory.
Resolves to an object map that maps file paths to file path types. Example map result:
{'path/to/file': 'file', 'path/to/directory: 'directory'}*/

exports.getDirectoryTypes = function(path, depth, filter){
    if (arguments.length < 2) depth = -1;
    if (arguments.length < 3) filter = function() { return true };

    return new Promise(function(resolve, reject)
    {
        //checking depth and filter for valid arguments
        if(typeof depth !== 'number'){return reject('not a number')}
        if(typeof filter !== 'function'){return reject('not a function')}
        return exports.getPathType(path)
            .then(function(result)
            {
                if(result === 'directory'){
                    fs.readdir(path, function(err, files){
                        if(err){return reject(err)}
                        var results = {};
                        //returns map
                        return Promise.map(files, function(file){
                            var fullPath = Path.resolve(path, file);    //combine the path and file name
                            //console.log(fullPath);
                            return exports.getPathType(fullPath)
                                .then(function(type){
                                    if(filter(fullPath, type)){results[fullPath] = type;}
                                    if(type === 'directory' && depth !== 0){
                                        return exports.getDirectoryTypes(fullPath, depth - 1, filter)
                                            .then(function(object) {
                                                Object.assign(results, object);
                                            });
                                    }
                                });
                        }).then(function(){
                            return resolve(results);
                        })
                    })
                }else{
                    return reject('not a directory');
                }
            }).catch(function(err){
                return reject(err);
            })
    })
};

/*exists ( path : String )
Check to see if something exists at the specified path by using getPathType*/
//var exists;
exports.exists = function (path) {
    return new Promise(function (resolve, reject) {
        //uses getPathType function to find if path exists
        return exports.getPathType(path)
            .then(function (type) {
                if (type === 'nothing') {
                    return resolve(false)
                } else {
                    return resolve(true)
                }
            }).catch(function (err) {
                return reject(err)
            })
    })
};

/*getFilePaths ( path: String [, depth : Number = -1 ] )
Read a directory (and possibly sub-directories) to get an array of all paths to files, using getDirectoryTypes*/
//var getFilePaths;
exports.getFilePaths = function (path, depth){
    return new Promise(function (resolve, reject){
        return exports.getDirectoryTypes(path, depth, function (path, type){
            return type === 'file'
        }).then(function (obj){
            return resolve(Object.keys(obj))
        }).catch(function (err){
            return reject(err)
        })
    })
};

/*readFile ( path: String )
Get the contents of a file*/
//var readFile;
exports.readFile = function (path) {
    return new Promise(function (resolve, reject) {
        return exports.getPathType(path)
            .then(function (type) {
                if (type !== 'file') {
                    return reject('not a file')
                }
                //reads file
                fs.readFile(path, 'utf8', function (err, data) {
                    if(err){
                        return reject(err);
                    }else {
                        return resolve(data);
                    }
                })
            }).catch(function (err) {
                return reject(err)
            })
    })
};

/*readFiles ( paths: String[] )
 Get the contents of multiple files using readFile*/
//var readFiles;
exports.readFiles = function(paths){
    return new Promise(function (resolve, reject){
        return Promise.reduce(paths, function (obj, path){
            return exports.readFile(path).then(function (data){
                obj[path] = data;
                return obj
            })
        }, {}).then(function (obj){
            return resolve(obj)
        }).catch(function (err){
            return reject(err)
        })
    })
};

/*module.exports = {
    getPathType : getPathType,
    getDirectoryTypes : getDirectoryTypes,
    exists : exists,
    getFilePaths : getFilePaths,
    readFile : readFile,
    readFiles : readFiles
};*/

