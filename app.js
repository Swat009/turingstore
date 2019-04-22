const express = require('express');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const passport = require('passport');
var FacebookTokenStrategy = require('passport-facebook-token');



const Customers = require('./models/customer'); 
const Product = require('./models/product');
const Review = require('./models/review');

Review.belongsTo(Product,{constraints: true, onDelete: 'CASCADE'});
Product.hasMany(Review);

const sequelize = require('./util/database');

const productsRoutes = require('./routes/products');
const ordersRoutes = require('./routes/orders');
const customersRoutes = require('./routes/customers');
const stripeRoutes = require('./routes/stripe');



const app = express();


// app.use(bodyParser.urlencoded()); // x-www-form-urlencoded <form>
//app.use(bodyParser.json()); // application/json
//app.use(bodyParser.urlencoded({ extended: false}));
app.use(expressValidator());


// create application/json parser
app.use(bodyParser.json());
// parse various different custom JSON types as JSON
app.use(bodyParser.json({ type: 'application/*+json' }));
// parse some custom thing into a Buffer
app.use(bodyParser.raw({ type: 'application/vnd.custom-type' }));
// parse an HTML body into a string
app.use(bodyParser.text({ type: 'text/html' }));
// parse an text body into a string
app.use(bodyParser.text({ type: 'text/plain' }));
// create application/x-www-form-urlencoded parser
app.use(bodyParser.urlencoded({ extended: true }));




app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

app.use(passport.initialize());
app.use(passport.session());

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



app.use(productsRoutes);
app.use(ordersRoutes);
app.use(customersRoutes);
app.use(stripeRoutes);
sequelize
.sync()
.then( result => {
    console.log(result);
    return Product.findByPk(1);

   
})
.then(product =>{

    if(!product){
       return Product.create({name: "book",price:"50rs",discounted_price:"Rs13",thumbnail:"",createdAt:"12 Jan",createdAt:"12 Jan"})
    }
    return product;

})
.then(product =>{
    console.log("Youp")
    console.log(product);
    app.listen(8000);
})
.catch(err => {
    console.log(err);
});
