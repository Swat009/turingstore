const express = require("express");
const shoppingcartValidator = require("../middleware/shoppingcartvalidator");
const shoppingCartController = require("../controllers/shoppingcart");
const router = express.Router();


router.get('/shoppingcart/generateUniqueId',shoppingCartController.generateUniqueId);
router.post('/shoppingcart/add',shoppingcartValidator.validate('add'),shoppingCartController.add);
router.put('/shoppingcart/update/:item_id',shoppingcartValidator.validate('update'),shoppingCartController.update);
router.delete('/shoppingcart/empty/:cart_id',shoppingcartValidator.validate('empty'),shoppingCartController.empty);
router.get('/shoppingcart/totalAmount/:cart_id',shoppingcartValidator.validate('totalAmount'),shoppingCartController.totalAmount);
router.delete('/shoppingcart/removeProduct/:item_id',shoppingcartValidator.validate('removeProduct'),shoppingCartController.removeProduct);
router.get('/shoppingcart/:cart_id',shoppingcartValidator.validate('getcartId'),shoppingCartController.getcartId);


module.exports = router;