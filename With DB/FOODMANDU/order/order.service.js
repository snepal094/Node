import mongoose from "mongoose";
import Order from "./order.model.js";
import Food from "../food/food.model.js";
import Customer from "../customer/customer.model.js";
import Yup from "yup";

export const validateFoodAndCustomerId = (req, res, next) => {
  const { customerId, foodId } = req.body;

  const validateCustomerId = mongoose.isValidObjectId(customerId);
  const validateFoodId = mongoose.isValidObjectId(foodId);

  if (!validateCustomerId || !validateFoodId) {
    return res.status(400).send({ message: "Invalid food/customer ID." });
  }

  next();
};

export const validateOrderData = async (req, res, next) => {
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
};

export const createOrder = async (req, res) => {
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

    const customerEmail = customer.email;
    const foodName = food.name;

    const order = new Order({
      customerEmail,
      foodName,
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
};
