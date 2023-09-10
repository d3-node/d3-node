// mocha test/basic -R List
/* global describe, it */

import { equal } from 'assert'
import D3Node from '../src/index.js'

describe('jsDom features', function () {
  const d3nA = new D3Node({ container: '<!DOCTYPE html>test A' })
  const d3nB = new D3Node({ container: 'test B' })
  const d3nC = new D3Node()

  it('Test C: should serializeDocument()', function () {
    equal(d3nC.html(), '<html><head></head><body></body></html>')
  })

  it('Test B: should serializeDocument()', function () {
    equal(d3nB.html(), '<html><head></head><body>test B</body></html>')
  })

  it('Test A: should serializeDocument()', function () {
    equal(
      d3nA.html(),
      '<!DOCTYPE html><html><head></head><body>test A</body></html>'
    )
  })
})
