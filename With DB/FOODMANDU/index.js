import express from "express";
import connectDB from "./connect.db.js";
import customerRoutes from "./customer/customer.controller.js"; //renaming default export
import restaurantRoutes from "./restaurant/restaurant.controller.js";
import foodRoutes from "./food/food.controller.js";
import orderRoutes from "./order/order.controller.js";

const app = express();

//to make app understand json:
app.use(express.json());

//database connection
connectDB();

//register routes
app.use(customerRoutes);
app.use("/restaurant", restaurantRoutes);
app.use("/food", foodRoutes);
app.use("/order", orderRoutes);

//network port and server
const PORT = 8080;

app.listen(PORT, () => {
  console.log(`App is listening on port ${PORT}.`);
});
