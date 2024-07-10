import mongoose from "mongoose";

const dbUserName = "kec";
const dbPassword = encodeURIComponent("kantipur");
const dbHost = "cluster0.dvobivh.mongodb.net";
const dbName = "kec-b4-netflix";

const connectDB = async () => {
  try {
    await mongoose.connect(
      `mongodb+s/rv://${dbUserName}:${dbPassword}@${dbHost}/${dbName}?retryWrites=true&w=majority&appName=Cluster0`
      // "mongodb+srv://nepalsuyasha:kantipur@cluster0.dvobivh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
    );
    console.log("Connection established.");
  } catch (error) {
    console.log("DB connection failed...");
    console.log(error.message);
  }
};

export default connectDB;

//ObjectID
/*
A 4-byte timestamp, representing the ObjectID's creation, measured in seconds since the Unix epoch.
A 5-byte random value generated once per process. This random value is unique to the machine and process.
A 3-byte incrementing counter, initialized to a random value.

Why use ObjectID?
Unique Identification: Guarantees uniqueness across documents.
Timestamp Embedded: Contains a timestamp, which can be useful for sorting by creation time.
Compactness: Uses only 12 bytes, which is efficient compared to other unique ID schemes.
*/
