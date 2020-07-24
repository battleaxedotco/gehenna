// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/trim
String.prototype.trim = function () {
  return this.replace(/^\s*|\s*$/gm, "");
};

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/trimStart
String.prototype.trimStart = function () {
  return this.replace(/^\s*/gm, "");
};

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/trimEnd
String.prototype.trimEnd = function () {
  return this.replace(/\s*$/gm, "");
};

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/includes
String.prototype.includes = function (word) {
  return new RegExp(word).test(this);
};

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/padStart
String.prototype.padStart = function (length, character) {
  var value = this,
    mask = character || " ";
  if (value.length > length) value = value.substring(0, length);
  var difference = length - value.length;
  while (value.length < length) {
    difference = length - value.length;
    if (mask.length < difference) value = mask + value;
    else value = mask.substring(0, difference) + value;
  }
  return value;
};

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/padEnd
String.prototype.padEnd = function (length, character) {
  var value = this,
    mask = character || " ";
  if (value.length > length) value = value.substring(0, length);
  var difference = length - value.length;
  while (value.length < length) {
    difference = length - value.length;
    if (mask.length < difference) value += mask;
    else value += mask.substring(0, difference);
  }
  return value;
};
