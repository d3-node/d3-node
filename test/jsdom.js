// mocha test/basic -R List
/* global describe, it */

import * as assert from 'assert'
import { D3Node } from '../src/index.js'

describe('jsDom features', function () {
  var d3nA = new D3Node({ container: '<!DOCTYPE html>test A' })
  var d3nB = new D3Node({ container: 'test B' })
  var d3nC = new D3Node()

  it('Test C: should serializeDocument()', function () {
    assert.strictEqual(d3nC.html(), '<html><head></head><body></body></html>')
  })

  it('Test B: should serializeDocument()', function () {
    assert.strictEqual(d3nB.html(), '<html><head></head><body>test B</body></html>')
  })

  it('Test A: should serializeDocument()', function () {
    assert.strictEqual(d3nA.html(), '<!DOCTYPE html><html><head></head><body>test A</body></html>')
  })
})
