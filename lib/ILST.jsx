RGBColor.prototype.create = function (red, green, blue) {
  this.red = red;
  this.green = green;
  this.blue = blue;
  return this;
};
RGBColor.prototype.fromHex = function (hex) {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  this.red = parseInt(result[1], 16);
  this.green = parseInt(result[2], 16);
  this.blue = parseInt(result[3], 16);
  return this;
};
RGBColor.prototype.toHex = function () {
  return (
    "#" +
    ((1 << 24) + (this.red << 16) + (this.green << 8) + this.blue)
      .toString(16)
      .slice(1)
  );
};
RGBColor.prototype.getString = function () {
  return (
    this.typename + "(" + this.red + "," + this.green + "," + this.blue + ")"
  );
};
CMYKColor.prototype.create = function (cyan, magenta, yellow, black) {
  this.cyan = cyan;
  this.magenta = magenta;
  this.yellow = yellow;
  this.black = black;
  return this;
};
CMYKColor.prototype.getString = function () {
  return (
    this.typename +
    "(" +
    this.cyan +
    "," +
    this.magenta +
    "," +
    this.yellow +
    "," +
    this.black +
    ")"
  );
};
LabColor.prototype.create = function (L, A, B) {
  this.L = L;
  this.A = A;
  this.B = B;
  return this;
};
LabColor.prototype.getString = function () {
  return this.typename + "(" + this.L + "," + this.A + "," + this.B + ")";
};
GrayColor.prototype.create = function (value) {
  this.gray = value;
  return this;
};
GrayColor.prototype.getString = function () {
  return this.typename + "(" + this.gray + ")";
};

/**
 * Agnostic getter function to convert Illustrator list items to ES6 native Arrays
 *
 * @param {String} type - The key of parent to retrieve as list
 * @param {Object} parent - The parent object to comb
 *
 * @returns {Array} - An iterable array of Objects which can use advanced Array methods like find(), forEach()
 *
 */
function get(type, parent) {
  if (arguments.length == 1 || !parent) parent = app.activeDocument;
  var result = [];
  if (!parent[type]) return [];
  for (var i = 0; i < parent[type].length; i++) {
    result.push(parent[type][i]);
    if (parent[type][i][type])
      result = [].concat(result, get(type, parent[type][i]));
  }
  return result || [];
}

/**
 *
 * @param {String} string - Period delimited query string, such as "color.toHex()"
 * @param {Object} propGroup - Parent object to query inside
 *
 * @returns {Any} The value of the query string
 */

function getProperty(string, propGroup) {
  var propList = /\./.test(string) ? string.split(".") : [string];
  var lastProp = null,
    thisProp = null,
    args = [];
  propList.forEach(function (prop) {
    lastProp = propGroup;
    thisProp = prop.replace(/\(.*\)/, "");
    if (/\(.{1,}\)/.test(prop))
      args = prop.split(",").map(function (arg) {
        return arg.trim();
      });
    propGroup = /function/.test(typeof propGroup[thisProp])
      ? propGroup[thisProp].call(lastProp, args.slice())
      : propGroup[prop]
      ? propGroup[prop]
      : propGroup;
  });
  return propGroup;
}
