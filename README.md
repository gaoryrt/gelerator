# html-text-generator
> Generate Element in a simple way.

## install
```javascript
$ npm install --save html-text-generator
```

## Usage
1. import html-text-generator
```javascript
const r = require('html-text-generator')
```

2. use it!
`r([className:String])([content:String])`
```javascript
r('btn')('click me')
```

```html
<div class="btn">click me</div>
```

***
`r([className:String], [tagName:String])([content:String])`
```javascript
r('btn', 'botton')('content')
```

```html
<botton class="btn">content</botton>
```

***
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

***
`r([className:String], [tagName:String])([src:String])`
```javascript
r('demo-jpg', 'img')('./demo.jpg')
```

```html
<img class="demo-jpg" src="./demo.jpg">
```

***
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
