// Require the Express Module
var express = require('express');
// Create an Express App
var app = express();
var path = require('path');

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/owl');
// Require body-parser (to receive post data from clients)
var bodyParser = require('body-parser');
// Integrate body-parser with our App
app.use(bodyParser.urlencoded({ extended: true }));
// Require path
// Setting our Static Folder Directory
app.use(express.static(path.join(__dirname, './static')));
// Setting our Views Folder Directory
app.set('views', path.join(__dirname, './views'));
// Setting our View Engine set to EJS
app.set('view engine', 'ejs');
// Routes
// Root Request

var BarnSchema = new mongoose.Schema({
 name: String
})
mongoose.model('barn', BarnSchema); // We are setting this Schema in our Models as 'User'
var Barn = mongoose.model('barn') // We are retrieving this Schema from our Models, named 'User'

app.get('/', function(req, res) {
    Barn.find({},function(err, users){
      if(err){
        console.log(err)
        res.render('index', {name: "nothing here"});
      }
      else{
        console.log("all our owls", users);
        // console.log(users[0].name);
        res.render('index', {"users": users});
      }
    })


})

app.get('/owls/new', function(req, res){
  console.log("this is makin a new owl");
  res.render('new');
})
// Add User Request
app.post('/owls', function(req, res) {
  console.log("POST DATA for new owl", req.body);
  // create a new User with the name and age corresponding to those from req.body
  var user = new Barn({name: req.body.name});

  // Try to save that new user to the database (this is the method that actually inserts into the db) and run a callback function with an error (if any) from the operation.
  user.save(function(err) {
    // if there is an error console.log that something went wrong!
    if(err) {
      console.log('something went wrong');
    } else { // else console.log that we did well and then redirect to the root route
      console.log('successfully added a owl!');
      res.redirect('/');
    }
  })
})

app.get('/owls/:id', function(req, res){
  console.log("try to display specific info about an owl");
  Barn.find({_id: req.params.id}, function(err, users){
    if (err){
      console.log('/owls/:id made an error');
    }
    else {
      console.log("Got here!");
      console.log("users: ", users);
      res.render('showspec', {users: users});
    }
  })
})
app.get('/owls/:id/edit', function(req, res){
  console.log("try to edit info about an owl");
  Barn.find({_id: req.params.id}, function(err, users){
    if (err){
      console.log('/owls/:id made an error');
    }
    else {
      res.render('edit', {users: users});
    }
  })
})
app.post('/owls/:id', function(req, res){
  console.log("updating a user");
  Barn.update({_id:req.params.id}, {$set:{name: req.body.name }}, function(err, users){
    if (err){
      console.log('/owls/update made an error');
    }
    else {
      res.redirect("/");
    }
  })
})
app.post('/owls/:id/delete', function(req, res){
  Barn.remove({_id:req.params.id}, function(err){
    if(err){
      console.log("couldn't delete");
    }
    else{
      res.redirect("/");
    }
  })
})
// Setting our Server to Listen on Port: 8000
app.listen(8000, function() {
    console.log("listening on port 8000");
})
