# D3-Node  
[![Build Status](https://www.travis-ci.com/d3-node/d3-node.svg?branch=master)](https://travis-ci.com/d3-node/d3-node)
[![Codecov](https://img.shields.io/codecov/c/github/d3-node/d3-node.svg)](https://travis-ci.com/d3-node/d3-node)
[![npm](https://img.shields.io/npm/dm/d3-node.svg)](https://www.npmjs.com/package/d3-node)
[![npm](https://img.shields.io/npm/l/d3-node.svg)](https://www.npmjs.com/package/d3-node)

Server-side D3 with ease  


> Tested on Nodejs v10 & up

<img width="768" alt="maps and charts with d3-node" src="https://cloud.githubusercontent.com/assets/425966/24722031/2a424edc-1a10-11e7-96a5-cd68ff335017.png">

[see examples >](examples)

[![js-standard-style](https://cdn.rawgit.com/feross/standard/master/badge.svg)](https://github.com/feross/standard)

### Why?

- Performance: pre-rendering allows offloading data processing, and network overhead
- Take advantage of the entire ecosystem: [npmjs.com](https://www.npmjs.com/)
- Static rendering of [Data-Driven Documents (D3.js)](https://d3js.org/)
- Portable SVG with [embedded stylesheets](https://developer.mozilla.org/en-US/docs/Web/SVG/Element/style)
- Easily adapt examples from [bl.ocks.org](http://bl.ocks.org/)

### Basic usage:

[![NPM](https://nodei.co/npm/d3-node.png?downloads=true&downloadRank=true)](https://nodei.co/npm/d3-node/)

__Create a SVG__

```javascript
 const D3Node = require('d3-node')
 const d3n = new D3Node()      // initializes D3 with container element
 d3n.createSVG(10,20).append('g') // create SVG w/ 'g' tag and width/height
 d3n.svgString() // output: <svg width=10 height=20 xmlns="http://www.w3.org/2000/svg"><g></g></svg>
```

### Advanced usage

__Setting container & insertion point via selector__

```javascript
 const options = { selector: '#chart', container: '<div id="container"><div id="chart"></div></div>' }
 const d3n = new D3Node(options) // initializes D3 with container element
 const d3 = d3n.d3
 d3.select(d3n.document.querySelector('#chart')).append('span') // insert span tag into #chart
 d3n.html()   // output: <html><body><div id="container"><div id="chart"><span></span></div></div></body></html>
 d3n.chartHTML()   // output: <div id="chart"><span></span></div>
```

__Inline SVG styles__

```javascript
 const d3n = new D3Node({styles:'.test {fill:#000;}'})
 d3n.createSVG().append('g')
 d3n.svgString()
```

> Output
```html
<svg xmlns="http://www.w3.org/2000/svg">
   <defs>
     <style type="text/css"><![CDATA[ .test{fill:#000;} ]]></style>
   </defs>
   <g></g>
<svg>
```

__Create a canvas (for generating a png)__
```javascript
 const canvasModule = require('canvas'); // supports node-canvas v1 & v2.x
 const d3n = new D3Node({ canvasModule }); // pass it node-canvas
 const canvas = d3n.createCanvas(960, 500);
 const context = canvas.getContext('2d');
 // draw on your canvas, then output canvas to png
 canvas.pngStream().pipe(fs.createWriteStream('output.png'));
```

### [See examples for more...](examples)

### Run Tests:

```
$ npm test
```

### TODOs:

- Add more examples: (remote data, world map)
- Create Gulp task
- Add option to inject css/js into html output
