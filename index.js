var express = require("express");
var app = express();
var mongoose = require("mongoose");
var bodyParser = require("body-parser");
var path = require('path');


mongoose.connect('mongodb://localhost/portfolio_app')
var db = mongoose.connection;
app.set('viewengine', 'ejs')
app.use(express.static("public"))
app.use(bodyParser.urlencoded({ extended: true }));



app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname + '/htmlroutes/homepage.html'));
});
  

app.get('/movie', function(req, res) {
  res.sendFile(path.join(__dirname + '/htmlroutes/moviescheduler.html'));
});

app.get('/blog', function(req, res) {
  res.sendFile(path.join(__dirname + '/htmlroutes/blog.html'));
});
  
app.get('/colorgame', function(req, res) {
  res.sendFile(path.join(__dirname + '/htmlroutes/colorgame.html'));
});

app.get('/circles', function(req, res) {
  res.sendFile(path.join(__dirname + '/htmlroutes/circles.html'));
});

app.listen(3000);
console.log('running on port 3000...');
