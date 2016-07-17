'use strict';
const d3 = require('d3');
const jsdom = require('jsdom');
const doc = jsdom.jsdom;

module.exports = D3Node;

D3Node.defaults = {selector: 'body', container: '', styles:''};

function D3Node(opts) {

  const options = Object.assign({}, D3Node.defaults, opts);

  if (!(this instanceof D3Node)) {
    return new D3Node(options);
  }

  let window = jsdom.jsdom().defaultView;

  if (options.container) { // insert container markup, if supplied
    window = doc(options.container).defaultView;
  }

  let rootElement = window.document.querySelector(options.selector);

  this.options = options;
  this.document = window.document;
  this.d3Version = d3.version;
  this.d3Element = d3.select(rootElement);
}

D3Node.prototype.createSVG = function () {
  var svg = this.d3Element.append("svg")
    .attr("xmlns","http://www.w3.org/2000/svg");

  if (this.options.styles) {
    svg.append('defs')
      .append('style')
      .attr('type','text/css')
      .text('<![CDATA[ '+this.options.styles+' ]]>');
  }
  return svg;
};

D3Node.prototype.svgString = function () {
  if (d3.select(this.document.documentElement).select('svg').node()) {
    return d3.select(this.document.documentElement).select('svg').node().outerHTML;
  }
  return '';
};

D3Node.prototype.html = function () {
  return d3.select(this.document.documentElement).node().outerHTML;
};

