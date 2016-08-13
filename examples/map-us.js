const topojson = require('topojson');
const us = require('./data/us.json');
const D3Node = require('./../index');
const d3 = require('d3');

// adapted from: https://bl.ocks.org/mbostock/6406992
var options = {svgStyles:'.mesh{fill: none;stroke: #333;stroke-width: .5px;stroke-linejoin: round;}'};

var d3n = new D3Node(options);

var width = 960,
  height = 500;

var path = d3.geo.path()
  .projection(null);

var svg = d3n.createSVG()
  .attr("width", width)
  .attr("height", height)
  .append("path")
  .datum(topojson.mesh(us))
  .attr("class", "mesh")
  .attr("d", path);


// create output files
require('./lib/output')('map-us', d3n);
