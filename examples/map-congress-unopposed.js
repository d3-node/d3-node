const topojson = require('topojson');
const topo = require('./data/congress.json'); // source: https://github.com/bradoyler/atlas-make/tree/master/us-states
const fs = require('fs');
const csvString = fs.readFileSync('examples/data/unopposed-house-2016.csv', 'UTF-8').toString();
const D3Node = require('./../index');
const d3 = require('d3-v4');

var options = {d3Module: d3};

var d3n = new D3Node(options);

var width = 960,
  height = 500;

var projection = d3.geoAlbersUsa();
var path = d3.geoPath().projection(projection);

var svg = d3n.createSVG()
  .attr('width', width)
  .attr('height', height);

var data = d3.csvParse(csvString);

svg.selectAll('.district')
  .data(topojson.feature(topo, topo.objects.congress).features)
  .enter()
  .append('path')
  .attr('class', 'district')
  .attr('d', path)
  .style('fill', function(d){
    var race = data.find(function(item) {
      return (d.id === item.fips);
    });

    if (race && race.party === 'Republican') {
      return 'red';
    } else if (race && race.party === 'Democratic') {
      return 'blue';
    }
    return '#eee';
  })
  .style('stroke', '#aaa')
  .style('stroke-width', '0.6px');

// create output files
require('./lib/output')('map-congress-unopposed', d3n);
