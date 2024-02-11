import chalk from "chalk";

const error = (error) => {
  console.log(`${chalk.bgRed.bold("[ERROR]")}: ${chalk.red.underline(error)}`);
};

const success = (message) => {
  console.log(
    `${chalk.bgGreen.bold("[SUCCESS]")}: ${chalk.green.underline(message)}`
  );
};

const info = (message) => {
  console.log(
    `${chalk.bgBlue.bold("[INFO]")}: ${chalk.blue.underline(message)}`
  );
};

export { error, success, info };