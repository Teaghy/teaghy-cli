# @teaghy/tea-cli

一个基于 Vite6 + Vue3 的项目模板生成工具，帮助你快速创建和启动新项目。

## 特性

* 🚀 基于 Vite6 和 Vue3 的现代开发体验
* 🎨 集成 naive-ui 组件库
* 📦 使用 pnpm 作为包管理器
* 🔍 内置 ESLint 配置（@antfu/eslint-config）

## 直接使用

```bash
npx @teaghy/tea-cli create <project-name>
```

## 安装cli后使用

```bash
npm install -g @teaghy/tea-cli
# 或者使用 yarn
yarn global add @teaghy/tea-cli
# 或者使用 pnpm
pnpm add -g @teaghy/tea-cli
```

## 使用方法

### 创建新项目

```bash
tea-cli create <project-name>
```

选项：
* `-f, --force`: 如果目标目录已存在，强制覆盖

## 开发

### 环境要求

* Node.js >= 16
* pnpm >= 10.6.3

### 安装依赖

```bash
pnpm install
```

### 开发模式

```bash
pnpm dev
```

### 构建

```bash
pnpm build
```

### 发布

```bash
pnpm build:publish
```

## 技术栈

* Vite 6
* Vue 3
* naive-ui
* TypeScript
* ESLint (@antfu/eslint-config)
* Commander.js
* Chalk
* Inquirer
* Rollup

## 许可证

ISC
