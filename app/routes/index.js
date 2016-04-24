'use strict';

var BookModel = require('../models/book');
var books = require('google-books-search-2');

module.exports = function(app, passport) {

    app.use(function (req, res, next) {
        res.locals.login = req.isAuthenticated();
        next();
    });

    // =====================================
    // HOMEPAGE ============================
    // =====================================
    /* GET home page. */
    app.get('/', function(req, res, next) {
      res.render('index', { title: 'Express' });
    });

    // =====================================
    // LOGIN ===============================
    // =====================================
    app.get('/login', function(req, res, next) {
      res.render('login', { message: req.flash('loginMessage') } );
    });

    app.post('/login', passport.authenticate('local-login', {
        successRedirect: '/',
        failureRedirect: '/login',
        failureFlash: true
    }));

    // =====================================
    // SIGNUP ==============================
    // =====================================
    app.get('/signup', function(req, res, next) {
      res.render('signup', { message: req.flash('signupMessage') } );
    });

    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect: '/',
        failureRedirect: '/signup',
        failureFlash: true
    }));

    // =====================================
    // LOGOUT ==============================
    // =====================================
    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });

    // =====================================
    // ALLBOOKS ============================
    // =====================================
    app.get('/allbooks', isLoggedIn, function(req, res, next) {
        BookModel.find({}, function(err, docs) {
            if (err) {
                throw err;
            }

            res.render('allbooks', { user: req.user, books: docs } );
        })

    });

    // =====================================
    // MYBOOKS =============================
    // =====================================
    app.get('/mybooks', isLoggedIn, function(req, res, next) {
        BookModel.find( { owner: req.user.email }, function(err, docs) {
            if (err) {
                return res.status(400).json({ error: err });
            }

            res.render('mybooks', { user: req.user, books: docs } );
        });

    });

    app.post('/mybooks', isLoggedIn, function(req, res, next) {
        books.search(req.body.title)
                .then(function(results) {
                    //add book to database and then redisplay the page
                    var entry = new BookModel({
                        title:      results[0].title,
                        owner:      req.user.email,
                        thumbnail:  results[0].thumbnail
                    });
                    entry.save(function(err, doc) {
                        if (err) {
                            throw err;
                        }

                        BookModel.find({ owner: req.user.email }, function(error, results) {
                            if (error) {
                                throw error
                            }

                            res.render('mybooks', { user: req.user, books: results } );
                        });
                    })
                })
                .catch(function(error) {
                    // alert use that book was not able to be found
                });
    });

    // =====================================
    // SETTINGS ============================
    // =====================================
    app.get('/settings', function(req, res, next) {
       res.render('settings', { user: req.user } );
    });


}

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }

    res.redirect('/');
}
