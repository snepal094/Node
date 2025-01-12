import express from 'express';
import { isBuyer } from '../middleware/authentication.middleware.js';
import validateReqBody from '../middleware/validate.req.body.js';
import { addCartItemValidationSchema } from './cart.validation.js';
import checkMongoIdValidity from '../utils/mongo.id.validity.js';
import Product from '../product/product.model.js';
import Cart from './cart.model.js';
import validateMongoIdFromParams from '../middleware/validate.mongo.id.from.params.js';

const router = express.Router();

//* add item to cart
router.post(
  '/add/item',
  isBuyer,

  validateReqBody(addCartItemValidationSchema),
  (req, res, next) => {
    //validate product id from req.body
    const { productId } = req.body;

    //check mongo id validity for productId
    const isValidId = checkMongoIdValidity(productId);
    //Yup (middleware) could only check validity for string, and not object id

    //if not valid mongo id, throw error
    if (!isValidId) {
      return res.status(400).send({ message: 'Invalid Mongo Id.' });
    }

    //call next function
    next();
  },

  async (req, res) => {
    //extract cart item data from req.body
    const { productId, orderedQuantity } = req.body;

    //find product using product id
    const product = await Product.findOne({ _id: productId });
    // console.log(product);

    //if not product, throw error
    if (!product) {
      return res.status(404).send({ message: 'Product does not exist.' });
    }

    //check if orderedQuantity does not exceed item quantity
    //if orderedQuantity exceeds product quantity, throw error
    if (orderedQuantity > product.quantity) {
      return res.status(403).send({
        message: 'Ordered quantity is greater than product quantity.',
      });
    }

    //add item to cart
    await Cart.create({
      buyerId: req.loggedInUserId,
      productId,
      orderedQuantity,
    });

    //send response
    return res.status(201).send('Added to cart successfully.');
  }
);

//* flush cart/ remove all items from cart
router.delete('/flush', isBuyer, async (req, res) => {
  //extract buyerId from req.loggedInUserId
  const buyerId = req.loggedInUserId;

  //remove all items from cart for that buyer
  await Cart.deleteMany({ buyerId });

  //send response
  return res.status(200).send({ message: 'Cart cleared successfully.' });
});

//* remove single item from cart
// id => cartId
router.delete(
  '/item/delete/:id',
  isBuyer,
  validateMongoIdFromParams,
  async (req, res) => {
    //extract cartId from req.params
    const cartId = req.params.id;

    //check cart ownership
    const cart = await Cart.findOne({
      _id: cartId,
      buyerId: req.loggedInUserId,
    });

    if (!cart) {
      return res
        .status(403)
        .send({ message: 'You are not the owner of this cart.' });
    }

    //extract buyerId from req.loggedInUserId
    const buyerId = req.loggedInUserId;

    //deleteCart
    await Cart.deleteOne({ _id: cartId, buyerId: req.loggedInUserId });

    //send response
    return res
      .status(200)
      .send({ message: 'Item deleted from cart successfully.' });
  }
);

//* list all products in a cart
router.get('/list', isBuyer, async (req, res) => {
  //find all products
  const cart = await Cart.find();

  //send response
  return res.status(200).send({ message: 'success', cartList: cart });
});

export default router;
