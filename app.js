const express = require('express');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');

const Product = require('./models/product');

const sequelize = require('./util/database');

const productsRoutes = require('./routes/products');
const ordersRoutes = require('./routes/orders');




const app = express();


// app.use(bodyParser.urlencoded()); // x-www-form-urlencoded <form>
app.use(bodyParser.json()); // application/json
app.use(expressValidator());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

app.use(productsRoutes);
app.use(ordersRoutes);

sequelize
.sync()
.then( result => {
    console.log(result);
    app.listen(8000);
})
.catch(err => {
    console.log(err);
});
