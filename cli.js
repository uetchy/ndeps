#!/usr/bin/env node

const { join } = require('path')
const chalk = require('chalk')
const { homedir } = require('os')
const yargs = require('yargs')
const execa = require('execa')
const { existsSync } = require('fs')

async function yarnGlobalDir() {
  const { stdout } = await execa('yarn', ['global', 'dir'])
  return stdout
}

function hyperlink(name, url) {
  return `\x1b]8;;${url}\x07${name}\x1b]8;;\x07`
}

function log(...obj) {
  console.log(...obj)
}

async function fetchDeps(isGlobal) {
  const isYarn = existsSync(join(homedir(), '.yarnrc'))

  const packageRoot = isGlobal
    ? isYarn
      ? await yarnGlobalDir()
      : '/usr/local/lib'
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

  const { dependencies, devDependencies } = pkg

  return { name: pkg.name, packageRoot, dependencies, devDependencies }
}

async function listDeps(argv) {
  const isGlobal = argv.global
  const isJSON = argv.json

  const { name, packageRoot, dependencies, devDependencies } = await fetchDeps(
    isGlobal
  )

  if (isJSON) {
    return log(
      JSON.stringify(
        {
          packageRoot,
          dependencies,
          devDependencies,
        },
        null,
        2
      )
    )
  }

  const depsCount = dependencies ? Object.keys(dependencies).length : 0
  const devDepsCount = devDependencies ? Object.keys(devDependencies).length : 0

  log()
  log(chalk.bold(isGlobal ? 'global' : name))
  log(chalk.green(depsCount), 'dependencies')
  log(chalk.green(devDepsCount), 'devDependencies')

  if (depsCount > 0) {
    log('\ndependencies:')
    for (const depName in dependencies) {
      printDep(depName, dependencies[depName], packageRoot)
    }
  }

  if (devDepsCount > 0) {
    log('\ndevDependencies:')
    for (const depName in devDependencies) {
      printDep(depName, devDependencies[depName], packageRoot)
    }
  }
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

  log(
    chalk.yellow(hyperlink(dep.name, dep.homepage)),
    chalk.gray(depVersion),
    chalk.cyan(bin)
  )
  log(' ', dep.description)
  log()
}

try {
  const { argv } = yargs.alias('global', 'g').boolean('json')
  listDeps(argv)
} catch (err) {
  console.error(err.message)
}
