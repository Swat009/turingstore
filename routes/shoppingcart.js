const express = require("express");

const router = express.Router();


router.get('/shoppingcart/generateUniqueId',shoppingCartController.generateUniqueId);
router.post('/shoppingcart/add',shoppingCartController.add);
router.put('/shoppingcart/update/:item_id',shoppingCartController.itemId);
router.delete('/shoppingcart/empty/:cart_id',shoppingCartController.cartId);
router.get('/shoppingcart/moveToCart/:item_id',shoppingCartController.itemId);
router.get('/shoppingcart/totalAmount/:cart_id',shoppingCartController.cartId);
router.get('/shoppingcart/saveForLater/:item_id',shoppingCartController.itemId);
router.get('/shoppingcart/getSaved/:cart_id',shoppingCartController.cartId);
router.delete('/shoppingcart/removeProduct/:item_id',shoppingCartController.removeProducts);
router.get('/shoppingcart/:cart_id',shoppingCartController.getcartId);


module.exports = router;