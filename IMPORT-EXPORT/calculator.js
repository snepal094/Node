const doSum = (x, y) => {
  return x + y;
};

const sayHello = (name = "user") => {
  console.log(`Hello ${name}.`);
};

const PI = Math.PI;

console.log("Hello World");

//always write export in the last line, import in the first line
export { doSum, sayHello, PI };

//anything can be exported: functions, variables, etc.
