#!/usr/bin/env node

const path = require('path')
const chalk = require('chalk')

const pkgPath = path.join(process.cwd(), 'package.json')
const pkg = require(pkgPath)

const deps = pkg.dependencies
const devDeps = pkg.devDependencies

console.log(chalk.bold(pkg.name))
console.log(chalk.green(Object.keys(deps).length), 'dependencies')
console.log(chalk.green(Object.keys(devDeps).length), 'devDependencies')

if (deps && Object.keys(deps).length > 0) {
  console.log('\ndependencies:')
  for (const depName in deps) {
    console.log(chalk.yellow(depName), chalk.gray(deps[depName]))
  }
}
if (devDeps && Object.keys(devDeps).length > 0) {
  console.log('\ndevDependencies:')
  for (const depName in devDeps) {
    console.log(chalk.yellow(depName), chalk.gray(devDeps[depName]))
  }
}
