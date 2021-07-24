const  passport = require('passport');

const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/user.js');

// authentication using passport
passport.use(new LocalStrategy({
              usernameField:'email'
},
function(email,password,done) {
     //find a user and establish the identity
     User.findOne({email:email},function(err,user) {
         if(err){
             console.log('Error in finding user ---->Passport');
             return done(err);
         }

         if(!user || user.password != password){
             console.log('Invalid Username/Password');
             return done(null,false);
         }

         return done(null, user);
         
     });
}


));


// serializing the user to decide which key is to be kept in the cookies
passport.serializeUser(function(user,done){
    done(null,user.id);
});



// deserialize the user frm the cookie
passport.deserializeUser(function(id,done){
      User.findById(id,function(err,user){
            if(err){
                console.log('Error in finding user ---->Passport');
                return done(err);
            }

            return done(null,user);
      });
});

// check if the user is Authenticated
passport.checkAuthentication = function(req, res, next){
    // if the user is signed in, then pass on the request to the next function(controller's action)
    if (req.isAuthenticated()){
        return next();
    }

    // if the user is not signed in
    return res.redirect('/users/signin');
}

passport.setAuthenticatedUser = function(req,res,next){
    if(req.isAuthenticated()){
        // req.user containg the current signed in user from the session cookie and we are just sending this to locals for the views

        res.locals.user = req.user;
    }
    next();
}

module.exports = passport;