import PriorityQueue from "priorityqueuejs";

const dijkstra = (grid, startNode, endNode) => {
  // An array to store all the visited nodes in order
  const visitedNodesInOrder = [];

  // nodesToVisit - A PriorityQueue for storing the nodes to be visited in ascending distance order
  let nodesToVisit = new PriorityQueue((a, b) => -(a.distance - b.distance));

  // Set the starting node distance to 0 and enqueue it in the priority queue
  startNode.distance = 0;
  nodesToVisit.enq({ row: startNode.row, col: startNode.col, distance: 0 });

  while (nodesToVisit.size() > 0) {
    const { row, col, distance } = nodesToVisit.deq();
    let currentNode = grid[row][col];

    // If the distance in the pq element is greater than the current distance skip it
    if (distance > grid[row][col].distance) continue;

    // Marking the current node as visited and pushing it to the array
    currentNode.isVisited = true;
    visitedNodesInOrder.push(currentNode);

    // Check if the current node is end, if yes return
    if (currentNode === endNode) return visitedNodesInOrder;

    // Insert all the neighbor nodes which are not yet visited or can be reached in less distance
    const x = [1, -1, 0, 0];
    const y = [0, 0, 1, -1];
    for (let i = 0; i < 4; i++) {
      let neighborRow = row + x[i];
      let neighborCol = col + y[i];

      // Check the node is valid
      if (
        neighborRow >= 0 &&
        neighborRow < grid.length &&
        neighborCol >= 0 &&
        neighborCol < grid[0].length &&
        !grid[neighborRow][neighborCol].isVisited &&
        !grid[neighborRow][neighborCol].isWall
      ) {
        let neighbor = grid[neighborRow][neighborCol];
        if (neighbor.distance > currentNode.distance + neighbor.weight + 1) {
          neighbor.distance = currentNode.distance + neighbor.weight + 1;

          // Insert the node to priority queue and update the distance
          neighbor.previousNode = currentNode;
          nodesToVisit.enq({
            row: neighbor.row,
            col: neighbor.col,
            distance: neighbor.distance,
          });
        }
      }
    }
  }

  // We cannot reach the end node, so return the visited nodes
  return visitedNodesInOrder;
};

// Backtracks from the endNode to find the shortest path.
// Should only be called once the dijkstra is done executing
const getNodesInShortestPathOrder = (endNode) => {
  const nodesInShortestPathOrder = [];
  let currentNode = endNode;
  while (currentNode !== null) {
    nodesInShortestPathOrder.unshift(currentNode);
    currentNode = currentNode.previousNode;
  }

  return nodesInShortestPathOrder;
};

export { dijkstra, getNodesInShortestPathOrder };
