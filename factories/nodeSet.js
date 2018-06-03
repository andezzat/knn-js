const createNodeSet = (k, nodeListIn = createNodeList([])) => {
	const nodeList = Object.clone(nodeListIn);
	return {
		k,
		nodeList,
		add(...nodes) {
			nodeList.add(...nodes);
			return this;
		},
		determineUnknown(missingFeature, k) {
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
