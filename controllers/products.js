exports.getProducts = (req, res, next) => {
    res.status(200).json({
        products: [{product_id:"Charas", name: "charas",
         description: "yo",price: "200rs", discounted_price: "200rs",thumbnail: ""}]


    });
};