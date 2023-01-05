const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const People = require('../models/people');

//passport.use <-- we use this to plug-in login options
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK
}, function(accessToken, refreshToken, profile, cb) {
    // a user has attempted a login
    // does this user already exsist in our own db?
    // lets check to see
    People.findOne({ googleId: profile.id }, 
        function(err, people) {
        // if they dont we create them
        // check for and handke errors
        if(err) return cb(err);
        // if student exists in our database - log them in!
        if(people) {
            return cb(null, people)
        }else{
            // student doesnt exist, create them instead
            const newPeople = new People({
                name: profile.displayName,
                email: profile.emails[0].value,
                googleId: profile.id
            });

            newPeople.save(function(err){
                if(err) return cb(err);
                // user/person saved successful
                return cb(null, newPeople);
            });
        }   
    });
}))


//passport.serializeUser <- gets called one time when the user logs in to create a session
passport.serializeUser(function(people, done){
    done(null, people.id);
});

//passport.deserializeUser <-- get called with each request -
// then decodes the cookie and looks up the user in session store
passport.deserializeUser(function(id, done) {
    People.findById(id, function(err, people) {
        done(err, people);   
        // creates req.user
    });
})