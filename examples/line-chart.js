const D3Node = require('./../index');
const d3 = require('d3');

const styles = '.axis path,.axis line {fill: none;stroke: #000;shape-rendering: crispEdges;}.area {fill: lightsteelblue;}.line {fill: none;stroke: steelblue;stroke-width: 1.5px;} .dot {fill: white;stroke: steelblue;stroke-width: 1.5px;}';
const markup = '<div id="container"><h2>Line Chart (missing data)</h2><div id="chart"></div></div>';
var options = {selector:'#chart', svgStyles:styles, container:markup, d3Module:d3};

var d3n = new D3Node(options);

// adapted from: http://bl.ocks.org/mbostock/0533f44f2cfabecc5e3a
///-- start D3 code
var data = d3.range(40).map(function(i) {
  return i % 5 ? {x: i / 39, y: (Math.sin(i / 3) + 2) / 4} : null;
});

var margin = {top: 40, right: 40, bottom: 40, left: 40},
  width = 960 - margin.left - margin.right,
  height = 500 - margin.top - margin.bottom;

var x = d3.scaleLinear()
  .range([0, width]);

var y = d3.scaleLinear()
  .range([height, 0]);

var line = d3.line()
  .defined(function(d) { return d; })
  .x(function(d) { return x(d.x); })
  .y(function(d) { return y(d.y); });

var svg = d3n.createSVG()
  .datum(data)
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

svg.append("g")
  .attr("class", "axis axis--x")
  .attr("transform", "translate(0," + height + ")")
  .call(d3.axisBottom().scale(x));

svg.append("g")
  .attr("class", "axis axis--y")
  .call(d3.axisLeft().scale(y));

svg.append("path")
  .attr("class", "line")
  .attr("d", line);

svg.selectAll(".dot")
  .data(data.filter(function(d) { return d; }))
  .enter().append("circle")
  .attr("class", "dot")
  .attr("cx", line.x())
  .attr("cy", line.y())
  .attr("r", 3.5);

/// -- end D3 code

// create output files
require('./lib/output')('line-chart', d3n);
