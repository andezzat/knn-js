const _ = require('lodash');


const createNode = (node, isKnown = true) => {
	const features = Object.keys(node);
	return {
		...node,
		features,
		isKnown,
		calculateDistance(otherNode) {
			return Math.sqrt(features.reduce((acc, feature) => {
				const distance = Math.abs(this[feature] - otherNode[feature]);
				const distanceSq = distance * distance;
				return acc + distanceSq
			}, 0));
		},
		sortNeighbours() {
			this.neighbours = _.sortBy(this.neighbours, 'distance');
		},
	};
};

module.exports = createNode;
