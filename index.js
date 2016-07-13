var d3 = require('d3');
var jsdom = require('jsdom');
var doc = jsdom.jsdom;


module.exports = function (selector, container) {

    var document = doc(container);
    var window = document.defaultView;
    var rootElement = window.document.querySelector(selector);

    this.html = function () {
        return d3.select(window.document.documentElement).select('body').html();
    };

    this.d3Element = d3.select(rootElement);
    return this;
};
