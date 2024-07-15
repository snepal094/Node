import express from "express";
import Food from "./food.model.js";
import Yup from "yup";
import mongoose from "mongoose";
import {
  validateFoodItemData,
  getFoodList,
  validateMongoIdForFood,
  findFood,
  addFoodItem,
  deleteFoodItem,
  editFoodItem,
} from "./food.service.js";

const router = express.Router();

//* add foods
router.post("/add", validateFoodItemData, addFoodItem);

//* get all food items
router.get("/list", getFoodList);

//* get product detail by id
router.get("/detail/:id", validateMongoIdForFood, findFood);

//* delete food item by id
router.delete("/delete/:id", validateMongoIdForFood, deleteFoodItem);

//* edit food item by id
router.put(
  "/edit/:id",
  validateMongoIdForFood,
  validateFoodItemData,
  editFoodItem
);

export default router;
