import mongoose from "mongoose";
import Food from "./food.model.js";
import Yup from "yup";

//functions having next: middleware

//validate data in req.body
export const validateFoodItemData = async (req, res, next) => {
  const data = req.body;
  //Yup validation:
  const addFoodSchema = Yup.object({
    name: Yup.string().required().trim().max(50),
    price: Yup.number().min(0).required(),
  });

  try {
    const validatedData = await addFoodSchema.validate(data);
    req.body = validatedData; //trimmed n all
  } catch (error) {
    return res.status(400).send({ message: error.message });
  }

  next();
};

export const getFoodList = async (req, res) => {
  const foodItems = await Food.find();

  return res.status(200).send({ message: "Success", foodItems }); //foodItems: foodItems (same object name as the variable)
};

//validate id in the link
export const validateMongoIdForFood = (req, res, next) => {
  //extract id from params
  const id = req.params.id;

  //check for mongoID validity
  const isValidId = mongoose.isValidObjectId(id);

  //if not a valid ID, throw error
  if (!isValidId) {
    return res.status(400).send({ message: "Invalid mongo ID." });
  }

  //call next function
  next();
};

export const findFood = async (req, res) => {
  //extract foodId from req.params
  const foodId = req.params.id;

  //find food using foodId
  const requiredFoodItem = await Food.findOne({ _id: foodId }); //this code is run in findById as well: so just as well use the raw code

  //if not food, throw error
  if (!requiredFoodItem) {
    return res.status(400).send({ message: "Food item does not exist." });
  }

  return res
    .status(200)
    .send({ message: "success", foodItem: requiredFoodItem });
};

export const addFoodItem = async (req, res) => {
  const newFoodItem = req.body;
  // console.log(newFoodItem);
  await Food.create(newFoodItem);
  return res.status(201).send({ message: "Food item added successfully." });
};

export const deleteFoodItem = async (req, res) => {
  //extract food id from params
  const foodItemId = req.params.id;

  //find food item
  const foodItem = await Food.findOne({ _id: foodItemId });

  //if not food, throw error
  if (!foodItem) {
    return res.status(404).send({ message: "Food does not exist." });
  }

  //delete food
  await Food.deleteOne({ _id: foodItemId });

  //send response
  return res.status(200).send({ message: "Food item removed successfully." });
};

export const editFoodItem = async (req, res) => {
  //extract food id from req.params
  const foodId = req.params.id;

  //find food item using food id
  const food = await Food.findOne({ _id: foodId });

  //if not food item, throw error
  if (!food) {
    return res.status(400).send({ message: "Food item does not exist." });
  }

  //extract new values from req.body
  const newValues = req.body;

  //edit food item
  await Food.updateOne(
    { _id: foodId },
    {
      $set: {
        ...newValues,
      },
    }
  );

  //send response
  return res
    .status(200)
    .send({ message: "Food item is updated successfully." });
};
