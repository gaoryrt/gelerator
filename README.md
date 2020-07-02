# gelerator
> Generate Elements in a simple way.

![](https://img.badgesize.io/gaoryrt/gelerator/master/dist/gelerator.min.js)
![](https://img.badgesize.io/gaoryrt/gelerator/master/dist/gelerator.min.js?compression=gzip)
[![Netlify Status](https://api.netlify.com/api/v1/badges/2dbd8b58-fba6-4089-8fc9-4ef236005411/deploy-status)](https://app.netlify.com/sites/gelerator/deploys)

English | [简体中文](./README.zh-cn.md)

Javascript | Elements
---: | :---
`g('btn')('click me')` | `<div class="btn">click me</div>`
`g({ style: 'color: #888' })('ctt')` | `<div style="color: #888">ctt</div>`
`g({ id: 'main' }, 'botton')('content')` | `<botton id="main">content</botton>`
`g('demo-jpg', 'img')('./demo.jpg')` | `<img class="demo-jpg" src="./demo.jpg">`

[Try gelerator online at codepen](https://codepen.io/gaoryrt/pen/ELrdVE)

<details>
<summary>element template</summary>

```javascript
const P = g({ ...some attrs }, 'p')  // p tag template

const p1 = P('content1')
const p2 = P('content2')     // p1 and p2 got the same attributes
```

</details>

<details>
<summary>specified style attribute</summary>

```javascript
// string is allowed in style attr
const el = g({
    style: 'top: 1px; left: 1px'
})('content')

// object is also allowed
const el = g({
    style: {
        top: '1px',
        left: '1px'
    }
})('content')
```

</details>

<details>
  <summary>work with css-in-js</summary>

```javascript
import { css } from 'emotion'  // css-modules, auto-prefixer
import { g } from 'gelerator'

const isIOS = /iPad|iPhone|iPod/.test(window.navigator.userAgent)
const paraClass = css`
  font-size: ${isIOS ? 18 : 14}px;
`

const el = g(paraClass)('content')  // div writes everything
```

</details>

<details>
    <summary>generate list by array</summary>

```javascript
const arr = ['a', 'b', 'c', 'd']

// es6
const ctnr = g('ctnr', 'ol')(
    ...arr.map((item, idx) => g({}, 'li')(item))
)

// es5
const ctnr = g('ctnr', 'ol').apply(
    this,
    arr.map(function(item, idx) {
      return g({}, 'li')(item)
    })
)
```
</details>

<details>
    <summary>element with data-x attributes</summary>

```javascript
const arr = ['a', 'b', 'c', 'd']

// attribute start with $ will change into data-
const ctnr = g('ctnr', 'ol')(
    ...arr.map((item, idx) => g({
      $index: idx,                  // $index -> data-index
      $item: item                   // $item -> data-item
    }, 'li')())
)
```

</details>

<details>
    <summary>addEventListener</summary>

```javascript
// attribute start with _ will be treat as an event
const btn = g({
  _click: () => alert('hello world')
}, 'button')('click me')
```

</details>

## Syntax

```javascript
g(attr[, tag])(arg1[, arg2[, ...]])
```
### Parameters

**`attr`**
**Type:** `String` | `Object`

If `String` were given, it'll be tag's `className`. Otherwise, generate `Object` as the tag's attributes.
Especially, object key start with `$` would turn into `data-` attribute; Object key start with `_` would be treat as an event.
For `style` key, both string and object are available.

**`tag`**
**Type:** `String`

Tag's `tagName`, default as `DIV`

**`arg1, arg2, ...`**
**Type:** `String` | `Node`

if `String` were given, it'll be tag's `innerText`.
Otherwise, append `Node` to the tag. For `IMG` tag only, given `String` will be this `IMG` tag's `src` attribute.


## Usage

### 1. install
[![NPM](https://nodei.co/npm/gelerator.png?compact=true)](https://nodei.co/npm/gelerator/)
or `yarn add gelerator`

### 2. import gelerator
```javascript
import { g } from 'gelerator'
```

### 3. generate elements
```javascript
let userMessages = [
  'hi',
  'what are you up to?',
  '<script>alert("something evil")</script>'
]

g('chat-list')(
  g({}, 'ul')(
    ...userMessages.map(msg => g({}, 'li')(msg)),
    g('chat-end', 'li')('end of line')
  )
)
```

Output:

```HTML
<div class="chat-list">
  <ul>
    <li>hi</li>
    <li>what are you up to?</li>
    <li>&lt;script&gt;alert("something evil")&lt;/script&gt;</li>
    <li class="chat-end">end of line</li>
  </ul>
</div>
```

## License
MIT

## Dev
1. install all the dev dependencies: `yarn`
2. dev: `yarn dev`
3. package: `yarn build`

## Contributing
1. Fork this repo
2. Create your feature branch: `git checkout -b MY-NEW-FEATURE`
3. Commit your changes: `git commit -am 'ADD SOME FEATURE'`
4. Push to the branch: `git push origin MY-NEW-FEATURE`
5. Submit a pull request :D

## Donate
[![](https://cdn.buymeacoffee.com/buttons/default-white.png)](https://www.buymeacoffee.com/pT2Y5iN)
![](https://jungle.fm/assets/donate.jpg)
