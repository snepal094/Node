import express from "express";
import connectDB from "./connect.db.js";
import courseRoutes from "./course/course.controller.js";

const app = express();

app.use(express.json());

app.use("/course", courseRoutes);

connectDB();

const PORT = 8888;

app.listen(PORT, () => {
  console.log(`App is listening on port ${PORT}.`);
});
