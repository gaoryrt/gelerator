const g = require('../gelerator')

const $ = elemStr => document.querySelector(elemStr)

$('button').onclick = () => {
  const H1 = g('bold', 'h1')('h1 with class: blod')
  const H2 = g({ style: 'background: #ccc; color: #444' }, 'h2')('h2 with style')
  const P = g({}, 'p')

  const content = g({ id: 'content' })(
      H1,
      H2,
      P('Lorem ipsum dolor sit amet'),
      P('Consectetur adipisicing elit. Facilis, aliquid!')
  )

  $('.target').appendChild(content)
}
