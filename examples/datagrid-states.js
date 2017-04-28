const D3Node = require('./../index');
const d3 = require('d3');

const markup = '<div id="container"><h3>U.S. States</h3><div id="statesgrid"></div></div>';

const styles = `
    .empty {
        fill: #eee !important;
    }
    .empty text {
        font-size: 1px;
    }

    .grid-cell {
        cursor: pointer;
    }
    .grid-cell rect {
        fill: #eee;
    }
    .grid-cell text {
        color: #000;
        font: 12px sans-serif;
        text-anchor: middle;
    }
`;

var options = {d3Module: d3, selector: '#statesgrid', svgStyles: styles, container: markup };
var d3n = new D3Node(options);

var cellsText = `
                              ME
               WI          VT NH
WA ID MT ND MN IL MI    NY MA
OR NV WY SD IA IN OH PA NJ CT RI
CA UT CO NE MO KY WV VA MD DE
   AZ NM KS AR TN NC SC
         OK LA MS AL GA
HI AK    TX             FL
`;

var gridCells = [];

cellsText.split('\n').forEach(function (line, i) {
  var regex = /[A-Za-zx]+/g;
  var cell;
  while (cell = regex.exec(line)) {
    var gridCell = { name: cell[0], x: cell.index / 3, y: i };
    gridCells.push(gridCell);
  }
});

function gridCellData(d, i) {
  return JSON.stringify({ id: d.name, url: `/state/${d.name}`});
}

var width = 350;
var height = 300;
var cellSize = 30;

var svg = d3n.createSVG(width, height);

var gridWidth = d3.max(gridCells, function (d) { return d.x; }) + 1;
var gridHeight = d3.max(gridCells, function (d) { return d.y; }) + 1;

var gridCell = svg.append('g')
  .attr('transform', 'translate(' + width / 2.7 + ',' + height / 2 + ')')
  .selectAll('.grid-cell')
  .data(gridCells)
  .enter().append('g')
  .attr('class', function (d) {
    if (d.name === 'xx') {
      return 'empty';
    }
    return 'grid-cell';
  })
  .attr('data-cell', gridCellData)
  .attr('transform', function (d) {
    return 'translate(' + (d.x - gridWidth / 2.9) * cellSize + ',' + (d.y - gridHeight / 2) * cellSize + ')';
  });

gridCell.append('rect')
  .attr('x', -cellSize / 2)
  .attr('y', -cellSize / 2)
  .attr('width', cellSize - 1)
  .attr('height', cellSize - 1);

gridCell.append('text').attr('dy', '.35em')
  .text(function (d) {
    return d.name;
  });

// create output files
require('./lib/output')('datagrid-states', d3n);
