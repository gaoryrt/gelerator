import iselement from 'lodash.iselement'
import isobject from 'lodash.isobject'
import isstring from 'lodash.isstring'

let _data = {}

const _watcher = {
  _events: [],
  on: (event, fn) => {
    _watcher._events[event] = _watcher._events[event] || []
    _watcher._events[event].push({ fn })
  },
  emit: (event, ...args) => {
    if(!_watcher._events[event]) return
    _watcher._events[event].forEach(fn => {
      fn.fn(...args)
    })
  }
}

// render function
const g = (attrArg = {}, tagArg = 'div') => (...cttArr) => {
  let el = document.createElement(tagArg)
  let attrObj = isobject(attrArg) ? attrArg : { class: attrArg }
  Object.keys(attrObj).forEach(key => {
    if (/^_/.test(key)) {
      _data[attrObj[key]] = undefined
      _watcher.on(attrObj[key], val => {
        el[key.slice(1)] = val
      })
    } else if (/^\$/.test(key)) {
      el.addEventListener(key.slice(1), e => {
        attrObj[key](_data, e)
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
      _watcher.emit(key, val)
      obj[key] = val
      return true
    }
  })

  // mount
  const fragment = document.createDocumentFragment()
  fragment.appendChild(element)

  this.data = _data
  this.watcher = _watcher

  // render
  document.querySelector(hook).appendChild(element)

  return this
}

export {
  g, gele
}
