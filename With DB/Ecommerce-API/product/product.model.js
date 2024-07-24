import mongoose from "mongoose";
import { productCategories } from "../constant/general.constant.js";
import User from "../user/user.model.js";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
      maxlength: 55,
    },
    brand: {
      type: String,
      trim: true,
      required: true,
      maxlength: 55,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    quantity: {
      type: Number,
      min: 1,
      required: true,
    },
    category: {
      type: String,
      required: true,
      trim: true,
      enum: productCategories,
    },
    freeShipping: {
      type: Boolean,
      default: false,
    },
    sellerId: {
      type: mongoose.ObjectId,
      required: true,
      ref: User,
    },
    description: {
      type: String,
      required: true,
      trim: true,
      minlength: 10,
      maxlength: 1000,
    },
    image: {
      type: String,
      required: false,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

productSchema.methods.toJSON = function () {
  let obj = this.toObject();
  //this: jun object json ma convert hudai cha, tyo object
  //toJSON: bson format (which we see in response) lai object ma change gareko
  delete obj.sellerId;
  return obj;
};

//create model
const Product = mongoose.model("Product", productSchema);

export default Product;
