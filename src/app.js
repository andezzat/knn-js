require('./lib/extensions')();

const express = require('express');
const _ = require('lodash');

const app = express();

app.use(express.static('public'));
app.use(express.json());

app.post('/nodes', (req, res, next) => {
  const { createNodeSet } = require('./factories');
  const { missingFeature, k } = req.body;

  const nodeSet = createNodeSet(req.body.nodes, missingFeature);
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
});


module.exports = app;

// 1. calculate ranges (min & max of all features [props of objects in array] in set)
// 2. find all unknown points
// 3. unknownPoints.forEach => calculate distance from all other known points.
// 4. unknownPoints.forEach => pythag on all calculated feature distance for each neighbour to calculate distance away from unknown points.
// 5. unknownPoints.sort
// 6. unknownPoints.take(k)
// 7. unknownPoints.forEach => find most common unknown feature from k-nearest neighbours
