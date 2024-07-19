import mongoose from "mongoose";
import { printPink, printBlue, print } from "../utils/color.console.js";

const connectDB = async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://nepalsuyasha:${encodeURIComponent(
        "kantipur"
      )}@cluster0.dvobivh.mongodb.net/broadway?retryWrites=true&w=majority&appName=Cluster0`
    );
    printBlue("DB connection established.");
  } catch (error) {
    printBlue("DB connection failed...");
    print(error.message);
    process.exit();
  }
};

export default connectDB;
