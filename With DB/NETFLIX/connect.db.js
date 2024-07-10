import mongoose from "mongoose";

const dbUserName = "nepalsuyasha";
const dbPassword = encodeURIComponent("kantipur");
const dbHost = "cluster0.dvobivh.mongodb.net";
const dbName = "kec-b4-netflix";

const connectDB = async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://${dbUserName}:${dbPassword}@${dbHost}/${dbName}?retryWrites=true&w=majority&appName=Cluster0`
    );
    console.log("Connection established.");
  } catch (error) {
    console.log("DB connection failed...");
    console.log(error.message);
  }
};

export default connectDB;
