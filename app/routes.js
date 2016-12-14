const express = require('express');
const passport = require('passport');
// const User = require('../app/models/user');
// const randomstring = require('randomstring');
// const nodemailer = require('nodemailer');
// const smtpTransport = require('nodemailer-smtp-transport');

/**
 * Middleware for asserting if user is logged in
 * @param {object} req Request object
 * @param {object} res Response object
 * @param {function} next Next middleware down the line
 * @return {undefined}
 */
function isLoggedIn(req, res, next) {
  console.log('isLoggedIn:');
  console.log(req.user);
  if (req.isAuthenticated())
    return next();
  res.redirect('/');
}

const router = new express.Router();

router.get('/', (req, res) => {
  if (req.isAuthenticated()) {
    res.render('home', {
      user: req.user,
      title: 'Matemáticas UTP',
    });
  } else {
    res.render('index', {
      title: '¡Aprende matemáticas!',
      message: req.flash('message'),
    });
  }
});

router.post('/login', passport.authenticate('local-login', {
  successRedirect: '/',
  failureRedirect: '/',
  failureFlash: true,
}));

router.post('/signup', passport.authenticate('local-signup', {
  successRedirect: '/',
  failureRedirect: '/',
  failureFlash: true,
  // session: false,
}));

router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

router.get('/math1-trig', isLoggedIn, (req, res) => {
  res.render('math1-trig', {title: 'Matemáticas UTP - Trigonometría'});
});

router.get('/two-parallel-lines', isLoggedIn, (req, res) => {
  res.render('two-parallel-lines', {
    title: 'Matemáticas UTP - Dos líneas paralelas',
  });
});

router.get('/fake-circles', isLoggedIn, (req, res) => {
  res.render('fake-circles', {
    title: 'Matemáticas UTP - Círculos falsos',
  });
});

module.exports = router;
