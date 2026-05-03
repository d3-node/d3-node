import fs from 'fs'
import { createRequire } from 'module'

const require = createRequire(import.meta.url)
const svg2png = require('svg2png')

export default function (outputName, d3n) {
  if (d3n.options.canvas) {
    const canvas = d3n.options.canvas
    console.log('canvas output...', canvas)
    canvas.pngStream().pipe(fs.createWriteStream('examples/dist/' + outputName + '.png'))
    return
  }

  fs.writeFile('examples/dist/' + outputName + '.html', d3n.html(), function () {
    console.log('>> Done. Open "examples/dist/' + outputName + '.html" in a web browser')
  })

  const svgBuffer = Buffer.from(d3n.svgString(), 'utf-8')
  svg2png(svgBuffer)
    .then(buffer => fs.writeFile('examples/dist/' + outputName + '.png', buffer))
    .catch(e => console.error('ERR:', e))
    .then(() => console.log('>> Exported: "examples/dist/' + outputName + '.png"'))
}
