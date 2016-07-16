'use strict';
const d3 = require('d3');
const jsdom = require('jsdom');
const doc = jsdom.jsdom;

module.exports = D3Node;

D3Node.defaults = {selector: 'body', container: ''};

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

  this.html = function () {
    return d3.select(window.document.documentElement).node().outerHTML;
  };

  this.svg = function () {
    if (d3.select(window.document.documentElement).select('svg').node()) {
      return d3.select(window.document.documentElement).select('svg').node().outerHTML;
    }
    return '';

  };

  this.d3Version = d3.version;

  this.d3Element = d3.select(rootElement);
}
