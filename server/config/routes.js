var owls = require('../controllers/owls.js');

module.exports =function(app){
app.get('/', function(req, res) {
  owls.show(req, res);
})

app.get('/owls/new', function(req, res){
  console.log("this is makin a new owl");
  res.render('new');
})
// Add User Request
app.post('/owls', function(req, res) {
  owls.create(req, res);
})

app.get('/owls/:id', function(req, res){
  owls.showOne(req, res);
})
app.get('/owls/:id/edit', function(req, res){
  owls.editOne(req, res);
})
app.post('/owls/:id', function(req, res){
  owls.update(req, res);
})
app.post('/owls/:id/delete', function(req, res){
  owls.remove(req, res);
})
}
