const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const helmet = require('helmet');
const morgan = require('morgan');
const fs = require('fs');
const passport = require('./util/passport');

const accessLogStream = fs.createWriteStream(
    path.join(__dirname,'access.log'),
    {flags:'a'}
);


//Models used in Project
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
const ProductCart = require('./models/productcart');
 //Associations between the models
Review.belongsTo(Product,{constraints: true, onDelete: 'CASCADE'});
Product.hasMany(Review);
Categories.belongsTo(Departments,  {foreignKey: 'department_id'});
Departments.hasMany(Categories, {foreignKey: 'department_id'});
Product.belongsToMany(Cart,{through: ProductCart});
Cart.belongsToMany(Product,{through: ProductCart});
Product.belongsToMany(Categories,{through: ProductCategories});
Categories.belongsToMany(Product,{through: ProductCategories});
Attribute.hasMany(AttributeValue);
AttributeValue.belongsTo(Attribute);
Product.belongsToMany(AttributeValue,{through: ProductAttribute});
AttributeValue.belongsToMany(Product,{through: ProductAttribute});
Shipping.belongsTo(ShippingRegion);
ShippingRegion.hasMany(Shipping);
//Routes of all Controllers
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

//App intialization
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

sequelize.sync()
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
