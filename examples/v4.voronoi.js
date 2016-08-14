const D3Node = require('./../index');
const d3 = require('d3-v4');

// adapted from: http://bl.ocks.org/mbostock/4060366 - Voronoi Tessellation
var options = {
  svgStyles:'.polygons {stroke: #000;}',
  d3Module: d3
};

var d3n = new D3Node(options);

var width = 960, height = 500;
var siteCount = 100;
var colorScheme = d3.scaleOrdinal(d3.schemeCategory20);

var svg = d3n.createSVG()
  .attr('width', width)
  .attr('height', height);

var sites = d3.range(siteCount)
  .map(function(d) { return [Math.random() * width, Math.random() * height]; });

var voronoi = d3.voronoi().extent([[-1, -1], [width + 1, height + 1]]);

// draw polygons
svg.append('g')
  .attr('class', 'polygons')
  .selectAll('path')
  .data(voronoi.polygons(sites))
  .enter().append('path')
  .attr('d', function(d) { return d ? 'M' + d.join('L') + 'Z' : null; })
  .style('fill', function(d,i){return colorScheme(i);});

// draw site point
svg.append('g')
  .selectAll('circle')
  .data(sites)
  .enter().append('circle')
  .attr('r', 2.5)
  .attr('cx', function(d) { return d[0]; })
  .attr('cy', function(d) { return d[1]; });


// create output files
require('./lib/output')('v4.voronoi', d3n);
