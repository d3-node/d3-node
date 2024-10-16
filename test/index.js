// mocha test -R List
/* global describe, it */

import * as assert from 'assert'
import { D3Node } from '../src/index.js'
import * as d3 from 'd3'

describe('Append nothing', function () {
  var d3n = new D3Node()
  it('should have tags default empty', function () {
    var expected = '<html><head></head><body></body></html>'
    var actual = d3n.html()
    assert.strictEqual(actual, expected)
  })
})

describe('Append span (defaults)', function () {
  var d3n = new D3Node()
  var document = d3n.document
  d3.select(document.body).append('span')

  it('should have span tag', function () {
    var expected = '<html><head></head><body><span></span></body></html>'
    var actual = d3n.html()
    assert.strictEqual(actual, expected)
  })

  it('should not have svg tag', function () {
    var svg = d3n.svgString()
    assert.strictEqual(svg, '')
  })
})

describe('Append span (w/ container)', function () {
  var options = { selector: '#chart', container: '<div id="container"><div id="chart"></div></div>' }
  var d3n = new D3Node(options)
  d3.select(d3n.document.querySelector('#chart')).append('span') // or d3n.d3Element.append('span')

  it('should have span tag', function () {
    var expected = '<html><head></head><body><div id="container"><div id="chart"><span></span></div></div></body></html>'
    var actual = d3n.html()
    assert.strictEqual(actual, expected)
  })

  it('should return chart html by selector', function () {
    assert.strictEqual(d3n.chartHTML(), '<div id="chart"><span></span></div>')
  })
})

describe('Set D3 styles (2 instances)', function () {
  var options = { selector: '#chart', container: '<div id="container"><div id="chart"></div></div>' }
  var d3a = new D3Node()
  var d3b = new D3Node(options)
  d3b.d3Element.style('color', 'black')
  d3a.d3Element.style('color', 'red')
  var expected1 = '<html><head></head><body><div id="container"><div id="chart" style="color: black;"></div></div></body></html>'
  var actual1 = d3b.html()
  var expected = '<html><head></head><body style="color: red;"></body></html>'
  var actual = d3a.html()

  it('should have color:red', function () {
    assert.strictEqual(actual, expected)
  })

  it('should have color:black', function () {
    assert.strictEqual(actual1, expected1)
  })
})

describe('createSVG (w/ svgStyles) 1', function () {
  it('should return svg', function () {
    var options = {
      selector: '#chart',
      container: '<div id="container"><div id="chart"></div></div>',
      svgStyles: '.test1{}'
    }

    var d3n = new D3Node(options)

    d3n.createSVG().append('g')

    var expected = '<svg xmlns="http://www.w3.org/2000/svg"><defs><style type="text/css"><![CDATA[ .test1{} ]]></style></defs><g></g></svg>'
    var actual = d3n.svgString()
    assert.strictEqual(actual, expected)
  })
})

describe('createSVG (w/ styles)', function () {
  it('should return svg', function () {
    var options = {
      selector: '#chart',
      container: '<div id="container"><div id="chart"></div></div>',
      styles: '.test2{}'
    }

    var d3n = new D3Node(options)

    d3n.createSVG().append('g')

    var expected = '<svg xmlns="http://www.w3.org/2000/svg"><defs><style type="text/css"><![CDATA[ .test2{} ]]></style></defs><g></g></svg>'
    var actual = d3n.svgString()
    assert.strictEqual(actual, expected)
  })
})

describe('createSVG (w/ width & height)', function () {
  it('should return svg', function () {
    var d3n = new D3Node()

    d3n.createSVG(100, 100).append('g')

    var expected = '<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100"><g></g></svg>'
    var actual = d3n.svgString()
    assert.strictEqual(actual, expected)
  })
})

describe('createSVG (w/ width & viewBox)', function () {
  it('should return svg', function () {
    var d3n = new D3Node()

    d3n.createSVG(null, null, { width: '100%', viewBox: '0 0 574 308' }).append('g')

    var expected = '<svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 574 308"><g></g></svg>'
    var actual = d3n.svgString()
    assert.strictEqual(actual, expected)
  })
})

describe('svgString() should retain camel-casing', function () {
  var d3n = new D3Node()
  d3n.createSVG()
    .attr('preserveAspectRatio', 'true')
    .append('radialGradient').attr('offset', '0%')

  it('should return svg', function () {
    assert.strictEqual(d3n.svgString(), '<svg xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="true"><radialGradient offset="0%"></radialGradient></svg>')
  })

  // it('should return html (w/o casing)', function () {
  //   assert.equal(d3n.html(), '<html><head></head><body><svg xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="true"><radialgradient offset="0%"></radialgradient></svg></body></html>')
  // })
})

describe('svg method w/o append', function () {
  var d3n = new D3Node()
  it('should return empty', function () {
    assert.strictEqual(d3n.svgString(), '')
  })
})

describe('svg method via auto-init', function () {
  var d3n = D3Node()
  d3n.createSVG().append('g').text('test')

  it('should return svg element', function () {
    assert.strictEqual(d3n.svgString(), '<svg xmlns="http://www.w3.org/2000/svg"><g>test</g></svg>')
  })
})
