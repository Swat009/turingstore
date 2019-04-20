const express = require('express');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');

const Customers = require('./models/customer'); 
const Product = require('./models/product');
const Review = require('./models/review');

Review.belongsTo(Product,{constraints: true, onDelete: 'CASCADE'});
Product.hasMany(Review);

const sequelize = require('./util/database');

const productsRoutes = require('./routes/products');
const ordersRoutes = require('./routes/orders');
const customersRoutes = require('./routes/customers');




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

app.use(productsRoutes);
app.use(ordersRoutes);
app.use(customersRoutes);
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
