import express from "express";
import {
  createOrder,
  validateFoodAndCustomerId,
  validateOrderData,
} from "./order.service.js";

const router = express.Router();

//* add order
router.post(
  "/place-order",
  validateFoodAndCustomerId,
  validateOrderData,
  createOrder
);

export default router;
