/* global describe, it */
import * as assert from 'node:assert/strict'
import { execFileSync } from 'node:child_process'
import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'

const entry = new URL('../src/index.js', import.meta.url).href
const output = new URL('../examples/lib/output.js', import.meta.url).href

describe('SVG example PNG export', function () {
  it('writes the rendered PNG before reporting export success', function () {
    this.timeout(10000)
    const directory = fs.mkdtempSync(path.join(os.tmpdir(), 'd3-node-output-'))
    try {
      fs.mkdirSync(path.join(directory, 'examples', 'dist'), { recursive: true })
      const stdout = execFileSync(process.execPath, ['--input-type=module', '-e', `
        import { D3Node } from ${JSON.stringify(entry)}
        import output from ${JSON.stringify(output)}
        const d3n = new D3Node()
        d3n.createSVG(12, 8).append('rect')
          .attr('width', 12).attr('height', 8).attr('fill', 'red')
        output('chart', d3n)
      `], {
        cwd: directory,
        encoding: 'utf8',
        // PhantomJS's OpenSSL 1.x cannot load the host's OpenSSL 3 providers.
        env: { ...process.env, OPENSSL_CONF: os.devNull }
      })
      const png = fs.readFileSync(path.join(directory, 'examples', 'dist', 'chart.png'))
      assert.deepStrictEqual(png.subarray(0, 8), Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]))
      assert.strictEqual(png.readUInt32BE(16), 12)
      assert.strictEqual(png.readUInt32BE(20), 8)
      assert.ok(stdout.includes('>> Exported: "examples/dist/chart.png"'))
    } finally {
      fs.rmSync(directory, { recursive: true })
    }
  })
})
