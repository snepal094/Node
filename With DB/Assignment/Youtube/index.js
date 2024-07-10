import express from "express";
import connectDB from "./connect.db.js";
import videoRoutes from "./Video/video.controller.js";

const app = express();

app.use(express.json());

connectDB();

app.use(videoRoutes);

const PORT = 8848;

app.listen(PORT, () => {
  console.log(`App is listening on port ${PORT}.`);
});
