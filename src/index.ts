const { program } = require('commander');
const chalk = require('chalk');
const figlet = require('figlet');
import { create } from './create';

program
  .version('1.0.0')
  .description('A custom CLI tool to generate projects from a template.');

program
  .command('create <project-name>')
  .description('create a new project')
  .action((projectName, cmd) => {
    create(projectName);
  })

program.on("--help", function () {
  console.log(
    "\r\n" +
    figlet.textSync("tea-cli", {
      horizontalLayout: "default",
      verticalLayout: "default",
      width: 80,
      whitespaceBreak: true,
    })
  );
  console.log(
    `\n Run ${chalk.cyan(
      "tea-cli <command> --help"
    )} for detailed usage of given command. \n`
  );
});

program.parse();
