var fs = require('fs')
var mkdirp = require('mkdirp')

var date = new Date()
var day = date.getDate()
var month = date.getMonth() + 1
var year = date.getFullYear()
var title = process.argv[2]
var dir =
  __dirname +
  '/src/pages/posts/' +
  year +
  '/' +
  month +
  '/' +
  day +
  '/' +
  title +
  '/'
var file = dir + title + '.md'

console.log(day, month, year)
console.log(title)
console.log(dir)

mkdirp(dir, function(err) {
  if (err) console.error(err)
  else console.log('pow! CREATED')
})
