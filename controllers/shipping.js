const ShippingRegion = require('../models/shippingregion'); 

exports.getShippingRegions = (req, res, next) => {


    ShippingRegion.findAll()
    .then(shippingregions =>{

        return res.status(200).json(shippingregions);
    })




};

exports.getShippingRegion = (req, res, next) => {

    const shipping_region_id = req.params.shipping_region_id;
    ShippingRegion.findByPk(shipping_region_id)
    .then(shippingregion =>{

        shippingregion.getShipping()
        .then(shipping =>{
            return res.status(200).json(shipping);
        })
    })


};