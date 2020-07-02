# gelerator
> 超方便的 Elements 生成器

![](https://img.badgesize.io/gaoryrt/gelerator/master/dist/gelerator.min.js)
![](https://img.badgesize.io/gaoryrt/gelerator/master/dist/gelerator.min.js?compression=gzip)

[English](./README.md) | 简体中文

JS 代码 | 生成元素
---: | :---
`g('btn')('click me')` | `<div class="btn">click me</div>`
`g({ style: 'color: #888' })('ctt')` | `<div style="color: #888">ctt</div>`
`g({ id: 'main' }, 'botton')('content')` | `<botton id="main">content</botton>`
`g('demo-jpg', 'img')('./demo.jpg')` | `<img class="demo-jpg" src="./demo.jpg">`

[在 codepen 上亲手试试](https://codepen.io/gaoryrt/pen/ELrdVE)

<details>
<summary>特定标签生成器</summary>

```javascript
const P = g({ ...some attrs }, 'p')  // 特定 p 标签生成器，一次性生成复杂标签模版

const p1 = P('content1')
const p2 = P('content2')     // p1 和 p2 拥有同样的 attributes
```

</details>

<details>
<summary>指定 style 标签</summary>

```javascript
// 可以在 style 里写字符串
const el = g({
    style: 'top: 1px; left: 1px'
})('content')

// 也可以直接写对象
const el = g({
    style: {
        top: '1px',
        left: '1px'
    }
})('content')
```

</details>

<details>
  <summary>结合 css-in-js</summary>

```javascript
import { css } from 'emotion'  // 可以结合 css-in-js 的 css-modules, auto-prefixer
import { g } from 'gelerator'

const isIOS = /iPad|iPhone|iPod/.test(window.navigator.userAgent)
const paraClass = css`
  font-size: ${isIOS ? 18 : 14}px;
`

const el = g(paraClass)('content')  // div 一把梭
```

</details>

<details>
    <summary>通过数组生成列表</summary>

```javascript
const arr = ['a', 'b', 'c', 'd']

// 使用 es6 很方便
const ctnr = g('ctnr', 'ol')(
    ...arr.map((item, idx) => g({}, 'li')(item))
)

// 当然 es5 也可以
const ctnr = g('ctnr', 'ol').apply(
    this,
    arr.map(function(item, idx) {
      return g({}, 'li')(item)
    })
)
```
</details>

<details>
    <summary>生成带 dataset 的元素</summary>

```javascript
const arr = ['a', 'b', 'c', 'd']

// $ 开头的 key 会变成 data-set
const ctnr = g('ctnr', 'ol')(
    ...arr.map((item, idx) => g({
      $index: idx,                  // $index 生成 data-index
      $item: item                   // $item 生成 data-item
    }, 'li')())
)
```

</details>

<details>
    <summary>监听事件</summary>

```javascript
// _ 开头的 key 会作为事件监听
const btn = g({
  _click: () => alert('hello world')
}, 'button')('click me')
```

</details>

## 语法

```javascript
g(attr[, tag])(arg1[, arg2[, ...]])
```
### 参数详解

**`attr`**
`字符串` 或 `对象`

如果输入字符串，那这个字符串即为生成元素的 `className`；

如果输入一个对象，对象里的值即为元素的属性。对于对象中 `$` 开头的 key，会生成 `data-` 的属性，这样你可以通过 `el.dataset` 的方式获取到他的值。对于对象中 `_` 开头的 key，会被当作事件监听。对于对象中的 `style`，可以为其赋对象值，字符串也可以。

**`tag`**（可选参数）
`字符串`

你也可以在第二个参数指定元素的标签，不填的话，默认会生成 `DIV` 标签。

**`arg1, arg2, ...`**（可选参数）
`字符串` 或 `Node`

如果输入字符串，那字符串即为元素的 `innerText`；对于图片标签，输入字符串是图片的 `src` 属性；
如果输入元素，那这些元素会成为生成元素的子元素。


## 使用

### 1. 安装
[![NPM](https://nodei.co/npm/gelerator.png?compact=true)](https://nodei.co/npm/gelerator/)
或者 `yarn add gelerator`

### 2. import
```javascript
import { g } from 'gelerator'
```

### 3. 生成
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

输出:

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

## 开发
1. 安装开发依赖: `yarn`
2. 开始开发: `yarn dev`
3. 打包: `yarn build`

## 贡献代码
1. Fork 这个项目
2. 为新功能新建分支: `git checkout -b MY-NEW-FEATURE`
3. Commit: `git commit -am 'ADD SOME FEATURE'`
4. Push: `git push origin MY-NEW-FEATURE`

# 捐助
[![](https://cdn.buymeacoffee.com/buttons/default-white.png)](https://www.buymeacoffee.com/pT2Y5iN)
![](https://jungle.fm/assets/donate.jpg)
