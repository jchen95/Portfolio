var express = require("express");
var app = express();
var mongoose = require("mongoose");
var bodyParser = require("body-parser");
var path = require('path');
var pug = require('pug');
var db = mongoose.connection;

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

//MONGOOSE CONFIG
var blogSchema = new mongoose.Schema({
  title: String,
  body: String,
  created: {
    type: Date,
    default: Date.now,
  }
});

var Blog = module.exports = mongoose.model("Blog", blogSchema);


//ROUTES

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname + '/htmlroutes/homepage.html'));
});
  
//BLOG ROUTES


//BLOG HOME
app.get('/blog', function(req, res) {
  Blog.find({}, function(err,blogs) {
    if (err) {
      console.log(err)
    } else {
      res.render('test', {
        blogs: blogs
      })
    } 
  })
});

//BLOG CREATE
app.get('/blog/new',function(req,res) {
  res.render('newpost', {
  })
})

app.post('/blog/new', function(req,res) {
  console.log(req.body.title);
  var newBlog = new Blog();

  newBlog.title = req.body.title;
  newBlog.body = req.body.body;

  newBlog.save(function(err,newBlog){
    if (err) {
      console.log(err)
    } else {
      res.redirect('/blog')
    }
  })
})


//BLOG SHOW
app.get('/blog/:id', function(req,res) {
  Blog.findById(req.params.id, function(err,foundBlog){
    if (err) {
      res.redirect('/blog')
    } else {
      res.render('show', {blog: foundBlog});
    }
  })
})



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

