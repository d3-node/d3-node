# D3-Node
Server-side D3 with ease

[![Build Status](https://travis-ci.org/bradoyler/d3-node.svg?branch=master)](https://travis-ci.org/bradoyler/d3-node)

[![NPM](https://nodei.co/npm/d3-node.png?downloads=true&downloadRank=true)](https://nodei.co/npm/d3-node/)

### Why?

- Performance: pre-rendering allows offloading data processing, and network overhead
- Node.js + npm: take advantage of the entire ecosystem
- Static rendering of SVGs

### Usage:

```javascript
var D3Node = require('d3-node');

var d3n = new D3Node(); // initializes D3 with container element

d3n.d3Element.append('span'); // insert span tag

d3n.html() // returns: <html><head></head><body><span></span></body></html>
```

Setting container & insertion point via selector

```
var options = {selector: '#chart'}
options.container = '<div id="container"><div id="chart"></div></div>';

var d3n = new D3Node(options); // initializes D3 with container element

d3n.d3Element.append('span'); // insert span tag into #chart

d3n.html() // returns: <html><head></head><body><div id="container"><div id="chart"><span></span></div></div></body></html>

```

### Run Tests:

```
$ npm test
```

### [See examples](examples)


### TODOs:

- Add more examples: (remote data, world map)
- create Gulp task
- Add option to inject css/js into html output
- Output as PNG
