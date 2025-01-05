import express from "express";
import User from "./user.model.js";
import bcrypt, { hash } from "bcrypt";
import {
  loginUserValidationSchema,
  userValidationSchema,
} from "./user.validation.js";
import validateReqBody from "../middleware/validate.req.body.js";
import jwt from "jsonwebtoken";

const router = express.Router();

//* register user
router.post(
  "/register",
  async (req, res, next) => {
    //extract data from req.body
    const data = req.body;
    // console.log(data);

    try {
      //validate data
      const validatedData = await userValidationSchema.validate(data);
      req.body = validatedData;
    } catch (error) {
      //if validation fails, throw error
      return res.status(400).send({ message: error.message });
    }

    //call next function
    next();
  },

  async (req, res) => {
    //extract new user from req.body
    const newUser = req.body;

    //find user using email
    const user = await User.findOne({ email: newUser.email });

    //if user exists, throw error
    if (user) {
      return res.status(401).send({ message: "User already exists." });
    }

    //hash password
    const plainPassword = newUser.password;
    const saltRound = 10;
    const hashedPassword = await bcrypt.hash(plainPassword, saltRound);
    // console.log(hashedPassword);

    newUser.password = hashedPassword;

    //insert user
    await User.create(newUser);

    //send response
    return res.status(201).send("User registered successfully.");
  }
);

//* login
router.post(
  //get: req.body gets ignored completely
  "/login",
  validateReqBody(loginUserValidationSchema),
  async (req, res) => {
    //extract loginCredentials from req.body
    const loginCredentials = req.body;

    //find user using email
    const user = await User.findOne({ email: loginCredentials.email });

    //if not user, throw error
    if (!user) {
      return res.status(400).send({ message: "Invalid Credentials." });
    }

    //compare password using bcrypt
    const plainPassword = loginCredentials.password;
    const hashedPassword = user.password;
    const isPasswordMatch = await bcrypt.compare(plainPassword, hashedPassword);

    //if password dosen't match, throw error
    if (!isPasswordMatch) {
      return res.status(404).send({ message: "Invalid Credentials." });
    }

    //generate access token
    const payload = { email: user.email };
    const secretKey = process.env.ACCESS_TOKEN_SECRET_KEY;
    const token = jwt.sign(payload, secretKey, {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN,
    });

    //send response
    return res.status(200).send({
      message: "Logged in successfully.",
      userDetails: user,
      accessToken: token,
    });
  }
);

export default router;
