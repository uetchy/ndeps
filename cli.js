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
    printDep(depName, deps[depName])
  }
}
if (devDeps && Object.keys(devDeps).length > 0) {
  console.log('\ndevDependencies:')
  for (const depName in devDeps) {
    printDep(depName, devDeps[depName])
  }
}

function hyperlink(name, url) {
  return `\x1b]8;;${url}\x07${name}\x1b]8;;\x07`
}

function printDep(depName, depVersion) {
  const dep = require(path.join(
    process.cwd(),
    `node_modules/${depName}/package.json`
  ))
  console.log(
    chalk.yellow(hyperlink(dep.name, dep.homepage)),
    chalk.gray(depVersion)
  )
  console.log(' ', dep.description)
  console.log()
}
