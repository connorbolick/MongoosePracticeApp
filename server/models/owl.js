var mongoose = require('mongoose');

var BarnSchema = new mongoose.Schema({
 name: String
})
mongoose.model('barn', BarnSchema); // We are setting this Schema in our Models as 'User'
var Barn = mongoose.model('barn') // We are retrieving this Schema from our Models, named 'User'
