var express = require('express');
var fs 		= require('fs');
var request = require('request');
var cheerio = require('cheerio');
var app     = express();

app.get('*', function(req, res) {
	res.sendFile(__dirname + '/views/index.html');
});

app.get('/api/scrape', function(req, res) {
	url = 'http://www.lyrster.com/songs-lyrics/we-are-the-champions.html';
	request(url, function(error, response, html) {
		if (!error) {
			var $ = cheerio.load(html);
			var title, artist;
			var json = {title: "", artist: ""};
			var div = $('#results-left');
			var firstResultDiv = div.children('.search-result').first();
			var link = firstResultDiv.children('a').first().text();
			var splitArray = link.split("|");
			json.title = splitArray[0];
		}
		res.json(json);
	});
});

app.listen('8000')

console.log('port 8000');

exports = module.exports = app;