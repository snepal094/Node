import chalk from "chalk";

export const printPink = (value) => {
  console.log(chalk.hex("##DC0083")(value));
};

export const printBlue = (value) => {
  return console.log(chalk.hex("#0F67B1")(value));
};

export const print = (value) => {
  return console.log(chalk.hex("#fff")(value));
};
