import mongoose from "mongoose";

const checkMongoIdValidity = (id) => mongoose.isValidObjectId(id); //boolean value

export default checkMongoIdValidity;
