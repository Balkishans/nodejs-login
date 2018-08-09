/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var express = require('express');
var ejs = require('ejs');
var path = require('path');
var app = express();
var bodyParser = require('body-parser');
var pg = require('pg');
var session = require('express-session');
const http = require('http');
var port = 3000;

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');	



app.use(session({ secret: 'keyboard cat', cookie: { maxAge: 600000 }}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(__dirname + '/views'));

var index = require('./routes/index');
var employees = require('./routes/employees');
app.use('/', index);
app.use('/', employees);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('File Not Found');
  err.status = 404;
  next(err);
});

// error handler
// define as the last app.use callback
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.send(err.message);
});

// Start listening
app.listen(process.env.PORT||3000, function(){
    console.log('Your node js server is running');
});
console.log("Running app on port port. Visit: http://localhost:" + port + "/");
