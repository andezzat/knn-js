const _ = require('lodash');

const createNode = require('./node');

const calculateRanges = (nodes, features) => {
	return features.reduce((obj, f) => {
		const min = nodes.minFor(f);
		const max = nodes.maxFor(f);
    const range = max - min;
    if (isNaN(range)) return obj;
		return {
			...obj,
			[f]: { min, max, range },
		};
	}, {});
};

const findMissingFeature = (nodes) => {
  const knownFeatures = nodes.find(node => node.isKnown).features;
  const unknownNode = nodes.find(node => !node.isKnown);
  if (!unknownNode) return null;
  const allFeatures = unknownNode.features;
  return _.xor(knownFeatures, allFeatures);
};

const createNodeList = (nodesIn = []) => {
  let nodes = nodesIn.map(node => createNode(node));
  const features = nodes.find(node => node.isKnown).features;
  const missingFeature = findMissingFeature(nodes);

	let ranges = calculateRanges(nodes, features);

	return {
    get nodes() {
      return nodes;
    },
		features,
		add(nodesToPush, known) {
			nodes = [ ...nodes, ...nodesToPush.map(node => createNode(node, known))];
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
			nodes = nodes.map(node => node.normalizeFeatures(ranges));
			return this;
		},
		measureDistances() {
      const unknownNodes = nodes
        .filter(node => !node.isKnown)
        .mapFor('neighbours', (neighbours, node) =>
          neighbours.mapFor('distance', (d, neighbour) => node.calculateDistance(neighbour)));
      
      const knownNodes = nodes.filter(node => node.isKnown);
      nodes = [ ...knownNodes, ...unknownNodes ];

			return this;
		},
		sortNeighbours() {
      nodes = nodes
        .filter(node => !node.isKnown)
        .map(node => node.sortNeighbours());
			return this;
		},
		populateMissingFeatures(missingFeature, k = 3) {
      const knownNodes = nodes.filter(node => node.isKnown);
			const newUnknownNodes = nodes
				.filter(node => !node.isKnown)
				.mapFor(missingFeature, (m, node) =>
					node.neighbours
						.slice(0, k)
						.mostCommon(missingFeature));
      
      nodes = [ ...knownNodes, ...newUnknownNodes ];

      return this;
		}
	};
};

module.exports = createNodeList;
