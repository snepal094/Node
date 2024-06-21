import respectUser, { reduceTemperature, x as y } from "./a.js";
//can't import what has not been exported
//can rename default exports directly: since only one entity is exported by default
//not the same case for normal export, since multiple entities can be exported normally

respectUser(); //==greetUser();
reduceTemperature();
const x = 7;
console.log(x);
console.log(y);
