import { g, gele } from './gelerator'

const data = {
  num: 42,
  value: 'raw',
}

const actions = {
  add: value => data => {
    data.num += value
  },
  sub: value => data => {
    data.num -= value
  },
  input: value => (data, e) => {
    data.value = e.target.value
  },
  reverse: value => data => {
    data.value = data.value.split('').reverse().join('')
  }
}

const element = g('box')(
  g({ _innerText: 'num' }, 'h1')(data.num),
  g({
    $click: actions.add(1)
  }, 'button')('+1'),
  g({
    $click: actions.sub(1)
  }, 'button')('-1'),
  g({ _innerText: 'value' }, 'h1')(data.value),
  g({
    $input: actions.input(),
    _value: 'value',
    value: data.value
  }, 'input')(),
  g({ $click: actions.reverse() }, 'button')('逆转')
)

const app = new gele({
  hook: '#app',
  data,
  element,
  actions
})
