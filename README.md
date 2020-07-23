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

### JSON

- `JSON.stringify()`
- `JSON.parse()`

### Arrays

- `Array.find()`
- `Array.map()`
- `Array.includes()`
- `Array.forEach()`
- `Array.flat()`
- `Array.filter()`

### Objects

- `Object.keys()`
- `Object.assign()`
- `Object.entries()`

### Strings

- `String.trim()`
- `String.padLeft()`
- `String.padRight()`

### Console

- `console.log()`
- `console.error()`
- `console.debug()`

### App-specific utils

- ~~Illustrator~~
- ~~After Effects~~
- ~~Photoshop~~
