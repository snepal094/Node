import mongoose from "mongoose";
import Restaurant from "./restaurant.model.js";
import Yup from "yup";

const validateMongoIdFromParams = (req, res, next) => {
  //extract restaurant id from req.params;
  const id = req.params.id;

  //check for mongo id visibility
  const isValidId = mongoose.isValidObjectId(id);

  //if not valid mongo id, throw error
  if (!isValidId) {
    return res.status(400).send({ message: "Invalid mongo id." });
  }

  next();
};

const deleteRestaurant = async (req, res) => {
  //extract restaurant id from req.params
  const restaurantId = req.params.id;

  //find restaurant
  const requiredRestaurant = await Restaurant.findById(restaurantId);

  //if not restaurant, throw error
  if (!requiredRestaurant) {
    return res.status(404).send({ message: "Restaurant does not exist." });
  }

  //delete restaurant
  await Restaurant.findByIdAndDelete(restaurantId);

  //send response
  return res.status(200).send("Restaurant deleted successfully.");
};

const validateRestaurantData = async (req, res, next) => {
  //next: the function after this
  //this function: middleware
  //has the ability to tweak the contents of req.body

  const restaurantValidationSchema = Yup.object({
    //write rules on schema and validationSchema both so that db is not unnecessarily busy
    name: Yup.string()
      .required("Name is required field." /* desired error to display */)
      .trim()
      .max(55),
    contact: Yup.string().required().trim().min(10).max(55),
    location: Yup.string().trim().required().max(55),
    ownerName: Yup.string().max(55).default(null),
  });

  //in case error is encountered:
  try {
    const validatedData = await restaurantValidationSchema.validate(req.body);
    //incase some modifications is done to the OG req.body
    req.body = validatedData;
  } catch (error) {
    //handles error gracefully, prevents server from crashing
    return res.status(400).send({ message: error.message });
  }

  //validation rule: db ma napuryai server batai error falna ko lagi

  //sab thikcha bhane call the next function
  next(); //the function below ()=>{}
};

const addRestaurant = async (req, res) => {
  //(_,res) : req is a variable not used

  //extract new values from req.body
  const newRestaurant = req.body;

  //insert into db
  await Restaurant.create(newRestaurant);

  return res.status(201).send("Restaurant added successfully.");
};

export {
  validateMongoIdFromParams,
  deleteRestaurant,
  validateRestaurantData,
  addRestaurant,
};
