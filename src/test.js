import g from './gelerator'

const bd = document.querySelector('body')

let userMessages = [
  'hi',
  'what are you up to?',
  '<script>alert("something evil")</script>'
]

var tar = g('chat-list')(
  g({}, 'ul')(
    ...userMessages.map(msg => g({}, 'li')(msg)),
    g('chat-end', 'li')('end of line')
  )
)

console.log(tar)
bd.appendChild(tar)
