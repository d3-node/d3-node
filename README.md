# D3-Node
Server-side D3 with ease

#### Notice: work in-progress, feedback welcome.

[![NPM](https://nodei.co/npm/d3-node.png?downloads=true&downloadRank=true)](https://nodei.co/npm/d3-node/)

### Example usage:

```javascript
var D3Node = require('d3-node');
var d3n = new D3Node('#chart','<div id="container"><div id="chart">TEST</div></div>');
d3n.d3Element.style("background-color", "black");
d3n.html() // output: <div id="container"><div id="chart" style="background-color: black;">TEST</div></div>

```

### Run Tests:

```
$ npm test
```
