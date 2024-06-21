const greetUser = () => {
  console.log("Good Morning!");
};

const reduceTemperature = () => {
  console.log("Starts fan.");
};

const x=2;

//export{greetUser}; //normal export
export default greetUser; //default export: only one element can be exported, hence no curly bracket
//no more default exports. so:
export { reduceTemperature, x };
