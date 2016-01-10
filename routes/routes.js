/**
 * Created by kosicki on 1/9/16.
 */
module.exports = function(express, app, passport) {
    var router = express.Router();
    router.get('/', function(req, res, next) {
        res.render('index', {title: 'Welcome to Realtime Chat!'});
    });

    function securePages(req, res, next) {
        if(req.isAuthenticated()) {
            next();
        } else {
            res.redirect('/');
        }
    }

    router.get('/auth/facebook', passport.authenticate('facebook'));

    router.get('/auth/facebook/callback', passport.authenticate('facebook', {
        successRedirect:'/chatrooms',
        failureRedirect:'/'
    }));

    router.get('/chatrooms', function(req, res, next) {
        res.render('chatrooms', {title: 'Chatrooms!', user: req.user});
    });

    router.get('/logout', function(req, res, next) {
       req.logout();
        res.redirect('/');
    });

    app.use('/', router);
};