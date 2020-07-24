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

#### Arrays

| Method                                                                                                        | Params              |                                                                                                                       Description |
| :------------------------------------------------------------------------------------------------------------ | :------------------ | --------------------------------------------------------------------------------------------------------------------------------: |
| [filter()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter)     | callback `function` |                                    creates a new array with all elements that pass the test implemented by the provided function. |
| [find()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find)         | callback `function` |                        returns the value of the first element in the provided array that satisfies the provided testing function. |
| [flat()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/flat)         |                     |                       creates a new array with all sub-array elements concatenated into it recursively up to the specified depth. |
| [forEach()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach)   | callback `function` |                                                                         executes a provided function once for each array element. |
| [includes()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/includes) | value `any`         |                   determines whether an array includes a certain value among its entries, returning true or false as appropriate. |
| [map()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map)           | callback `function` |              creates a new array populated with the results of calling a provided function on every element in the calling array. |
| max()                                                                                                         |                     |                                                                                        returns the highest numeric value in array |
| min()                                                                                                         |                     |                                                                                         returns the lowest numeric value in array |
| [reduce()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce)     | callback `function` |                    executes a reducer function (that you provide) on each element of the array, resulting in single output value. |
| [some()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/some)         | callback `function` | tests whether at least one element in the array passes the test implemented by the provided function. It returns a Boolean value. |

#### Objects

| Method                                                                                                       | Params                           |                                                                                                                                                 Description |
| :----------------------------------------------------------------------------------------------------------- | :------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------: |
| [assign()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign)   | target `Object`, source `Object` |                                      copies all enumerable own properties from one or more source objects to a target object. It returns the target object. |
| [entries()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/entries) | target `Object`                  | method returns an array of a given object's own enumerable string-keyed property [key, value] pairs, in the same order as that provided by a for...in loop. |
| [keys()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/keys)       | target `Object`                  |                                    returns an array of a given object's own enumerable property names, iterated in the same order that a normal loop would. |

#### JSON

- `JSON.stringify()`
- `JSON.parse()`

#### Numbers

| Method      | Params                     |                                                                  Description |
| :---------- | :------------------------- | ---------------------------------------------------------------------------: |
| isBetween() | min `number`, max `number` |                 returns boolean of whether value is between min / max values |
| clamp()     | min `number`, max `number` | clamps current value to strictly stay within min/max, never exceeding either |

#### Strings

| Method                                                                                                           | Params |                                                                                                                                                                               Description |
| :--------------------------------------------------------------------------------------------------------------- | :----- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: |
| [includes()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/includes)   |        |                                                                                 determines whether one string may be found within another string, returning true or false as appropriate. |
| [padEnd()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/padEnd)       |        |         pads the current string with a given string (repeated, if needed) so that the resulting string reaches a given length. The padding is applied from the end of the current string. |
| [padStart()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/padStart)   |        | pads the current string with another string (multiple times, if needed) until the resulting string reaches the given length. The padding is applied from the start of the current string. |
| [trim()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/trim)           |        |                                                                                                                                            removes whitespace from both ends of a string. |
| [trimEnd()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/trimEnd)     |        |                                                                                                                                       method removes whitespace from the end of a string. |
| [trimStart()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/trimStart) |        |                                                                                                                                 method removes whitespace from the beginning of a string. |

#### Console

- `console.log()`
- `console.error()`
- `console.debug()`
- `console.clear()`

#### Illustrator

|                            |                                             |                                                                   |
| :------------------------- | :------------------------------------------ | ----------------------------------------------------------------: |
| `get()`                    | key `string`, parent? `object`              | universal getter converts any native collection to standard array |
| `new RGBColor().create()`  | red `number`, green `number`, blue `number` |                                creates a new instance of RGBColor |
| `new RGBColor().fromHex()` | hex `string`                                |                          creates RGBColor from a given Hex string |
| `RGBColor().toHex()`       |                                             |                       returns hexadecimal string of current color |

## Examples

Retrieving a layer by a particular name is much better via `find()` since it won't cause a script to silently fail:

```js
let vanillaFail = app.activeDocument.layers.getByName("test");
// if "test" does not exist, causes silent fail of entire script

let newPass = get("layers").find((layer) => layer.name == "test");
// if "test" does not exist, returns null. Does not fail and continues executing code below this line.
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
let oldWay = new RGBColor();
oldWay.red = 255;
oldWay.green = 0;
oldWay.blue = 0;

let newWay = new RGBColor().create(255, 0, 0);
let hexColor = newWay.toHex(); // Returns "#ff0000"
let blueColor = new RGBColor().fromHex("#46a0f5");
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

Use AE expression-like syntax:

```js
let min = 1,
  max = 6;
for (let value = 0; value <= 8; value++) {
  alert(value.clamp(min, max));
  // Returns 1, 1, 2, 3, 4, 5, 6, 6, 6
}
```
