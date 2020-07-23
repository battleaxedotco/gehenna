# gehenna

Awesome ES6 polyfills and mega helpers for for Adobe scripting

## Installation

```bash
npm i gehenna
```

```js
import gehenna from "gehenna";

// To automatically load all utilies (including app-specific helpers, if any):
await gehenna();

// Or promisified:
gehenna().then(() => {
  // Utilities now loaded
});
```

#### JSON

- `JSON.stringify()`
- `JSON.parse()`

#### Arrays

- `Array.find()`
- `Array.map()`
- `Array.includes()`
- `Array.forEach()`
- `Array.flat()`
- `Array.filter()`

#### Objects

- `Object.keys()`
- `Object.assign()`
- `Object.entries()`

#### Strings

- `String.trim()`
- `String.padLeft()`
- `String.padRight()`

#### Console

- `console.log()`
- `console.error()`
- `console.debug()`
- `console.clear()`

#### App-specific utils

- ~~Illustrator~~
- ~~After Effects~~
- ~~Photoshop~~

## Examples

Retrieving a layer by a particular name is much better via `find()` since it won't cause a script to silently fail:

```js
let vanillaFail = app.activeDocument.layers.getByName("test");
// if "test" does not exist, causes silent fail of entire script

let newPass = get("layers").find((layer) => layer.name == "test");
// if "test" does not exist, returns null. Does not fail.
```

Since the `get()` utility in Illustrator turns collections into native arrays, we can use any ES6 Array methods on them. For instance retrieving all layers which begin with "Layer" can be done as easily as:

```js
let genericallyNamedLayers = get("layers").filter((layer) => {
  return /^Layer/.test(layer.name);
});
```

Say we want to act on every `pathItem` within a specified layer:

```js
// Reads "get [iterable key] of [parent]". If parent param is not included defaults to app.activeDocument
get("pathItems", app.activeDocument.layers[1]).forEach((pathItem) => {
  alert(pathItem);
});
```

Or create a new color in a much easier way than Illustrator allows:

```js
let newColor = RGB(255, 0, 0);

let oldWay = new RGBColor();
oldWay.red = 255;
oldWay.green = 0;
oldWay.blue = 0;
```

Clean up coordinate data by rounding each value:

```js
let coordinateArray = get("pathItems")[0].pathPoints;
// This could return long floats like [ [0.092130984, 100.487023098], ... ]
let newCoords = coordinateArray.map((point) => {
  // Modify each coordinate array
  return point.map((axis) => {
    // Modify each coordinate array entry, as in x and y individually. Round them
    return Math.round(axis);
    // Now return the rounded array back as the original entry
  });
  // And return the entire collection back as a single object without mutating the original array.
});
// We now have clean data like [ [0, 100], ... ]
```
