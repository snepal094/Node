import crypto from "crypto";

const getRandomString = () => {
  const randomString = crypto.randomBytes(64).toString("hex");
  console.log(randomString);
};

getRandomString();

//run this file whenever a random string is required: node generate.random.string.js
//jastai when you have to generate a secret key
