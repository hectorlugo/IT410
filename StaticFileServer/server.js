
"use strict";
var express = require('express');
var http = require('http');
var app = express();
var path = require('path');
var port = 3000;
var directory;

if(process.argv[2]){
    directory = path.resolve(process.cwd(), process.argv[2]);
    console.log('Using location: ' + directory);
    app.use(express.static(directory));
} else {
    directory = process.cwd();
    console.log('Using location: ' + directory);
    app.use(express.static('public'));
}

http.createServer(app).listen(port, function(){
    console.log('Server started on port ' + port);
});

