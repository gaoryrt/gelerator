import { g, w as watch, r } from './App'

const data = {
  num: 42,
  value: 'raw'
}

const element = g('box')(
  r(1, g('num', 'h1'))(data.num),
  g({
    _click: () => { data.num += 1 }
  }, 'button')('+1'),
  g({
    _click: () => { data.num -= 1 }
  }, 'button')('-1'),
  r(2, g('value', 'h1'))(data.value),
  r(3, g({
    _input: e => { data.value = e.target.value },
    value: data.value
  }, 'input'))(),
  g({ _click: () => { data.value = data.value.split('').reverse().join('') } }, 'button')('逆转')
)

watch(data, {
  num({ render }) {
    render(1)(data.num)
  },
  value({ reffer, render }) {
    render(2)(data.value)
    reffer[3].value = data.value
  }
})

document.body.appendChild(element)
