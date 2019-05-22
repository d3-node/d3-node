const D3Node = require('./../src')
const d3 = require('d3')

const styles = `
.bar rect {
  fill: steelblue;
}

.bar text {
  fill: #fff;
  font: 10px sans-serif;
}`

var options = {
  svgStyles: styles,
  d3Module: d3
}

var d3n = new D3Node(options)

// from https://bl.ocks.org/mbostock/3048450
var data = d3.range(1000).map(d3.randomBates(10))

var formatCount = d3.format(',.0f')

var margin = {top: 10, right: 30, bottom: 30, left: 30}
var width = 960 - margin.left - margin.right
var height = 500 - margin.top - margin.bottom

var x = d3.scaleLinear()
  .rangeRound([0, width])

var bins = d3.histogram()
  .domain(x.domain())
  .thresholds(x.ticks(20))(data)

var y = d3.scaleLinear()
  .domain([0, d3.max(bins, function (d) { return d.length })])
  .range([height, 0])

const svgWidth = width + margin.left + margin.right
const svgHeight = height + margin.top + margin.bottom

var svg = d3n.createSVG(svgWidth, svgHeight)
  .append('g')
  .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')

var bar = svg.selectAll('.bar')
  .data(bins)
  .enter().append('g')
  .attr('class', 'bar')
  .attr('transform', function (d) { return 'translate(' + x(d.x0) + ',' + y(d.length) + ')' })

bar.append('rect')
  .attr('x', 1)
  .attr('width', x(bins[0].x1) - x(bins[0].x0) - 1)
  .attr('height', function (d) { return height - y(d.length) })

bar.append('text')
  .attr('dy', '.75em')
  .attr('y', 6)
  .attr('x', (x(bins[0].x1) - x(bins[0].x0)) / 2)
  .attr('text-anchor', 'middle')
  .text(function (d) { return formatCount(d.length) })

svg.append('g')
  .attr('class', 'axis axis--x')
  .attr('transform', 'translate(0,' + height + ')')
  .call(d3.axisBottom(x))

// create output files
require('./lib/output')('histogram', d3n)
