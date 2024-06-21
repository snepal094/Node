console.log("hello");
//why this works: node has been installed on our system globally
//console: a module of node

import os from "os"; //since it hasn't been installed globally
import fs from "fs"; //file system
import crypto, { randomBytes } from "crypto";

console.log(os.release());
console.log(os.platform());
console.log(os.cpus());
console.log(os.machine());

console.log(os.totalmem() / (1024 * 1024 * 1024)); //GB
console.log(os.freemem() / (1024 * 1024 * 1024)); //GB

fs.writeFileSync("log.txt", "App Crashed Due to Email System Failure. ");

fs.appendFileSync("log.txt", "App Started Running.");

const randomText = crypto.randomBytes(64).toString("hex");
console.log(randomText);

console.log(process.env);
