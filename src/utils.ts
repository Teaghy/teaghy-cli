const inquirer = require("inquirer");
const path = require("path");
const chalk = require("chalk");
const fs = require("fs-extra");
import logSymbols from "log-symbols";

export async function checkDirName(dirName: string) {
  const cwd = process.cwd();
  const targetDirectory = path.join(cwd, dirName);
  if (fs.existsSync(dirName)) {
    const response = await new inquirer.prompt([
      // 返回值为promise
      {
        name: "isOverwrite", // 与返回值对应
        type: "list", // list 类型
        message: "目标文件夹存在，是否覆盖？",
        choices: [
          { name: "覆盖", value: true },
          { name: "退出", value: false },
        ],
      },
    ]);
    if (response.isOverwrite) {
      // 强制覆盖
      await fs.remove(targetDirectory);
      return true;
    } else {
      console.log(chalk.red("退出..."));
      return false;
    }
  }
  return true;
}

export const log = {
  success: (msg: string) => console.log(logSymbols.success, msg),
  error: (msg: string) => console.log(logSymbols.error, msg),
  info: (msg: string) => console.log(logSymbols.info, msg),
  warning: (msg: string) => console.log(logSymbols.warning, msg),
}