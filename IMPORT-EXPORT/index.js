import { doSum, sayHello, PI } from "./calculator.js"; //relative path

const sum = doSum(2, 5);
console.log(sum);

sayHello("Shubham");
console.log(PI);

//prints "Hello World"
//i.e, executes any function from the imported file as well
//dosen't happen in the real world because no function is left out in the open
//each and every code is capsulated within a function (event-driven code)
