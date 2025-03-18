const inquirer = require('inquirer');
const path = require('path');
const chalk = require('chalk');
const downloadGitRepo = require("download-git-repo");
const ora = require('ora');
const axios = require('axios');
const { promisify } = require('util');
const figlet = require('figlet');
import { checkDirName, log } from './utils';

const downloadRepo = promisify(downloadGitRepo);


const templates = [
  {
    name: 'naive-vue3-template',
    description: 'Vue3 + Vite + Javascript + Naive UI + @antfu/eslint-config',
    branch: 'main',
    downloadUrl: 'https://github.com/Teaghy/naive-vue3-template',
  }
];

async function getResponse() {
  const spinner = ora('正在加载模板...');
  spinner.start(); // 开启加载
  const templateListPromise = templates.map((template, index) => {
    return axios.get(`https://api.github.com/repos/Teaghy/${template.name}`)
  });
  let templateList = [];
  try {
    templateList = await Promise.all(templateListPromise);
  } catch (error) {
    console.log(chalk.red('加载模板失败'), error);
    spinner.stop();
    return;
  }
  spinner.stop();
  const choices = templateList.map((template, index) => ({
    name: `${chalk.green(index + 1)} ${template.data.name} ${templates[index].description}`,
    value: template.data,
  }));
  const { repo: template } = await new inquirer.prompt([
    {
      name: "repo",
      type: "list",
      message: "Please choose a template to create project",
      choices,
    },
  ]);
  return template;
}

/**
 * @desc 下载模板
 * @param repo 仓库地址
 * @param tag 标签
 * @returns
 */
async function download(projectName: string, repo: string, tag = 'main') {
  // 检测是否有重名的目录
  const isAllowDown = await checkDirName(projectName);
  if (!isAllowDown) return false;
  const spinner = ora('正在下载模板...');
  spinner.start(); // 开启加载
  const templateUrl = `${repo}#${tag}`;
  try {
    await downloadRepo(templateUrl, path.resolve(process.cwd(), projectName));
    console.log(chalk.blueBright(`\n===============欢迎使用===============`));

    console.log(
      "\r\n" +
      figlet.textSync("tea-cli", {
        horizontalLayout: "default",
        verticalLayout: "default",
        width: 80,
        whitespaceBreak: true,
      })
    );
    console.log(chalk.blueBright(`======================================\n`));
    log.success(`项目创建成功 ${chalk.blueBright(projectName)}`);
    log.success(`执行以下命令启动项目：`);
    log.info(`cd ${chalk.blueBright(projectName)}`);
    log.info(`${chalk.yellow('pnpm')} install`);
    log.info(`${chalk.yellow('pnpm')} run dev`);
  } catch (error) {
    console.log(chalk.red('下载失败'), error);
  }
  spinner.stop();
  return true
}

/**
 * 
 * @param projectName 项目名称
 * @returns 
 */
export async function create(projectName: string) {
  if (!projectName) {
    console.log(chalk.red('Please enter a project name'));
    return;
  }
  // 获取仓库信息
  const responseInfo = await getResponse();
  // 下载模板
  download(projectName, responseInfo.full_name);
}
