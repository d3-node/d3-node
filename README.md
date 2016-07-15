# D3-Node
Server-side D3 with ease

[![Build Status](https://travis-ci.org/bradoyler/d3-node.svg?branch=master)](https://travis-ci.org/bradoyler/d3-node)

#### Notice: work in-progress, feedback welcome.

[![NPM](https://nodei.co/npm/d3-node.png?downloads=true&downloadRank=true)](https://nodei.co/npm/d3-node/)

### Example usage:

```javascript
var D3Node = require('d3-node');

//-- with defaults
var d3n = new D3Node(); // initializes D3 with container element

d3n.d3Element.append('span'); // insert span tag

d3n.html() // returns: <html><head></head><body><span></span></body></html>


//-- setting container & selection

var options = {selector: '#chart'}
options.container = '<div id="container"><div id="chart"></div></div>';

var d3n = new D3Node(options); // initializes D3 with container element

d3n.d3Element.append('span'); // insert span tag into #chart

d3n.html() // returns: <div id="container"><div id="chart"><span></span></div></div>

```

### Run Tests:

```
$ npm test
```

### [See examples](examples/README.md)


### TODOs:

- Add more examples: (remote data, world map)
- create Gulp task
- simplify init params, remove need for container markup 
- way to inject css file into html output
