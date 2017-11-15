# HTMLgenerator
> Generate HTML text in a simple way.

## install
`$ npm install --save HTMLgenerator`

## Usage
```
const r = require('HTMLgenerator')
r('btn', 'botton')('content') // '<botton class="btn">content</botton>'
r('btn')('click me')          // '<div class="btn">click me</div>'
r({id: 'main'})('ctt')        // '<div id="main">ctt</div>'
r({src: ''}, 'img')()         // '<img src="">'
r(0, 'br')()                  // '<br>'
```

