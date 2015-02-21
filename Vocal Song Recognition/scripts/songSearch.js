function Search(formId) {
	console.log("created Search object");
	this.searchForm = document.getElementById(formId);
	var obj = this;
	this.searchForm.onkeyup = function() {
		obj.formChange(event);
	}
}

function AddComma(required) {
	if (required) {
		return ',';
	} else {
		return '';
	}
}

Search.prototype.formChange = function(event) {
	this.albumChecked = document.getElementById('album').checked;
	this.artistChecked = document.getElementById('artist').checked;
	this.trackChecked = document.getElementById('track').checked;

	//TODO: to prevent overloading, put in some delay for AJAX
	if (this.albumChecked || this.artistChecked || this.trackChecked) {
		var HOST = 'http://api.spotify.com';
		var SEARCH = '/v1/search?q=';
		var KEYWORDS = '';
		var type = '&type=';
		var oneAlreadyChecked = false;
		if (this.trackChecked) {
			type += 'track';
			oneAlreadyChecked = true;
		}
		if (this.artistChecked) {
			type += AddComma(oneAlreadyChecked) + 'artist';
			oneAlreadyChecked = true;
		}
		if (this.albumChecked) {
			type += AddComma(oneAlreadyChecked) + 'album';
		}
		var EXAMPLE = 'kanye+west&type=album,track,artist';
		var HEADERS = { "User-Agent": "Spotify API Console v0.1" };
		
		var obj = this;
		var input = document.getElementById('search').value;
		if (input != "") {
	  		input = encodeURIComponent(input);
			var ajax = new XMLHttpRequest();
			ajax.open("GET", HOST + SEARCH + "kanye+west" + type, true);
			ajax.onreadystatechange = function() {
		    	if (this.readyState != 4) {
					return;
		        }
		        if (this.status == 200) {
		        	console.log("HTTP status 200");
					var response = JSON.parse(this.responseText);
					console.log(response);
					obj.handleJSON(response, this.albumChecked, this.artistChecked, this.trackChecked);
					return;
		        }
	  		}
			ajax.send();
	    } else {
			var results = document.getElementById('results');
			while (results.firstChild) {
				results.removeChild(results.firstChild);
			}
	    }
	} else {
    	return false;
    }
};

Search.prototype.handleJSON = function(JSON, albumChecked, artistChecked, trackChecked) {
	var ALBUMS = 'albums';
	var ARTISTS = 'artists';
	var TRACKS = 'tracks';
	var ITEMS = 'items';
	var NAME = 'name';
	var EXTERNAL_URLS = 'external_urls';
	var SPOTIFY = 'spotify';
	var ALBUM = 'album';
	var IMAGES = 'images';
	var URL = 'url';
	var HEIGHT = 'height';
	var WIDTH = 'width';
	var LIMIT = 'limit';
	var TOTAL = 'total';

	var results = document.getElementById('results');
};