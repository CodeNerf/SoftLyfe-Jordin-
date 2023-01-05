const router = require('express').Router();
const passport = require('passport');

router.get('/', function(req, res) {
  res.render('index', {
    user: req.user
  });
});

// login route 
router.get('/auth/google', passport.authenticate('google', {
    scope: ['profile', 'email']
}));

// callback route - called backed/requested after user logs in
router.get('/oauth2callback', passport.authenticate('google', {
 successRedirect: '/people',
 failureRedirect: '/'   
}));
// logout route
router.get('/logout', function(req, res) {
    // destroy the login session from the sesssion store
    req.logOut(); 
// send the user back to the hompage
    res.redirect('/');
})

module.exports = router;