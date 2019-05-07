const topojson = require('topojson')
const us = require('./data/us-states.json') // source: https://github.com/bradoyler/atlas-make/tree/master/us-states
const D3Node = require('./../src')
const d3 = require('d3-legacy')

// adapted from: http://bl.ocks.org/bradoyler/bae6adf4e1e74c925ea20bf6026614b3

var options = {svgStyles: '.mesh{fill: none;stroke: #333;stroke-width: .5px;stroke-linejoin: round;}'}

var d3n = new D3Node(options)

var width = 960
var height = 500
var projection = d3.geo.albersUsa()
var path = d3.geo.path()
  .projection(projection)

d3n.createSVG(width, height)
  .append('path')
  .datum(topojson.mesh(us))
  .attr('class', 'mesh')
  .attr('d', path)

// create output files
require('./lib/output')('map-us.legacy', d3n)
