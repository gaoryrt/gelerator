import { g } from './App'

const append = elArr => elArr.forEach(el => document.body.appendChild(el))

const el1 = g('btn')('click me')
const el2 = g({ style: 'color: red' })('ctt')
const el3 = g({ style: { color: 'red' } })('ctt')
const el4 = g({ id: 'main' }, 'botton')('content')
const el5 = g({
  style: {
    height: '1em',
    width: '1em',
    display: 'block'
  }
}, 'img')('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==')
const el6 = g({
  _click: console.log,
  $method: 'log'
})('console.log')

append([el1, el2, el3, el4, el5, el6])
