// mocha test/basic -R List
/* global describe, it */

import { equal } from 'assert'
import D3Node, { d3 } from '../src/index.js'

describe('Using d3 functions', function () {
  const d3n = new D3Node()
  const document = d3n.document

  d3.select(document.body).append('span')

  it('should have correct max', function () {
    const maxNum = d3.max([1, 2, 4])
    equal(maxNum, 4)
  })

  it('should not have svg tag', function () {
    const svg = d3n.svgString()
    equal(svg, '')
  })
})

// describe('d3.version', function () {
//   it('should be 5.x', function () {
//     const d3n = new D3Node()
//     equal(d3n.d3.version.split('.')[0], '7')
//   })
// })
