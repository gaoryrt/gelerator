import { g, gele } from './gelerator'

const data = {
  num: 4,
  one: 1,
  two: 2
}

const actions = {
  add: value => data => {
    data.num += value
  },
  sub: value => data => {
    data.num -= value
  }
}

const element = g('box')(
  g({ _html: 'num' }, 'h1')(),
  g({
    class: 'add',
    $click: actions.add(data.one),
  }, 'button')(`+${data.one}`),
  g({
    class: 'sub',
    $click: actions.sub(data.two)
  }, 'button')(`-${data.two}`)
)

const app = new gele({
  hook: '#app',
  data,
  element,
  actions
})

