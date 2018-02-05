'use strict';

var isElement = require('lodash.iselement');
var isObject = require('lodash.isobject');
var isString = require('lodash.isstring');

module.exports = function () {
  var attrArg = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var tagArg = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'div';
  return function () {
    for (var _len = arguments.length, cttArr = Array(_len), _key = 0; _key < _len; _key++) {
      cttArr[_key] = arguments[_key];
    }

    var el = document.createElement(tagArg);
    var attrObj = isObject(attrArg) ? attrArg : { class: attrArg };
    Object.keys(attrObj).forEach(function (key) {
      el.setAttribute(key, attrObj[key]);
    });
    cttArr.forEach(function (cttItem) {
      if (isElement(cttItem)) el.appendChild(cttItem);else if (tagArg.toLowerCase() === 'img' && isString(cttItem)) el.setAttribute('src', cttItem);else el.innerText = cttItem;
    });
    return el;
  };
};
