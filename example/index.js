const r = require('../htmlTextGenerator')
const $ = elemStr => document.querySelector(elemStr)

$('button').onclick = () => {
  $('.origin').innerHTML =
    r({id: 'title'}, 'h1')('h1 content') +
    r('bold', 'h2')('h2 with class: blod') +
    r({style: 'background: #333; color: #eee'})(
      r(0, 'p')('Lorem ipsum dolor sit amet, consectetur adipisicing elit. Suscipit, beatae!') +
      r({}, 'p')('Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facilis, aliquid!')
    )
}
