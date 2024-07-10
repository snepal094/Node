//npm init -y (to create package.json => configuration file)
//in package.json: "type": "module";
//npm install express (creates package-lock.json(file) and node_module(folder))
//a dependency with express is added on package.json (this project depends on express)
//npm install nodemon
//nodemon: monitors changes and automatically handles restarts after each save
//in package.json: under "scripts", add "dev": "nodemon index.js",
//to run index.js using nodemon: 'npm run dev' in terminal

import express from "express";

const app = express();

app.use(express.json());

let movieList = [
  {
    id: 1,
    name: "Harry Potter and the Philosopher's Stone",
    leadActor: "Daniel Radcliffe",
  },
  {
    id: 2,
    name: "Don't Worry Darling",
    leadActor: "Florence Pugh",
  },
];

app.post("/movie/add", (req, res) => {
  //console.log(req.body);
  const newMovie = req.body;
  movieList.push(newMovie);
  return res.status(200).send({ message: "Adding Movie..." });
});

app.get("/movie/list", (req, res) => {
  return res.status(200).send(movieList);
});
// http://localhost:8888/movie/list

const PORT = 8888;

app.listen(PORT, () => {
  console.log(`App is listening on port ${PORT}.`);
});
