const cloneObject = obj => Object.assign({}, obj);

Array.prototype.minFor = function (prop) {
  const values = this.map(x => x[prop]);
  return Math.min(...values);
};

Array.prototype.maxFor = function (prop) {
  const values = this.map(x => x[prop]);
  return Math.max(...values);
};

const NodeContainer = (k, missingFeature) => ({
  nodes: [],
  ranges: {},
  k,
  missingFeature,
});

const calculateRanges = (nodes) => {
  const featureNames = Object.keys(nodes[0]);

  return featureNames.reduce((obj, name) => 
    Object.assign(obj, {
      [name]: { min: nodes.minFor(name), max: nodes.maxFor(name) }
    }), {});
};

// Clone all known nodes as neighbours for each unknown node
const cloneAsNeighbours = (nodes, missingFeature) => {
  const knownNodes = nodes.filter(node => node.hasOwnProperty(missingFeature));
  const unknownNodes = nodes.filter(node => !node.hasOwnProperty(missingFeature));

  knownNodes.forEach(node => node.neighbours = knownNodes.map(cloneObject));
};

const calculateDistance = (a, b, missingFeature) => {
  const features = Object.keys(a).filter(prop => prop !== missingFeature);

  return Math.sqrt(features
    .map((feature) => {
      const distanceNormalized = (a[feature] - b[feature]);
      return distanceNormalized * distanceNormalized;
    })
    .reduce((acc, featureSq) => acc + featureSq, 0));
};

const measureDistances = (nodes, missingFeature) => {
  nodes.forEach((node) => {
    node.neighbours.forEach((neighbour) => {
      neighbour.distance = calculateDistance(node, neighbour, missingFeature);
    });
  });
};

NodeContainer.prototype.add = function (...nodes) {
  this.nodes.push(...nodes);
};

NodeContainer.prototype.determineUnknown = function () {
  this.ranges = calculateRanges(this.nodes);
  cloneAsNeighbours(this.nodes, this.missingFeature);
  measureDistances(this.nodes);
  sortNeighbours(this.nodes);
};
