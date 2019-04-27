const express = require("express");


const shoppingCartController = require("../controllers/shoppingcart");
const router = express.Router();


router.get('/shoppingcart/generateUniqueId',shoppingCartController.generateUniqueId);
router.post('/shoppingcart/add',shoppingCartController.add);
router.put('/shoppingcart/update/:item_id',shoppingCartController.update);
router.delete('/shoppingcart/empty/:cart_id',shoppingCartController.empty);
router.get('/shoppingcart/totalAmount/:cart_id',shoppingCartController.totalAmount);
router.delete('/shoppingcart/removeProduct/:item_id',shoppingCartController.removeProduct);
router.get('/shoppingcart/:cart_id',shoppingCartController.getcartId);


module.exports = router;