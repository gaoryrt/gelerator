const r = require('../htmlTextGenerator')

const $ = elemStr => document.querySelector(elemStr)

$('button').onclick = () => {
  const boldH2 = r('bold', 'h2')('h2 with class: blod')
  const hashTitle = r({ id: 'title' }, 'h1')('h1 content')
  const content = r({
    style: 'background: #333; color: #eee'
  })(
    r({}, 'p')('Lorem ipsum dolor sit amet, consectetur adipisicing elit. Suscipit, beatae!'),
    r({}, 'p')('Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facilis, aliquid!')
  )
  $('.origin').appendChild(boldH2)
  $('.origin').appendChild(hashTitle)
  $('.origin').appendChild(content)
}
