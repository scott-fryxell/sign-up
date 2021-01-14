import { Jimp, as_paths } from '@realness.online/potrace'
const potrace_options = {
  threshold: 255,
  turdSize: 125,
  optTolerance: 0.55,
  blackOnWhite: true,
  fillStrategy: 'median',
  rangeDistribution: 'auto'
}
const brighness_options = {
  max: 200,
  replace: 255,
  autoGreyscale: false
}
export async function read (file) {
  const reader = new FileReaderSync()
  return await Jimp.read(reader.readAsArrayBuffer(file))
}
export async function size (image, size = 512) {
  if (image.bitmap.width > image.bitmap.height) image = image.resize(Jimp.AUTO, size)
  else image = image.resize(size, Jimp.AUTO)
  return image
}
export async function prepare (image) {
  return image.dither565().posterize(10).normalize().threshold(brighness_options)
}
export async function make (image) {
  let poster = await as_paths(image, potrace_options)
  console.log(`${to_kb(poster)}kb`)
  if (to_kb(poster) > 700) {
    image = await size(image, 416)
    poster = await as_paths(image, potrace_options)
  }
  console.log(`${to_kb(poster)}kb`)
  return {
    path: poster.paths,
    viewbox: `0 0 ${poster.width} ${poster.height}`
  }
}
export async function listen (message) {
  let image = await read(message.data.image)
  image = await prepare(image)
  image = await size(image)
  const vector = await make(image)
  self.postMessage(vector)
}
self.addEventListener('message', listen)

function to_kb (vector) {
  console.log(vector)
  let size_of = 0
  vector.paths.forEach(path => {
    size_of += path.length
  })
  return (size_of / 1024).toFixed(2)
}
