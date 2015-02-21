// routes.js

module.exports = function(app, client) {
    // =====================================
    // HOME PAGE ===========================
    // =====================================
    app.get('/', function(req, res) {
        console.log(__dirname + '/views/index.html');
        res.sendFile(__dirname + '/views/index.html');
        client.stream('statuses/filter', {track: 'isis'},  function(stream) {
            // stream.on('data', function(tweet) {
            //     var tweets = document.getElementById("tweets");
            //     tweets.innerHTML += "<p>" + tweet.text + "</p>"
            // });

            // stream.on('error', function(error) {
            //     console.log(error);
            // });
        });
    });
};