console.log("Gehenna ILST loading...");

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
  type = type.replace(/s$/, "") + "s";
  for (var i = 0; i < parent[type].length; i++) result.push(parent[type][i]);
  return result;
}

/**
 * Returns Illustrator colors as a more useful string format
 *
 * @param {Object} color - The fillColor/strokeColor target
 * @param {Boolean} asHex - Whether to return as hex value or native color model
 *
 * @returns {String} - As "RGBColor(255,0,0)" or "#ff0000"
 */
function writeColorAsString(color, asHex) {
  var type = color.typename;
  var string;
  if (!asHex) {
    string = type + "(";
    if (/rgb/i.test(type)) {
      string += Math.ceil(color.red) + ",";
      string += Math.ceil(color.green) + ",";
      string += Math.ceil(color.blue) + ")";
    } else if (/cmyk/i.test(type)) {
      string += Math.ceil(color.cyan) + ",";
      string += Math.ceil(color.magenta) + ",";
      string += Math.ceil(color.yellow) + ",";
      string += Math.ceil(color.black) + ")";
    } else if (/gray/i.test(type)) {
      string += Math.ceil(color.gray) + ")";
    } else if (/hsb/i.test(type)) {
      string += Math.ceil(color.hue) + ",";
      string += Math.ceil(color.saturation) + ",";
      string += Math.ceil(color.brightness) + ")";
    } else if (/lab/i.test(type)) {
      string += Math.ceil(color.L) + ",";
      string += Math.ceil(color.A) + ",";
      string += Math.ceil(color.B) + ")";
    }
  } else string = rgbToHex(color.red, color.green, color.blue);
  return string.replace(/NaN/gm, "0") + "";
}

function rgbToHex(r, g, b) {
  function componentToHex(c) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
  }
  return /string/.test(typeof r)
    ? "#" + componentToHex(r) + componentToHex(g) + componentToHex(b)
    : "#" +
        r
          .map((param) => {
            componentToHex(param);
          })
          .join("");
}

console.log("Gehenna ILST loaded");
