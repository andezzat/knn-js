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
};


module.exports = () => {
  Object.keys(arrayExtensions).forEach(ext => Array.prototype[ext] = arrayExtensions[ext]);
};
  