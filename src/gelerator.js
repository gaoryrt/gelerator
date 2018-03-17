import iselement from 'lodash.iselement'
import isobject from 'lodash.isobject'
import isstring from 'lodash.isstring'

let _data = {}
const _events = []

const on = (event, fn) => {
  _events[event] = _events[event] || []
  _events[event].push({ fn })
}

const emit = (event, ...args) => {
  if(!_events[event]) return
  _events[event].forEach(fn => {
    fn.fn(...args)
  })
}

const g = (attrArg = {}, tagArg = 'div') => (...cttArr) => {
  let el = document.createElement(tagArg)
  let attrObj = isobject(attrArg) ? attrArg : { class: attrArg }
  Object.keys(attrObj).forEach(key => {
    if (key === '_html') {
      _data[attrObj[key]] = undefined
      on(attrObj[key], html => {
        el.innerText = html
      })
    } else if (/^\$/.test(key)) {
      el.addEventListener(key.slice(1), () => {
        attrObj[key](_data)
      })
    } else {
      el.setAttribute(key, attrObj[key])
    }
  })
  cttArr.forEach(cttItem => {
    if (iselement(cttItem)) el.appendChild(cttItem)
    else if (tagArg.toLowerCase() === 'img' && isstring(cttItem)) el.setAttribute('src', cttItem)
    else el.innerText = cttItem
  })
  return el
}

const gele = ({hook, data, element, actions}) => {
  // proxy
  _data = new Proxy(data, {
    get: (obj, key) => {
      return obj[key]
    },
    set: (obj, key, val) => {
      emit(key, val)
      obj[key] = val
      return true
    }
  })

  // mount
  const fragment = document.createDocumentFragment()
  fragment.appendChild(element)

  // render
  document.querySelector(hook).appendChild(element)
}

export {
  g, gele
}
