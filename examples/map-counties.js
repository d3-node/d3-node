const topojson = require('topojson');
const topo = require('./data/va-counties.json');
const D3Node = require('./../index');
const d3 = require('d3');

// adapted from: http://bl.ocks.org/mbostock/7061976

const markup = '<div id="container"><h2>Map of Virginia</h2><div id="chart"></div></div>';
const styles = '.county-border {fill: none;stroke: #fff;stroke-width: 1.01px;stroke-linejoin: round; stroke-linecap: round;}';
var options = {selector:'#chart', svgStyles:styles, container:markup};

var d3n = new D3Node(options);

var width = 960,
  height = 500;

var projection = d3.geo.conicConformal()
  .parallels([38 + 02 / 60, 39 + 12 / 60])
  .rotate([78 + 30 / 60, 0])
  .scale(8000)
  .translate([0, 0]);

var path = d3.geo.path()
  .projection(projection);

var svg = d3n.createSVG()
  .attr("width", width)
  .attr("height", height);


var state = topojson.feature(topo, topo.objects.states),
  bounds = path.bounds(state);

projection
  .translate([width / 2 - (bounds[0][0] + bounds[1][0]) / 2, height / 2 - (bounds[0][1] + bounds[1][1]) / 2]);

svg.append("path")
  .datum(state)
  .attr("class", "state")
  .attr("d", path)
  .style('fill','#ccc');

svg.append("path")
  .datum(topojson.mesh(topo, topo.objects.counties, function (a, b) {
    return a !== b;
  }))
  .attr("class", "county-border")
  .attr("d", path);


// create output files
require('./lib/output')('map-counties', d3n);
