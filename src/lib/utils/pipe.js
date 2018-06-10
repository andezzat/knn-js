const pipe = (...fns) => (x) =>
	fns.reduce((res, f) => f(res), x);

module.exports = pipe;
