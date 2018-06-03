const createNodeList = require('./nodeList');

const createNodeSet = (nodesIn = [], missingFeature) => {
	const nodeList = createNodeList(nodesIn);
	return {
		nodeList,
		add(...nodes) {
			nodeList.add(...nodes);
			return this;
		},
		determineUnknown(k) {
			nodeList
				.cloneAsNeighbours()
				.normalizeFeatures()
				.measureDistances()
				.sortNeighbours()
				.populateMissingFeatures(missingFeature, k);
		},
	};
}

module.exports = createNodeSet;
