import { createRequire } from 'module'
import { D3Node } from '../src/index.js'
import * as d3 from 'd3'
import output from './lib/output.js'

const require = createRequire(import.meta.url)
const topojson = require('topojson')
const topo = require('./data/congress.json')// source: https://github.com/bradoyler/atlas-make/tree/master/us-states

// adapted from: http://bl.ocks.org/bradoyler/e9d70c6b1ce76e1ba8b83d94cfd4296c

const options = { d3Module: d3 }

const d3n = new D3Node(options)

const width = 960
const height = 500

var projection = d3.geoAlbersUsa()
var path = d3.geoPath().projection(projection)

var svg = d3n.createSVG(width, height)

svg.selectAll('.region')
  .data(topojson.feature(topo, topo.objects.congress).features)
  .enter()
  .append('path')
  .attr('class', 'region')
  .attr('d', path)
  .style('fill', function (d) {
    if (d.properties.PARTY_AFF === 'Democrat') {
      return '#295899'
    } else {
      return '#b4362b'
    }
  })
  .style('stroke', '#aaa')
  .style('stroke-width', '0.6px')

// create output files
output('map-congress', d3n)
