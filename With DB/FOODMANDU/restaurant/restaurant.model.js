import mongoose from "mongoose";

//set schema
const restaurantSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true, //string must contain at least one character
    maxLength: 55,
    trim: true, //trim the spaces in front of and at the end of the string
    //trim= trimleft + trimright
  },
  location: {
    type: String,
    required: true,
    maxLength: 55,
    trim: true,
  },
  contact: {
    type: String,
    maxLength: 15,
    minLength: 10,
    trim: true,
  },
  ownerName: {
    type: String,
    required: false, //default
    nullable: true, //null is an option
    default: null, //no value => null
  },
});

//create collection
const Restaurant = mongoose.model("Restaurant", restaurantSchema);

export default Restaurant;
