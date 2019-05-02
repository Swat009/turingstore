const ShippingRegion = require('../models/shippingregion'); 
const validationHandler = require('../util/validator');

exports.getShippingRegions = (req, res, next) => {

    ShippingRegion.findAll()
    .then(shippingregions =>{

        return res.status(200).json(shippingregions);
    })
    .catch(err => {

        next(err);

    });


};

exports.getShippingRegion = (req, res, next) => {

    validation_result = validationHandler(req,res);
    if(validation_result[0]=="error")
    {
        return res.status(400).json(validation_result[1]);
    }
    const shipping_region_id = req.params.shipping_region_id;
    ShippingRegion.findByPk(shipping_region_id)
    .then(shippingregion =>{

        return shippingregion.getShipping();

    })
    .then(shipping =>{
        return res.status(200).json(shipping);
    })
    .catch(err => {

        next(err);

    });


};