"use strict";
var express = require('express');
//var http = require('http');
var app = express();
var path = require('path');

var directory;
var arg = process.argv;

if(process.argv[2]){
    directory = path.resolve(process.cwd(), process.argv[2]);
    console.log('Using location: ' + directory);
    app.use(express.static(directory));
} else {
    app.use(express.static(process.cwd() + '/'));
    console.log(arg);
}

app.get('/', function(reg, res){
    res.send("Welcome to the Main Page");
});

var listener = app.listen(3000, function(){
    console.log('Listening on port '+ listener.address().port);
});

/*http.createServer(app).listen(port, function(){
 console.log('Server started on port ' + port);
 });*/