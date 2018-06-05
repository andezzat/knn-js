const objectExtensions = {
  find(predicate) {
    const keys = Object.keys(this);
    keys.forEach(k => {
      if (predicate(this[k], k, this)) return this[k];
    });
  },
};

module.exports = () => {
  Object.clone = obj => ({...obj });
  
  Object.keys(objectExtensions).forEach(ext => Object.prototype[ext] = objectExtensions[ext]);
};
