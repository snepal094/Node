import express from "express";
import mongoose from "mongoose";
import Yup from "yup";
import Customer from "../customer/customer.model.js";
import Food from "../food/food.model.js";
import Order from "./order.model.js";

const router = express.Router();

//* add order

router.post(
  "/place-order",
  //validate food and customer id
  (req, res, next) => {
    const { customerId, foodId } = req.body;

    const validateCustomerId = mongoose.isValidObjectId(customerId);
    const validateFoodId = mongoose.isValidObjectId(foodId);

    if (!validateCustomerId || !validateFoodId) {
      return res.status(400).send({ message: "Invalid food/customer ID." });
    }

    next();
  },

  //validate order data
  async (req, res, next) => {
    const addOrderSchema = Yup.object({
      customerId: Yup.string().required().trim().length(24),
      foodId: Yup.string().required().trim().length(24),
      quantity: Yup.number().required().min(0),
    });

    try {
      const validatedOrderData = await addOrderSchema.validate(req.body);
      req.body = validatedOrderData;
    } catch (error) {
      return res.status.send({ message: error.message });
    }

    next();
  },

  //create order
  async (req, res) => {
    const { customerId, foodId, quantity } = req.body;

    try {
      //check if customer exists
      const customer = await Customer.findById(customerId);
      if (!customer) {
        return res.status(400).send({ message: "Customer dosen't exist." });
      }

      //check if food exists
      const food = await Food.findById(foodId);
      if (!food) {
        return res.status(400).send({ message: "Food dosen't exist." });
      }

      const totalPrice = food.price * quantity;

      const order = new Order({
        customerId,
        foodId,
        quantity,
        totalPrice,
      });

      await order.save();

      return res.status(200).send({ message: "Order created successfully." });
    } catch (error) {
      return res.status(400).send({ message: "Order failed to create." });
    }
  }
);

export default router;
