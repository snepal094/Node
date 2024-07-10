import express from "express";
import Customer from "./customer.model.js";
import mongoose from "mongoose";

const router = express.Router();

//add customer
router.post("/customer/add", async (req, res) => {
  //extract new customer from req.body
  const newCustomer = req.body;
  //insert Customer
  await Customer.create(newCustomer); //async await: promise resolve garnu
  //async await narakhe customer ko data db ma nagai pani tala ko return res.... run huncha
  // db ayo ki await rakhihalne
  //rakhesi actual ma data db ma basesi matra customer is added successfully bhancha which will be true
  //send response
  return res.status(201).send({ message: "Customer is added successfully." });
  //   return res.status(201).send("Adding...");
  //200: okay, 201: okay+created
});

//get customer list
router.get("/customer/list", async (req, res) => {
  const customers = await Customer.find();
  return res.status(200).send({ message: "success", customerList: customers });
  //customerList: key, customers: find bhako customer list
});

//get customer detail by id
router.get("/customer/detail/:id", async (req, res) => {
  //extract customer id from req.params (slash pachi ko kura)
  //   console.log(req.params);
  const customerId = req.params.id;

  //check for mongo id validity
  const isValidId = mongoose.isValidObjectId(customerId);
  //   console.log(isValidId); //bool

  //if not a valid mongo id, throw error
  if (!isValidId) {
    return res.status(400).send({ message: "Invalid Mongo Id" });
  }

  //find customer using customerId (ID has to be in customer table)
  //id can be valid but not in the customer table (can be in another table of the same db)
  const customer = await Customer.findOne({ _id: customerId });

  //if not customer, throw error
  if (!customer) {
    return res.status(404).send({ message: "Customer does not exist" });
  }

  //send res (if customer ✅)
  return res.status(200).send({ message: "success", customerDetail: customer });
});

export default router;

//youtube: name of the video, creator, duration, category
