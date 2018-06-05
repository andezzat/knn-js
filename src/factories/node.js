const _ = require('lodash');


const createNode = (node, isKnown = true) => {
	const features = Object.keys(node);
	return {
		...node,
    features,
    normalized: {},
		isKnown,
		calculateDistance(otherNode) {
			return Math.sqrt(features.reduce((acc, feature) => {
				const distance = Math.abs(this[feature] - otherNode[feature]);
				const distanceSq = distance * distance;
				return acc + distanceSq
			}, 0));
		},
		sortNeighbours(by = 'distance') {
      const neighbours = _.sortBy(this.neighbours, by);
      return { ...this, neighbours };
    },
    normalizeFeatures(ranges) {
      const normalized = Object.keys(this)
        .filter(f => features.includes(f))
        .reduce((obj, f) => {
          if (!ranges[f]) return obj;

          const newFeature = (this[f] - ranges[f].min) / ranges[f].range;
          return { ...obj, [f]: newFeature };
        }, {});

      return { ...this, normalized };
    },
	};
};

module.exports = createNode;
