/**
 * Created by kosicki on 1/9/16.
 */
module.exports = function(express, app, passport, config, rooms) {
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

    router.get('/chatrooms', securePages, function(req, res, next) {
        res.render('chatrooms', {title: 'Chatrooms!', user: req.user, config: config});
    });

    router.get('/room/:id', securePages, function(req, res, next){
        var room_name = findTitle(req.params.id);
       res.render('room', {user: req.user, room_number: req.params.id, room_name: room_name, config: config});
    });

    function findTitle(room_id) {
        var n = 0;
        while(n < rooms.length) {
            if(rooms[n].room_number) {
                return rooms[n].room_name;
            } else {
                n++;
                continue;
            }
        }
    }

    router.get('/logout', function(req, res, next) {
       req.logout();
        res.redirect('/');
    });

    app.use('/', router);
};