require('./lib/extensions')();

const { createNodeSet, createNodeList, createNode } = require('./factories');



// 1. calculate ranges (min & max of all features [props of objects in array] in set)
// 2. find all unknown points
// 3. unknownPoints.forEach => calculate distance from all other known points.
// 4. unknownPoints.forEach => pythag on all calculated feature distance for each neighbour to calculate distance away from unknown points.
// 5. unknownPoints.sort
// 6. unknownPoints.take(k)
// 7. unknownPoints.forEach => find most common unknown feature from k-nearest neighbours