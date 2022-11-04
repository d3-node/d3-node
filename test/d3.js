// mocha test/basic -R List
/* global describe, it */

import * as assert from 'assert'
import {D3Node} from '../src/index.js'
import * as d3 from 'd3'

describe('Using d3 functions', function () {
  var d3n = new D3Node()
  var document = d3n.document

  d3.select(document.body).append('span')

  it('should have correct max', function () {
    var maxNum = d3.max([1, 2, 4])
    assert.equal(maxNum, 4)
  })

  it('should not have svg tag', function () {
    var svg = d3n.svgString()
    assert.equal(svg, '')
  })
})
