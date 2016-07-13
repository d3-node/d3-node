// mocha test -R List

var assert = require('assert');
var D3Node = require('./../index');

describe('Set D3 style ', function () {

  it('should have background-color', function () {
    var d3n = new D3Node('#chart', '<div id="container"><div id="chart">TEST</div></div>');
    d3n.d3Element.style("background-color", "black");
    var expected = '<div id="container"><div id="chart" style="background-color: black;">TEST</div></div>';
    var actual = d3n.html();
    assert.equal(expected, actual);
  });

});

describe('Set D3 styles (2 instances)', function () {

  it('should have proper background-color', function () {

    var d3a = new D3Node('#test', '<div id="test"></div>');
    var d3b = new D3Node('#chart', '<div id="container"><div id="chart">TEST</div></div>');
    d3b.d3Element.style("background-color", "black");
    d3a.d3Element.style("background-color", "red");

    var expected = '<div id="test" style="background-color: red;"></div>'
    var actual = d3a.html();
    var expected1 = '<div id="container"><div id="chart" style="background-color: black;">TEST</div></div>';
    var actual1 = d3b.html();

    assert.equal(expected1, actual1);
    assert.equal(expected, actual);
  });
});
