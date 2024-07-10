import mongoose from "mongoose";

// set rule/schema/structure
const customerSchema = new mongoose.Schema({
  email: String,
  phoneNumber: String,
  address: String,
});

// create table/model/connection
const Customer = mongoose.model("Customer", customerSchema);
//variable and table have the same name (convention, for convenience)
export default Customer;
