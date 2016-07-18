// mocha test -R List
/* global describe, it */

var assert = require('assert')
var D3Node = require('./../index')

describe('Append span (defaults)', function () {
  var d3n = new D3Node()
  d3n.d3Element.append('span')

  it('should have span tag', function () {
    var expected = '<html><head></head><body><span></span></body></html>'
    var actual = d3n.html()
    assert.equal(expected, actual)
  })

  it('should not have svg tag', function () {
    var svg = d3n.svgString()
    assert.equal('', svg)
  })
})

describe('Append span (w/ container)', function () {
  var options = {selector: '#chart', container: '<div id="container"><div id="chart"></div></div>'}
  var d3n = new D3Node(options)
  d3n.d3Element.append('span')

  it('should have span tag', function () {
    var expected = '<html><head></head><body><div id="container"><div id="chart"><span></span></div></div></body></html>'
    var actual = d3n.html()
    assert.equal(expected, actual)
  })
})

describe('Set D3 styles (2 instances)', function () {
  var options = {selector: '#chart', container: '<div id="container"><div id="chart"></div></div>'}
  var d3a = new D3Node()
  var d3b = new D3Node(options)
  d3b.d3Element.style('color', 'black')
  d3a.d3Element.style('color', 'red')
  var expected1 = '<html><head></head><body><div id="container"><div id="chart" style="color: black;"></div></div></body></html>'
  var actual1 = d3b.html()
  var expected = '<html><head></head><body style="color: red;"></body></html>'
  var actual = d3a.html()

  it('should have color:red', function () {
    assert.equal(expected, actual)
  })

  it('should have color:black', function () {
    assert.equal(expected1, actual1)
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
    assert.equal(expected, actual)
  })
})

describe('createSVG (w/ svgStyles) 2', function () {
  it('should return svg', function () {
    var options = {
      selector: '#chart',
      container: '<div id="container"><div id="chart"></div></div>',
      svgStyles: '.test2{}'
    }

    var d3n = new D3Node(options)

    d3n.createSVG().append('g')

    var expected = '<svg xmlns="http://www.w3.org/2000/svg"><defs><style type="text/css"><![CDATA[ .test2{} ]]></style></defs><g></g></svg>'
    var actual = d3n.svgString()
    assert.equal(expected, actual)
  })
})

describe('svg method (defaults)', function () {
  var d3n = new D3Node()
  d3n.createSVG().append('g')

  it('should return svg', function () {
    assert.equal('<svg xmlns="http://www.w3.org/2000/svg"><g></g></svg>', d3n.svgString())
  })
})

describe('svg method w/o append', function () {
  var d3n = new D3Node()
  it('should return empty', function () {
    assert.equal('', d3n.svgString())
  })
})

describe('svg method via auto-init', function () {
  var d3n = D3Node()
  d3n.createSVG().append('g').text('test')

  it('should return svg element', function () {
    assert.equal('<svg xmlns="http://www.w3.org/2000/svg"><g>test</g></svg>', d3n.svgString())
  })
})
