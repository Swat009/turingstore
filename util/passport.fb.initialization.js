var FacebookTokenStrategy = require('passport-facebook-token');

const Customer = require('../models/customer'); 

passport.use(new FacebookTokenStrategy({
    clientID: '330598714267221',
    clientSecret: 'bbae63fa55ef259fea67d8431ef69c9c'
  },
  function (accessToken, refreshToken, profile, done) {
    //Using next tick to take advantage of async properties
    process.nextTick(function () {
      Customer.findOne( { where : { facebookProviderId : profile.id } }).then(function (user, err) {
            if(err) {
                return done(err);
            } 
            if(user) {
                return done(null, user);
            } else {
                //Create the user
                
                const customer = new Customer({

                  name: profile.displayName,
                  email: profile.emails[0].value,
                  facebookProviderId: profile.id
  
                });

                //Find the user (therefore checking if it was indeed created) and return it
                Customer.findOne( { where : { facebookProviderId : profile.id  } }).then(function (user, err) {
                    if(user) {
                        return done(null, user);
                    } else {
                        return done(err);
                    }
                });
            }
        });
    });
})); 



