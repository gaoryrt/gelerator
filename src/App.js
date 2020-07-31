const iselement = el => el instanceof HTMLElement && el.nodeType === 1
const isobject = ob => ob !== null && typeof ob === 'object'
const isstring = st => typeof st === 'string' || st instanceof String
const isfn = fn => typeof fn === 'function'
const isnum = num => !isNaN(+num)
const isarr = arr => Object.prototype.toString.call(arr) === '[object Array]'

const ref = {}
const watch = {}
let init

function setVal(el, val, gen, tag) {
  // console.log(val)
  if (tag.toLowerCase() === 'img' && isstring(val)) el.setAttribute('src', val)
  else if (tag.toLowerCase() === 'input' && isstring(val)) el.value = val
  else if (isfn(gen)) {
    while (el.firstChild) el.removeChild(el.lastChild)
    const res = gen()
    if (isarr(res))
      res.forEach(item => {
        if (item) el.appendChild(item)
      })
    else setVal(el, res, res, tag)
  }
  else if (val !== undefined && val !== false) el.innerHTML = val
}

let tempSelector
export const g = (selector = '', opt = {}) => {
  tempSelector = selector
  const gen = (...cttArr) => {
    const attr = isfn(opt) ? { _click: opt } : opt
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
      else if (key === 'style' && isobject(val)) {
        el.setAttribute('style', Object.keys(val).map(i => `${i}:${val[i]}`).join(';'))
      } else el.setAttribute(key, val)
    })
    cttArr.forEach(cttItem => {
      if (iselement(cttItem)) el.appendChild(cttItem)
      else setVal(el, cttItem, cttItem, tag)
    })
    if (cttArr.length === 1) {
      if (isnum(cttArr[0]) || isstring(cttArr[0])) ref[selector] = { el, tag }
      else if (isfn(cttArr[0])) ref[selector] = { el, tag, gen: cttArr[0] }
    }
    if (selector === init) init = false
    return el
  }
  if (init === undefined) init = selector
  return gen
}

export const state = obj => {
  const temp = { ...obj }
  Object.keys(obj).forEach(key => {
    Object.defineProperty(obj, key, {
      enumerable: true,
      get: () => {
        if (tempSelector && init !== false) {
          if (watch[key]) watch[key].push(tempSelector)
          else watch[key] = [tempSelector]
        }
        return temp[key]
      },
      set: val => {
        temp[key] = val
        init = false
        watch[key].forEach(selector => {
          if (ref[selector]) {
            const { el, tag, gen } = ref[selector]
            if (key === 'obj') console.log(el, val, gen, tag)
            setVal(el, val, gen, tag)
          }
        })

      }
    })
  })
  return obj
}
