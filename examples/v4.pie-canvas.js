const fs = require('fs');
const csvString = fs.readFileSync('examples/data/piechart.csv', 'UTF-8').toString();
const D3Node = require('./../index');
const d3 = require('d3-v4');

const markup = '<canvas width="960" height="500"></canvas>';
var options = {selector:'canvas', container:markup, d3Module:d3};

var d3n = new D3Node(options);

// adapted from: https://bl.ocks.org/mbostock/8878e7fd82034f1d63cf
// this example require node-canvas
///-- start D3 code

var canvas = d3n.createCanvas();
var context = canvas.getContext('2d');

var width = canvas.width,
  height = canvas.height,
  radius = Math.min(width, height) / 2;

var colors = ["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"];

var arc = d3.arc()
  .outerRadius(radius - 10)
  .innerRadius(0)
  .context(context);

var labelArc = d3.arc()
  .outerRadius(radius - 40)
  .innerRadius(radius - 40)
  .context(context);

var pie = d3.pie()
  .sort(null)
  .value(function(d) { return d.population; });

context.translate(width / 2, height / 2);

var data = d3.csv.parse(csvString);

var arcs = pie(data);

arcs.forEach(function(d, i) {
  context.beginPath();
  arc(d);
  context.fillStyle = colors[i];
  context.fill();
});

context.beginPath();
arcs.forEach(arc);
context.strokeStyle = "#fff";
context.stroke();

context.textAlign = "center";
context.textBaseline = "middle";
context.fillStyle = "#000";
arcs.forEach(function(d) {
  var c = labelArc.centroid(d);
  context.fillText(d.data.age, c[0], c[1]);
});

/// -- end D3 code

// create output files
require('./lib/output')('v4.pie-canvas', d3n);
