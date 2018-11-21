const { g } = require('./src/App')

it('render simple div with className', () => {
  const el = g('btn')('click me')
  const el2 = g({ class: 'btn' }, 'div')('click me')
  expect(el).toEqual(el2)
  expect(el).toMatchSnapshot()
  expect(el2).toMatchSnapshot()
})

it('render string-like and object-like style', () => {
  const el = g({ style: 'color:red;margin:0' })('')
  const el2 = g({ style: { color: 'red', margin: 0 } })()
  expect(el).toEqual(el2)
  expect(el).toMatchSnapshot()
  expect(el2).toMatchSnapshot()
})

it('render id with tag', () => {
  const el = g({ id: 'main' }, 'botton')('content')
  expect(el).toMatchSnapshot()
})

it('render an image', () => {
  const el = g({}, 'img')('./demo.jpg')
  const el2 = g({
    src: './demo.jpg'
  }, 'img')()
  expect(el).toEqual(el2)
  expect(el).toMatchSnapshot()
  expect(el2).toMatchSnapshot()
})

it('render dataset attributes', () => {
  const el = g({
    $a: 1,
    $b: 2,
    $c: 3
  })('this el got 3 dataset')
  const el2 = g({
    'data-a': 1,
    'data-b': 2,
    'data-c': 3
  })('this el got 3 dataset')
  expect(el).toEqual(el2)
  expect(el).toMatchSnapshot()
  expect(el2).toMatchSnapshot()
})