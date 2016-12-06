const topojson = require('topojson');
const topo = require('./data/congress-115-states.json'); // source: https://github.com/bradoyler/atlas-make/tree/master/us-congress-census
const fs = require('fs');
const csvString = fs.readFileSync('examples/data/unopposed-house-2016.csv', 'UTF-8').toString();
const D3Node = require('./../index');
const d3 = require('d3-v4');

// derived from http://bl.ocks.org/mbostock/4657115
const css = `
path {
 stroke-linejoin: round;
 stroke-linecap: round;
}
.districts {
 fill: #bbb;
}
.districts :hover {
 fill: orange;
}
.district-boundaries {
 pointer-events: none;
 fill: none;
 stroke: #fff;
 stroke-width: .8px;
}
.state-boundaries {
 pointer-events: none;
 fill: none;
 stroke: #fff;
 stroke-width: 1.5px;
}`;

var options = {d3Module: d3, svgStyles: css};

var d3n = new D3Node(options);

function findFips(d) {
  return function (item) {
    return (d.id === item.fips);
  };
};

var width = 960;
var height = 500;

var projection = d3.geoAlbersUsa();
var path = d3.geoPath().projection(projection);

var svg = d3n.createSVG()
  .attr('width', width).attr('height', height);

var data = d3.csvParse(csvString);

svg.append('defs').append('path')
      .attr('id', 'land')
      .datum(topojson.feature(topo, topo.objects.states))
      .attr('d', path);

svg.append('clipPath')
   .attr('id', 'clip-land')
   .append('use')
   .attr('xlink:href', '#land');

svg.append('g')
    .attr('class', 'districts')
    .attr('clip-path', 'url(#clip-land)')
  .selectAll('path')
    .data(topojson.feature(topo, topo.objects.districts).features)
    .enter().append('path')
    .attr('d', path)
    .style('fill', function(d){
      var race = data.find(findFips(d));

      if (race && race.party === 'Republican') {
        return 'red';
      } else if (race && race.party === 'Democratic') {
        return 'blue';
      }
      return '#eee';
    })
    .append('title')
    .text(function(d) { return d.id; });

svg.append('path')
    .attr('class', 'district-boundaries')
    .datum(topojson.mesh(topo, topo.objects.districts, function(a, b) { return a !== b && (a.id / 1000 | 0) === (b.id / 1000 | 0); }))
    .attr('d', path);

svg.append('path')
    .attr('class', 'state-boundaries')
    .datum(topojson.mesh(topo, topo.objects.states, function(a, b) { return a !== b; }))
    .attr('d', path);

// create output files
require('./lib/output')('map-congress-unopposed', d3n);
