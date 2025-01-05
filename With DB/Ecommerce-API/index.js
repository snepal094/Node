import express from 'express';
import connectDB from './database-connection/db.connect.js';
import userRoutes from './user/user.controller.js';
import productRoutes from './product/product.controller.js';
import cartRoutes from './cart/cart.controller.js';
import cors from 'cors';

const app = express();

// CORS: Cross Origin Resource Sharing: to allow requests from frontend
// Backend giving access to the data received from a specified URL only

app.use(
  cors({
    origin: '*',
  })
);

// console.log(process);

app.use(express.json());

//connect DB
await connectDB();

//register routes
app.use('/user', userRoutes);
app.use('/product', productRoutes);
app.use('/cart', cartRoutes);

//TODO handle global error

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`App is listening on port ${PORT}.`);
});
