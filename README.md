# HTMLgenerator
> Generate HTML text in a simple way.

## install
`$ npm install --save html-text-generator`

## Usage
```
const r = require('html-text-generator')

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
