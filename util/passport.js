//import passport from 'passport';
const Customers = require('../models/customer'); 
const passport = require('passport');
var FacebookTokenStrategy = require('passport-facebook-token');
var crypto = require("crypto");

const Customer = require('../models/customer'); 

passport.serializeUser(function(user, done) {
    done(null, user);
});
  
passport.deserializeUser(function(user, done) {
    done(null, user);
});

passport.use(new FacebookTokenStrategy({
    clientID: process.env.FACEBOOKCLIENTID,
    clientSecret: process.env.FACEBOOKCLIENTSECRET,
   
  },
  function (accessToken, refreshToken, profile, done) {
    //Using next tick to take advantage of async properties
    process.nextTick(function () {
        Customers.findOne( { where : { email: profile.emails[0].value } }).then(function (user, err) {
            if(err) {
                return done(err);
            } 
            if(user) {
                return done(null, user);
            } else {
                //Create the user
                
                const customer = new Customers({

                  name: profile.displayName,
                  email: profile.emails[0].value,
                  facebookProviderId: profile.id,
                  password: crypto.randomBytes(20).toString('hex')
  
                });

                customer.save()
                .then(result =>{

                    //Find the user (therefore checking if it was indeed created) and return it
                    Customers.findOne( { where : { email: profile.emails[0].value } })
                    .then(function (user, err) {
                    if(user) {
                        return done(null, user);
                    } else {
                        return done(err);
                    }
                })
                .catch(err => {

                    return done(err);
                
                });

            });
            }
        });
    });
})); 

module.exports = passport;