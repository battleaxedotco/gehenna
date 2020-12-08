// Illustrator reference:
// https://illustrator-scripting-guide.readthedocs.io/

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

// // Need to rewrite this since the original gives false values of sibling points to any true selection.
// PathItem.prototype.getSelectedPathPoints = function () {
//   return this.selectedPathPoints;
// };
// PathPoint.prototype.alignTo = function (key, value) {
//   if (/number/i.test(typeof value))
//     this.anchor = /left|right/i.test(key)
//       ? [value, this.anchor[1]]
//       : [this.anchor[0], value];
//   else if (/center/i.test(key)) this.anchor = [value[0], value[1]];
// };
// PathItem.prototype.hasIsolatedPointSelection = function () {
//   return this.selectedPathPoints.length !== this.pathPoints.length;
// };
// PathItem.prototype.getBoundingClientRect = CompoundPathItem.prototype.getBoundingClientRect = PlacedItem.prototype.getBoundingClientRect = function () {
//   var data = {
//     left: this.geometricBounds[0],
//     top: this.geometricBounds[1] * -1,
//     right: this.geometricBounds[2],
//     bottom: this.geometricBounds[3] * -1,
//     width: this.geometricBounds[2] - this.geometricBounds[0],
//     height: (this.geometricBounds[3] - this.geometricBounds[1]) * -1,
//   };
//   return {
//     left: data.left,
//     top: data.top,
//     right: data.right,
//     bottom: data.bottom,
//     width: data.width,
//     height: data.height,
//     center: [data.left + data.width / 2, data.top + data.height / 2],
//   };
// };
// PathItem.prototype.alignTo = function (key, value) {
//   var rect = this.getBoundingClientRect(),
//     target = rect[key];
//   var isHorizontal = /left|right/.test(key),
//     isCenterpoint = !/number/i.test(typeof target);
//   if (isCenterpoint) {
//     var xOffset = rect.left - rect.center[0];
//     var yOffset = rect.top - rect.center[1];
//     var computedValue = [xOffset + value[0], (value[1] + yOffset) * -1];
//     this.position = computedValue;
//   } else {
//     var offset = isHorizontal ? rect.left - target : rect.top - target;
//     var computedValue = value + offset;
//     computedValue = isHorizontal ? computedValue : computedValue * -1;
//     this.position = isHorizontal
//       ? [computedValue, this.position[1]]
//       : [this.position[0], computedValue];
//   }
// };
// // This doesn't account for individually selected PathPoints. selectedPathPoints gives redundant values!
// // Will need to fix for true alignment
// Application.prototype.getSelectionBoundingBox = function () {
//   var selection = get("selection");
//   // let selection = get("selection").filter((item) => {
//   //   return (
//   //     !/^pathitem/i.test(item.typename) || !item.hasIsolatedPointSelection()
//   //   );
//   // });
//   // let selectedPoints = get("selection")
//   //   .filter((item) => {
//   //     return (
//   //       /^pathitem/i.test(item.typename) && item.hasIsolatedPointSelection()
//   //     );
//   //   })
//   //   .map((item) => {
//   //     alert(item.selectedPathPoints.length);
//   //     return get("selectedPathPoints", item);
//   //   });
//   if (!selection.length) return [];
//   // let xPoint = selectedPoints.map()
//   var x1 = selection
//     .map(function (item) {
//       return item.geometricBounds[0];
//     })
//     .min();
//   var x2 = selection
//     .map(function (item) {
//       return item.geometricBounds[2];
//     })
//     .max();
//   var y1 = selection
//     .map(function (item) {
//       return item.geometricBounds[1];
//     })
//     .max();
//   var y2 = selection
//     .map(function (item) {
//       return item.geometricBounds[3];
//     })
//     .min();
//   return [x1, y1, x2, y2];
// };
// Application.prototype.getSelectionBoundingClientRect = function () {
//   var selection = get("selection");
//   if (!selection.length) return [];
//   var x1 = selection
//     .map(function (item) {
//       return item.geometricBounds[0];
//     })
//     .min();
//   var x2 = selection
//     .map(function (item) {
//       return item.geometricBounds[2];
//     })
//     .max();
//   var y1 = selection
//     .map(function (item) {
//       return item.geometricBounds[1];
//     })
//     .max();
//   var y2 = selection
//     .map(function (item) {
//       return item.geometricBounds[3];
//     })
//     .min();
//   var rect = [x1, y1, x2, y2];
//   var data = {
//     left: rect[0],
//     top: rect[1] * -1,
//     right: rect[2],
//     bottom: rect[3] * -1,
//     width: rect[2] - rect[0],
//     height: (rect[3] - rect[1]) * -1,
//   };
//   return {
//     left: data.left,
//     top: data.top,
//     right: data.right,
//     bottom: data.bottom,
//     width: data.width,
//     height: data.height,
//     center: [data.left + data.width / 2, data.top + data.height / 2],
//   };
// };
// Artboard.prototype.getBoundingClientRect = function () {
//   var rect = this.artboardRect;
//   var data = {
//     left: rect[0],
//     top: rect[1] * -1,
//     right: rect[2],
//     bottom: rect[3] * -1,
//     width: rect[2] - rect[0],
//     height: (rect[3] - rect[1]) * -1,
//   };
//   return {
//     left: data.left,
//     top: data.top,
//     right: data.right,
//     bottom: data.bottom,
//     width: data.width,
//     height: data.height,
//     center: [data.left + data.width / 2, data.top + data.height / 2],
//   };
// };
// Artboard.prototype.activate = function () {
//   var self = this,
//     index = 0;
//   get("artboards").forEach(function (board, i) {
//     if (board == self) index = i + 1;
//   });
//   app.activeDocument.artboards.setActiveArtboardIndex(index);
// };

/**
 * Agnostic getter function to convert Illustrator list items to ES6 native Arrays
 *
 * @param {String} type - The key of parent to retrieve as list
 * @param {Object} parent - The parent object to comb
 *
 * @returns {Array} - An iterable array of Objects which can use advanced Array methods like find(), forEach()
 *
 */
function get(type, parent, deep) {
  if (arguments.length == 1 || !parent) {
    parent = app.activeDocument;
    deep = true;
  }
  var result = [];
  if (!parent[type]) return [];
  for (var i = 0; i < parent[type].length; i++) {
    result.push(parent[type][i]);
    if (parent[type][i][type] && deep)
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
