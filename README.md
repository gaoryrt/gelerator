# html-text-generator
> Made for `innerHTML`, generate HTML text in a simple way.

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
r('btn', 'botton')('content')
//=> '<botton class="btn">content</botton>'

r('btn')('click me')
//=> '<div class="btn">click me</div>'

r({id: 'main'})('ctt')
//=> '<div id="main">ctt</div>'

r({src: ''}, 'img')()
//=> '<img src="">'

r(0, 'br')()
//=> '<br>'
```

## License
MIT

## todo
- [ ] to Element
- [ ] @refs support
- [ ] autoprefixer support

## contributing
1. Fork it!
2. Create your feature branch: `git checkout -b MY-NEW-FEATURE`
3. Commit your changes: `git commit -am 'ADD SOME FEATURE'`
4. Push to the branch: `git push origin MY-NEW-FEATURE`
5. Submit a pull request :D
