var mongoose = require('mongoose');
var Barn = mongoose.model('barn');

module.exports = {
  show: function(req, res){
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
  },
  create: function(req, res){

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
  },
  showOne: function(req, res){
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
  },
  editOne: function(req, res){
    Barn.find({_id: req.params.id}, function(err, users){
      if (err){
        console.log('/owls/:id made an error');
      }
      else {
        res.render('edit', {users: users});
      }
    })
  },
  update: function(req, res){
    Barn.update({_id:req.params.id}, {$set:{name: req.body.name }}, function(err, users){
      if (err){
        console.log('/owls/update made an error');
      }
      else {
        res.redirect("/");
      }
    })
  },
  remove: function(req, res){
    Barn.remove({_id:req.params.id}, function(err){
      if(err){
        console.log("couldn't delete");
      }
      else{
        res.redirect("/");
      }
    })
  },

}
