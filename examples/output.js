const fs = require('fs');
const svg2png = require('svg2png');

module.exports = function (outputName, d3n) {

  fs.writeFile('examples/dist/'+outputName+'.html', d3n.html(), function () {
    console.log('Done. Open "example/dist/'+outputName+'.html" in your browser');
  });

  var svgBuffer = new Buffer(d3n.svgString(), 'utf-8');
  svg2png(svgBuffer)
    .then(buffer => fs.writeFile('examples/dist/'+outputName+'.png', buffer))
    .catch(e => console.error('ERR:',e));
};
