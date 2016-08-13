const fs = require('fs');
const topojson = require('topojson');
const france = require('./data/france.json');
const csvString = fs.readFileSync('examples/data/fr-population.csv').toString();
const D3Node = require('./../index');
const d3 = require('d3');
const population = d3.csv.parse(csvString);

// adapted from: https://bl.ocks.org/bricedev/97c53d6ed168902239f7
var options = {svgStyles:'svg{font: 10px sans-serif;}.border{stroke-width:.3px;fill:none;stroke:#333;}.caption{font-weight: bold;}.key path {display: none;}.key line{stroke:#000;shape-rendering:crispEdges;}'};
var d3n = new D3Node(options);

//--start D3 code ----- //

var width = 960,
  height = 500,
  formatNumber = d3.format("s");

var color = d3.scale.threshold()
  .domain([250000, 500000, 750000, 1000000, 1250000,1500000,1750000])
  .range(["#deebf7","#c6dbef","#9ecae1","#6baed6","#4292c6","#2171b5","#08519c","#08306b"]);

var x = d3.scale.linear()
  .domain([77156, 2579208])
  .range([0, 300]);

var xAxis = d3.svg.axis()
  .scale(x)
  .orient("bottom")
  .tickSize(13)
  .tickValues(color.domain())
  .tickFormat(function(d) { return formatNumber(d); });

var projection = d3.geo.albers()
  .center([0, 49.5])
  .rotate([-2.8, 3])
  .parallels([45, 55])
  .scale(2500)
  .translate([width / 2, height / 2]);

var path = d3.geo.path()
  .projection(projection);

var svg = d3n.createSVG()
  .attr("width", width)
  .attr("height", height);

var g = svg.append("g")
  .attr("class", "key")
  .attr("transform", "translate(" + 40 + "," + 40 + ")");

g.selectAll("rect")
  .data(color.range().map(function(currentColor) {
    var d = color.invertExtent(currentColor);
    if (d[0] == null) d[0] = x.domain()[0];
    if (d[1] == null) d[1] = x.domain()[1];
    return d;
  }))
  .enter().append("rect")
  .attr("height", 8)
  .attr("x", function(d) { return x(d[0]); })
  .attr("width", function(d) { return x(d[1]) - x(d[0]); })
  .style("fill", function(d) { return color(d[0]); });

g.call(xAxis).append("text")
  .attr("class", "caption")
  .attr("y", -6)
  .text("Population");

svg.selectAll(".departements")
  .data(topojson.feature(france, france.objects.regions).features)
  .enter().append("path")
  .attr("class", "departements")
  .attr("d", path)
  .style("fill",function(departement){
    var paringData = population.filter(function(population){
      return departement.properties.name === population.name;
    })[0];

    return paringData ? color(paringData.population) : color(0);
  });

svg.append("path")
  .datum(topojson.mesh(france, france.objects.regions, function(a, b) { return a.properties.name !== b.properties.name || a === b; }))
  .attr("class","border")
  .attr("d", path);

//--end D3 code ----- //

// create output files
require('./lib/output')('map-choropleth', d3n);
