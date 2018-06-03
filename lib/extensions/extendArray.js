module.exports = () => {
	Array.prototype.minFor = function(prop) {
		const values = this.map(x => x[prop]);
		return Math.min(...values);
	};
	Array.prototype.maxFor = function(prop) {
		const values = this.map(x => x[prop]);
		return Math.max(...values);
	};
	/**
	 * 
	 * @param {*} prop Property to change for each iteratee.
	 * @param {function} obj Callback to execute and assign to prop for each iteratee or value to assign directly. 
	 */
	Array.prototype.mapFor = function(prop, obj) {
		const isFunction = typeof obj === 'function';

		return this.map((x) => {
			x[prop] = isFunction
			? obj(x[prop], x)
			: obj;
			return x;
		});
	};
};