const Attribute = require('../models/attribute');
const AttributeValue = require('../models/attributevalue');
const Product = require('../models/product');

exports.getAttributes = (req, res, next) => {

    Attribute.findAll({raw: true})
    .then( attributes =>{


        res.status(200).json(attributes);


    })
    .catch(err => {

        console.log(err);

    });

    

};

exports.getAttribute = (req, res, next) => {

    const attribute_id = req.params.attribute_id;

    Attribute.findByPk(attribute_id)
    .then( attribute =>{


        res.status(200).json(attribute);


    })
    .catch(err => {

        console.log(err);

    });

    

};


exports.getAttributeValues = (req, res, next) => {

    const attribute_id = req.params.attribute_id;

    Attribute.findByPk(attribute_id) 
    .then(attribute =>{

        
        attribute.getAttributevalues()
        .then(attributevalues =>{
            return res.status(200).json(attributevalues);
        })
        

    })
    .catch(err => console.log(err));

    

};

exports.getProductAttributes = (req, res, next) => {

    const product_id = req.params.product_id;

    Product.findByPk(product_id)
    .then( product =>{


        product.getAttributevalues({
            include: [
                        { model: Attribute,
                        }
                    ]
        })
        .then(attributes =>{

            res.status(200).json(attributes);

        })        

    })
    .catch(err => {

        console.log(err);

    });
    
};