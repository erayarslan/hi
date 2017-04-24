var toString = {}.toString;

var isArray = function (arr) {
  return toString.call(arr) === '[object Array]';
};

var isarray = Array.isArray || isArray;