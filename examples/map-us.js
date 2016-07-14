var fs = require('fs');
var d3 = require('d3');
var topojson = require('topojson');
var us = require('./data/us.json');
var D3Node = require('./../index');

// adapted from: https://bl.ocks.org/mbostock/6406992

var markup = '<div id="container"><h2>US Map</h2>' +
  '<style>.mesh{fill: none;stroke: #333;stroke-width: .5px;stroke-linejoin: round;}</style>'+
  '<div id="us-map"></div></div>';

var selector = '#us-map';

var d3n = new D3Node(selector, markup);

var width = 960,
  height = 500;

var path = d3.geo.path()
  .projection(null);

var svg = d3n.d3Element.append("svg")
  .attr("width", width)
  .attr("height", height);

  svg.append("path")
    .datum(topojson.mesh(us))
    .attr("class", "mesh")
    .attr("d", path);

fs.writeFile('examples/map-us.html', d3n.html(), function () {
  console.log('Done. Open "example/map-us.html" in your browser');
});
