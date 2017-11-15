/**
 *       some tags dont need to pair
 *       see https://stackoverflow.com/questions/1946426/html-5-is-it-br-br-or-br
 */
const voidElmReg = new RegExp('img|br|hr|input|link|meta')

// avoid unexpected last quote
const encodeAttr = (attrStr = '') =>
  attrStr.replace(/"/g, '&quot;')

/**
 *       parse attr Obj to string
 *       @example {id: ''}                     // 'id="mainBTN"'
 *                {type: 'text', id: 'input'}  // 'type="text" id="input'
 *                'btn'                        // 'class=btn'
 *       @param   {Object}                 attrObj
 *       @return  {String}
 */
const parseAttrStr = (attrObj = {}) =>
  typeof attrObj === 'string' ?
  `class="${encodeAttr(attrObj)}"` :
  Object.keys(attrObj)
  .map(attr => `${encodeAttr(attr)}="${encodeAttr(attrObj[attr])}"`)
  .join(' ')

/**
 *       creat Element as String
 *       @example r('btn', 'botton')('content') // '<botton class="btn">content</botton>'
 *                r('btn')('click me')          // '<div class="btn">click me</div>'
 *                r({id: 'main'})('ctt')        // '<div id="main">ctt</div>'
 *                r({src: ''}, 'img')()         // '<img src="">'
 *                r(0, 'br')()                  // '<br>'
 *       @param   {Object}                 attrObj
 *       @param   {String}                 tagStr
 *       @return  {String}
 */
module.exports = (attrObj, tagStr = 'div') => (contentStr = '') =>
  `<${tagStr}${attrObj ? ' ' : ''}${parseAttrStr(attrObj)}>${contentStr}${voidElmReg.test(tagStr) ? '':'</' + tagStr + '>' }`
