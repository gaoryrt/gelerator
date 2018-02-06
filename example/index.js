const g = require('../gelerator')

const $ = elemStr => document.querySelector(elemStr)

const state = {
  count: 0
}

const action = {
  down: val => state => ({ count: state.count - val }),
  up: val => state => ({ count: state.count + val })
}

const content = g({}, 'main')(
  g({}, 'h1')(state.count),
  g('down', 'button')('-'),
  g('up', 'button')('+')
)

$('button').onclick = () => {
  $('.target').appendChild(content)
}
