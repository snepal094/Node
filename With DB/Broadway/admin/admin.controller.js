import Admin from "./admin.model.js";
import Yup from "yup";
import bcrypt from "bcrypt";
import express from "express";
import validateRequestBody from "../middlewares/validation.middleware.js";
import { generateHashedPassword } from "../utils/password.js";
import {
  loginValidationSchema,
  registerAdminValidationSchema,
} from "./admin.validation.js";
import jwt from "jsonwebtoken";

const router = express.Router();

//* register admin
router.post(
  "/register",

  validateRequestBody(registerAdminValidationSchema),

  async (req, res) => {
    //extract new admin from req.body
    const newAdmin = req.body;

    //find admin using provided email
    const admin = await Admin.findOne({ email: newAdmin.email });

    //if admin exists, throw error
    if (admin) {
      return res.status(409).send({ message: "Admin already exists." }); //409: conflict
    }

    // generate hashed password
    const plainPassword = newAdmin.password;
    const saltRound = 10; // increases randomness
    const hashedPassword = await generateHashedPassword(
      plainPassword,
      saltRound
    );

    newAdmin.password = hashedPassword;

    await Admin.create(newAdmin);

    return res
      .status(200)
      .send({ message: "Admin is registered successfully..." });
  }
);

//* user login
//content in req.body: not a GET method
router.get(
  "/login",
  validateRequestBody(loginValidationSchema),
  async (req, res) => {
    //extract login credentials from req.body
    const loginCredentials = req.body;

    //find admin using email
    const admin = await Admin.findOne({ email: loginCredentials.email });

    //if not admin found, throw error
    if (!admin) {
      return res.status(404).send({ message: "Invalid Credentials." });
    }

    //check for password match
    const plainPassword = loginCredentials.password;
    const hashedPassword = admin.password;
    const isPasswordMatch = await bcrypt.compare(plainPassword, hashedPassword);

    // if not password match, throw error
    if (!isPasswordMatch) {
      return res.status(404).send({ message: "Invalid Credentials." });
    }

    //hide password
    admin.password = undefined;

    //generate access token
    //token is headless: not saved to db
    //to login: to receive token
    const payload = { email: admin.email }; //json token, so has to be in object format
    const sign = "shgwadxhdcigwdj";
    const token = jwt.sign(payload, sign);
    // console.log(token);

    //send res
    return res.status(200).send({
      message: "successful login!!!",
      adminDetail: admin,
      accessToken: token,
    });
  }
);

export default router;
