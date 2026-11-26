import fs from 'fs'
import { Resvg } from '@resvg/resvg-js'

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

  const resvg = new Resvg(d3n.svgString())
  const pngBuffer = resvg.render().asPng()
  fs.promises.writeFile('examples/dist/' + outputName + '.png', pngBuffer)
    .then(() => console.log('>> Exported: "examples/dist/' + outputName + '.png"'))
    .catch(e => console.error('ERR:', e))
}
