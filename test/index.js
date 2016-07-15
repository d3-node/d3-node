// mocha test -R List

var assert = require('assert');
var D3Node = require('./../index');

describe('Append span (defaults)', function () {

  it('should have span tag', function () {
    var d3n = new D3Node();
    d3n.d3Element.append('span');
    var expected = '<html><head></head><body><span></span></body></html>';
    var actual = d3n.html();
    var svg = d3n.svg();
    assert.equal(expected, actual);
  });

});

describe('Append span (w/ container)', function () {

  it('should have span tag', function () {
    var options = {selector:'#chart', container:'<div id="container"><div id="chart"></div></div>'};
    var d3n = new D3Node(options);
    d3n.d3Element.append('span');
    var expected = '<html><head></head><body><div id="container"><div id="chart"><span></span></div></div></body></html>';
    var actual = d3n.html();
    assert.equal(expected, actual);
  });

});

describe('Set D3 styles (2 instances)', function () {

  it('should have proper color', function () {

    var options = {selector:'#chart', container:'<div id="container"><div id="chart">TEST</div></div>'};
    var d3a = new D3Node();
    var d3b = new D3Node(options);
    d3b.d3Element.style("color", "black");
    d3a.d3Element.style("color", "red");

    var expected = '<html><head></head><body style="color: red;"></body></html>';
    var actual = d3a.html();
    var expected1 = '<html><head></head><body><div id="container"><div id="chart" style="color: black;">TEST</div></div></body></html>';
    var actual1 = d3b.html();

    assert.equal(expected1, actual1);
    assert.equal(expected, actual);
  });
});

describe('svg method ', function () {

  it('should return svg', function () {

    var options = {selector:'#chart', container:'<div id="container"><div id="chart"></div></div>'};
    var d3n = new D3Node(options);

    var svg = d3n.d3Element.append("svg").append("g");

    var expected = '<svg><g></g></svg>';
    var actual = d3n.svg();
    assert.equal(expected, actual);
  });

});

describe('svg method (defaults)', function () {

  it('should return svg', function () {

    var d3n = new D3Node();

    var svg = d3n.d3Element.append("svg").append("g");

    var expected = '<svg><g></g></svg>';
    var actual = d3n.svg();
    assert.equal(expected, actual);
  });

});

describe('svg method w/o append', function () {

  it('should return empty', function () {
    var d3n = new D3Node();
    var expected = '';
    var actual = d3n.svg();
    assert.equal(expected, actual);
  });

});
