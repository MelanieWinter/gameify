var express = require('express');
var router = express.Router();
const passport = require('passport')
const User = require('../models/user');

router.get('/', function(req, res, next) {
  const user = req.user
  res.render('index', { 
    user,
    title: 'Welcome to Gameify',
    titleTwo: `Welcome back`
  });
});

router.get('/auth/google', passport.authenticate(
  'google',
  {
    scope: ['profile', 'email'],
    prompt: 'select_account'
  }
))

router.get('/oauth2callback', passport.authenticate(
  'google',
  {
    successRedirect: '/', // this will still be '/' but the view will have an if(user)/else statement to show relevant info depending on if signed in or not
    failureRedirect: '/'
  }
))

router.get('/logout', function(req, res) {
  req.logout(function() {
    res.redirect('/')
  })
})

module.exports = router;
