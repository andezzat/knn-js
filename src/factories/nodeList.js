const _ = require('lodash');

const createNode = require('./node');

const calculateRanges = (nodes, features) => {
	return features.reduce((obj, f) => {
		const min = nodes.minFor(f);
		const max = nodes.maxFor(f);
		const range = max - min;
		return {
			...obj,
			[f]: { min, max, range },
		};
	}, {});
};

const findMissingFeature = (nodes) => {
  const knownFeatures = nodes.find(node => node.isKnown).features;
  const allFeatures = nodes.find(node => !node.isKnown).features;
  return _.xor(knownFeatures, allFeatures);
};

const createNodeList = (nodesIn = []) => {
  let nodes = nodesIn.map(node => createNode(node));
  const features = nodes.find(node => node.isKnown).features;
  const missingFeature = findMissingFeature(nodes);

	let ranges = calculateRanges(nodes, features);

	return {
		features,
		add(nodesToPush, known) {
			nodes.push(...nodesToPush.map(node => createNode(node, known)));
			ranges = calculateRanges(nodes, features);
			return this;
    },
		/**
		 * Clone all known nodes as neighbours for each unknown node
		 */
		cloneAsNeighbours() {
			const knownNodes = nodes.filter(node => node.isKnown);
			const newUnknownNodes = nodes
				.filter(node => !node.isKnown)
				.mapFor('neighbours', knownNodes.map(Object.clone));
			
			nodes = [ ...knownNodes, ...newUnknownNodes ];

			return this;
		},
		normalizeFeatures() {
			nodes = nodes.map(node => features.reduce((obj, f) => {
        const newFeature = f === missingFeature
          ? node[f]
          : (node[f] - ranges[f].min) / ranges[f].range;

        return { ...obj, [f]: newFeature };
      }, {}));
			return this;
		},
		measureDistances() {
			nodes = nodes.mapFor('neighbours', (neighbours, node) =>
				neighbours.mapFor('distance', (d, neighbour) => node.calculateDistance(neighbour)));
			return this;
		},
		sortNeighbours() {
			nodes = nodes.forEach(node => node.sortNeighbours());
			return this;
		},
		populateMissingFeatures(missingFeature, k = 3) {
			const newUnknownNodes = nodes
				.filter(node => !node.isKnown)
				.mapFor(missingFeature, (m, node) => {
					const kNearestNeighbours = node.neighbours.slice(0, k);
					return _.chain(kNearestNeighbours)
						.groupBy(missingFeature)
						.sortBy(group => group.length)
						.reverse()
						.value()[0][0][missingFeature];
				});
		}
	};
};

module.exports = createNodeList;