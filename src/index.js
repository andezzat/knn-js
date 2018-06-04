require('./lib/extensions')();

const { createNodeSet } = require('./factories');

const createNode = (rooms, area, type) => ({
	rooms,
	area,
	type,
});

const nodes = [
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

const nodeSet = createNodeSet(nodes, 'type');
const unknownNodes = [
  { rooms: 4, area: 420 }, // apartment
];
nodeSet.add(unknownNodes, false); 

nodeSet.determineUnknown();

const newUnknownNodes = nodeSet.nodeList.nodes.filter(node => !node.isKnown);

console.log(newUnknownNodes.map(n => n.type));

// 1. calculate ranges (min & max of all features [props of objects in array] in set)
// 2. find all unknown points
// 3. unknownPoints.forEach => calculate distance from all other known points.
// 4. unknownPoints.forEach => pythag on all calculated feature distance for each neighbour to calculate distance away from unknown points.
// 5. unknownPoints.sort
// 6. unknownPoints.take(k)
// 7. unknownPoints.forEach => find most common unknown feature from k-nearest neighbours