// Potentially extend this class

// Support for Math.hypot() to get distance between two points
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/hypot
// 
if (!Math.hypot) Math.hypot = function () {
    var max = 0;
    var s = 0;
    var containsInfinity = false;
    for (var i = 0; i < arguments.length; ++i) {
        var arg = Math.abs(Number(arguments[i]));
        if (arg === Infinity)
            containsInfinity = true
        if (arg > max) {
            s *= (max / arg) * (max / arg);
            max = arg;
        }
        s += arg === 0 && max === 0 ? 0 : (arg / max) * (arg / max);
    }
    return containsInfinity ? Infinity : (max === 1 / 0 ? 1 / 0 : max * Math.sqrt(s));
};