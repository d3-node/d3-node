const fs = require('fs');
const csvString = fs.readFileSync('examples/data/piechart.csv', 'UTF-8').toString();
const D3Node = require('./../index');
const d3 = require('d3');

const markup = '<div id="container"><h2>Pie Chart</h2><div id="chart"></div></div>';
const styles = '.arc text {font: 10px sans-serif;text-anchor: middle;} .arc path {stroke: #fff;}';
var options = {selector:'#chart', svgStyles:styles, container:markup};

var d3n = new D3Node(options);

// adapted from: https://bl.ocks.org/mbostock/3887235
///-- start D3 code

var width = 960,
  height = 500,
  radius = Math.min(width, height) / 2;

var color = d3.scale.ordinal()
  .range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]);

var arc = d3.svg.arc()
  .outerRadius(radius - 10)
  .innerRadius(0);

var labelArc = d3.svg.arc()
  .outerRadius(radius - 40)
  .innerRadius(radius - 40);

var pie = d3.layout.pie()
  .sort(null)
  .value(function (d) {
    return d.population;
  });

var svg = d3n.createSVG()
  .attr("width", width)
  .attr("height", height)
  .append("g")
  .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

var data = d3.csv.parse(csvString);

var g = svg.selectAll(".arc")
  .data(pie(data))
  .enter().append("g")
  .attr("class", "arc");

g.append("path")
  .attr("d", arc)
  .style("fill", function (d) {
    return color(d.data.age);
  });

g.append("text")
  .attr("transform", function (d) {
    return "translate(" + labelArc.centroid(d) + ")";
  })
  .attr("dy", ".35em")
  .text(function (d) {
    return d.data.age;
  });

/// -- end D3 code

// create output files
require('./lib/output')('pie-chart', d3n);
