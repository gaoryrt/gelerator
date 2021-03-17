const isEle = el => el instanceof HTMLElement && el.nodeType === 1
const isObj = ob => ob !== null && typeof ob === 'object'
const isFn = fn => typeof fn === 'function'
const camle2kebab = str => str.replace(/([A-Z])/g, '-$1').toLowerCase()

const elMap = {}
let state

const initState = (p) => (state = p)
const t = (selector, attr = {}) => {
  if (elMap[selector]) throw new Error(selector + 'not a unique selector')
  elMap[selector] = {
    attr
  }
  return (...child) => {
    elMap[selector].child = child
    const attrObj = isFn(attr) ? attr(state) : attr
    let childArr = []
    child.forEach((any) => {
      childArr = childArr.concat(isFn(any) ? any(state) : any)
    })
    const el = g(selector, attrObj)(...childArr)
    elMap[selector].el = el
    el.selector = selector
    return el
  }
}

const r = (selector) => {
  if (!elMap[selector]) throw new Error(selector + 'selector not available')
  const { attr, child, el } = elMap[selector]
  const attrObj = isFn(attr) ? attr(state) : attr
  let childArr = []
  child.forEach((any) => {
    if (any.selector) r(any.selector)
    childArr = childArr.concat(isFn(any) ? any(state) : any)
  })
  const newOne = g(selector, attrObj)(...childArr)
  elMap[selector].el = newOne
  el.parentNode.replaceChild(newOne, el)
}

const g = (selector = '', opt = {}) => (...cttArr) => {
  const attr = isFn(opt) ? { _click: opt } : opt
  const matchTag = selector.match(/^\w[\w\d-_]*/)
  const tag = matchTag ? matchTag[0] : 'div'
  const el = document.createElement(tag)
  const matchId = selector.match(/#\w[\w\d-_]*/)
  const matchClass = selector.match(/\.\w[\w\d-_]*/g)
  if (matchId) attr.id = matchId[0].slice(1)
  if (matchClass) attr.class = matchClass.map(i => i.slice(1)).join(' ')
  Object.keys(attr).forEach(key => {
    const val = attr[key]
    if (!val) return
    if (/^_/.test(key)) el.addEventListener(key.slice(1), val)
    else if (key === 'style' && isObj(val)) {
      el.setAttribute('style', Object.keys(val).map(i => `${camle2kebab(i)}:${val[i]}`).join(';'))
    } else el.setAttribute(key, val)
  })
  cttArr.forEach(val => {
    if (isEle(val)) {
      el.appendChild(val)
    } else if (val !== undefined && val !== null && val !== false && !isFn(val)) {
      const TAG = tag.toLowerCase()
      if (TAG === 'img') el.setAttribute('src', val)
      else if (TAG === 'script') el.setAttribute('src', val)
      else if (TAG === 'input') el.value = val
      else el.insertAdjacentHTML('beforeend', val)
    }
  })
  return el
}

export { g, r, t, initState }
