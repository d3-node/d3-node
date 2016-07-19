# D3-Node
Server-side D3 with ease

[![Build Status](https://travis-ci.org/bradoyler/d3-node.svg?branch=master)](https://travis-ci.org/bradoyler/d3-node)

[![NPM](https://nodei.co/npm/d3-node.png?downloads=true&downloadRank=true)](https://nodei.co/npm/d3-node/) [![js-standard-style](https://cdn.rawgit.com/feross/standard/master/badge.svg)](https://github.com/feross/standard)

### Why?

- Performance: pre-rendering allows offloading data processing, and network overhead
- Node.js + npm: take advantage of the entire ecosystem
- Static rendering of [Data-Driven Documents](https://d3js.org/)
- [Embedded SVG stylesheets](https://developer.mozilla.org/en-US/docs/Web/SVG/Element/style)

### Usage:

```javascript
 var D3Node = require('d3-node')
 var d3n = new D3Node()       // initializes D3 on <body>
 d3n.d3Element.append('span') // inserts span tag
 d3n.html() // returns: <html><head></head><body><span></span></body></html>
```

__Setting container & insertion point via selector__

```javascript
 var options = {selector: '#chart'}, container: '<div id="container"><div id="chart"></div></div>'}
 var d3n = new D3Node(options) // initializes D3 with container element
 d3n.d3Element.append('span')  // insert span tag into #chart
 d3n.html()   // output: <html><body><div id="container"><div id="chart"><span></span></div></div></body></html>               
```

__SVG creation__

```javascript
 var d3n = new D3Node()      // initializes D3 with container element
 d3n.createSVG().append('g') // create SVG w/ 'g' tag
 d3n.svgString() // output: <svg xmlns="http://www.w3.org/2000/svg"><g></g></svg>
```

__Inline SVG styles__

```javascript
 var d3n = new D3Node({styles:'.test {fill:#000;}'})
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

### [See examples for more...](examples)

### Run Tests:

```
$ npm test
```

### TODOs:

- Add more examples: (remote data, world map)
- Create Gulp task
- Add option to inject css/js into html output
