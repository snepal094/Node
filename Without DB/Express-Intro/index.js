import express from 'express';

//* 6/23/2024

// express is a project of npm which is written in Node
// It is a web application framework for Node.js

// Library= provides a specific functionality
// Framework= offers a structure for building applications

// whatever express function returns is our app (backend)
const app = express();
// app= our backend

app.get('/', (req, res) => {
  //()=>{} function chalauna lai "/" path ma request chaincha
  return res.status(200).send('My first API'); //200: success
});

app.get('/hello', (req, res) => {
  return res.status(200).send('Hello Smriti');
});

// network port and server
const PORT = 8000; //port connects network and program

// Port represents where the app is running on your laptop.
// When external users try to access your app, they access it through this port.

// localhost: IP address
// / : route

app.listen(PORT, () => {
  // listen: wait (for my program to run (port 8000))
  // i.e. request aucha bhane respond garne, otherwise wait for it
  console.log(`App is listening on port ${PORT}.`);
  // this function running ensures that the app is running successfully
});

// to run: 'node index.js' in the terminal
