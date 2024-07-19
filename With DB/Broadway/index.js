import express from "express";
import chalk from "chalk";
import { printPink, printBlue, print } from "./utils/color.console.js";
import connectDB from "./database-connection/connect.db.js";
import adminRoutes from "./admin/admin.controller.js";
import courseRoutes from "./course/course.controller.js";

const app = express();

app.use(express.json());

//db connection
await connectDB();

//register routes
app.use("/admin", adminRoutes);
app.use("/course", courseRoutes);

//network port and server
const PORT = 8080;

app.listen(PORT, () => {
  printPink(`App is listening on port ${PORT}.`);
});
