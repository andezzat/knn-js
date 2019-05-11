const createNodeList = require('./nodeList');
// const { createTimer, pipe } = require('../lib/utils');


const createNodeSet = (nodesIn = [], missingFeature) => {
  const nodeList = createNodeList(nodesIn);
  return {
    nodeList,
    add(nodes, known) {
      nodeList.add(nodes, known);
      return this;
    },
    determineUnknown(k) {
      nodeList
        .normalizeFeatures()
        .cloneAsNeighbours()
        .measureDistances()
        .sortNeighbours()
        .populateMissingFeatures(missingFeature, k);
    },
  };
}

module.exports = createNodeSet;
