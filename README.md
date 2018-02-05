# gelerator
> Generate Element in a simple way.

## install
```javascript
$ npm install --save gelerator
```

## Usage
### 1. import gelerator
```javascript
const r = require('gelerator')
```

### 2. use it!

div with class & content

`r([className:String])([content:String])`

```javascript
r('btn')('click me')
```

```html
<div class="btn">click me</div>
```

tag with class

`r([className:String], [tagName:String])([content:String])`

```javascript
r('btn', 'botton')('content')
```

```html
<botton class="btn">content</botton>
```

attributes

`r([attr:Object])([content:String])`

```javascript
r({
  id: 'main',
  style: 'color: #888'
})('ctt')
```

```html
<div id="main" style="color: #888">ctt</div>
```

for `<img>`, put `src` in the content

`r([className:String], [tagName:String])([src:String])`

```javascript
r('demo-jpg', 'img')('./demo.jpg')
```

```html
<img class="demo-jpg" src="./demo.jpg">
```

nested content

`r([className:String], [tagName:String])([childNodes:Array])`

```javascript
r('para-container', 'main')(
  r('para-title', 'h1')('TITLE'),
  r('para-ctt', 'p')('Lorem ipsum dolor sit amet quae.'),
  r({}, 'hr')(),
  r('para-after')()
)
```

```html
<main class="para-container">
  <h1 class="para-title">TITLE</h1>
  <p class="para-ctt">Lorem ipsum dolor sit amet quae.</p>
  <hr>
  <div class="para-after"></div>
</main>
```


made for css-in-js
```javascript
// import { css } from 'emotion'

const myStyle = css`
  color: rebeccapurple;
`

const ref = r(myStyle, 'ref')('Purple text goes here.')
```

## License
MIT

## todo
- [x] to Element
- [ ] autoprefixer support

## contributing
1. Fork this repo
2. Create your feature branch: `git checkout -b MY-NEW-FEATURE`
3. Commit your changes: `git commit -am 'ADD SOME FEATURE'`
4. Push to the branch: `git push origin MY-NEW-FEATURE`
5. Submit a pull request :D
