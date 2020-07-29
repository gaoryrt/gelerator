import { g, w as watch, r } from './App'

const state = {
  text: 0,
  mount: `页面加载于 ${new Date().toLocaleString()}`,
  change: true,
  array: ['foo', 'bar', 'buz']
}

const app = g()(
  r(1, g('text'))(g({})(state.text), g({})(state.text * 3)),
  r(2, g({
    _click: () => {
      state.mount = `于 ${new Date().toLocaleString()} 更新`
      state.text += 1
    }
  }))(state.mount),
  state.change && g('change')(state.change ? 'TRUE' : 'FLASE'),
  ...state.array.map((str, index) => g('item_' + index, 'li')(str))
)

watch(state, {
  mount({ ref }) {
    ref[2].innerText = state.mount
  },
  text({ render, newVal }) {
    render(1)(newVal)
  }
})

document.body.appendChild(app)
