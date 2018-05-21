module.exports = (options, req) => ({
  format: 'umd',
  outDir: 'src',
  entry: './src/gelerator.js',
  filename: {
    js: 'gelerator.min.js'
  }
})
