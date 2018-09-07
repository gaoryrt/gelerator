# gelerator
> Generate Elements in a simple way.

[![NPM](https://nodei.co/npm/gelerator.png?compact=true)](https://nodei.co/npm/gelerator/)

*For mvvm version, see `mvvm` branch.*

Javascript | Elements
---: | :---
`g('btn')('click me')` | `<div class="btn">click me</div>`
`g({ style: 'color: #888' })('ctt')` | `<div style="color: #888">ctt</div>`
`g({ id: 'main' }, 'botton')('content')` | `<botton id="main">content</botton>`
`g('demo-jpg', 'img')('./demo.jpg')` | `<img class="demo-jpg" src="./demo.jpg">`

```javascript
// generate nested elements
const paraCtnr = g('para-container', 'main')(
  g('para-title', 'h1')('TITLE'),
  g('para-ctt', 'p')('Lorem ipsum dolor sit amet quae.'),
  g({}, 'hr')(),
  g('para-after')()
)
```

```javascript
// for CSS-in-JS usage
import { css } from 'emotion'
import g from 'gelerator'

const isIOS = /iPad|iPhone|iPod/.test(window.navigator.userAgent)
const paraClass = css`
  font-size: ${isIOS ? 18 : 14}px;
`
const P = g(paraClass, 'p') // <- paragraph tag generator

const pEl1 = P('Lorem ipsum dolor sit amet')
const pEl2 = P('Consectetur adipisicing elit. Facilis, aliquid!')
```

[Try gelerator online at codepen](https://codepen.io/gaoryrt/pen/ELrdVE)

## Syntax

```javascript
g(attr[, tag])(arg1[, arg2[, ...]])
```
### Parameters

**`attr`**  
**Type:** `String` | `Object`  
If `String` were given, it'll be tag's `className`. Otherwise, generate `Object` as the tag's attributes.

**`tag`**  
**Type:** `String`  
Tag's `tagName`, default as `DIV`

**`arg1, arg2, ...`**  
**Type:** `String` | `Node`  
if `String` were given, it'll be tag's `innerText`.  
Otherwise, append `Node` to the tag. For `IMG` tag only, given `String` will be this `IMG` tag's `src` attribute.


## Usage

### 1. install
```bash
$ npm install --save gelerator
```

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

## contributing
1. Fork this repo
2. Create your feature branch: `git checkout -b MY-NEW-FEATURE`
3. Commit your changes: `git commit -am 'ADD SOME FEATURE'`
4. Push to the branch: `git push origin MY-NEW-FEATURE`
5. Submit a pull request :D
