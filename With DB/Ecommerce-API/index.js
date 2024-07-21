import express from "express";
import connectDB from "./database-connection/db.connect.js";
import userRoutes from "./user/user.controller.js";

const app = express();

// console.log(process);

app.use(express.json());

//TODO: enable CORS

//connect DB
await connectDB();

//register routes
app.use("/user", userRoutes);

//TODO handle global error

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`App is listening on port ${PORT}.`);
});
