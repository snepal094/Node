import express from "express";

//whatever express function returns is our app (backend)
const app = express();

app.get("/", (req, res) => {
  //()=>{} function chalauna lai "/" path ma request chaincha
  return res.status(200).send("My first API"); //200: success
});

app.get("/hello", (req, res) => {
  return res.status(200).send("Hello Smriti");
});

//network port and server
const PORT = 8000; //port connects network and program

//localhost: IP address
// / : route

app.listen(PORT, () => {
  //listen: wait (for my program to run (port 8000))
  console.log(`App is listening on port ${PORT}.`);
});
