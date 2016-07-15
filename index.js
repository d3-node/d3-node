const d3 = require('d3');
const jsdom = require('jsdom');
const doc = jsdom.jsdom;

module.exports = function (options) {

  const defaults = {selector: 'body', container: ''};

  if (options && typeof options === 'object') {
    Object.assign(defaults, options);
  }
  else {
    options = defaults;
  }

  var window = jsdom.jsdom().defaultView;

  if (options.container) { // insert container markup, if supplied
    window = doc(options.container).defaultView;
  }

  var rootElement = window.document.querySelector(options.selector);

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

  return this;
};
