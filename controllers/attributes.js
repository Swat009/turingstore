const Attribute = require('../models/attribute');
const AttributeValue = require('../models/attributevalue');
const Product = require('../models/product');
const ProductAttribute = require('../models/productattribute');
const validationHandler = require('../util/validator');

exports.getAttributes = (req, res, next) => {

    Attribute.findAll({raw: true})
    .then( attributes =>{

        res.status(200).json(attributes);

    })
    .catch(err => {

        if(!err.statusCode){
            err.statusCode = 500;
        }
        next(err);

    });

    

};

exports.getAttribute = (req, res, next) => {

    validation_result = validationHandler(req,res);
    if(validation_result[0]=="error")
    {
        return res.status(400).json(validation_result[1]);
    }

    const attribute_id = req.params.attribute_id;

    Attribute.findByPk(attribute_id)
    .then( attribute =>{

        if(!attribute)
        {
            return res.status(200).json({error:'Attribute not found'});
            
        }


        res.status(200).json(attribute);


    })
    .catch(err => {

        if(!err.statusCode){
            err.statusCode = 500;
        }
        next(err);
    });

    

};


exports.getAttributeValues = (req, res, next) => {

    validation_result = validationHandler(req,res);
    if(validation_result[0]=="error")
    {
        return res.status(400).json(validation_result[1]);
    }

    const attribute_id = req.params.attribute_id;

    Attribute.findByPk(attribute_id) 
    .then(attribute =>{

        
        attribute.getAttributevalues({ attributes: {
            exclude: ['attributeAttributeId']
          }})
        .then(attributevalues =>{
            return res.status(200).json(attributevalues);
        })
        

    })
    .catch(err => {
        if(!err.statusCode){
            err.statusCode = 500;
        }
        next(err);
    });

    

};

exports.getProductAttributes = (req, res, next) => {

    validation_result = validationHandler(req,res);
    if(validation_result[0]=="error")
    {
        return res.status(400).json(validation_result[1]);
    }

    const product_id = req.params.product_id;

    Product.findByPk(product_id)
    .then( product =>{


        return product.getAttributevalues({
            attributes: {  include:['attribute_value_id','value'],
            exclude:['productattribute.productProductId']},
            include: [
                        { model: Attribute,
                          attributes: ['name']
                        },
                    ]         
        })
   

    })
    .then(attributes =>{

        attributes_list = [];

        attributes.forEach(function (attribute) {

            const attribute_data = {
                attribute_value_id: attribute.attribute_value_id,
                attribute_name: attribute.attribute.name,
                attribute_value: attribute.value
            }
            attributes_list.push(attribute_data)

        });


        res.status(200).json(attributes_list);

    })        
    .catch(err => {

        if(!err.statusCode){
            err.statusCode = 500;
        }
        next(err);

    });
    
};