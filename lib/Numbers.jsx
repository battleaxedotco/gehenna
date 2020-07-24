// Could use a .cycle or .loop method for UI elements (specifically Array-based) that switch between first and last entry

// Returns boolean if between two values instead of needing a ton of greater/less than conditionals
Number.prototype.isBetween = function (min, max) {
  return (!min && min !== 0) || (!max && max !== 0) || arguments.length < 2
    ? false
    : this >= min && this <= max;
};

// Inspired by AEFT's clamp() global method.
// Will return the value between min / max without exceeding either
Number.prototype.clamp = function (min, max) {
  if (this.isBetween(min, max)) return this;
  else if (this < min) return min;
  else if (this > max) return max;
};
