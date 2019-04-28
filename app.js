const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const passport = require('passport');
const helmet = require('helmet');
const morgan = require('morgan');
const fs = require('fs');
var FacebookTokenStrategy = require('passport-facebook-token');



const Customers = require('./models/customer'); 
const Product = require('./models/product');
const Review = require('./models/review');
const Departments = require('./models/department');
const Categories = require('./models/category');
const ProductCategories = require('./models/productcategories');
const Attribute = require('./models/attribute');
const AttributeValue = require('./models/attributevalue');
const ProductAttribute = require('./models/productattribute');
const Cart = require('./models/cart');
const Shipping = require('./models/shipping');
const ShippingRegion = require('./models/shippingregion');
 
Review.belongsTo(Product,{constraints: true, onDelete: 'CASCADE'});
Product.hasMany(Review);
Categories.belongsTo(Departments,  {foreignKey: 'department_id'});
Departments.hasMany(Categories, {foreignKey: 'department_id'});
Product.belongsToMany(Categories,{through: ProductCategories});
Categories.belongsToMany(Product,{through: ProductCategories});
Attribute.hasMany(AttributeValue);
AttributeValue.belongsTo(Attribute);
Product.belongsToMany(AttributeValue,{through: ProductAttribute});
AttributeValue.belongsToMany(Product,{through: ProductAttribute});
Shipping.belongsTo(ShippingRegion);
ShippingRegion.hasMany(Shipping);



const sequelize = require('./util/database');
const categoriesRoutes = require('./routes/categories');
const productsRoutes = require('./routes/products');
const ordersRoutes = require('./routes/orders');
const customersRoutes = require('./routes/customers');
const stripeRoutes = require('./routes/stripe');
const departmentsRoutes = require('./routes/departments');
const attributeRoutes = require('./routes/attributes');
const shoppingcartRoutes = require('./routes/shoppingcart');
const taxRoutes = require('./routes/tax');
const shippingRoutes = require('./routes/shipping');

const accessLogStream = fs.createWriteStream(
    path.join(__dirname,'access.log'),
    {flags:'a'}
);
passport.serializeUser(function(user, done) {
    done(null, user);
});
  
passport.deserializeUser(function(user, done) {
    done(null, user);
});


const app = express();
app.use(helmet());
app.use(expressValidator());
app.use(bodyParser.urlencoded({ extended: true }));
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});
app.use(morgan('combined',{stream:accessLogStream}));
app.use(passport.initialize());
app.use(passport.session());

passport.use(new FacebookTokenStrategy({
    clientID: '330598714267221',
    clientSecret: 'bbae63fa55ef259fea67d8431ef69c9c',
   
  },
  function (accessToken, refreshToken, profile, done) {
    //Using next tick to take advantage of async properties
    process.nextTick(function () {
      Customers.findOne( { where : { facebookProviderId : profile.id } }).then(function (user, err) {
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
                  facebookProviderId: profile.id
  
                });

                customer.save()
                .then(result =>{

                    //Find the user (therefore checking if it was indeed created) and return it
                    Customers.findOne( { where : { facebookProviderId : profile.id  } })
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


app.use(productsRoutes);
app.use(ordersRoutes);
app.use(customersRoutes);
app.use(stripeRoutes);
app.use(departmentsRoutes);
app.use(categoriesRoutes);
app.use(attributeRoutes);
app.use(shoppingcartRoutes);
app.use(taxRoutes);
app.use(shippingRoutes);

sequelize.sync({})
.then( result => {
    console.log(result);
    return Product.findByPk(1);

   
})
.then(product =>{

    if(!product){
       return Product.create({name: "book",price:"50",discounted_price:"13",thumbnail:"",description:"12 Jan sdsa sadad adsasd asdasd asdasd asdadsasfafsadsdsds dsasddd sdsadddsaad asddasdaad sadsdad aa"});
    }
    return product;

})
.then(product =>{
    console.log("Youp")
    console.log(product);
    app.listen(process.env.PORT || 8000);
})
.catch(err => {
    console.log(err);
});
