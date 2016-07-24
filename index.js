'use strict'
const d3 = require('d3')
const jsDom = require('jsdom')

module.exports = D3Node

module.exports.d3 = d3

module.exports.jsDom = jsDom

const defaults = {
  selector: '',  // selects base D3 Element
  container: '', // markup inserted in body
  svgStyles: ''  // embedded svg stylesheets
}

function D3Node (opts) {
  const options = Object.assign({}, defaults, opts)

  if (!(this instanceof D3Node)) {
    return new D3Node(options)
  }

  // setup DOM
  let document = jsDom.jsdom()
  if (options.container) {
    document = jsDom.jsdom(options.container)
  }

  // setup d3 selection
  let d3Element = d3.select(document.body)
  if (options.selector) {
    d3Element = d3Element.select(options.selector)
  }

  this.options = options
  this.document = document
  this.window = document.defaultView
  this.d3Element = d3Element
}

D3Node.prototype.createSVG = function () {
  var svg = this.d3Element.append('svg')
    .attr('xmlns', 'http://www.w3.org/2000/svg')

  if (this.options.svgStyles) {
    svg.append('defs')
      .append('style')
      .attr('type', 'text/css')
      .text(`<![CDATA[ ${this.options.svgStyles} ]]>`)
  }
  return svg
}

D3Node.prototype.svgString = function () {
  if (this.d3Element.select('svg').node()) {
    return this.d3Element.select('svg').node().outerHTML
  }
  return ''
}

D3Node.prototype.html = function () {
  return jsDom.serializeDocument(this.document)
}

