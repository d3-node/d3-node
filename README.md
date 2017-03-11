# D3-Node
Server-side D3 with ease

<img height="220px" src="https://cloud.githubusercontent.com/assets/425966/16896763/33e19052-4b6b-11e6-9f99-3b6ae66d6328.png"/>
<img height="220px" src="https://cloud.githubusercontent.com/assets/425966/16858768/5af46f86-49f7-11e6-85d0-bcca91045d8f.png"/>

[see examples >](examples)

[![js-standard-style](https://cdn.rawgit.com/feross/standard/master/badge.svg)](https://github.com/feross/standard)
[![Build Status](https://travis-ci.org/bradoyler/d3-node.svg?branch=master)](https://travis-ci.org/bradoyler/d3-node)

### Why?

- Performance: pre-rendering allows offloading data processing, and network overhead
- Take advantage of the entire ecosystem: [npmjs.com](https://www.npmjs.com/)
- Static rendering of [Data-Driven Documents (D3.js)](https://d3js.org/)
- Portable SVG with [embedded stylesheets](https://developer.mozilla.org/en-US/docs/Web/SVG/Element/style)
- Easily adapt examples from [bl.ocks.org](http://bl.ocks.org/)

### Basic usage:

[![NPM](https://nodei.co/npm/d3-node.png?downloads=true&downloadRank=true)](https://nodei.co/npm/d3-node/)

```javascript
 var D3Node = require('d3-node')
 var d3 = D3Node.d3
 var d3n = new D3Node()    // create instance
 d3.select(d3n.document.body).append('span') // select <body> & insert span
 d3n.html() // returns: <html><head></head><body><span></span></body></html>
```

__SVG creation__

```javascript
 var d3n = new D3Node()      // initializes D3 with container element
 d3n.createSVG().append('g') // create SVG w/ 'g' tag
 d3n.svgString() // output: <svg xmlns="http://www.w3.org/2000/svg"><g></g></svg>
```

### Advanced usage

__Setting container & insertion point via selector__

```javascript
 var options = { selector: '#chart', container: '<div id="container"><div id="chart"></div></div>' }
 var d3n = new D3Node(options) // initializes D3 with container element
 var d3 = d3n.d3
 d3.select(d3n.document.querySelector('#chart')).append('span') // insert span tag into #chart
 d3n.html()   // output: <html><body><div id="container"><div id="chart"><span></span></div></div></body></html>               
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
- Canvas support
