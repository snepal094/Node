import jwt from "jsonwebtoken";
import User from "../user/user.model.js";

export const isUser = async (req, res, next) => {
  //extract token from req.headers
  const { authorization } = req.headers;
  const splittedArray = authorization?.split(" ");
  //\ ?=>authorization cha bhane matra split garne (error handling)
  const token = splittedArray?.length === 2 ? splittedArray[1] : null;

  //if not token, throw error
  if (!token) {
    return res.status(400).send({ message: "Unauthorized." });
  }

  let payload; //afno scope ma nabhete afu bhanda baira ko scope lai refer garcha
  try {
    const secretKey = process.env.ACCESS_TOKEN_SECRET_KEY;
    //decrypt token
    payload = jwt.verify(token, secretKey);
  } catch (error) {
    //if decryption fails, throw error
    return res.status(401).send({ message: "Unauthorized." });
  }

  //find user using email from payload
  const user = await User.findOne({ email: payload.email });

  //if not user, throw error
  if (!user) {
    return res.status(401).send({ message: "Unauthorized." });
  }

  req.loggedInUserId = user._id;

  next();
};

export const isSeller = async (req, res, next) => {
  try {
    //extract token from req.headers
    const { authorization } = req.headers;
    const splittedArray = authorization?.split(" ");
    const token = splittedArray?.length === 2 ? splittedArray[1] : null;

    //if not token, throw error
    if (!token) {
      throw new Error(); //throws error in the catch block below
    }

    const secretKey = process.env.ACCESS_TOKEN_SECRET_KEY;

    //verify token
    const payload = jwt.verify(token, secretKey);

    //find user using email from payload
    const user = await User.findOne({ email: payload.email });

    // if not user, throw error
    if (!user) {
      throw new Error();
    }

    // if user role is not seller, throw error
    if (user.role !== "seller") {
      throw new Error();
    }

    // add user._id as loggedInUserId
    req.loggedInUserId = user._id; //jasko token tesko id

    next();
  } catch (error) {
    return res.status(401).send({ message: "Unauthorized." });
  }
};

export const isBuyer = async (req, res, next) => {
  // extract token from req.headers
  const { authorization } = req.headers;

  const splittedArray = authorization?.split(" ");

  const token = splittedArray?.length === 2 ? splittedArray[1] : null;

  // if not token, throw error
  if (!token) {
    return res.status(401).send({ message: "Unauthorized." });
  }

  let payload;
  try {
    const secretKey = process.env.ACCESS_TOKEN_SECRET_KEY;

    // decrypt token
    payload = jwt.verify(token, secretKey);
  } catch (error) {
    // if decryption fails, throw error
    return res.status(401).send({ message: "Unauthorized." });
  }

  // find user using email from payload
  const user = await User.findOne({ email: payload.email });

  // if not user, throw error
  if (!user) {
    return res.status(401).send({ message: "Unauthorized." });
  }

  if (user.role !== "buyer") {
    return res.status(401).send({ message: "Unauthorized." });
  }

  req.loggedInUserId = user._id;

  // call next function
  next();
};
