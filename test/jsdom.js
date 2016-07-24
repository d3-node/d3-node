// mocha test/basic -R List
/* global describe, it */

const assert = require('assert')
const D3Node = require('./../index')

describe('jsDom features', function () {
  var d3nA = new D3Node({container: '<!DOCTYPE html>test A'})
  var d3nB = new D3Node({container: 'test B'})

  it('Test B: should serializeDocument()', function () {
    assert.equal(d3nB.html(), '<html><head></head><body>test B</body></html>')
  })

  it('Test A: should serializeDocument()', function () {
    assert.equal(d3nA.html(), '<!DOCTYPE html><html><head></head><body>test A</body></html>')
  })
})
