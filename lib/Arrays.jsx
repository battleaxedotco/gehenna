// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/isArray
//
if (!Array.isArray) {
  Array.isArray = function (arg) {
    return Object.prototype.toString.call(arg) === "[object Array]";
  };
}

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter
//
Array.prototype.filter = function (callback) {
  var filtered = [];
  for (var i = 0; i < this.length; i++)
    if (callback(this[i], i, this)) filtered.push(this[i]);
  return filtered;
};

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find
//
Array.prototype.find = function (callback) {
  for (var i = 0; i < this.length; i++)
    if (callback(this[i], i, this)) return this[i];
  return null;
};

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach
//
Array.prototype.flat = function () {
  function flattenArrayOfArrays(a, r) {
    if (!r) r = [];
    for (var i = 0; i < a.length; i++)
      if (Array.isArray(a[i])) r.concat(flattenArrayOfArrays(a[i], r));
      else r.push(a[i]);
    return r;
  }
  return flattenArrayOfArrays(this);
};

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach
//
Array.prototype.forEach = function (callback) {
  for (var i = 0; i < this.length; i++) callback(this[i], i, this);
};

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach
//
Array.prototype.includes = function (item) {
  for (var i = 0; i < this.length; i++) if (this[i] == item) return true;
  return false;
};

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map
//
Array.prototype.map = function (callback) {
  var mappedParam = [];
  for (var i = 0; i < this.length; i++)
    mappedParam.push(callback(this[i], i, this));
  return mappedParam;
};

Array.prototype.min = function () {
  var sorted = this.sort(function (a, b) {
    return a - b;
  });
  return sorted[0];
};
Array.prototype.max = function () {
  var sorted = this.sort(function (a, b) {
    try {
      return a - b;
    } catch (err) {
      return 0;
    }
  });
  return sorted[sorted.length - 1];
};

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce
//
Array.prototype.reduce = function (fn, initial) {
  var values = this;
  values.forEach(function (item) {
    initial = initial !== undefined ? fn(initial, item) : item;
  });
  return initial;
};

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce
//
Array.prototype.some = function (fun, thisArg) {
  "use strict";
  if (this == null)
    throw new TypeError("Array.prototype.some called on null or undefined");
  if (typeof fun !== "function") throw new TypeError();

  var t = Object(this),
    len = t.length >>> 0;

  for (var i = 0; i < len; i++)
    if (i in t && fun.call(thisArg, t[i], i, t)) return true;
  return false;
};
