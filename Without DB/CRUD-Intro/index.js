import express from 'express';

const app = express();

//?to make app understand json:
app.use(express.json());

let studentList = [
  {
    id: 1,
    name: 'Saugat',
  },
  {
    id: 2,
    name: 'Suyasha',
  },
];

//?API

//add student
app.post('/student/add', (req, res) => {
  //1st arg: request, 2nd: response
  //req, res are objects
  // console.log(req)
  // console.log(res)
  //request (post) in route (/student/add)
  console.log(req.body); //undefined if it were not for app.use(express.json);
  //const newStudent = { id: 3, name: "Shubham" };
  const newStudent = req.body; //postman-POST-get(/student/add)-body-raw
  studentList.push(newStudent);
  //response:
  return res.status(200).send({ message: 'Adding Student...' }); //can send anything: object, string, bool, whatever
});

//get studentList
app.get('/student/list', (req, res) => {
  return res.status(200).send(studentList); //200 napathaye ni huncha (default)
});

//network port
const PORT = 8080;

app.listen(PORT, () => {
  console.log(`App is listening on port ${PORT}.`);
});
