var express = require("express");
var app = express();
var mongoose = require("mongoose");
var bodyParser = require("body-parser");
var path = require('path');
var pug = require('pug');
var db = mongoose.connection;
var bcrypt = require('bcryptjs')
var expressValidator = require('express-validator');

var Blog = require('./module/Blog')
var User = require('./module/User')
var Comment = require('./module/Comments')

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


//BLOG HOME

app.get('/blog', function(req, res) { 
  Blog.find({}, function(err,blogs) {
    if (err) {
      console.log(err)
    } else {
      res.render('index', {
        blogs: blogs
      })
    } 
  }).sort({_id: -1}).exec(function(err,docs){
  });
});



//BLOG CREATE
app.get('/blog/new',function(req,res) {
  res.render('newpost', {
  })
})

app.post('/blog/new', function(req,res) {
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





//USER REGISTRATION
app.get('/blog/register',function(req,res) {
  res.render('register', {
  })
})

app.post('/blog/register', function (req,res) {
  var name = req.body.name;
  var username = req.body.username;
  var password = req.body.password;
  var password2 = req.body.password2;

  req.checkBody('name', 'name is required').notEmpty();
  req.checkBody('username', 'username is required').notEmpty();
  req.checkBody('password', 'password is required').notEmpty();
  req.checkBody('password2', 'password do not match').equals(req.body.password);

  let errors = req.validationErrors();

  if(errors) {
    res.render('register', {
      errors:errors
    });
  } else {
    var newUser = new User ({
      name:name,
      username: username,
      password: password
    });
    bcrypt.genSalt(10, function(err,salt){
      bcrypt.hash(newUser.password,salt,function(err,hash){
        if(err) {
          console.log(err);
        }
        newUser.password = hash;
        newUser.save(function(err){
          if(err) {
            console.log(err);
            return;
          } else {
            res.redirect('/blog')
          }
        })
    })
  })
}
})

app.get('/blog/login', function(req,res){
  res.render('login')
});

//BLOG SHOW
app.get('/blog/:id', function(req,res) {
  Blog.findById(req.params.id).populate('comments').exec(function(err,foundBlog){
    if (err) {
      res.redirect('/blog')
    } else {
      console.log(foundBlog.comments.author)
      res.render('show', {blog: foundBlog});
    }
  })
})




//BLOG EDIT
app.get('/blog/:id/edit', function(req,res) {
  Blog.findById(req.params.id, function(err,foundBlog){
    if (err) {
      res.redirect('/blog')
    } else {
      res.render('edit', {blog: foundBlog});
    }
  })
})


app.post('/blog/:id/edit', function(req,res) {
  console.log(req.body.title);
  var oldBlog = {}

  oldBlog.title = req.body.title;
  oldBlog.body = req.body.body;

  var query = {_id: req.params.id}

  Blog.update(query, oldBlog, function(err,newBlog){
    if (err) {
      console.log(err)
    } else {
      res.redirect('/blog')
    }
  })
})

//DELETE ROUTE
app.post('/blog/:id', function(req,res){
  Blog.findByIdAndRemove(req.params.id, function(err){
    if(err) {
      res.redirect('/blogs');
      console.log(err)
    } else {
      res.redirect('/blog')
    }
  })
});

//COMMENT ROUTES
app.get('/blog/:id/comments/new', function(req,res) {
  Blog.findById(req.params.id, function(err,foundBlog){
    if (err) {
      console.log(err)
      res.redirect('/blog')
    } else {
      res.render('newcomment', {blog: foundBlog});
    }
  })
})

app.post('/blog/:id/comments/new', function(req,res) {
  Blog.findById(req.params.id, function (err,blogs){
    if (err) {
      console.log(err)
      res.redirect('/blog')
    } else {
      Comment.create({author: req.body.author, body: req.body.body}, function(err,newComment){
        if (err) {
          console.log(err)
        } else {
          blogs.comments.push(newComment)
          blogs.save()
          res.redirect('/blog/:id')
        }
      })  
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

