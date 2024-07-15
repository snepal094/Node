//? assignment

import mongoose from "mongoose";

//set schema
const orderSchema = new mongoose.Schema({
  customerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Customer",
    required: true,
    trim: true,
    length: 24,
  },

  foodId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Food",
    required: true,
    trim: true,
    length: 24,
  },

  quantity: {
    type: Number,
    required: true,
    min: 0,
  },

  totalPrice: {
    type: Number,
    required: true,
  },

  customerEmail: {
    type: String,
    max: 100,
  },
  foodName: {
    type: String,
    max: 55,
  },
});

//create table
const Order = mongoose.model("Order", orderSchema);

export default Order;
