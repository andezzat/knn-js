const createNode = (rooms, area, type) => ({ rooms, area, type, isKnown: true });
const sampleNodes = [
  createNode(7, 850, 'house'),
  createNode(7, 900, 'house'),
  createNode(7, 1200, 'house'),
  createNode(8, 1500, 'house'),
  createNode(9, 1300, 'house'),
  createNode(8, 1240, 'house'),
  createNode(10, 1700, 'house'),
  createNode(9, 1000, 'house'),
  createNode(1, 800, 'flat'),
  createNode(3, 900, 'flat'),
  createNode(2, 700, 'flat'),
  createNode(1, 900, 'flat'),
  createNode(2, 1150, 'flat'),
  createNode(1, 1000, 'flat'),
  createNode(2, 1200, 'flat'),
  createNode(1, 1300, 'flat'),
  createNode(1, 350, 'apartment'),
  createNode(2, 300, 'apartment'),
  createNode(3, 300, 'apartment'),
  createNode(4, 250, 'apartment'),
  createNode(4, 500, 'apartment'),
  createNode(4, 400, 'apartment'),
  createNode(5, 450, 'apartment'),
];

require('./src/lib/extensions')();

const { createNodeSet } = require('./src/factories');
const missingFeature = 'type';
const k = 3;
const nodeSet = createNodeSet([...sampleNodes, { ...createNode(5, 937), isKnown: false }], missingFeature);
nodeSet.determineUnknown(k);

let nodes = nodeSet.nodeList.nodes;

let colours = ['red', 'green', 'yellow', 'blue', 'cyan', 'magenta', 'purple', 'orange'];
const types = Object.keys(_.groupBy(nodeSet.nodeList.nodes, node => node[missingFeature]));
colours = types.reduce((obj, t) => {
  let index = 0;
  while (Object.values(obj).includes(colours[index])) index = Math.floor(Math.random() * (colours.length - 1)) + 1;
  return { ...obj, [t]: colours[index] };
}, {});

nodes = nodes.mapFor('colour', (c, node) => colours[node[missingFeature]]);
const ranges = nodeSet.nodeList.ranges;
res.send({ nodes, ranges });

console.log(`Sent nodes to: ${req.hostname}`);
