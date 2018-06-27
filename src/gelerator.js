const iselement = el => el instanceof HTMLElement && el.nodeType === 1
const isobject = ob => ob !== null && typeof ob === 'object'
const isstring = st => typeof st === 'string' || st instanceof String

export const g = (attrArg = {}, tagArg = 'div') => (...cttArr) => {
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
