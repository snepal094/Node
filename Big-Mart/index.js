import express from "express";

const app = express();

app.use(express.json());

//product list
let productList = [
  {
    id: 1,
    name: "Bread",
    price: 100,
  },
];

app.get("/product/list", (req, res) => {
  //get: read (safe method), post: insert
  return res.status(200).send({ message: "success", productList });
});
//http://localhost:8001/product/list

app.post("/product/add", (req, res) => {
  const newProduct = req.body;
  console.log(newProduct);
  productList.push(newProduct);
  return res.status(200).send({ message: "Product added successfully." });
});

//*get product detail by id
app.get("/product/detail/:id", (req, res) => {
  //id can be anything (a, abc, whatever)
  // : =>dynamic value replaces id, eg: http://localhost:8001/product/detail/1 in postman (id=1)
  //console.log(req.params);
  const productId = Number(req.params.id); //req.params.id gives string, so type conversion
  const product = productList.find((item) => item.id === productId);
  if (!product) {
    return res.status(404).send({ message: "Product does not exist." });
  }
  return res.status(200).send({ message: "success", productDetail: product });
});
//http://localhost:8001/product/detail

//*delete product
app.delete("/product/delete/:id", (req, res) => {
  //console.log(req.params);
  //extract product id from req.params and convert to number type
  //find product using product id
  const productId = Number(req.params.id);
  const product = productList.find((item) => item.id === productId);
  //if there is no product, throw error
  if (!product) {
    return res.status(404).send({ message: "Product does not exist." });
  }
  //(else) delete product
  const newProductList = productList.filter((item) => item.id !== productId);
  productList = structuredClone(newProductList);
  //send response
  return res.status(200).send({ message: "Product deleted successfully." });
});

//*edit product
app.put("/product/edit/:id", (req, res) => {
  //extract product id from req.params and convert to number type
  const productId = Number(req.params.id);
  //find product using product id
  const product = productList.find((item) => item.id === productId);
  //if no product, throw error
  if (!product) {
    return res.status(404).send({ message: "Product does not exist." });
  }
  //extract new values from req.body (Postman: PUT)
  const newValues = req.body;
  //edit product
  const newProductList = productList.map((item) => {
    if (item.id === productId) {
      return { ...item, ...newValues };
    }
    return { ...item };
  });
  productList = structuredClone(newProductList);
  //send response
  return res.status(200).send({ message: "Product Edited Successfully." });
});

const PORT = 8001; //look up network ports range

app.listen(PORT, () => {
  console.log(`App is listening on port ${PORT}.`);
});
