const arrayExtensions = {
  mapFor(prop, obj) {
    const isFunction = typeof obj === 'function';
    return this.map((x) => {
      x[prop] = isFunction
      ? obj(x[prop], x)
      : obj;
      return x;
    });
  },
  minFor(prop) {
    const values = this.map(x => x[prop]);
    return Math.min(...values);
  },
  maxFor(prop) {
    const values = this.map(x => x[prop]);
    return Math.max(...values);
  },
  mostCommon(prop) {
    const tally = {};
    this
      .map(x => x[prop])
      .forEach(val => tally[val] ? tally[val]++ : tally[val] = 1);
    
    const max = Math.max(Object.values(tally));
    return tally.find(val => val === max);
  }
};


module.exports = () => {
  Object.keys(arrayExtensions).forEach(ext => Array.prototype[ext] = arrayExtensions[ext]);
};
  