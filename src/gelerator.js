import iselement from 'lodash.iselement'
import isobject from 'lodash.isobject'
import isstring from 'lodash.isstring'

let _data

const g = (attrArg = {}, tagArg = 'div') => (...cttArr) => {
  let el = document.createElement(tagArg)
  let attrObj = isobject(attrArg) ? attrArg : { class: attrArg }
  Object.keys(attrObj).forEach(key => {
    if (/^_click/.test(key)) {
      console.log(attrObj[key])
      el.addEventListener('click', attrObj[key](_data))
    }
    el.setAttribute(key, attrObj[key])
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
  console.log('proxy')
  _data = new Proxy(data, {
    get: (obj, key) => {
      console.log('getting', obj, key)
      return obj[key]
    },
    set: (obj, key, val) => {
      console.log('setting', obj, key, val)
      obj[key] = val
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
