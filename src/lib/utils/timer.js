const createTimer = (fn) => {
  const start = Date();
  fn();
  console.info(`Okay... ${Date - start}`);
};


module.exports = createTimer;
