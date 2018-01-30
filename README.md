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
```javascript
r('btn')('click me')
//=> <div class="btn">click me</div>

r('btn', 'botton')('content')
//=> <botton class="btn">content</botton>

r({
  id: 'main',
  style: 'color: #888'
})('ctt')
//=> <div id="main" style="color: #888">ctt</div>

r('demo-jpg', 'img')('./demo.jpg')
//=> <img class="demo-jpg" src="./demo.jpg">

r('para-container', 'main')(
  r('para-title', 'h1')('TITLE'),
  r('para-ctt', 'p')('Lorem ipsum dolor sit amet quae.'),
  r({}, 'hr')(),
  r('para-after')()
)
//=> <main class="para-container">
//     <h1 class="para-title">TITLE</h1>
//     <p class="para-ctt">Lorem ipsum dolor sit amet quae.</p>
//     <hr>
//     <div class="para-after"></div>
//   </main>
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
