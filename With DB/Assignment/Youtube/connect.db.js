import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://nepalsuyasha:${encodeURIComponent(
        "kantipur"
      )}@cluster0.dvobivh.mongodb.net/kec-b4-youtube?retryWrites=true&w=majority&appName=Cluster0`
    );
    console.log("DB connection established.");
  } catch (error) {
    console.log("DB connection failed...");
    console.log(error.message);
    process.exit();
  }
};

export default connectDB;
