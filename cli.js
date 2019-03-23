#!/usr/bin/env node

const { join } = require('path')
const chalk = require('chalk')
const { homedir } = require('os')
const yargs = require('yargs')

function hyperlink(name, url) {
  return `\x1b]8;;${url}\x07${name}\x1b]8;;\x07`
}

function printDep(depName, depVersion, packageRoot) {
  let dep
  try {
    dep = require(join(packageRoot, `node_modules/${depName}/package.json`))
  } catch (err) {
    switch (err.code) {
      case 'MODULE_NOT_FOUND':
        throw new Error(
          `Cannot find "${depName}". Try \`npm install\` or \`yarn\` first?`
        )
      default:
        throw err
    }
  }

  let bin = ''
  switch (typeof dep.bin) {
    case 'string':
      bin = dep.name
      break
    case 'object':
      bin = Object.keys(dep.bin).join(' ')
      break
  }

  console.log(
    chalk.yellow(hyperlink(dep.name, dep.homepage)),
    chalk.gray(depVersion),
    chalk.cyan(bin)
  )
  console.log(' ', dep.description)
  console.log()
}

function listDeps(argv) {
  const isGlobal = argv.global
  const packageRoot = isGlobal
    ? homedir() + '/.config/yarn/global'
    : process.cwd()
  const pkgPath = join(packageRoot, 'package.json')

  let pkg
  try {
    pkg = require(pkgPath)
  } catch (err) {
    switch (err.code) {
      case 'MODULE_NOT_FOUND':
        throw new Error('No package.json found in current directory')
      default:
        throw err
    }
  }

  const deps = pkg.dependencies
  const depsCount = deps ? Object.keys(deps).length : 0

  const devDeps = pkg.devDependencies
  const devDepsCount = devDeps ? Object.keys(devDeps).length : 0

  console.log()
  console.log(chalk.bold(isGlobal ? 'global' : pkg.name))
  console.log(chalk.green(depsCount), 'dependencies')
  console.log(chalk.green(devDepsCount), 'devDependencies')

  if (depsCount > 0) {
    console.log('\ndependencies:')
    for (const depName in deps) {
      printDep(depName, deps[depName], packageRoot)
    }
  }

  if (devDepsCount > 0) {
    console.log('\ndevDependencies:')
    for (const depName in devDeps) {
      printDep(depName, devDeps[depName], packageRoot)
    }
  }
}

try {
  const { argv } = yargs.alias('global', 'g')
  listDeps(argv)
} catch (err) {
  console.error(err.message)
}
