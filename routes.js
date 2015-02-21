// routes.js

module.exports = function(app, client) {
    // =====================================
    // HOME PAGE ===========================
    // =====================================
    app.get('/', function(req, res) {
        res.render('index.jade', {
            title: 'Get tweets'
        });
    });

    app.post('/sentiment', function(req, res) {
        var query = [];
        var tweetCount = 0;
        client.verifyCredentials(function (error, data) {
            if (error) {
                console.log("credential error");
            }
            client.stream('statuses/filter', {track: req.body.keyword, lang: 'en'},  function(stream) {
                stream.on('data', function(tweet) {
                    tweets.push(tweet.text);
                    console.log("got data");
                    tweetCount++;
                });

                stream.on('error', function(error) {
                    console.log("got error");
                    // console.log(error);
                });
            });
        })
        console.log(query);
        res.render('sentiment.jade', {
            title: 'Sentiment',
            tweets: query
        });
    });
};