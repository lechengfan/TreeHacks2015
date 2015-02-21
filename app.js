// /app.js

var express = require('express');
var app = express();
var morgan = require('morgan');
var bodyParser = require('body-parser');
var path = require('path');
var port = process.env.PORT || 8000;
var mongoose = require('mongoose');
var configDB = require('./config/database.js');
var twitter = require('twitter')

// =====================================
// DATABASE ============================
// =====================================
mongoose.connect(configDB.url); // connect to our database

// =====================================
// VIEW ENGINE =========================
// =====================================
app.set('views', path.join(__dirname, 'views'));

// =====================================
// CONFIGURATION =======================
// =====================================
app.use(morgan('dev')); // log every request to the console
app.use(bodyParser()); // get information from html forms
app.use(express.static(path.join(__dirname, 'public')));

// =====================================
// TWITTER =============================
// =====================================
var client = new twitter({
	consumer_key: 'qbc7jJLc6pHCJl8tUKFdg2SBF',
	consumer_secret: 'X6KQRNHHPk2JUpSsMCTgKtDPfALoSzBmD4AV9EBlvP6D8DPNzv',
	access_token_key: '486385775-7aRBhZ0BUMj9I3yKbZdMpvqKPwPriB1M99WnlMdj',
	access_token_secret: '7qOrD7dzLzJnnLJBgNBouUMqMoOth6rDdCcv22OMGQImv'
});

// =====================================
// ROUTES ==============================
// =====================================
require('./routes.js')(app, client); // load our routes and pass in our app and fully configured passport

// =====================================
// LAUNCH ==============================
// =====================================
app.listen(port);
console.log('The magic happens on port ' + port);