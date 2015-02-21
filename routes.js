// routes.js

module.exports = function(app) {
    // =====================================
    // HOME PAGE ===========================
    // =====================================
    app.get('/', function(req, res) {
        res.render('index.jade', {
            title: 'Heatmap'
        });
    });
};