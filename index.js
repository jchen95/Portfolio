var express = require("express");
var app = express();
var mongoose = require("mongoose");
var bodyParser = require("body-parser");
var path = require('path');
var pug = require('pug');
var db = mongoose.connection;
var bcrypt = require('bcryptjs')
var expressValidator = require('express-validator');

app.use(expressValidator())
app.set('view engine', 'pug')
app.set('views', path.join(__dirname,'views'));
app.use(express.static("public"))
app.use(bodyParser.urlencoded({ extended: false }));


//CHECK MONGODB CONNECTION
mongoose.connect('mongodb://localhost/portfolio_app')
db.once('open', function() {
  console.log('connected to mongodb')
});

//CHECK FOR ERROR
db.on('error', function() {
  console.log(err);
});


//HOMEPAGE ROUTE
app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname + '/htmlroutes/homepage.html'));
});


app.get('/movie', function(req, res) {
  res.sendFile(path.join(__dirname + '/htmlroutes/moviescheduler.html'));
});

  
app.get('/colorgame', function(req, res) {
  res.sendFile(path.join(__dirname + '/htmlroutes/colorgame.html'));
});

app.get('/circles', function(req, res) {
  res.sendFile(path.join(__dirname + '/htmlroutes/circles.html'));
});

app.listen(3000, '0.0.0.0', function() {
  console.log('Listening to port:  ' + 3000);
});

