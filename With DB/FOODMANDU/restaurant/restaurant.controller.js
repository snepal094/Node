import express from "express";
import Restaurant from "./restaurant.model.js";
import mongoose from "mongoose";
import Yup from "yup";
import {
  addRestaurant,
  deleteRestaurant,
  validateMongoIdFromParams,
  validateRestaurantData,
} from "./restaurant.service.js";

const router = express.Router();

//* add restaurant
router.post("/add", validateRestaurantData, addRestaurant);

//* delete a restaurant
router.delete("/delete/:id", validateMongoIdFromParams, deleteRestaurant);

export default router;
