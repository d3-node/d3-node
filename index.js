'use strict'
const jsDom = require('jsdom')
const d3 = require('d3')

module.exports = D3Node

module.exports.d3 = d3
module.exports.jsDom = jsDom

function fixXmlCase (text) {
  // Fix a jsdom issue where all SVG tagNames are lowercased:
  // https://github.com/tmpvar/jsdom/issues/620
  var tagNames = ['linearGradient', 'radialGradient', 'clipPath', 'textPath']
  for (var i = 0, l = tagNames.length; i < l; i++) {
    var tagName = tagNames[i]
    text = text.replace(
            new RegExp('(<|</)' + tagName.toLowerCase() + '\\b', 'g'),
            function (all, start) {
              return start + tagName
            })
  }
  return text
}

function D3Node ({ d3Module = d3, selector = '', container = '', styles = '', svgStyles = '', canvasModule = '' } = {}) {
  // deprecates props
  if (svgStyles && !styles) { // deprecated svgStyles option
    console.warn('WARNING: svgStyles is deprecated, please use styles instead !!')
    styles = svgStyles
  }

  // auto-new instance, so we always have 'this'
  if (!(this instanceof D3Node)) {
    return new D3Node({ d3Module, selector, container, styles })
  }

  // setup DOM
  let document = jsDom.jsdom()
  if (container) {
    document = jsDom.jsdom(container)
  }

  // setup d3 selection
  let d3Element = d3Module.select(document.body)
  if (selector) {
    d3Element = d3Element.select(selector)
  }

  this.options = { d3Module, selector, container, styles, canvasModule }
  this.document = document
  this.window = document.defaultView
  this.d3Element = d3Element
  this.d3 = d3Module
}

D3Node.prototype.createSVG = function (width, height) {
  const svg = this.d3Element.append('svg')
    .attr('xmlns', 'http://www.w3.org/2000/svg')

  if (width && height) {
    svg.attr('width', width)
    .attr('height', height)
  }

  if (this.options.styles) {
    svg.append('defs')
      .append('style')
      .attr('type', 'text/css')
      .text(`<![CDATA[ ${this.options.styles} ]]>`)
  }
  return svg
}

// experimental method for creating canvas
D3Node.prototype.createCanvas = function (width, height) {
  const Canvas = this.options.canvasModule
  if (!Canvas || !Canvas.version) {
    throw new Error('Install node-canvas for HTMLCanvasElement support.')
  }

  const canvas = new Canvas(width, height)
  this.options.canvas = canvas
  return canvas
}

D3Node.prototype.svgString = function () {
  if (this.d3Element.select('svg').node()) {
    // temp until: https://github.com/tmpvar/jsdom/issues/1368
    return fixXmlCase(this.d3Element.select('svg').node().outerHTML)
  }
  return ''
}

D3Node.prototype.html = function () {
  return jsDom.serializeDocument(this.document)
}

D3Node.prototype.chartHTML = function () {
  return this.document.querySelector(this.options.selector).outerHTML
}
