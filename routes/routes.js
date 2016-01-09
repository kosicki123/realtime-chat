/**
 * Created by kosicki on 1/9/16.
 */
module.exports = function(express, app) {
    var router = express.Router();
    router.get('/', function(req, res, next) {
        res.render('index', {title: 'Welcome to Realtime Chat!'});
    })

    router.get('/chatrooms', function(req, res, next) {
        res.render('chatrooms', {title: 'Chatrooms!'});
    })

    router.get('/setcolor', function(req, res, next) {
        req.session.favColor = "Red";
        res.send('Setting favorite color');
    })

    router.get('/getcolor', function(req, res, next) {
        req.session.favColor = "Red";
        res.send('Favorite color ' + req.session.favColor === undefined ? "Not Found" : req.session.favColor);
    })

    app.use('/', router);
}