'use strict';

var express = require('express');
var app = express();
var path = require('path');
var rootPath = path.normalize(__dirname);
var nodePort = '2009';

app.use(express.static(rootPath));
console.log(rootPath);
app.use('/node_modules', express.static(rootPath + '/node_modules'))


app.get('/', function(req, res){
    res.sendFile(rootPath + '/index.html');
});

app.listen(nodePort);
console.log(new Date() + ' Listening on port: ' + nodePort);


