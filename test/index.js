// mocha test -R List
/* global describe, it */

import { equal } from 'assert'
import D3Node from '../src/index.js'
import { select } from 'd3'

describe('Append nothing', function () {
  const d3n = new D3Node()
  it('should have tags default empty', function () {
    const expected = '<html><head></head><body></body></html>'
    const actual = d3n.html()
    equal(actual, expected)
  })
})

describe('Append span (defaults)', function () {
  const d3n = new D3Node()
  const document = d3n.document
  select(document.body).append('span')

  it('should have span tag', function () {
    const expected = '<html><head></head><body><span></span></body></html>'
    const actual = d3n.html()
    equal(actual, expected)
  })

  it('should not have svg tag', function () {
    const svg = d3n.svgString()
    equal(svg, '')
  })
})

describe('Append span (w/ container)', function () {
  const options = {
    selector: '#chart',
    container: '<div id="container"><div id="chart"></div></div>',
  }
  const d3n = new D3Node(options)
  select(d3n.document.querySelector('#chart')).append('span') // or d3n.d3Element.append('span')

  it('should have span tag', function () {
    const expected =
      '<html><head></head><body><div id="container"><div id="chart"><span></span></div></div></body></html>'
    const actual = d3n.html()
    equal(actual, expected)
  })

  it('should return chart html by selector', function () {
    equal(d3n.chartHTML(), '<div id="chart"><span></span></div>')
  })
})

describe('Set D3 styles (2 instances)', function () {
  const options = {
    selector: '#chart',
    container: '<div id="container"><div id="chart"></div></div>',
  }
  const d3a = new D3Node()
  const d3b = new D3Node(options)
  d3b.d3Element.style('color', 'black')
  d3a.d3Element.style('color', 'red')
  const expected1 =
    '<html><head></head><body><div id="container"><div id="chart" style="color: black;"></div></div></body></html>'
  const actual1 = d3b.html()
  const expected = '<html><head></head><body style="color: red;"></body></html>'
  const actual = d3a.html()

  it('should have color:red', function () {
    equal(actual, expected)
  })

  it('should have color:black', function () {
    equal(actual1, expected1)
  })
})

describe('createSVG (w/ svgStyles) 1', function () {
  it('should return svg', function () {
    const options = {
      selector: '#chart',
      container: '<div id="container"><div id="chart"></div></div>',
      svgStyles: '.test1{}',
    }

    const d3n = new D3Node(options)

    d3n.createSVG().append('g')

    const expected =
      '<svg xmlns="http://www.w3.org/2000/svg"><defs><style type="text/css"><![CDATA[ .test1{} ]]></style></defs><g/></svg>'
    const actual = d3n.svgString()
    equal(actual, expected)
  })
})

describe('createSVG (w/ styles)', function () {
  it('should return svg', function () {
    const options = {
      selector: '#chart',
      container: '<div id="container"><div id="chart"></div></div>',
      styles: '.test2{}',
    }

    const d3n = new D3Node(options)

    d3n.createSVG().append('g')

    const expected =
      '<svg xmlns="http://www.w3.org/2000/svg"><defs><style type="text/css"><![CDATA[ .test2{} ]]></style></defs><g/></svg>'
    const actual = d3n.svgString()
    equal(actual, expected)
  })
})

describe('createSVG (w/ width & height)', function () {
  it('should return svg', function () {
    const d3n = new D3Node()

    d3n.createSVG(100, 100).append('g')

    const expected =
      '<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100"><g/></svg>'
    const actual = d3n.svgString()
    equal(actual, expected)
  })
})

describe('createSVG (w/ width & viewBox)', function () {
  it('should return svg', function () {
    const d3n = new D3Node()

    d3n
      .createSVG(null, null, { width: '100%', viewBox: '0 0 574 308' })
      .append('g')

    const expected =
      '<svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 574 308"><g/></svg>'
    const actual = d3n.svgString()
    equal(actual, expected)
  })
})

describe('svgString() should retain camel-casing', function () {
  const d3n = new D3Node()
  d3n
    .createSVG()
    .attr('preserveAspectRatio', 'true')
    .append('radialGradient')
    .attr('offset', '0%')

  it('should return svg', function () {
    equal(
      d3n.svgString(),
      '<svg xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="true"><radialGradient offset="0%"/></svg>'
    )
  })
})

describe('svg method w/o append', function () {
  const d3n = new D3Node()
  it('should return empty', function () {
    equal(d3n.svgString(), '')
  })
})

describe('svg method via auto-init', function () {
  const d3n = D3Node()
  d3n.createSVG().append('g').text('test')

  it('should return svg element', function () {
    equal(
      d3n.svgString(),
      '<svg xmlns="http://www.w3.org/2000/svg"><g>test</g></svg>'
    )
  })
})
