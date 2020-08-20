// Support for Object.keys()
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/keys
//
if (!Object.keys) {
  Object.keys = (function () {
    "use strict";
    var hasOwnProperty = Object.prototype.hasOwnProperty,
      hasDontEnumBug = !{ toString: null }.propertyIsEnumerable("toString"),
      dontEnums = [
        "toString",
        "toLocaleString",
        "valueOf",
        "hasOwnProperty",
        "isPrototypeOf",
        "propertyIsEnumerable",
        "constructor",
      ],
      dontEnumsLength = dontEnums.length;

    return function (obj) {
      if (
        typeof obj !== "function" &&
        (typeof obj !== "object" || obj === null)
      )
        throw new TypeError("Object.keys called on non-object");

      var result = [],
        prop,
        i;

      for (prop in obj) if (hasOwnProperty.call(obj, prop)) result.push(prop);

      if (hasDontEnumBug)
        for (i = 0; i < dontEnumsLength; i++)
          if (hasOwnProperty.call(obj, dontEnums[i])) result.push(dontEnums[i]);

      return result;
    };
  })();
}

// Support for Object.entries()
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/entries
//
if (!Object.entries) {
  Object.entries = function (obj) {
    var ownProps = Object.keys(obj),
      i = ownProps.length,
      resArray = new Array(i); // preallocate the Array
    while (i--) resArray[i] = [ownProps[i], obj[ownProps[i]]];

    return resArray;
  };
}

// Support for Object.assign()
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign
//
// if (typeof Object.assign !== "function") {
//   // Must be writable: true, enumerable: false, configurable: true
//   Object.defineProperty(Object, "assign", {
//     value: function assign(target, varArgs) {
//       // .length of function is 2
//       "use strict";
//       if (target === null || target === undefined)
//         throw new TypeError("Cannot convert undefined or null to object");

//       var to = Object(target);

//       for (var index = 1; index < arguments.length; index++) {
//         var nextSource = arguments[index];

//         if (nextSource !== null && nextSource !== undefined) {
//           for (var nextKey in nextSource) {
//             // Avoid bugs when hasOwnProperty is shadowed
//             if (Object.prototype.hasOwnProperty.call(nextSource, nextKey))
//               to[nextKey] = nextSource[nextKey];
//           }
//         }
//       }
//       return to;
//     },
//     writable: true,
//     configurable: true,
//   });
// }
