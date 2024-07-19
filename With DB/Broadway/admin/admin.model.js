import mongoose from "mongoose";

//set schema
const adminSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    trim: true,
    maxlength: 55,
    unique: true,
    lowercase: true,
    //can't add two same values in the table, 11000 error: duplicate key error
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
  firstName: {
    type: String,
    required: true,
    trim: true,
    maxlength: 30,
    lowercase: true,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
    maxlength: 30,
    lowercase: true,
  },
});

//create table
const Admin = mongoose.model("Admin", adminSchema);

export default Admin;
