const assert = require('assert')
const path = require('path')
const { exec } = require('child_process')

const bin = path.join(__dirname, '..', require('../package.json').bin.ndeps)

describe('cli', () => {
  it('list deps', (done) => {
    exec(`node ${bin}`, (err, stdout, stderr) => {
      assert.ok(stdout.includes('chalk'))
      done()
    })
  })
})
