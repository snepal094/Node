import Product from "./product.model.js";
import express from "express";
import validateReqBody from "../middleware/validate.req.body.js";
import { addProductValidationSchema } from "./product.validation.js";
import { isSeller, isUser } from "../middleware/authentication.middleware.js";
import validateMongoIdFromParams from "../middleware/validate.mongo.id.from.params.js";
import checkMongoIdEquality from "../utils/mongo.id.equality.js";

const router = express.Router();

//* list all products
router.get("/list", isUser, async (req, res) => {
  //find all products
  const products = await Product.find();

  //send response
  return res.status(200).send({ message: "success", productList: products });
});

// * add product
router.post(
  "/add",
  isSeller,
  validateReqBody(addProductValidationSchema),
  async (req, res) => {
    // extract new product from req.body
    const newProduct = req.body;

    newProduct.sellerId = req.loggedInUserId;

    // save product
    await Product.create(newProduct);

    // send res
    return res.status(201).send({ message: "Product is added successfully." });
  }
);

//*delete product
router.delete(
  "/delete/:id",
  isSeller,
  validateMongoIdFromParams,
  async (req, res) => {
    //extract product id from req.params
    const productId = req.params.id;

    //find product using product id
    const product = await Product.findById(productId);

    //if product is not found, throw error
    if (!product) {
      return res.status(404).send({ message: "Product does not exist." });
    }

    //check if loggedInUserId is the owner of the product
    const isProductOwner = checkMongoIdEquality(
      product.sellerId,
      req.loggedInUserId
    );

    //if not owner, throw error
    if (!isProductOwner) {
      return res.status(403).send({
        message: "You are not the owner of this product.",
      });
    }

    //delete product
    await Product.findByIdAndDelete(productId); //findByIdAndDelete: mongoose

    //send response
    return res.status(200).send({ message: "Product deleted." });
  }
);

//* edit product
router.put(
  "/edit/:id",
  isSeller,
  validateMongoIdFromParams,
  validateReqBody(addProductValidationSchema),
  async (req, res) => {
    //extract product id from req.params
    const productId = req.params.id;

    //find product using product
    const product = await Product.findOne({ _id: productId });

    //if not product, throw error
    if (!product) {
      return res.status(404).send({ message: "Product does not exist." });
    }

    //check product ownership
    const isProductOwner = checkMongoIdEquality(
      product.sellerId,
      req.loggedInUserId
    );

    //if not product owner, throw error
    if (!isProductOwner) {
      return res
        .status(403)
        .send({ message: "You are not the owner of this product." });
    }

    //extract new values from req.body
    const newValues = req.body;

    //edit product
    await Product.updateOne(
      { _id: productId },
      {
        $set: { ...newValues },
      }
    );

    //send response
    return res.status(200).send("Product edited Successfully.");
  }
);

export default router;
