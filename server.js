// Require the Express Module
var express = require('express');
// Create an Express App
var app = express();
var path = require('path');

var mongoose = require('mongoose');
mongoose.createConnection('mongodb://localhost/owl');
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
require('./server/config/owl.js');

var route_setter = require('./Server/config/routes.js');
route_setter(app);

app.listen(8000, function() {
    console.log("listening on port 8000");
})
