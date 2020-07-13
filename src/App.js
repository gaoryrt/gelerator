const iselement = el => el instanceof HTMLElement && el.nodeType === 1
const isobject = ob => ob !== null && typeof ob === 'object'
const isstring = st => typeof st === 'string' || st instanceof String

export const g = (attrArg = {}, tagArg = 'div') => (...cttArr) => {
  let el = document.createElement(tagArg)
  let attrObj = isobject(attrArg) ? attrArg : { class: attrArg }
  Object.keys(attrObj).forEach(key => {
    const val = attrObj[key]
    if (!val) return
    if (/^\$/.test(key)) el.setAttribute('data-' + key.slice(1), val)
    else if (/^_/.test(key)) el.addEventListener(key.slice(1), val)
    else if (key === 'style' && isobject(val)) {
      el.setAttribute('style', Object.keys(val).map(i => `${i}:${val[i]}`).join(';'))
    } else el.setAttribute(key, val)
  })
  cttArr.forEach(cttItem => {
    if (iselement(cttItem)) el.appendChild(cttItem)
    else if (tagArg.toLowerCase() === 'img' && isstring(cttItem)) el.setAttribute('src', cttItem)
    else if (cttItem !== undefined) el.innerHTML += cttItem
  })
  return el
}
