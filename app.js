// /app.js

var express = require('express');
var app = express();
var morgan = require('morgan');
var bodyParser = require('body-parser');
var path = require('path');
var port = process.env.PORT || 8000;
var mongoose = require('mongoose');
var configDB = require('./config/database.js');

// =====================================
// DATABASE ============================
// =====================================
mongoose.connect(configDB.url); // connect to our database

// =====================================
// VIEW ENGINE =========================
// =====================================
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(morgan('dev')); // log every request to the console
app.use(bodyParser()); // get information from html forms
app.use(express.static(path.join(__dirname, 'public')));

// =====================================
// ROUTES ==============================
// =====================================
require('./routes.js')(app); // load our routes and pass in our app and fully configured passport

// =====================================
// LAUNCH ==============================
// =====================================
app.listen(port);
console.log('The magic happens on port ' + port);